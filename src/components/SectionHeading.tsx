import Reveal from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
};

export default function SectionHeading({ eyebrow, title }: Props) {
  return (
    <Reveal className="mb-12 text-center">
      <p className="mb-2 font-mono text-sm uppercase tracking-widest text-cyan-400">
        {eyebrow}
      </p>
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500" />
    </Reveal>
  );
}
