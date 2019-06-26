import React, { Component, lazy, Suspense } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import axios from 'axios';
import { match } from '../../routerPropTypes';
import { AuthContext } from '../../context/AuthContext';
import './User.scss';


const Posts = lazy(() => import('./Posts'));
const Favorites = lazy(() => import('./Favorites'));
const Comments = lazy(() => import('./Comments'));
const About = lazy(() => import('./About'));

class User extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    axios({
      method: 'get',
      url: `https://api.imgur.com/3/account/${username}`,
      headers: { Authorization: `Client-ID ${process.env.CLIENT_ID}` },
    }).then((res) => {
      this.setState({
        data: res.data.data,
      });
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div className="userpage">

        <header className="userpage__header">
          <Grid>
            <div className="userpage__info">
              <div className="userpage__info__image">
                { data && <img src={data.avatar} alt={`${data.url}'s Avatar`} /> }
              </div>
              <div>
                <h1>{this.props.match.params.username}</h1>
                { data &&
                  <div className="userpage__info__stats">
                    <span>{`${data.reputation} pts`}</span>
                    <span>{data.reputation_name}</span>
                  </div>
                }
              </div>
            </div>
            <nav className="userpage__nav">
              <ul>
                <li>
                  <NavLink to={`${this.props.match.url}/posts`}>Posts</NavLink>
                </li>
                <li>
                  <NavLink to={`${this.props.match.url}/favorites`}>Favorites</NavLink>
                </li>
                <li>
                  <NavLink to={`${this.props.match.url}/comments`}>Comments</NavLink>
                </li>
                <li>
                  <NavLink to={`${this.props.match.url}/about`}>About</NavLink>
                </li>
              </ul>
            </nav>
          </Grid>
        </header>

        <section>
          <Suspense fallback={<div>loading...</div>}>
            <Route path={`${this.props.match.url}/about`} component={About} />
            <Route path={`${this.props.match.url}/posts`} component={Posts} />
            <Route path={`${this.props.match.url}/favorites`} component={Favorites} />
            <Route path={`${this.props.match.url}/comments`} component={Comments} />
          </Suspense>
        </section>

      </div>
    );
  }
}

User.propTypes = {
  match: match.isRequired,
};

export default User;
