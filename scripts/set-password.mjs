#!/usr/bin/env node
/**
 * Creates or updates .env.local with an admin password hash and auth secret.
 *   npm run admin:password             -> generates a random password
 *   npm run admin:password -- "secret" -> uses the password you supply
 */
import { randomBytes, scryptSync } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ENV_PATH = join(process.cwd(), ".env.local");

const hashPassword = (password) => {
  const salt = randomBytes(16);
  return `${salt.toString("hex")}:${scryptSync(password, salt, 64).toString("hex")}`;
};

const password = process.argv[2] || randomBytes(9).toString("base64url");
const generated = !process.argv[2];

const existing = existsSync(ENV_PATH) ? readFileSync(ENV_PATH, "utf8") : "";
const keep = existing
  .split("\n")
  .filter((l) => l.trim() && !/^(ADMIN_PASSWORD_HASH|AUTH_SECRET)=/.test(l.trim()));

const secretLine = existing.match(/^AUTH_SECRET=.+$/m)?.[0] ?? `AUTH_SECRET=${randomBytes(48).toString("base64url")}`;

writeFileSync(
  ENV_PATH,
  [...keep, secretLine, `ADMIN_PASSWORD_HASH=${hashPassword(password)}`, ""].join("\n"),
  "utf8",
);

console.log("\n  Admin credentials written to .env.local\n");
console.log(`  URL:      /admin/login`);
console.log(`  Password: ${password}`);
if (generated) console.log("\n  (Randomly generated — save it now, it is not stored in plain text.)");
console.log("\n  Restart the dev server for the change to take effect.\n");
