import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'throttle-debounce';
import Card from '../../components/Card';
import './cardRenderer.scss';
import Loader from '../../components/Loader';

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
    const { data, loadMoreData } = this.props;
    return (
      <div className="cardRenderer">
        <div className="cardRenderer__controls">
          <this.props.controls />
          <div className="cardRenderer__controls--common">
            <button>A</button>
            <button>B</button>
          </div>
        </div>

        { data.length === 0 ?
            (
              <div className="loader">
                <Loader fullScreen />
              </div>
            )
            : (
              <React.Fragment>
                <div className="cardListWrapper">
                  {data.map(card => (
                    <Card key={card.id} className="cardItem" data={card} />
                      ))}
                </div>
                {loadMoreData &&
                  <Loader />}
              </React.Fragment>
              )
      }
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
