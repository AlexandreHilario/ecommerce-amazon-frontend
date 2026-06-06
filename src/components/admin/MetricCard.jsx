export function MetricCard({ label, value, sub, trend }) {
  return (
    <div className="metric-card">
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      {sub && <div className={`metric-sub ${trend ?? ""}`}>{sub}</div>}
    </div>
  );
}