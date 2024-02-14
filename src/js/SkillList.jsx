import React from 'react'
import PropTypes from 'prop-types'

import { InfoList } from './InfoList.jsx'

class SkillList extends React.Component {
  static propTypes = {
    skills: PropTypes.array
  }

  static skillOrderings = [
    'category',
    'experience',
    'alphabetic'
  ]

  skillText (skillValue) {
    if (skillValue <= 0.3) { return '+' } else if (skillValue <= 0.6) { return '++' } else { return '+++' }
  }

  skillToJSX (skill) {
    const skillText = (function (skillValue) {
      if (skillValue <= 0.3) { return '+' } else if (skillValue <= 0.6) { return '++' } else { return '+++' }
    }(skill.skill))
    return (
      <div key={skill.name} className='skill_row'>
        <div>{skill.name}</div><div>{skillText}</div>
      </div>
    )
  }

  skillComparator (a, b, ordering) {
    ordering = ordering || 0
    if (ordering === 0) {
      // category sorting
      return a.category < b.category ? 1 : -1
    } else if (ordering === 1) {
      // skill sorting
      return a.skill < b.skill ? 1 : -1
    } else {
      // alph sorting
      return a.name > b.name ? 1 : -1
    }
  }

  render () {
    return (
      <InfoList title='Skills' toJSX={this.skillToJSX} comparator={this.skillComparator} orderings={SkillList.skillOrderings} content={this.props.skills} />
    )
  }
}

export { SkillList }
