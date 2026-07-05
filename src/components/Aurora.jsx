/**
 * Fixed, behind-everything aurora background:
 * three drifting blurred blobs + a masked grid + film grain.
 * Pure CSS animation (see index.css), respects reduced-motion.
 */
export default function Aurora() {
  return (
    <>
      <div className="aurora" aria-hidden="true">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
      </div>
      <div className="grid-overlay" aria-hidden="true" />
      <div className="noise" aria-hidden="true" />
    </>
  )
}
