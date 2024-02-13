import React from 'react'
import PropTypes from 'prop-types'

class BigButton extends React.Component {
  static propTypes = {
    text: PropTypes.string,
    handleClick: PropTypes.func
  }

  render () {
    return (
      <div onClick={this.props.handleClick} className='styleButton'>
        <div>{this.props.text}</div>
      </div>
    )
  }
}

export default BigButton
