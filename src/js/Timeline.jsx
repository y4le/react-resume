import React from 'react'
import PropTypes from 'prop-types'
import Resizable from 'react-component-resizable'
import Tappable from 'react-tappable'
import dateFormat from 'dateFormat'

class Timeline extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      order: 0
    }
    this.reorder = this.reorder.bind(this)
  }

  numberToString (numericalData) {
    if (this.props.numberToString) { return this.props.numberToString(numericalData) }
    if (this.props.toNumber('1/12/1993') == '726825600000') {
      // we're dealing with dates here
      return dateFormat(new Date(numericalData), 'mmm yyyy')
    }
    return numericalData
  }

  handleResize (e) {
    this.gennedAxesOutput = false
    this.forceUpdate()
  }

  generateAxes (lower, higher) {
    if (this.props.generateAxes) { return this.props.generateAxes(lower, higher) }
    if (this.gennedAxesOutput) { return this.gennedAxesOutput }
    let out = []

    if (this.props.toNumber('1/12/1993') == '726825600000') {
      // dates
      const counter = new Date(lower)
      while (counter.getTime() < higher) {
        out.push(counter.getTime())
        counter.setMonth(counter.getMonth() + 1)
      }
    } else {
      const size = higher - lower
      const chunk = size / (this.props.axesTics() + 1)
      for (let i = 1; i <= this.props.axesTics(); i++) {
        out.push(Math.round(lower + chunk * i))
      }
    }

    while (out.length > this.props.axesTics()) {
      const temp = []
      let count = 0
      out.forEach(function (me) {
        if (count % 2 === 0) {
          temp.push(me)
        }
        count++
      })
      out = temp
    }

    const self = this
    const processed = []
    out.forEach(function (datum) {
      processed.push({
        start: datum,
        end: datum,
        header: self.numberToString(datum)
      })
    })
    this.gennedAxesOutput = processed
    return processed
  }

  reorder () {
    this.setState({ order: ((this.state.order + 1) % 3) })
  }

  render () {
    let content = this.props.content
    if (this.props.content && this.props.content[0] && this.props.content[0].start) {
      content = [this.props.content]
    }

    let lower = this.props.lower || Number.MAX_SAFE_INTEGER
    let higher = this.props.higher || Number.MIN_SAFE_INTEGER
    const self = this
    if (!this.props.higher || !this.props.lower) {
      content.forEach(function (timeline) {
        timeline.forEach(function (datum) {
          if (!self.props.higher) {
            const _hi = self.props.toNumber(datum.end)
            if (_hi > higher) {
              higher = _hi
            }
          }
          if (!self.props.lower) {
            const _low = self.props.toNumber(datum.start)
            if (_low < lower) {
              lower = _low
            }
          }
        })
      })
    }
    // <TimeRow numberToString={this.numberToString} toNumber={tonum} content={this.generateAxes(lower, higher)} lower={lower} higher={higher} />
    const tonum = this.props.toNumber
    return (
      <div className='timeline'>
        {content.map(function (rowContent) {
          return (<TimeRow toNumber={tonum} content={rowContent} lower={lower} higher={higher} />)
        })}
        <Resizable onResize={this.handleResize.bind(this)} className='axis'>
          <TimeSlider numberToString={this.props.numberToString} lower={this.props.lower} higher={this.props.higher} />
        </Resizable>
      </div>
    )
  }
}

Timeline.propTypes = {
  content: PropTypes.array,
  toNumber: PropTypes.func,
  numberToString: PropTypes.func,
  generateAxes: PropTypes.func,
  axesTics: PropTypes.number,
  title: PropTypes.string,
  lower: PropTypes.number,
  higher: PropTypes.number
}

Timeline.defaultProps = {
  toNumber: function (numericalData) {
    return new Date(numericalData).getTime() // assuming date
  },
  axesTics: function () { return Math.floor(20 * window.innerWidth / 1200) }
}

class TimeRow extends React.Component {
  render () {
    const self = this
    const lowerNum = this.props.toNumber(this.props.lower)
    const higherNum = this.props.toNumber(this.props.higher)
    const tonum = this.props.toNumber
    return (
      <div className='time_row' style={{ position: 'relative' }} clasName='time_row'>
        {this.props.content.map(function (datum) { return (<TimeTic data={datum} toNumber={tonum} lower={lowerNum} higher={higherNum} />) })}
      </div>
    )
  }
}

TimeRow.propTypes = {
  content: PropTypes.array,
  toNumber: PropTypes.func,
  numberToString: PropTypes.func,
  lower: PropTypes.number,
  higher: PropTypes.number
}

class TimeTic extends React.Component {
  render () {
    const sizeNum = this.props.higher - this.props.lower
    const myLower = this.props.toNumber(this.props.data.start)
    const myUpper = this.props.toNumber(this.props.data.end)
    const style = {}
    style.position = 'absolute'
    style.backgroundColor = this.props.data.backgroundColor || 'black'
    style.left = 100 * ((myLower - this.props.lower) / (sizeNum))
    style.right = 100 * ((myUpper - this.props.lower) / (sizeNum))
    style.width = style.right - style.left
    style.left += '%'; style.right += '%'; style.width += '%'
    return (
      <div className='time_tic' style={style}>{this.props.data.header}<Tooltip data={this.props.data} /></div>
    )
  }
}

TimeTic.propTypes = {
  toNumber: PropTypes.func,
  data: PropTypes.object,
  lower: PropTypes.number,
  higher: PropTypes.number
}

class TimeSlider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowing: false
    }
    this.mouseMove = this.mouseMove.bind(this)
    this.mouseLeave = this.mouseLeave.bind(this)
  }

  mouseMove (e) {
    this.setState({ isShowing: true })
    debugger
    this.setState(xPos, e)
    return true
  }

  mouseLeave () {
    this.setState({ isShowing: false })
  }

  render () {
    const wrapperStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    }
    if (!this.state.isShowing) { return (<div style={wrapperStyle} onMouseLeave={this.mouseLeave} onMouseMove={this.mouseMove} className='slider_wrapper' />) }
    const sizeNum = this.props.higher - this.props.lower
    const myLower = this.props.toNumber(this.props.data.start)
    const myUpper = this.props.toNumber(this.props.data.end)
    const style = {}
    style.position = 'absolute'
    style.backgroundColor = this.props.data.backgroundColor || 'black'
    style.left = 100 * ((myLower - this.props.lower) / (sizeNum))
    style.right = 100 * ((myUpper - this.props.lower) / (sizeNum))
    style.width = style.right - style.left
    style.left += '%'; style.right += '%'; style.width += '%'
    return (
      <div style={wrapperStyle} onMouseLeave={this.mouseLeave} onMouseMove={this.mouseMove} className='slider_wrapper'>
        <div className='slider' />
      </div>
    )
  }
}

TimeSlider.propTypes = {
  toNumber: PropTypes.func,
  numberToString: PropTypes.func,
  lower: PropTypes.number,
  higher: PropTypes.number
}

class Tooltip extends React.Component {
  render () {
    return (
      <div className='time_tooltip'>
        {this.props.data.header} <br />
        {this.props.data.subheader} <br />
        {this.props.data.start} - {this.props.data.end} <br />
      </div>
    )
  }
}

Tooltip.propTypes = {
  data: PropTypes.object
}

export default Timeline
