export default function Badge({ children, color }) {
  return (
    <span style={{
      background: color + "20",
      color: color,
      border: `1px solid ${color}40`,
      padding: "2px 8px",
      borderRadius: 20,
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: 0.5,
      textTransform: "uppercase"
    }}>{children}</span>
  );
}
