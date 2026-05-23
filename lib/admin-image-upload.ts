import { randomBytes } from "crypto";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import path from "path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MAX_BYTES = 8 * 1024 * 1024;

const MIME_TO_EXT = new Map<string, string>([
  ["image/jpeg", ".jpg"],
  ["image/png", ".png"],
  ["image/webp", ".webp"],
  ["image/gif", ".gif"],
]);

export type SaveUploadResult =
  | { ok: true; publicPath: string }
  | { ok: false; error: string };

/** Yerel / barındırıcı diskine yazar. Vercel gibi salt okunur dosya sistemlerinde hata dönebilir. */
export async function saveAdminImageUpload(file: File | null): Promise<SaveUploadResult> {
  if (!file || file.size === 0) {
    return { ok: false, error: "Görsel dosyası seçilmedi." };
  }
  if (file.size > MAX_BYTES) {
    return { ok: false, error: "Dosya çok büyük (en fazla 8 MB)." };
  }

  const ext = MIME_TO_EXT.get(file.type);
  if (!ext) {
    return { ok: false, error: "Yalnızca JPEG, PNG, WebP veya GIF yükleyin." };
  }

  let buffer: Buffer;
  try {
    buffer = Buffer.from(await file.arrayBuffer());
  } catch {
    return { ok: false, error: "Dosya okunamadı." };
  }

  const name = `${Date.now()}-${randomBytes(8).toString("hex")}${ext}`;
  const absPath = path.join(UPLOAD_DIR, name);

  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(absPath, buffer);
  } catch {
    return {
      ok: false,
      error:
        "Görsel kaydedilemedi. Sunucuda yazma izni veya disk alanı olmayabilir (ör. bazı bulut ortamları).",
    };
  }

  return { ok: true, publicPath: `/uploads/${name}` };
}

export async function duplicatePublicUpload(publicPath: string): Promise<SaveUploadResult> {
  if (!isPublicUploadPath(publicPath)) {
    return { ok: false, error: "Geçersiz kaynak dosyası." };
  }
  const fileName = path.basename(publicPath);
  if (!/^[\w.-]+$/.test(fileName)) {
    return { ok: false, error: "Geçersiz dosya adı." };
  }
  const srcAbs = path.join(process.cwd(), "public", "uploads", fileName);
  let buffer: Buffer;
  try {
    buffer = await readFile(srcAbs);
  } catch {
    return { ok: false, error: "Galeri dosyası bulunamadı." };
  }

  const ext = path.extname(fileName) || ".jpg";
  const newName = `${Date.now()}-${randomBytes(8).toString("hex")}${ext}`;
  const destAbs = path.join(UPLOAD_DIR, newName);

  try {
    await mkdir(UPLOAD_DIR, { recursive: true });
    await writeFile(destAbs, buffer);
  } catch {
    return { ok: false, error: "Kopya oluşturulamadı." };
  }

  return { ok: true, publicPath: `/uploads/${newName}` };
}

export function isPublicUploadPath(p: string): boolean {
  return p.startsWith("/uploads/") && !p.includes("..");
}

/** Yalnızca `public/uploads` altına yazdığımız dosyaları siler. */
export async function removeStoredUploadIfOwned(publicPath: string): Promise<void> {
  if (!isPublicUploadPath(publicPath)) return;
  const fileName = path.basename(publicPath);
  if (!/^[\w.-]+$/.test(fileName)) return;
  const abs = path.join(process.cwd(), "public", "uploads", fileName);
  try {
    await unlink(abs);
  } catch {
    // dosya yok veya izin — yut
  }
}
