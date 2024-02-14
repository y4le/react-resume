import React from 'react'
import PropTypes from 'prop-types'

import { InfoList } from './InfoList.jsx'

class EventList extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    events: PropTypes.array,
    showLinks: PropTypes.bool
  }

  static defaultProps = {
    showLinks: false
  }

  profileToJSX (infoRow, showLinks) {
    const mainTitle = infoRow.title_link && showLinks ? (<a href={infoRow.title_link}>{infoRow.title}</a>) : infoRow.title
    const extraTitle = (infoRow.job_title) ? ' - ' + infoRow.job_title : null
    const startDate = infoRow.start_date ? infoRow.start_date + ' - ' : null

    const notesArray = infoRow.notes.split('\n').filter(note => note.trim() !== '').map((note, index) => {
      const linkRegex = /\[([^\]]+)\]\((http[s]?:\/\/[^)]+)\)/
      const match = note.match(linkRegex)
      if (match) {
        return (
          <li key={index}>
            {note.substring(0, match.index)}
            <a href={match[2]} target='_blank' rel='noopener noreferrer'>{match[1]}</a>
            {note.substring(match.index + match[0].length)}
          </li>
        )
      }
      return <li key={index}>{note}</li>
    })

    let skills = null
    if (infoRow.skills) {
      skills = (
        <div className='used_skills'>{infoRow.skills.map((skill) => {
          return <div className='used_skill' key={skill}>{skill}</div>
        })}
        </div>
      )
    }

    return (
      <div key={infoRow.title + infoRow.end_date} className='info_box'>
        <div className='info_header'><div className='info_name'>{mainTitle}{extraTitle}</div><div className='info_dates'>{startDate}{infoRow.end_date}</div></div>
        <div><ul>{notesArray}</ul></div>
        {skills}
      </div>
    )
  }

  profileComparator (a, b, order) {
    if (a.end_date === 'Now') { return -1 }
    if (b.end_date === 'Now') { return 1 }
    return a.end_date < b.end_date ? 1 : -1
  }

  render () {
    return (
      <InfoList
        title={this.props.title}
        toJSX={(infoRow) => this.profileToJSX(infoRow, this.props.showLinks)}
        comparator={this.profileComparator}
        content={this.props.events}
      />
    )
  }
}

export { EventList }
