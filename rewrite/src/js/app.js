import React from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

const content = require('./content.js');
const InfoList = require('./InfoList.jsx');
const Header = require('./Header.jsx');

const PdfResume = require('./PdfResume.jsx');


const queryStringParams = new URLSearchParams(window.location.search);
const inlinePdf = !!queryStringParams.get('pdf');

let jsx = null;

if (inlinePdf) {
  jsx = (
    <div style={{width: '100%', height: '98vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <PDFViewer width='100%' height='100%'>
        <PdfResume content={content} />
      </PDFViewer>
    </div>
  );

} else {
  jsx = (
    <div>
      <div className='flexheader'>
        <div className='contact_info'>
          <div className='contact_row'>{content.number}<a href={content.linkedin}>linkedin</a></div>
          <div className='contact_row'><a href={'mailto:'+content.email+'?Subject=Resume Response'} target="_top">{content.email}</a> <a href={content.git}>git</a></div>
        </div>
        <div className='name'>{content.name}</div>
      </div>
      <div className='flexbody'>
        <div className='sidebar'>
          <InfoList title='Skills' toJSX={content.skillToJSX} comparator={content.skillComparator} orderings={content.skillOrderings} content={content.SKILLS} />
          <InfoList title='Classes' toJSX={content.classToJSX} comparator={content.classComparator} orderings={content.classOrderings} content={content.CLASSES} />
          {/*<InfoList title='Books' toJSX={content.bookToJSX} comparator={content.bookComparator} orderings={content.bookOrderings} content={content.BOOKS} />*/}
        </div>
        <div className='mainbar'>
          <div className='profile'>
            <Header text='Profile' />
            {content.profile.map(function(para) { return (<p>{para}</p>); })}
          </div>
          <InfoList title='Work' toJSX={content.profileToJSX} comparator={content.profileComparator} content={content.WORK} />
          <InfoList title='Education' toJSX={content.profileToJSX} comparator={content.profileComparator} content={content.EDUCATION} />
          <InfoList title='Projects' toJSX={content.profileToJSX} comparator={content.profileComparator} content={content.PROJECTS} />
        </div>
      </div>
      <div className='pdf_link'>
        <PDFDownloadLink document={(<PdfResume content={content} />)} fileName="yaleResume.pdf">
          {({ blob, url, loading, error }) => (loading ? 'Loading document...' : 'PDF Version')}
        </PDFDownloadLink>
      </div>
    </div>
  );
}

ReactDOM.render(jsx, document.getElementById('app'));
