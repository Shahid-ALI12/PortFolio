import { MeshGradient } from '@paper-design/shaders-react'
import { useReducedMotion } from 'framer-motion'
import { useTheme } from '../theme/ThemeProvider'

/**
 * Framer/Spline-style flowing animated background (WebGL, via Paper Shaders).
 * Colored live from the active theme palette. Falls back to the CSS <Aurora/>
 * layer when 3D/motion is disabled.
 */
export default function ShaderBackground() {
  const { colors, enable3D } = useTheme()
  const reduce = useReducedMotion()

  if (!enable3D || reduce) return null

  const [a, b, c] = colors
  return (
    <div className="shader-bg" aria-hidden="true">
      <MeshGradient
        colors={['#05060c', a, b, c]}
        distortion={1}
        swirl={0.85}
        speed={0.18}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
