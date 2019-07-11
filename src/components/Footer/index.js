import React from 'react';
import { debounce } from 'throttle-debounce';
import './footer.scss';


class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      lastScroll: 0,
      scrollUpAndShowFooter: true,
    };
  }
  componentWillMount() {
    this.tempDebounceFuncVariable = debounce(300, this.detectDirectionOfScroll);
    window.addEventListener('scroll', this.tempDebounceFuncVariable);
  }
  componentWillUnmount() {
    window.removeEventListener(
      'scroll',
      this.tempDebounceFuncVariable.cancel(),
    );
  }
  detectDirectionOfScroll = () => {
    const { lastScroll } = this.state;
    const currentScrollTopVal = document.body.scrollTop || document.documentElement.scrollTop;
    this.setState({
      lastScroll: currentScrollTopVal,
      scrollUpAndShowFooter: lastScroll > currentScrollTopVal,
    });
  }
  render() {
    const { scrollUpAndShowFooter } = this.state;
    return (
      <footer className={`footer ${scrollUpAndShowFooter ? 'footer__show' : 'footer__hide'}`}>
        <div className="footer__text">Imgur Client</div>
      </footer>
    );
  }
}

export default Footer;
