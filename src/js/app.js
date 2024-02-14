import React from 'react'
import ReactDOM from 'react-dom'

import '../style/style.less'

import content from './content.js'
import pdfFile from '../pdf/resume.pdf'

import { InfoList } from './InfoList.jsx'
import { Header } from './Header.jsx'

const jsx = (
  <div>
    <div className='flexheader'>
      <div className='contact_info'>
        <div className='contact_row'>{content.number}<a href={content.linkedin}>linkedin</a></div>
        <div className='contact_row'><a href={'mailto:' + content.email + '?Subject=Resume Response'} target='_top'>{content.email}</a> <a href={content.git}>git</a></div>
      </div>
      <div className='name'>{content.name}</div>
    </div>
    <div className='flexbody'>
      <div className='sidebar'>
        <InfoList title='Skills' toJSX={content.skillToJSX} comparator={content.skillComparator} orderings={content.skillOrderings} content={content.SKILLS} />
        <InfoList title='Classes' toJSX={content.classToJSX} comparator={content.classComparator} orderings={content.classOrderings} content={content.CLASSES} />
        {/* <InfoList title='Books' toJSX={content.bookToJSX} comparator={content.bookComparator} orderings={content.bookOrderings} content={content.BOOKS} /> */}
      </div>
      <div className='mainbar'>
        <div className='profile'>
          <Header text='Profile' />
          {content.profile.map(function (para) { return (<p>{para}</p>) })}
        </div>
        <InfoList title='Work' toJSX={content.profileToJSX} comparator={content.profileComparator} content={content.WORK} />
        <InfoList title='Education' toJSX={content.profileToJSX} comparator={content.profileComparator} content={content.EDUCATION} />
        <InfoList title='Projects' toJSX={content.profileToJSX} comparator={content.profileComparator} content={content.PROJECTS} />
      </div>
    </div>
    <div className='pdf_link'>
      <a href={pdfFile} target='_blank' rel='noreferrer'>Pdf Version</a>
    </div>
  </div>
)

ReactDOM.render(jsx, document.getElementById('app'))
