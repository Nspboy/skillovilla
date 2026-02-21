export default function Badge({ text, children, color, style = {} }) {
  return (
    <span style={{
      background: color + "15",
      color: color,
      border: `1px solid ${color}30`,
      padding: "6px 14px",
      borderRadius: 100,
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: "0.5px",
      textTransform: "uppercase",
      display: "inline-block",
      marginBottom: "20px",
      ...style
    }}>{text || children}</span>
  );
}
