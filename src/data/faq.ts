export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What if I don't use it enough?",
    answer:
      "You're covered by our guarantee: if you don't save more than your membership fee in your first 12 months, we credit you the difference. Most members clear their fee with just two or three booked services a year, and your dashboard tracks your running savings so you always know where you stand.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Yes. You can cancel anytime before renewal from your dashboard, and we'll remind you before your year is up. No cancellation fees and no phone calls to sit through.",
  },
  {
    question: "How do you pick pros?",
    answer:
      "We only partner with companies that clear a hard bar: a 4.7★+ rating, at least 3 years in business, 50+ Google reviews, and current licensing and insurance. We keep watching their reviews after they join, so the bar stays high.",
  },
  {
    question: "Do I pay you or the contractor?",
    answer:
      "You pay the contractor directly at your member rate. Homekeep makes money only from membership fees — we never mark up your jobs or take a cut of the work.",
  },
  {
    question: "Are there hidden fees, or could I get stuck with a bad pro?",
    answer:
      "No hidden fees — you pay the annual membership and your member rate on any job, and that's it. And you're never stuck: if a partner slips below our bar, they're out of the network. We keep watching ratings and reviews so the pros you get stay good.",
  },
];
