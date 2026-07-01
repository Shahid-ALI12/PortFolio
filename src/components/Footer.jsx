import { ArrowUp } from 'lucide-react'
import { profile } from '../data'
import { scrollToId } from '../hooks/useLenis'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>
          © {new Date().getFullYear()} {profile.name}. Crafted with care &amp; caffeine.
        </span>
        <button
          onClick={() => scrollToId('body')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
        >
          Back to top <ArrowUp size={15} />
        </button>
      </div>
    </footer>
  )
}
