type Props = {
  videoId?: string;
};

export function VimeoEmbed({ videoId }: Props) {
  if (!videoId) {
    return (
      <div className="mx-auto flex aspect-video w-full max-w-[900px] items-center justify-center rounded-card bg-fog px-10 text-center">
        <p className="max-w-[28rem] text-body text-carbon">Filmen saknas just nu.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto aspect-video w-full max-w-[900px] overflow-hidden rounded-card">
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
