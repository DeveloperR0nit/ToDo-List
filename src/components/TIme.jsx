export default function Time() {
  const date = new Date();
  const day = date.toLocaleDateString("en-IN", {
    weekday: "short",
  });
  const month = date.toLocaleDateString("en-IN", {
    month: "short",
  });
  return (
    <span className="date">{`${day}, ${month} ${date.getDate()}, ${date.getFullYear()}`}</span>
  );
}
