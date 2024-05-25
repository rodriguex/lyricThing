import prisma from "@/app/utils/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  await prisma.artist.create({
    data: body,
  });

  return new Response("success", { status: 200 });
}
