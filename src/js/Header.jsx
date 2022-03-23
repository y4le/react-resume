import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    return (
      <div className={ this.props.align == 'left' ? "section_header align_left" : "section_header" }>
        <div className="item_wrapper">
          <div className="header_item header_title">{this.props.text}</div>{this.props.content ? (<div className="header_item header_button">{this.props.content}</div>) : ''}
        </div>
        <hr/>
      </div>
    );
  }
}

Header.propTypes = {
  text: PropTypes.string,
  align: PropTypes.string,
  content: PropTypes.element
};

export default Header;
