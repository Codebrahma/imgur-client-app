/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    axios({
      method: 'get',
      url: 'https://api.imgur.com/3/gallery/hot/viral/all/2',
      params: {
        showViral: true,
        mature: true,
        album_previews: true,
      },
      headers: {
        Authorization: `Client-ID ${process.env.CLIENT_ID}`,
      },
    }).then((res) => {
      const { data } = res.data;
      const dataObject = [];
      data.forEach((dataItem) => {
        const {
          id, images, title, ups, downs, views, comment_count,
        } = dataItem;
        const tempObject = {
          id,
          images,
          title,
          ups,
          downs,
          views,
          commentCount: comment_count,
        };
        dataObject.push(tempObject);
      });
      this.setState({ data: dataObject });
    })
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.state.data);
    return (
      <div className="home">Home (To show random public images)</div>
    );
  }
}
export default Home;
