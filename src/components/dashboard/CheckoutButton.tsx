import Button from "@/components/ui/Button";
import { getPaymentLinkUrl } from "@/lib/stripe/paymentLinks";
import type { Tier } from "@/types/tiers";

export default function CheckoutButton({
  tier,
  memberId,
  email,
}: {
  tier: Tier;
  memberId: string;
  email?: string | null;
}) {
  return (
    <Button href={getPaymentLinkUrl(tier, { id: memberId, email })}>
      Complete {tier} membership checkout
    </Button>
  );
}
