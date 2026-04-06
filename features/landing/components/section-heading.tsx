type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  tone?: "dark" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "dark",
}: SectionHeadingProps) {
  const titleColor = tone === "light" ? "text-white" : "text-[var(--foreground)]";
  const descriptionColor =
    tone === "light" ? "text-slate-300" : "text-[var(--muted-foreground)]";

  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">
        {eyebrow}
      </p>
      <h2
        className={`mt-3 text-2xl font-bold tracking-tight sm:text-3xl ${titleColor}`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-3 text-sm sm:text-base ${descriptionColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
