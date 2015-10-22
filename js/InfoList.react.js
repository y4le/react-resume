var React = require('react');
var StyleMenu = require('./StyleMenu.react.js');
var Header = require('./Header.react.js');

var InfoList = React.createClass({
  propTypes: {
    content: React.PropTypes.array,
    toJSX: React.PropTypes.func,
    comparator: React.PropTypes.func,
    title: React.PropTypes.string,
    orderings: React.PropTypes.array
  },
  getDefaultProps: function() {
    return {
      orderings: []
    }
  },
  getInitialState: function() {
    return { order: 0 };
  },
  reorder: function() {
    this.setState({ order: ((this.state.order + 1) % this.props.orderings.length) });
  },
  setOrder: function(newOrder) {
    if (!(newOrder > -1) || !(newOrder < this.props.orderings.length)) {
      return;
    }
    this.setState({ order: newOrder });
  },

  render: function() {
    var self = this;
    var headerButton = (this.props.orderings && this.props.orderings[this.state.order]) ? (<StyleMenu text={'order: ' + this.props.orderings[this.state.order]} options={this.props.orderings}  callback={this.setOrder} />) : null;
    return (
      <div className={this.props.title.toLowerCase()}>
        <Header align='out' text={this.props.title} content={headerButton} />
        <div className={this.props.title.toLowerCase() + '_table'}>
          {this.props.content.sort(function(a, b) { return self.props.comparator(a, b, self.state.order); }).map(this.props.toJSX)}
        </div>
      </div>
    );
  }
});


module.exports = InfoList;