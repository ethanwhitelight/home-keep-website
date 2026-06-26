"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import CheatSheetOptInForm from "@/components/leads/CheatSheetOptInForm";

export default function CheatSheetHero() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" onClick={() => setOpen(true)} size="lg">
        Get my free checklist
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2 className="text-xl font-bold text-primary-950">
          Get your free checklist
        </h2>
        <div className="mt-4">
          <CheatSheetOptInForm />
        </div>
      </Modal>
    </>
  );
}
