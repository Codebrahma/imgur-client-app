import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import axios from 'axios';
import CardRenderer from '../CardRenderer';

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
      favoritesSort: 'newest',
      loading: false,
      loadMoreData: true,
    };
  }

  changeSort = (sort) => {
    this.setState(
      { favoritesSort: sort },
      () => {
        this.fetchData();
      },
    );
  }

  fetchData = () => {
    const { username } = this.props.match.params;
    const { currentPage, favoritesSort } = this.state;

    this.setState({ loading: true }, () => {
      axios({
        method: 'get',
        url: `https://api.imgur.com/3/account/${username}/gallery_favorites/${currentPage[favoritesSort]}/${favoritesSort}`,
        headers: {
          Authorization: `Client-ID ${process.env.CLIENT_ID}`,
        },
      })
        .then((res) => {
          this.setState(prevState => ({
            data: {
              ...prevState.data,
              [favoritesSort]: [...prevState.data[favoritesSort], ...res.data.data.map(dataItem => ({
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
              [favoritesSort]: prevState.currentPage[favoritesSort] + 1,
            },
            loading: false,
            loadMoreData: (res.data.data.length > 0), // data was fetched try again to fetch more data.
          }));
        })
        .catch(err => console.log(err));
    });
  };

  controls = () => (
    <div className="cardRenderer__controls--favorites">
      <h1>All Favorites</h1>

      <div>
        <button onClick={() => this.changeSort('newest')}>Newest</button>
        <button onClick={() => this.changeSort('oldest')}>Oldest</button>
      </div>
    </div>
  )

  render() {
    const {
      data, loading, favoritesSort, loadMoreData,
    } = this.state;

    return (
      <Grid>
        <h1>Favorites</h1>
        <CardRenderer
          controls={this.controls}
          loading={loading}
          data={data[favoritesSort]}
          fetchData={this.fetchData}
          loadMoreData={loadMoreData}
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
