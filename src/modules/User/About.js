import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AuthContext } from '../../context/AuthContext';
import { updateAccountSetting } from '../../api';
import Button from '../../components/Button';

class About extends Component {
  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      bio: this.props.data.bio, // Initializes the bio, when user changes tabs. (Data already present in User Component)
    };
  }

  // Initialize the bio (state), when the props.data.bio changes from undefined to 'something': (Data fetched is User Component)
  componentDidUpdate(prevProps) {
    // This, resets the bio(state), when username is changed.
    if (prevProps.data.bio !== this.props.data.bio) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        bio: this.props.data.bio,
      });
    }
  }

  startEditing = () => this.setState({ isEditing: true });

  cancelEditing = () => this.setState({ isEditing: false, bio: this.props.data.bio });

  handleChange = e => this.setState({ bio: e.target.value });

  updateBio = () => {
    if (this.state.bio !== this.props.data.bio) {
      const { account_username: username } = this.context;
      const { bio } = this.state;
      updateAccountSetting(username, { bio })
        .then((res) => {
        // TODO: Show a Success Toast.
          console.log(res);
          this.setState({
            bio: this.state.bio,
          });
        }).catch((err) => {
        // TODO: Show a Error Toast.
          console.log(err);
          this.setState({
            bio: this.props.data.bio,
          });
        });
    }
    this.setState({ isEditing: false });
  }

  render() {
    const { data, isFetching, ownProfile } = this.props;
    return (
      <Grid>
        <div className="userpage__section--about">
          { isFetching ?
            (
              <h1>Loading </h1>
            ) : (
              <Row>
                <Col xs={12} sm={6} md={5} lgOffset={1} lg={4}>
                  { ownProfile ?
                   (
                     <React.Fragment>
                       <div className="userpage__section--about__headingContainer">
                         <div>
                           <h4 className="userpage__section--about__heading">About</h4>
                           <FontAwesomeIcon icon="edit" onClick={this.startEditing} className="ml_05" focusable />
                         </div>
                         { this.state.isEditing &&
                         <div>
                           <Button handleClick={this.cancelEditing}>Cancel</Button>
                           <Button handleClick={this.updateBio}>Save</Button>
                         </div>
                         }
                       </div>
                       { this.state.isEditing ?
                         <div className="userpage__section--about__content">
                           <textarea onChange={this.handleChange} placeholder="Tell Imgur a little about yourself" defaultValue={this.state.bio} />
                         </div>
                         :
                         <div className="userpage__section--about__content">{ this.state.bio || 'Tell Imgur a little about yourself' }</div>
                        }
                     </React.Fragment>
                    ) : (
                      data.bio &&
                      <React.Fragment>
                        <h4 className="userpage__section--about__heading">About</h4>
                        <div className="userpage__section--about__content">{data.bio}</div>
                      </React.Fragment>
                   )
                  }

                  <h4 className="userpage__section--about__heading">Joined</h4>
                  <div className="userpage__section--about__content">{(new Date(data.created * 1000)).toDateString().replace(/^[a-zA-Z]+ ([a-zA-Z]+ \d+) (\d+)$/, '$1, $2')}</div>

                  <h4 className="userpage__section--about__heading">Internet Points</h4>
                  <div className="userpage__section--about__content">{data.reputation}</div>

                  <h4 className="userpage__section--about__heading">Notoriety</h4>
                  <div className="userpage__section--about__content">{data.reputation_name}</div>

                </Col>
                <Col xs={12} sm={6} md={7} lgOffset={1} lg={4}>
                  <h4 className="userpage__section--about__heading">Medallions</h4>
                  <div className="userpage__section--about__content">
                    <div className="userpage__section--about__medallionsContainer">
                      <img className={data.reputation >= 30000 ? '' : 'locked'} src="https://s.imgur.com/images/medal/copper.png" alt="copper" />
                      <img className={data.reputation >= 40000 ? '' : 'locked'} src="https://s.imgur.com/images/medal/bronze.png" alt="bronze" />
                      <img className={data.reputation >= 50000 ? '' : 'locked'} src="https://s.imgur.com/images/medal/iron.png" alt="iron" />
                      <img className={data.reputation >= 60000 ? '' : 'locked'} src="https://s.imgur.com/images/medal/silver.png" alt="silver" />
                      <img className={data.reputation >= 70000 ? '' : 'locked'} src="https://s.imgur.com/images/medal/gold.png" alt="gold" />
                      <img className={data.reputation >= 80000 ? '' : 'locked'} src="https://s.imgur.com/images/medal/imgurite.png" alt="imgurite" />
                    </div>
                  </div>
                </Col>
              </Row>
           )
          }
        </div>
      </Grid>
    );
  }
}

About.propTypes = {
  data: PropTypes.shape({
    reputation: PropTypes.number,
    reputation_name: PropTypes.string,
    bio: PropTypes.string,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  ownProfile: PropTypes.bool,
};

About.defaultProps = {
  ownProfile: null,
};


export default About;
