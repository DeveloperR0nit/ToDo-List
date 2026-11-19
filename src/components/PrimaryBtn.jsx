export default function PrimaryBtn({children, openModal}) {
  return (
    <button className="btn-primary" onClick={openModal}>{children}</button>
  )
}