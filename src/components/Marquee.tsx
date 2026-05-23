export default function Marquee({
  items,
  slow = false,
  className = "",
}: {
  items: string[];
  slow?: boolean;
  className?: string;
}) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className={slow ? "marquee-track-slow" : "marquee-track"} style={{ display: "inline-flex" }}>
        {repeated.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-6 mr-6">
            <span>{item}</span>
            <span className="text-[#caff00] text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
