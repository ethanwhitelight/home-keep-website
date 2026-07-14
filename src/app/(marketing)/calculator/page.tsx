import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import Calculator from "@/components/calculator/Calculator";

export const metadata: Metadata = {
  title: "Home Savings Calculator",
  description:
    "Answer a few quick questions and see how much you could save on home services with a Homekeep membership — plus the plan that fits you best.",
};

export default function CalculatorPage() {
  return (
    <>
      <PageHeader
        eyebrow="Free · 60 seconds"
        title="How much could you save?"
        description="Answer 4 quick questions and we'll estimate your yearly savings and recommend the right plan."
      />
      <Calculator />
    </>
  );
}
