import React from 'react';
import Loader from 'react-loader-spinner';
import PropTypes from 'prop-types';
import { debounce } from 'throttle-debounce';
import Card from '../../components/Card';
import './cardRenderer.scss';

class CardRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  componentWillMount() {
    this.tempDebounceFuncVariable = debounce(300, this.handleOnScroll);
    window.addEventListener('scroll', this.tempDebounceFuncVariable);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  componentWillUnmount() {
    window.removeEventListener(
      'scroll',
      this.tempDebounceFuncVariable.cancel(),
    );
  }

  handleOnScroll = () => {
    const { loading, loadMoreData } = this.props;

    // Bail early if:
    // loading: it's already loading
    // !loadMoreData: there's nothing left to load
    if (!loadMoreData || loading) return;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;
    const scrollHeight =
      (document.documentElement && document.documentElement.scrollHeight) ||
      document.body.scrollHeight;
    const clientHeight =
      document.documentElement.clientHeight || window.innerHeight;
    const scrolledToBottom =
      Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    if (scrolledToBottom) {
      this.props.fetchData();
    }
  };

  render() {
    const { data, loading } = this.props;
    return (
      <div className="cardRenderer">
        <div className="cardRenderer__controls">
          <this.props.controls />
          <div className="cardRenderer__controls--common">
            <button>A</button>
            <button>B</button>
          </div>
        </div>

        <div className="cardListWrapper">
          {data.map(card => (
            <Card key={card.id} className="cardItem" data={card} />
          ))}
        </div>
        <div className="loader">
          {loading &&
            <Loader type="Oval" color="#6BD700" height="80" width="80" />
          }
        </div>
      </div>
    );
  }
}
CardRenderer.propTypes = {
  fetchData: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  // TODO: Add detailed propTypes:
  loadMoreData: PropTypes.bool.isRequired,
  data: PropTypes.array.isRequired,
};

export default CardRenderer;
