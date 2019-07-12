import React from 'react';
import { debounce } from 'throttle-debounce';
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
    this.tempDebounceFuncVariable = debounce(
      1000,
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
        <div className="footer__text">Imgur Client</div>
      </footer>
    );
  }
}

export default Footer;
