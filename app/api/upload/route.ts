import { auth } from "@/lib/auth";
import { getUploadUrl } from "@/lib/r2";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user.role !== "OWNER") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { filename, contentType } = await req.json();
  const { uploadUrl, publicUrl } = await getUploadUrl(filename, contentType);
  return NextResponse.json({ uploadUrl, publicUrl });
}
