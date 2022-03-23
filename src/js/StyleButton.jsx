import React from 'react';
import PropTypes from 'prop-types';

class BigButton extends React.Component {
  render() {
    return (
      <div onClick={this.props.clicked} className="styleButton">
        <div>{this.props.text}</div>
      </div>
    );
  }
}

BigButton.propTypes: {
  text: PropTypes.string,
  clicked: PropTypes.func
};

export default BigButton;
