import Content from "@/app/components/content";
import AddingVerses from "@/app/components/lyrics/adding-verses";
import prisma from "@/app/utils/prisma";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  let song: any = null;
  if (id) {
    song = await prisma.lyric.findFirst({
      where: { id: parseInt(id) },
      include: { artist: true, posted_by: true },
    });
  }

  if (!song) {
    return;
  }

  const verses = await prisma.timedVerse.findMany({
    where: { lyric_id: parseInt(id) },
  });

  return (
    <Content classes="p-10 w-full max-w-[1700px]">
      <div className="flex items-center gap-20">
        <div
          style={{
            backgroundImage: `url('${process.env.NEXT_PUBLIC_BUCKET_URL}/${song?.artist?.profile_picture}')`,
          }}
          className="w-64 h-64 bg-cover bg-center rounded-full"
        ></div>
        <h1 className="font-bold text-3xl">{`${song?.artist?.name} - ${song.song_name}`}</h1>
      </div>

      <AddingVerses song={song} verses={verses} />
    </Content>
  );
}
