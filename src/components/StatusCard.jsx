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
}) {
  const overdueText = overdueCount ? (
    <>
      {" "}
      (<p className="golden">{overdueCount} overdue</p>)
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
              color: `rgb(${color})`,
            }}
          >
            {window.innerWidth >= 700 ? heading : headingSm}
          </h3>
          <div
            className="svg-wrapper"
            style={{
              backgroundColor: `rgba(${color},0.15)`,
              border: `2px solid rgba(${color},0.25)`,
              color: `rgb(${color})`,
            }}
          >
            {svg}
          </div>
        </div>
        <h2 className="stats">
          <span
            style={{
              color: `rgb(${color})`,
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
            color: `rgb(${color})`,
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
            backgroundColor: `rgba(${color},0.1)`,
          }}
        ></div>
      </div>
    </div>
  );
}
