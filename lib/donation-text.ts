const money = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  maximumFractionDigits: 0,
});

export type DonationThankYouInput = {
  donorName: string;
  donorSurname: string;
  amount: number;
  isAnonymous: boolean;
};

export function donationThankYouLine(d: DonationThankYouInput): string {
  if (d.isAnonymous) {
    return `Bir hayırsever derneğimize ${money.format(d.amount)} bağış yapmıştır. Teşekkür ederiz.`;
  }
  const full = `${d.donorName} ${d.donorSurname}`.trim();
  return `${full} derneğimize ${money.format(d.amount)} bağış yapmıştır. Kendisine teşekkür ederiz.`;
}
