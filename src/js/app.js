import React from 'react'
import ReactDOM from 'react-dom'

import '../style/style.less'

import content from '../resume-content/dist/data.json'
import pdfFile from '../pdf/resume.pdf'

import { ClassList } from './ClassList.jsx'
import { Header } from './Header.jsx'
import { SkillList } from './SkillList.jsx'
import { EventList } from './EventList.jsx'

const PROFILE = content.PROFILE

const jsx = (
  <div>
    <div className='flexheader'>
      <div className='contact_info'>
        <div className='contact_row'>{PROFILE.number}<a href={PROFILE.linkedin}>linkedin</a></div>
        <div className='contact_row'><a href={'mailto:' + PROFILE.email + '?Subject=Resume Response'} target='_top'>{PROFILE.email}</a> <a href={PROFILE.git}>git</a></div>
      </div>
      <div className='name'>{PROFILE.name}</div>
    </div>
    <div className='flexbody'>
      <div className='sidebar'>
        <SkillList skills={content.SKILLS} />
        <ClassList classes={content.CLASSES} />
      </div>
      <div className='mainbar'>
        <div className='profile'>
          <Header text='Profile' />
          <p>{PROFILE.profile}</p>
        </div>
        <EventList title='Work' events={content.WORK} />
        <EventList title='Education' events={content.EDUCATION} />
        <EventList title='Projects' events={content.PROJECTS} />
      </div>
    </div>
    <div className='pdf_link'>
      <a href={pdfFile} target='_blank' rel='noreferrer'>Pdf Version</a>
    </div>
  </div>
)

ReactDOM.render(jsx, document.getElementById('app'))
