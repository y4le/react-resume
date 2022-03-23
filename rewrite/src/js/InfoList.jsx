var React = require('react');
var PropTypes = require('prop-types');
var StyleMenu = require('./StyleMenu.jsx');
var Header = require('./Header.jsx');

class InfoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: 0
    };
    this.reorder = this.reorder.bind(this);
    this.setOrder = this.setOrder.bind(this);
  }

  reorder() {
    this.setState({ order: ((this.state.order + 1) % this.props.orderings.length) });
  }

  setOrder(newOrder) {
    if (!(newOrder > -1) || !(newOrder < this.props.orderings.length)) {
      return;
    }
    this.setState({ order: newOrder });
  }

  render() {
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
}

InfoList.propTypes = {
  content: PropTypes.array,
  toJSX: PropTypes.func,
  comparator: PropTypes.func,
  title: PropTypes.string,
  orderings: PropTypes.array
};

InfoList.defaultProps = {
    orderings: []
};

module.exports = InfoList;
