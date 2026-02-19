export default function StarRating({ rating }) {
  return (
    <span style={{ color: "#fbbf24", letterSpacing: "-2px", fontSize: "12px" }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: "#94a3b8", marginLeft: 4, fontSize: 11 }}>{rating}</span>
    </span>
  );
}
