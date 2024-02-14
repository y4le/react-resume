import React from 'react'
import PropTypes from 'prop-types'

import { InfoList } from './InfoList.jsx'

class ClassList extends React.Component {
  static propTypes = {
    classes: PropTypes.array
  }

  static classOrderings = [
    'semester',
    'subject',
    'number',
    'alphabetic'
  ]

  classToJSX (classRow) {
    return (
      <div key={classRow.name} className='class_row'>
        <div className='class_name'>{classRow.name}</div><div className='class_info'><div>{classRow.subject + '-'}</div><div>{classRow.number}</div></div>
      </div>
    )
  }

  classComparator (a, b, ordering) {
    ordering = ordering || 0
    if (ordering === 0) {
      // semester sorting
      return a.semester > b.semester ? 1 : -1
    } else if (ordering === 1) {
      // subject sorting
      return a.subject > b.subject ? 1 : -1
    } else if (ordering === 2) {
      // number sorting
      return a.number < b.number ? 1 : -1
    } else {
      // alph sorting
      return a.name > b.name ? 1 : -1
    }
  }

  render () {
    return (
      <InfoList title='Classes' toJSX={this.classToJSX} comparator={this.classComparator} orderings={ClassList.classOrderings} content={this.props.classes} />
    )
  }
}

export { ClassList }
