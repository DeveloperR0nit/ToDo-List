export default function StatusCard({
  heading,
  countDesc,
  svg,
  smallSvg,
  bottomLeftText,
  bottomRightText,
  color,
  value,
  overdueCount,
  headingSm,
  bottomLeftTextSm,
  theme,
  colorLight,
}) {
  const overdueText = overdueCount ? (
    <>
      {" "}
      (
      <p className={theme === "dark" ? "golden" : "red"}>
        {overdueCount} overdue
      </p>
      )
    </>
  ) : (
    ""
  );
  return (
    <div className="col-4">
      <div className={`status-card ${window.innerWidth < 700 ? "small" : ""}`}>
        <div className="card-top">
          <h3
            className="card-title"
            style={{
              color: `rgb(${theme === "dark" ? color : colorLight})`,
            }}
          >
            {window.innerWidth >= 700 ? heading : headingSm}
          </h3>
          <div
            className="svg-wrapper"
            style={{
              backgroundColor: `rgba(${theme === "dark" ? color : colorLight},0.15)`,
              border: `2px solid rgba(${theme === "dark" ? color : colorLight},0.25)`,
              color: `rgb(${theme === "dark" ? color : colorLight})`,
            }}
          >
            {svg}
          </div>
        </div>
        <h2 className="stats">
          <span
            style={{
              color: `rgb(${theme === "dark" ? color : colorLight})`,
            }}
            className="number"
          >
            {value}
          </span>
          {window.innerWidth >= 700 && countDesc}
          {window.innerWidth >= 700 && overdueText}
        </h2>
        <div
          className="card-bottom"
          style={{
            color: `rgb(${theme === "dark" ? color : colorLight})`,
          }}
        >
          <div className="left">
            {window.innerWidth >= 700 && smallSvg}
            {window.innerWidth >= 700 ? bottomLeftText : bottomLeftTextSm}
          </div>
          <div className="right">
            {window.innerWidth >= 700 && bottomRightText}
          </div>
        </div>
        <div
          className="blur"
          style={{
            backgroundColor: `rgba(${theme === "dark" ? color : colorLight},0.1)`,
          }}
        ></div>
      </div>
    </div>
  );
}
