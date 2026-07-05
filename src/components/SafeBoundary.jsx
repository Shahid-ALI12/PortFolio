import { Component } from 'react'

/**
 * Swallows errors from optional/decorative subtrees (WebGL 3D + shader bg).
 * If a lazy chunk fails to load or a GPU/WebGL error occurs, we render the
 * fallback (or nothing) instead of crashing the whole page.
 */
export default class SafeBoundary extends Component {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch() {
    // Intentionally silent — this layer is purely cosmetic.
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null
    return this.props.children
  }
}
