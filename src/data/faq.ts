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
      "Yes. Memberships are annual and you can cancel anytime from your dashboard — you simply won't be renewed. No cancellation fees, no phone calls to sit through.",
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
];
