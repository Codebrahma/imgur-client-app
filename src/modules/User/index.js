import React, { Component, lazy, Suspense } from 'react';
import { Route, NavLink } from 'react-router-dom';
import { Grid } from 'react-flexbox-grid';
import { match } from '../../routerPropTypes';
import { AuthContext } from '../../context/AuthContext';
import { fetchUserDetails } from '../../api';
import './User.scss';


const Posts = lazy(() => import('./Posts'));
const Favorites = lazy(() => import('./Favorites'));
const UserComments = lazy(() => import('./UserComments'));
const About = lazy(() => import('./About'));

class User extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isFetching: true,
    };
  }

  componentDidMount() {
    const { username } = this.props.match.params;
    document.title = `${username} : Imgur Client`;
    this.fetchUserData();
  }

  componentDidUpdate(prevProps) {
    const { username: currentUserName } = this.props.match.params;
    const { username: previousUserName } = prevProps.match.params;

    if (currentUserName !== previousUserName) { this.fetchUserData(); }
  }

  fetchUserData = () => {
    this.setState({ isFetching: true });
    const { username } = this.props.match.params;
    fetchUserDetails(username).then((res) => {
      this.setState({
        data: res.data.data,
        isFetching: false,
        ownProfile: this.context.account_username === username,
      });
    });
  }

  render() {
    const { data, isFetching } = this.state;
    const { access_token: accessToken } = this.context;
    return (
      <div className="userpage">

        <header className="userpage__header">
          <Grid>
            <div className="userpage__info">
              <div className="userpage__info__image">
                { !isFetching && <img src={data.avatar} alt={`${data.url}'s Avatar`} /> }
              </div>
              <div>
                <h1>{this.props.match.params.username}</h1>
                { !isFetching &&
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
                {
                  accessToken &&
                  <li>
                    <NavLink to={`${this.props.match.url}/comments`}>Comments</NavLink>
                  </li>
                }
                <li>
                  <NavLink to={`${this.props.match.url}/about`}>About</NavLink>
                </li>
              </ul>
            </nav>
          </Grid>
        </header>

        <section className="userpage__section">
          <Suspense fallback={<div />}>
            <Route path={`${this.props.match.path}/posts`} component={Posts} />
            <Route path={`${this.props.match.path}/favorites`} component={Favorites} />
            <Route path={`${this.props.match.path}/comments`} component={UserComments} />
            <Route path={`${this.props.match.path}/about`} render={props => <About {...props} data={data} ownProfile={this.state.ownProfile} isFetching={this.state.isFetching} />} />
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
