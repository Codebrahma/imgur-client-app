import React, { Component } from 'react';
import { Grid } from 'react-flexbox-grid';
import axios from 'axios';
import CardRenderer from '../CardRenderer';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        viral: [],
        top: [],
        time: [],
        rising: [],
      },
      currentPage: {
        viral: 0,
        top: 0,
        time: 0,
        rising: 0,
      },
      loadMoreData: {
        viral: true,
        top: true,
        time: true,
        rising: true,
      },
      section: 'hot',
      sort: 'viral', // Default
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
    const { currentPage, sort, section } = this.state;
    this.setState({ loading: true }, () => {
      axios({
        method: 'get',
        url: `https://api.imgur.com/3/gallery/${section}/${sort}/all/${currentPage[sort]}`,
        // params: this.props.params,
        // TODO: Add some kind of controller.
        // params={{
        //   showViral: true,
        //   mature: true,
        //   album_previews: true,
        // }}
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

  controls = () => (
    <div className="cardRenderer__controls--favorites">
      <h1>Home</h1>

      <div>
        <button onClick={() => this.changeSort('viral')}>Popular</button>
        <button onClick={() => this.changeSort('top')}>Top</button>
        <button onClick={() => this.changeSort('time')}>Newest</button>
      </div>
    </div>
  )


  render() {
    const {
      data, loading, sort, loadMoreData,
    } = this.state;

    return (
      <Grid>
        <h1>Home</h1>
        <CardRenderer
          controls={this.controls}
          loading={loading}
          data={data[sort]}
          fetchData={this.fetchData}
          loadMoreData={loadMoreData}
        />
      </Grid>
    );
  }
}

export default Home;
