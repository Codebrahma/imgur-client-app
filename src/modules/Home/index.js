/* eslint-disable camelcase */
import React from 'react';
import Loader from 'react-loader-spinner';
import axios from 'axios';
import { Grid } from 'react-flexbox-grid';
// import { FixedSizeList as List } from 'react-window';
import Card from '../../components/Card';
import './Home.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      currentPage: 0,
      loading: true,
    };
  }
  componentWillMount() {
    window.addEventListener('scroll', this.handleOnScroll);
  }
  componentDidMount() {
    const { currentPage } = this.state;
    this.loadData(currentPage);
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleOnScroll);
  }
  loadData = (currentPage) => {
    const { data } = this.state;
    const tempCurrentPage = currentPage + 1;
    this.setState({ loading: true });
    axios({
      method: 'get',
      url: `https://api.imgur.com/3/gallery/hot/viral/all/${currentPage}`,
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
    // console.log(scrollTop,scrollHeight,clientHeight,scrolledToBottom);
    if (scrolledToBottom && !loading) {
      this.loadData(currentPage);
    }
  };
  // Row = ({index}) => {
  //   const {data} = this.state;
  //   // console.log( this.state);
  //   // console.log(this.state.data[index] || "X" );

  //   return(
  //      <div className="cardListWrapper">
  //         {/* {data && data.map(dataItem => ( */}
  //           {/* <Card key={`${dataItem.id}+${dataItem.views}`} className="cardItem" data={dataItem} /> */}
  //           <Card  className="cardItem" data={data[index]} />

  //         {/* ))} */}
  //       </div>
  //     // <div>hello {index}</div>
  //   )
  // }
  render() {
    const { data, loading } = this.state;
    return (
      <Grid>
        {/* { !loading &&
        <List
        height={700}
        itemCount={1000}
        itemSize={35}
        width={1000}
        >
          {this.Row}
       </List>
      } */}
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
export default Home;
