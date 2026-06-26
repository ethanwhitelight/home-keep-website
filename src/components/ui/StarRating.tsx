export default function StarRating({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="text-accent-500"
        aria-hidden="true"
      >
        <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z" />
      </svg>
      <span className="text-sm font-semibold text-primary-900">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}
