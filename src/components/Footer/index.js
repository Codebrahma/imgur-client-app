import React from 'react';
import { throttle } from 'throttle-debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './footer.scss';

let lastScroll = 0;

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      scrollUpAndShowFooter: true,
    };
  }
  componentWillMount() {
    this.tempDebounceFuncVariable = throttle(
      300,
      this.detectDirectionOfScroll,
    );
    window.addEventListener('scroll', this.tempDebounceFuncVariable);
  }
  componentWillUnmount() {
    window.removeEventListener(
      'scroll',
      this.tempDebounceFuncVariable.cancel(),
    );
  }
  detectDirectionOfScroll = () => {
    const { scrollUpAndShowFooter } = this.state;
    const currentScrollTopVal =
      document.body.scrollTop || document.documentElement.scrollTop;
    if (!scrollUpAndShowFooter && lastScroll > currentScrollTopVal) {
      this.setState({
        scrollUpAndShowFooter: true,
      });
    } else if (scrollUpAndShowFooter && lastScroll < currentScrollTopVal) {
      this.setState({
        scrollUpAndShowFooter: false,
      });
    }
    lastScroll = currentScrollTopVal;
  };
  render() {
    const { scrollUpAndShowFooter } = this.state;
    return (
      <footer
        className={`footer ${
          scrollUpAndShowFooter ? 'footer__show' : 'footer__hide'
        }`}
      >
        <div className="footer__text">
          <span className="footer__text">Imgur Client</span>
          <a href="https://github.com/Codebrahma/imgur-client-app" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={['fab', 'github']} />
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
