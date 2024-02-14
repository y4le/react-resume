import React from 'react'
import PropTypes from 'prop-types'

import { InfoList } from './InfoList.jsx'

class EventList extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    events: PropTypes.array
  }

  profileToJSX (infoRow) {
    const mainTitle = infoRow.title_link ? (<a href={infoRow.title_link}>{infoRow.title}</a>) : infoRow.title
    const extraTitle = (infoRow.job_title) ? ' - ' + infoRow.job_title : null
    const startDate = infoRow.start_date ? infoRow.start_date + ' - ' : null
    const notesWithLinks = infoRow.notes.replace(/\[([^\]]+)]\(([^\)]+)\)/g, '<a href="$2">$1</a>')
    return (
      <div key={infoRow.title + infoRow.end_date} className='info_box'>
        <div className='info_header'><div className='info_name'>{mainTitle}{extraTitle}</div><div className='info_dates'>{startDate}{infoRow.end_date}</div></div>
        <div dangerouslySetInnerHTML={{ __html: notesWithLinks }} />
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
      <InfoList title={this.props.title} toJSX={this.profileToJSX} comparator={this.profileComparator} content={this.props.events} />
    )
  }
}

export { EventList }
