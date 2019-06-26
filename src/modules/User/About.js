import React, { Component } from 'react';
import { Grid, Col, Row } from 'react-flexbox-grid';
import PropTypes from 'prop-types';
import Button from '../../components/Button';
import editSvg from '../../svgs/edit';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }
  render() {
    console.log(this.props);
    const { data, isFetching, ownProfile } = this.props;
    return (
      <Grid>
        <div className="userpage__section--about">
          { isFetching ?
            (
              <h1>Loading </h1>
            ) : (
              <Row>
                <Col xs={12} sm={6} md={5} lg={4}>

                  { ownProfile ?
                   (
                     <React.Fragment>
                       <h4 className="userpage__section--about__heading">About [edit]</h4>
                       <div className="userpage__section--about__content">{ data.bio || 'Tell Imgur a little about yourself' }</div>
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

                  <h4 className="userpage__section--about__heading">Medallions</h4>
                </Col>
                <Col xs={12} sm={6} md={7} lg={8}>
                  <h4 className="userpage__section--about__heading">Trophies</h4>
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
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
  ownProfile: PropTypes.bool,
};

About.defaultProps = {
  ownProfile: null,
};


export default About;
