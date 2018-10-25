var React = require('react');
var ReactDOM = require('react-dom');
var content = require('./content.js');
var InfoList = require('./InfoList.react.js');
var Header = require('./Header.react.js');

ReactDOM.render(
  <div>
    <div className='flexbody'>
      <div className='sidebar'>
        <div className='contact_info'>
          <div className='contact_row'>314 630 9258 <a href="http://www.linkedin.com/pub/yale-thomas/80/511/295">linkedin</a></div>
          <div className='contact_row'><a href="mailto:lordchair@gmail.com?Subject=Resume Response" target="_top">lordchair@gmail.com</a> <a href='http://github.com/lordchair'>git</a></div>
        </div>
        <InfoList title='Skills' toJSX={content.skillToJSX} comparator={content.skillComparator} orderings={content.skillOrderings} content={content.SKILLS} />
        <InfoList title='Books' toJSX={content.bookToJSX} comparator={content.bookComparator} orderings={content.bookOrderings} content={content.BOOKS} />
        <InfoList title='Classes' toJSX={content.classToJSX} comparator={content.classComparator} orderings={content.classOrderings} content={content.CLASSES} />
      </div>
      <div className='mainbar'>
        <div className='yale_name'>Yale Thomas</div>
        <div className='profile'>
          <Header text='Profile' />
          {content.profile.map(function(para) { return (<p>{para}</p>); })}
        </div>
        <InfoList title='Work' toJSX={content.profileToJSX} comparator={content.profileComparator} content={content.WORK} />
        <InfoList title='Education' toJSX={content.profileToJSX} comparator={content.profileComparator} content={content.EDUCATION} />
        <InfoList title='Projects' toJSX={content.profileToJSX} comparator={content.profileComparator} content={content.PROJECTS} />
      </div>
    </div>
  </div>

, document.getElementById('app') );
