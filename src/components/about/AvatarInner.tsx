import Image from "next/image";

type Props = {
  initials: string;
  /** Drop a photo in /public and pass e.g. src="/me.jpg" to use it. */
  src?: string;
};

export default function AvatarInner({ initials, src }: Props) {
  return (
    <div className="surface relative flex h-full w-full items-center justify-center overflow-hidden rounded-[inherit]">
      {src ? (
        <Image
          src={src}
          alt="Profile photo"
          fill
          sizes="256px"
          className="object-cover"
          priority
        />
      ) : (
        <span className="text-gradient font-mono text-6xl font-bold">
          {initials}
        </span>
      )}
    </div>
  );
}
