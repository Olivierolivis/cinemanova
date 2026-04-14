function LoadingSkeleton({ variant = "row" }) {
  if (variant === "hero") {
    return (
      <div className="relative h-[72vh] animate-pulse overflow-hidden rounded-b-3xl bg-hero-grid">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="relative z-10 flex h-full max-w-3xl flex-col justify-end gap-5 px-6 pb-16 pt-28 md:px-12">
          <div className="h-6 w-28 rounded-full bg-emerald-400/30" />
          <div className="h-14 w-2/3 rounded-2xl bg-black/10 dark:bg-white/10" />
          <div className="h-24 w-full max-w-2xl rounded-3xl bg-black/10 dark:bg-white/10" />
          <div className="h-12 w-40 rounded-full bg-emerald-400/30" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-flow-col auto-cols-[42%] gap-4 overflow-hidden px-6 pb-2 md:auto-cols-[24%] md:px-12 lg:auto-cols-[18%]">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="aspect-[2/3] animate-pulse rounded-2xl bg-emerald-100 dark:bg-white/10"
        />
      ))}
    </div>
  );
}

export default LoadingSkeleton;
