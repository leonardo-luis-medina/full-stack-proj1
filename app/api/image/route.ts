import { r2 } from "@/lib/r2";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get("key");
  if (!key) return NextResponse.json({ error: "No key" }, { status: 400 });
  const command = new GetObjectCommand({
    Bucket: process.env.CLOUDFLARE_R2_BUCKET_NAME!,
    Key: key,
  });
  const { Body, ContentType } = await r2.send(command);
  const bytes = await Body?.transformToByteArray();
  return new NextResponse(bytes, {
    headers: { "Content-Type": ContentType ?? "image/png" },
  });
}
