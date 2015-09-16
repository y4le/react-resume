var React = require('react');

var Header = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    align: React.PropTypes.string,
    content: React.PropTypes.element
  },
  render: function() {
    return (
      <div className={ this.props.align == 'left' ? "section_header align_left" : "section_header" }>
        <div className="item_wrapper">
          <div className="header_item header_title">{this.props.text}</div>{this.props.content ? (<div className="header_item header_button">{this.props.content}</div>) : ''}
        </div>
        <hr/>
      </div>
    );
  }
});

module.exports = Header;
