// Stubbed email/retention hooks — not wired to a real provider yet.
// TODO(confirm): replace the console.log bodies with Resend (or similar)
// calls once copy and sequences are approved. Call sites are already wired
// at the right events (see /api/leads, /api/service-requests, and the
// Stripe webhook).

interface NewLeadPayload {
  email: string;
  source: "cheat-sheet" | "service-request" | "signup-abandoned" | "calculator";
}

interface NewMemberPayload {
  email: string;
  tier: string;
}

interface PaymentFailedPayload {
  email: string;
}

export const emailHooks = {
  // TODO(confirm): wire to a 5-7 day nurture sequence once copy is approved.
  async notifyNewLead(payload: NewLeadPayload) {
    console.log("[email stub] new-lead nurture", payload);
  },

  // TODO(confirm): wire to a first-30-days onboarding sequence (welcome,
  // push to book first job, quick-win reminders) once copy is approved.
  async notifyNewMember(payload: NewMemberPayload) {
    console.log("[email stub] new-member onboarding", payload);
  },

  // TODO(confirm): wire to a payment-failure nurture sequence once copy is
  // approved.
  async notifyPaymentFailed(payload: PaymentFailedPayload) {
    console.log("[email stub] payment failed", payload);
  },

  // TODO: quarterly engagement + annual "Year in Review" emails need an
  // external scheduler (e.g. a scheduled Supabase Edge Function or cron
  // job) to call this on a timer — out of scope for this build, not wired
  // to any call site yet.
  async sendQuarterlyEngagement(payload: NewMemberPayload) {
    console.log("[email stub] quarterly engagement", payload);
  },
};
