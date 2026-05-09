type Props = {
  firstName: string;
  lastName: string;
};

export function FounderAvatar({ firstName, lastName }: Props) {
  const initials = `${firstName.at(0) ?? ""}${lastName.at(0) ?? ""}`.toUpperCase();
  return (
    <div
      className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--dekder-mountain)] to-slate-800 text-2xl font-bold text-white shadow-inner ring-2 ring-white/30 md:h-32 md:w-32"
      aria-hidden
    >
      {initials}
    </div>
  );
}
