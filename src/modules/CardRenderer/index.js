/* eslint-disable camelcase */
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
      data: [],
      currentPage: 0,
      loading: true,
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
  loadData = (currentPage) => {
    const { data } = this.state;
    const { type, userName } = this.props;
    const tempCurrentPage = currentPage + 1;
    this.setState({ loading: true });
    // type === 'Home' ----> Home Component.
    // type === 'favorites ----> Favorites Component.
    const url =
      type === 'Home'
        ? `https://api.imgur.com/3/gallery/hot/viral/all/${currentPage}`
        : `https://api.imgur.com/3/account/${userName}/gallery_favorites/${currentPage}/new`;

    axios({
      method: 'get',
      url,
      params: {
        showViral: true,
        mature: true,
        album_previews: true,
      },
      headers: {
        Authorization: `Client-ID ${process.env.CLIENT_ID}`,
      },
    })
      .then((res) => {
        const { data: resData } = res.data;
        const dataObject = [...data];
        resData.forEach((dataItem) => {
          const {
            id,
            images,
            title,
            ups,
            downs,
            views,
            comment_count,
            link,
          } = dataItem;
          const tempObject = {
            id,
            images,
            title,
            ups,
            downs,
            views,
            commentCount: comment_count,
            link,
          };
          dataObject.push(tempObject);
        });
        this.setState({
          data: dataObject,
          currentPage: tempCurrentPage,
          loading: false,
        });
      })
      .catch(err => console.log(err));
  };
  handleOnScroll = () => {
    const { currentPage, loading } = this.state;
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
    if (scrolledToBottom && !loading) {
      this.loadData(currentPage);
    }
  };
  render() {
    const { data, loading } = this.state;
    return (
      <Grid>
        <div className="cardListWrapper">
          {data.map(dataItem => (
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
  type: PropTypes.string.isRequired,
  userName: PropTypes.string,
};
CardRenderer.defaultProps = {
  userName: null,
};
export default CardRenderer;
