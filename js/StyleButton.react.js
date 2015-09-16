var React = require('react');

var BigButton = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    clicked: React.PropTypes.func
  },
  render: function() {
    return (
      <div onClick={this.props.clicked} className="styleButton">
        <div>{this.props.text}</div>
      </div>
    );
  }
});

module.exports = BigButton;
