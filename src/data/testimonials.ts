// TODO(confirm): illustrative member quotes pending real testimonials with
// signed permission. Do not present as real until collected.
export interface Testimonial {
  quote: string;
  name: string;
  location: string;
  tier: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I used to dread calling around for a plumber. Now I message Home Keep and someone vetted shows up at member pricing. Easily paid for itself the first month.",
    name: "Sarah M.",
    location: "Provo, UT",
    tier: "Gold member",
    rating: 5,
  },
  {
    quote:
      "The seasonal reminders alone are worth it. My sprinklers got winterized before the first freeze instead of after — no more surprise repair bills.",
    name: "David T.",
    location: "Orem, UT",
    tier: "Platinum member",
    rating: 5,
  },
  {
    quote:
      "Every pro they've sent has been on time and fair. It feels like having a general contractor friend on call for the whole house.",
    name: "Emily R.",
    location: "Lehi, UT",
    tier: "Silver member",
    rating: 5,
  },
];
