import Logo from "@/components/ui/Logo";

// TODO(M5): gate this layout behind Supabase auth (middleware + server check)
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="border-b border-primary-100 bg-white px-4 py-4 sm:px-6 lg:px-8">
        <Logo />
      </header>
      <main className="flex-1 bg-primary-50">{children}</main>
    </>
  );
}
