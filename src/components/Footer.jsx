import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer container">
      <div className="footer__socials">
        <a
          href="https://github.com/oyekanm"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          github
        </a>
        <a
          href="mailto:enitanboluwatife5@gmail.com"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          gmail
        </a>
        <a
          href="https://twitter.com/Zayb_"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          twitter
        </a>
        <a
          href="https://www.linkedin.com/in/oyekanmi-zayb-1b3329226/"
          className="footer__link"
          target="_blank"
          rel="noreferrer"
        >
          linkedin
        </a>
      </div>
      <div className="footer__flex">
        <p className="footer__name">oyekanmi boluwatife</p>
      </div>
    </footer>
  );
}

export default Footer;
