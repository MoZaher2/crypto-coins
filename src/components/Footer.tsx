import { FaWhatsapp, FaFacebookF, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className='logo-footer'>
              <img src="/favicon.png" alt="Logo" width={70} height={70} />
              <h3 className="footer-title">Crypto Radar</h3>
            </div>
            <p className="footer-description">
              Track and analyze cryptocurrency prices with real-time updates and comprehensive charts.
            </p>
            <div className="footer-social">
              <a href="https://wa.me/201005138370/" className="social-icon" aria-label="Whatsapp" target="_blank">
                <FaWhatsapp />
              </a>
              <a href="https://github.com/MoZaher2" className="social-icon" aria-label="Github" target="_blank">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/mohamed-zaher-83678a316/" className="social-icon" aria-label="LinkedIn" target="_blank">
                <FaLinkedinIn />
              </a>
              <a href="https://www.facebook.com/profile.php?id=100001204429456" className="social-icon" aria-label="Facebook" target="_blank">
                <FaFacebookF />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Mohamed Zaher. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
