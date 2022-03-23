var React = require('react');
var PropTypes = require('prop-types');

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

module.exports = BigButton;
