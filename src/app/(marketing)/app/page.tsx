import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get the App",
  description:
    "The Home Keep app is coming soon — manage your membership, savings, and service requests on the go.",
};

export default function AppPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-primary-950">
        Get the Home Keep app
      </h1>
      <p className="mt-3 text-primary-700">
        The mobile app is on the way — for now, your Member Hub works great
        right here in the browser.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <span
          className="flex h-12 w-40 items-center justify-center rounded-lg bg-primary-100 text-xs font-semibold text-primary-500"
          title="TODO(confirm): real App Store badge + link"
        >
          App Store — soon
        </span>
        <span
          className="flex h-12 w-40 items-center justify-center rounded-lg bg-primary-100 text-xs font-semibold text-primary-500"
          title="TODO(confirm): real Google Play badge + link"
        >
          Google Play — soon
        </span>
      </div>
    </div>
  );
}
