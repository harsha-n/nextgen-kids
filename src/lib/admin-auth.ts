import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "nextgen_admin_session";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

export function createPasswordHash(password: string) {
  return createHmac("sha256", getSecret()).update(password).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function sign(value: string) {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function isAdminConfigured() {
  return Boolean(
    process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD_HASH &&
      process.env.ADMIN_SESSION_SECRET
  );
}

export function verifyAdminPassword(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!isAdminConfigured() || username !== expectedUsername || !expectedHash) {
    return false;
  }

  return safeEqual(createPasswordHash(password), expectedHash);
}

export function createSessionToken(username: string) {
  const expiresAt = Date.now() + SESSION_MAX_AGE_SECONDS * 1000;
  const encodedUsername = Buffer.from(username).toString("base64url");
  const payload = `${encodedUsername}.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token?: string) {
  if (!token || !isAdminConfigured()) {
    return false;
  }

  const parts = token.split(".");

  if (parts.length !== 3) {
    return false;
  }

  const [encodedUsername, expiresAt, signature] = parts;

  if (!encodedUsername || !expiresAt || !signature) {
    return false;
  }

  if (Number(expiresAt) <= Date.now()) {
    return false;
  }

  const payload = `${encodedUsername}.${expiresAt}`;

  return safeEqual(sign(payload), signature);
}

export function getAdminSession() {
  return verifySessionToken(cookies().get(COOKIE_NAME)?.value);
}

export function setAdminSession(username: string) {
  cookies().set(COOKIE_NAME, createSessionToken(username), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS
  });
}

export function clearAdminSession() {
  cookies().delete(COOKIE_NAME);
}

export function requireAdminSession() {
  if (!getAdminSession()) {
    throw new Error("Unauthorized");
  }
}
