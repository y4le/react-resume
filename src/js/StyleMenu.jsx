import React from 'react'
import PropTypes from 'prop-types'

class StyleMenu extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    options: PropTypes.array,
    callback: PropTypes.func // function that gets called when option selected
    // callback(selected) where the argument is the index of the selected option in options[]
  }

  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
    this.handleMenuClick = this.handleMenuClick.bind(this)
  }

  handleMenuClick () {
    this.setState({ open: !this.state.open })
  }

  render () {
    let maybeMenu = null

    if (this.state.open) {
      const self = this
      const callbackMaker = function (index) {
        return function () {
          self.props.callback(index)
          self.handleMenuClick()
        }
      }
      maybeMenu = (
        <div className='options_wrapper'>
          {this.props.options.map(function (option, i) {
            const cb = callbackMaker(i).bind(self)
            return (<div className='option' onClick={cb} key={option}>{option}</div>)
          })}
        </div>
      )
    }

    return (
      <div className='menu_wrapper'>
        <div onClick={this.handleMenuClick} className='styleButton'>
          <div>{this.props.text}</div>
        </div>
        {maybeMenu}
      </div>
    )
  }
}

export { StyleMenu }
