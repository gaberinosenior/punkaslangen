type Props = {
  videoId?: string;
};

export function VimeoEmbed({ videoId }: Props) {
  if (!videoId) {
    return (
      <div className="mx-auto flex aspect-video w-full max-w-[900px] items-center justify-center border border-ash bg-cream px-30 text-center">
        <p className="max-w-[28rem] font-sans text-body font-light text-voltage-blue">
          Filmen bäddas in här så snart Vimeo-id finns i{" "}
          <span className="uppercase">NEXT_PUBLIC_VIMEO_ID</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto aspect-video w-full max-w-[900px] overflow-hidden border border-ash">
      <iframe
        title="Så här fungerar Punkaslangen"
        src={`https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`}
        className="h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
