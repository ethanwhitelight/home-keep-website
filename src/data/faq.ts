export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: "What if I don't use it enough?",
    answer:
      "Most members save more than their membership fee with just two or three booked services a year — and your dashboard shows your savings running total so you always know where you stand. TODO(confirm): finalize once we have real usage data from the pilot.",
  },
  {
    question: "Can I cancel?",
    answer:
      "Yes. Memberships are annual, and you can choose not to renew at any time from your dashboard. TODO(confirm): confirm refund/early-cancellation policy before launch.",
  },
  {
    question: "How do you pick pros?",
    answer:
      "Every contractor in our network is vetted for licensing, insurance, and a track record of quality work before they're allowed to serve Home Keep members. We monitor reviews and ratings on an ongoing basis.",
  },
  {
    question: "Do I pay you or the contractor?",
    answer:
      "You pay the contractor directly at your member rate. Home Keep makes money only from membership fees — we never mark up or take a cut of your service jobs.",
  },
];
