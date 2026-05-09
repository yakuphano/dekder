/**
 * public/logo.jpg yoksa geçerli minimal bir JPEG yazar (Header /logo.jpg için).
 * C: önbelleği yerine proje (D:) içinde kalır.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const target = path.join(root, "public", "logo.jpg");

// Geçerli 1x1 JPEG (çok küçük)
const jpeg = Buffer.from(
  "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAr/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAB//Z",
  "base64",
);

if (!fs.existsSync(target)) {
  fs.mkdirSync(path.join(root, "public"), { recursive: true });
  fs.writeFileSync(target, jpeg);
  // eslint-disable-next-line no-console
  console.log("[ensure-logo] wrote", target);
}
