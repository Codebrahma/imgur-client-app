import React from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Grid } from 'react-flexbox-grid';
import { debounce } from 'throttle-debounce';
import Card from '../../components/Card';
import './cardRenderer.scss';

class CardRenderer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardData: [],
      currentPage: 0,
      loading: false,
      loadMoreData: true,
    };
  }
  componentWillMount() {
    this.tempDebounceFuncVariable = debounce(300, this.handleOnScroll);
    window.addEventListener('scroll', this.tempDebounceFuncVariable);
  }

  componentDidMount() {
    const { currentPage } = this.state;
    this.loadData(currentPage);
  }

  componentWillUnmount() {
    window.removeEventListener(
      'scroll',
      this.tempDebounceFuncVariable.cancel(),
    );
  }

  handleOnScroll = () => {
    const { currentPage, loading, loadMoreData } = this.state;

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
      this.loadData(currentPage);
    }
  };

  loadData = (currentPage) => {
    this.setState({ loading: true }, () => {
      const url = this.props.generateUrl(currentPage);

      axios({
        method: 'get',
        url,
        params: this.props.params,
        headers: {
          Authorization: `Client-ID ${process.env.CLIENT_ID}`,
        },
      })
        .then((res) => {
          this.setState(prevState => ({
            cardData: [...prevState.cardData, ...res.data.data.map(dataItem => ({
              id: dataItem.id,
              images: dataItem.images,
              title: dataItem.title,
              ups: dataItem.ups,
              downs: dataItem.downs,
              views: dataItem.views,
              commentCount: dataItem.comment_count,
              link: dataItem.link,

            }))],
            currentPage: prevState.currentPage + 1,
            loading: false,
            loadMoreData: (res.data.data.length > 0), // data was fetched try again to fetch more data.
          }));
        })
        .catch(err => console.log(err));
    });
  };

  render() {
    const { cardData, loading } = this.state;
    return (
      <Grid>
        <div className="cardListWrapper">
          {cardData.map(dataItem => (
            <Card key={dataItem.id} className="cardItem" data={dataItem} />
          ))}
        </div>
        <div className="loader">
          {loading ? (
            <Loader type="Oval" color="#6BD700" height="80" width="80" />
          ) : (
            undefined
          )}
        </div>
      </Grid>
    );
  }
}
CardRenderer.propTypes = {
  generateUrl: PropTypes.func.isRequired,
  params: PropTypes.shape({
    showViral: PropTypes.bool,
    mature: PropTypes.bool,
    album_previews: PropTypes.bool,
  }),
};

CardRenderer.defaultProps = {
  params: {},
};

export default CardRenderer;
