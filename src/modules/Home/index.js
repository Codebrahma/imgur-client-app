import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';
import axios from 'axios';
import CardRenderer from '../CardRenderer';
import Selector from '../CardRenderer/Selector';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        viral: [], // Popular
        top: [],
        rising: [], // Rising (User Section Only)
        time: [], // Newest
      },
      currentPage: {
        viral: 0,
        top: 0,
        time: 0,
      },
      loadMoreData: {
        viral: true,
        top: true,
        time: true,
      },
      section: 'hot', // {' hot':'Most Viral', 'user': 'User Submitted'}
      sort: 'viral', // Default
      loading: false,
      params: { // Optional:
        showViral: true, // Show or hide viral images from the user section
        mature: false,
        album_previews: true, // Include image metadata for gallery posts which are albums
      },
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
    const {
      currentPage, sort, section, params,
    } = this.state;

    this.setState({ loading: true }, () => {
      axios({
        method: 'get',
        url: `https://api.imgur.com/3/gallery/${section}/${sort}/all/${currentPage[sort]}`,
        params,
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
        <h1>Home</h1>

        <Selector
          options={['viral', 'top', 'time']}
          currentOption={sort}
          handleClick={this.changeSort}
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
        <h1>Home</h1>
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

export default Home;
