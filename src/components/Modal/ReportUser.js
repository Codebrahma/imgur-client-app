import React from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import { reportUser } from '../../api';
import './ReportUser.scss';

class ReportUser extends React.Component {
  state = {
    open: true,
    slectedOption: '',
  };
  handleModal = (successMessage) => {
    const { handleCloseReportModal } = this.props;
    this.setState({ open: false, slectedOption: '' });
    handleCloseReportModal(successMessage);
  };
  handleGetOption = (e) => {
    e.preventDefault();
    this.setState({ slectedOption: e.target.value });
  };
  handleReportUser = (e) => {
    const { commentId } = this.props;
    const { slectedOption } = this.state;
    e.preventDefault();
    if (slectedOption.length === 0) return;
    reportUser(commentId, slectedOption)
      .then((res) => {
        if (res.status === 200) {
          this.handleModal(true);
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    const { open } = this.state;
    return (
      <ReactModal isOpen={open} ariaHideApp={false} className="modalWrapper">
        <div className="reportModalHeader">
          <div>Report Comment</div>
          <div onClick={() => this.handleModal(false)} className="closeModal">
            X
          </div>
        </div>
        <div className="reportModalBody" onChange={this.handleGetOption}>
          <div className="reportOption">
            <input type="radio" value="Mature" name="option" />
            <div className="reportOptionText">
              <span>Mature</span>
              <span className="reportOptionDescription">
                This comment conatins suggestive or provocative content.
              </span>
            </div>
          </div>

          <div className="reportOption">
            <input type="radio" value="Sexually Explicit" name="option" />
            <div className="reportOptionText">
              <span>Sexually Explicit</span>
              <span className="reportOptionDescription">
                This comment conatins bad content.
              </span>
            </div>
          </div>

          <div className="reportOption">
            <input type="radio" value="Spam" name="option" />
            <div className="reportOptionText">
              <span>Spam</span>
              <span className="reportOptionDescription">
                This comment cotains clickbait, advertising, scams or script.
              </span>
            </div>
          </div>

          <div className="reportOption">
            <input type="radio" value="Abusive/offensive" name="option" />
            <div className="reportOptionText">
              <span>Abusive/offensive</span>
              <span className="reportOptionDescription">
                This comment contains racism,slurs, personal attacks, death
                threats,sucide request or any form of hate speech.
              </span>
            </div>
          </div>

          <div className="reportOption">
            <input
              type="radio"
              value="Does Not belong on Imgur"
              name="option"
            />
            <div className="reportOptionText">
              <span>Does Not belong on Imgur</span>
              <span className="reportOptionDescription">
                This comment contains illegal activity, suicide threats,
                personal information, or something else you think doesn't belong
                on Imgur.
              </span>
            </div>
          </div>
        </div>
        <div className="reportUserFooter">
          <div className="reportOptionText">
            <span>For More info please read the</span>
            <a href="https://imgur.com/rules" target="_blank" rel="noopener noreferrer" >Community Rules</a>
          </div>
          <button onClick={this.handleReportUser} className="reportButton">
            Report
          </button>
        </div>
      </ReactModal>
    );
  }
}
ReportUser.propTypes = {
  commentId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  handleCloseReportModal: PropTypes.func.isRequired,
};
export default ReportUser;
