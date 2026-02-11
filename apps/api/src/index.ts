import { Elysia } from "elysia";
import { mkdir } from "fs/promises";
import { join } from "path";

const UPLOAD_DIR = join(process.cwd(), "uploads");
await mkdir(UPLOAD_DIR, { recursive: true });

export const app = new Elysia()
  .use(
    (app) =>
      app
        .onRequest(({ request, set }) => {
          const origin = request.headers.get("origin") ?? "";
          if (origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1")) {
            set.headers["Access-Control-Allow-Origin"] = origin;
            set.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS";
            set.headers["Access-Control-Allow-Headers"] = "Content-Type, X-File-Name";
          }
        })
          )
  .options("/*", ({ set }) => {
    set.status = 204;
    return new Response(null, { status: 204 });
  })
  .get("/", () => ({ name: "beta-stack-api", version: "1.0.0" }))
  .post("/upload/stream", async ({ request }) => {
    const contentType = request.headers.get("content-type") || "application/octet-stream";
    let fileName = request.headers.get("x-file-name") || `upload-${Date.now()}`;
    
    if (!request.body) {
      return { success: false, error: "No file data provided" };
    }

    if (!fileName.includes('.')) {
      const mimeToExt: Record<string, string> = {
        'video/mp4': '.mp4',
        'video/mpeg': '.mpeg',
        'video/quicktime': '.mov',
        'video/x-msvideo': '.avi',
        'video/webm': '.webm',
        'image/jpeg': '.jpg',
        'image/png': '.png',
        'image/gif': '.gif',
        'application/pdf': '.pdf',
        'application/zip': '.zip',
      };
      fileName += mimeToExt[contentType] || '';
    }

    const safeFileName = `${Date.now()}-${fileName}`;
    const filePath = join(UPLOAD_DIR, safeFileName);
    
    const reader = request.body.getReader();
    const fileHandle = Bun.file(filePath);
    const writer = fileHandle.writer();
    
    let totalBytes = 0;
    
    try {
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;
        
        writer.write(value);
        totalBytes += value.length;
      }
      
      await writer.end();
      
      return {
        success: true,
        fileName: safeFileName,
        size: totalBytes,
        uploadedAt: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  })
  .listen(3000);

export type App = typeof app;

console.log(`API running at http://localhost:${app.server?.port ?? 3000}`);
