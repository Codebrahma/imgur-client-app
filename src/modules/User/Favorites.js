import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import axios from 'axios';
import CardRenderer from '../CardRenderer';
import Selector from '../CardRenderer/Selector';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        newest: [],
        oldest: [],
      },
      currentPage: {
        newest: 0,
        oldest: 0,
      },
      loadMoreData: {
        newest: true,
        oldest: true,
      },
      sort: 'newest', // Default
      loading: false,
    };
  }

  changeSort = (sort) => {
    this.setState(
      {
        sort,
        loading: false, // HELP: How to cancel current request?
      },
      () => {
        // If this is the first time the user has choosen this sort, then fetch data:
        if (this.state.data[sort].length === 0) this.fetchData();
      },
    );
  }

  fetchData = () => {
    const { username } = this.props.match.params;
    const { currentPage, sort } = this.state;

    this.setState({ loading: true }, () => {
      axios({
        method: 'get',
        url: `https://api.imgur.com/3/account/${username}/gallery_favorites/${currentPage[sort]}/${sort}`,
        headers: {
          Authorization: `Client-ID ${process.env.CLIENT_ID}`,
        },
      })
        .then((res) => {
          this.setState(prevState => ({
            data: {
              ...prevState.data,
              [sort]: [...prevState.data[sort], ...res.data.data.map(dataItem => ({
                id: dataItem.id,
                images: dataItem.images,
                title: dataItem.title,
                ups: dataItem.ups,
                downs: dataItem.downs,
                views: dataItem.views,
                commentCount: dataItem.comment_count,
                link: dataItem.link,
              }))],
            },
            currentPage: {
              ...prevState.currentPage,
              [sort]: prevState.currentPage[sort] + 1,
            },
            loading: false,
            loadMoreData: {
              ...prevState.loadMoreData,
              [sort]: (res.data.data.length > 0), // data was fetched try again to fetch more data.
            },
          }));
        })
        .catch(err => console.log(err));
    });
  };

  controls = () => {
    const { sort } = this.state;

    return (
      <div className="cardRenderer__controls--favorites">
        <h1>All Favorites</h1>

        <Selector
          options={['newest', 'oldest']}
          currentOption={sort}
          handleClick={option => this.changeSort(option)}
        />

      </div>
    );
  }

  render() {
    const {
      data, loading, sort, loadMoreData,
    } = this.state;


    return (
      <Grid>
        <CardRenderer
          loading={loading}
          fetchData={this.fetchData}
          data={data[sort]}
          loadMoreData={loadMoreData[sort]}
          controls={this.controls}
        />
      </Grid>
    );
  }
}
Favorites.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
};

export default Favorites;
