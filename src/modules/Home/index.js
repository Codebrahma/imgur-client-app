/* eslint-disable camelcase */
import React from 'react';
import axios from 'axios';
import { Grid } from 'react-flexbox-grid';
import Card from '../../components/Card';
import './Home.scss';

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
      url: 'https://api.imgur.com/3/gallery/hot/viral/all/0',
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
        const { data } = res.data;
        console.log(data);
        const dataObject = [];
        data.forEach((dataItem) => {
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
          // tempObject = tempObject.images ? tempObject : { ...tempObject, link };
          dataObject.push(tempObject);
        });
        this.setState({ data: dataObject });
      })
      .catch(err => console.log(err));
  }
  render() {
    const { data } = this.state;
    return (
        <Grid>
          <div className="cardListWrapper">
            {data.map(dataItem => (
              <Card className="cardItem" data={dataItem} />
            ))}
          </div>
          {/* <Card data={data[0]} /> */}
        </Grid>
    );
  }
}
export default Home;
