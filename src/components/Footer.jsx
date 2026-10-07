import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link to="/" className="footer-logo">
          <img src="/nservelogo.png" alt="nSERVE" />
        </Link>
        <p className="footer-about">
          Telecom value-added services, network capabilities and mobile advertising — built for
          operators and enterprises.
        </p>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} nSERVE. All rights reserved.</span>
        <span>Where Digital Meets Direct</span>
      </div>
    </footer>
  )
}
