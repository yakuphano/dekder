import { donationThankYouLine } from "@/lib/donation-text";
import type { DonationThankYouInput } from "@/lib/donation-text";

type Props = {
  donations: DonationThankYouInput[];
};

export function DonationMarquee({ donations }: Props) {
  if (!donations.length) {
    return (
      <p className="text-sm text-slate-600">
        Henüz kayıtlı bağış bulunmuyor. İlk destekçi siz olun.
      </p>
    );
  }

  const lines = donations.map((d) => donationThankYouLine(d));
  const loop = [...lines, ...lines];

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-r from-slate-50 to-white py-4 shadow-inner">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent" />
      <div className="dekder-marquee-track">
        {loop.map((text, i) => (
          <span
            key={`${text}-${i}`}
            className="shrink-0 text-sm font-medium text-slate-800 md:text-base"
          >
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-red-600" aria-hidden />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
