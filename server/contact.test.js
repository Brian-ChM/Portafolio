import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { copyFileSync, mkdirSync, mkdtempSync, rmSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import nodemailer from "nodemailer";
import handler from "../api/contact.js";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const validBody = {
  name: "Visitante",
  email: "visitor@example.invalid",
  message: "Mensaje de prueba",
};

function response() {
  return {
    statusCode: 200,
    headers: {},
    body: undefined,
    ended: false,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      this.ended = true;
      return this;
    },
    end() {
      this.ended = true;
      return this;
    },
  };
}

function transport(t, error = null) {
  const captured = {};
  t.mock.method(console, "log", () => {});
  t.mock.method(nodemailer, "createTransport", (options) => {
    captured.options = options;
    return {
      sendMail(message, callback) {
        captured.message = message;
        callback(error);
      },
    };
  });
  return captured;
}

test("POST conserva Gmail, las credenciales de entorno y el mensaje de contacto", (t) => {
  const original = {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  };
  process.env.EMAIL_USER = "sender@example.invalid";
  process.env.EMAIL_PASS = "test-password";
  t.after(() => {
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
  const captured = transport(t);
  const res = response();

  handler({ method: "POST", headers: {}, body: validBody }, res);

  assert.equal(res.statusCode, 200);
  assert.equal(res.body.message, "Mensaje enviado exitosamente");
  assert.deepEqual(captured.options, {
    service: "gmail",
    auth: { user: "sender@example.invalid", pass: "test-password" },
  });
  assert.deepEqual(captured.message, {
    from: "brianmarecco@gmail.com",
    to: ["brchm.dev@gmail.com"],
    subject: "Portafolio - Mensaje de contacto",
    text: "Nombre: Visitante\nEmail: visitor@example.invalid\nMensaje: Mensaje de prueba",
  });
});

test("POST incompleto devuelve 400 sin intentar enviar correo", (t) => {
  const captured = transport(t);
  for (const body of [undefined, {}, { ...validBody, email: "" }]) {
    const res = response();
    handler({ method: "POST", headers: {}, body }, res);
    assert.equal(res.statusCode, 400);
    assert.equal(res.body.error, "Todos los campos son obligatorios");
  }
  assert.equal(captured.options, undefined);
});

test("un error SMTP devuelve 500 sin exponer el detalle de autenticación", (t) => {
  transport(
    t,
    Object.assign(new Error("Detalle privado de SMTP"), { code: "EAUTH" }),
  );
  const res = response();
  handler({ method: "POST", headers: {}, body: validBody }, res);
  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, { error: "Error al enviar el mensaje" });
});

test("GET devuelve 405 y no intenta enviar correo", (t) => {
  const captured = transport(t);
  const res = response();
  handler({ method: "GET", headers: {} }, res);
  assert.equal(res.statusCode, 405);
  assert.equal(res.headers.Allow, "POST, OPTIONS");
  assert.equal(captured.options, undefined);
});

test("OPTIONS conserva el preflight CORS sin enviar correo", (t) => {
  const captured = transport(t);
  const res = response();
  handler(
    { method: "OPTIONS", headers: { origin: "http://localhost:4321" } },
    res,
  );
  assert.equal(res.statusCode, 204);
  assert.equal(res.ended, true);
  assert.equal(
    res.headers["Access-Control-Allow-Origin"],
    "http://localhost:4321",
  );
  assert.equal(captured.options, undefined);
});

test("la función carga con las dependencias raíz, sin instalar el servidor local", async () => {
  const output = join(projectRoot, "output");
  mkdirSync(output, { recursive: true });
  const fixture = mkdtempSync(join(output, ".contact-smoke-"));
  try {
    mkdirSync(join(fixture, "api"));
    mkdirSync(join(fixture, "server"));
    copyFileSync(
      join(projectRoot, "api/contact.js"),
      join(fixture, "api/contact.js"),
    );
    copyFileSync(
      join(projectRoot, "server/contact.js"),
      join(fixture, "server/contact.js"),
    );
    const { stdout } = await promisify(execFile)(
      process.execPath,
      [
        "--input-type=module",
        "-e",
        `
        import assert from 'node:assert/strict';
        import nodemailer from 'nodemailer';
        import handler from './api/contact.js';
        nodemailer.createTransport = () => ({ sendMail(_message, callback) { callback(null); } });
        console.log = () => {};
        let status;
        let payload;
        const res = { setHeader() {}, status(value) { status=value; return this; }, json(value) { payload=value; } };
        handler({ method: 'POST', headers: {}, body: { name: 'Prueba', email: 'test@example.invalid', message: 'Prueba' } }, res);
        assert.equal(status, 200);
        assert.equal(payload.message, 'Mensaje enviado exitosamente');
        process.stdout.write('ok');
      `,
      ],
      { cwd: fixture, timeout: 10000 },
    );
    assert.equal(stdout, "ok");
  } finally {
    const target = relative(output, resolve(fixture));
    assert.ok(target.startsWith(".contact-smoke-") && !target.includes(".."));
    rmSync(fixture, { recursive: true, force: true });
  }
});
