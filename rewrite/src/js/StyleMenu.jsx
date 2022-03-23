import React from 'react';
import PropTypes from 'prop-types';

class StyleMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  toggleMenu() {
    this.setState({ open: !this.state.open });
  }

  render() {
    var maybeMenu = null;

    if (this.state.open) {
      var self = this;
      var callbackMaker = function(index) {
        return function() {
          self.props.callback(index);
          self.toggleMenu();
        };
      },
      maybeMenu = (
        <div className='options_wrapper'>
          {this.props.options.map(function(option, i) {
            var cb = callbackMaker(i).bind(self);
            return (<div className='option' onClick={cb} key={option}>{option}</div>);
          })}
        </div>
      );
    }

    return (
      <div className='menu_wrapper'>
        <div onClick={this.toggleMenu} className='styleButton'>
          <div>{this.props.text}</div>
        </div>
        {maybeMenu}
      </div>
    );
  }
}

StyleMenu.propTypes = {
  text: PropTypes.string,
  options: PropTypes.array,
  callback: PropTypes.func // function that gets called when option selected
  // callback(selected) where the argument is the index of the selected option in options[]
};

export default StyleMenu;
