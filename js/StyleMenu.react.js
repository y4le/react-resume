var React = require('react');

var StyleMenu = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    options: React.PropTypes.array,
    callback: React.PropTypes.func // function that gets called when option selected
    // callback(selected) where the argument is the index of the selected option in options[]
  },
  getInitialState: function() {
    return { open: false };
  },

  toggleMenu: function() {
    this.setState({ open: !this.state.open });
  },

  render: function() {
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
            return (<div className='option' onClick={cb}>{option}</div>);
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
});

module.exports = StyleMenu;
