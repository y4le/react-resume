(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var React = require('react');

var Header = React.createClass({
  displayName: "Header",
  propTypes: {
    text: React.PropTypes.string,
    align: React.PropTypes.string,
    content: React.PropTypes.element
  },
  render: function render() {
    return React.createElement("div", {
      className: this.props.align == 'left' ? "section_header align_left" : "section_header"
    }, React.createElement("div", {
      className: "item_wrapper"
    }, React.createElement("div", {
      className: "header_item header_title"
    }, this.props.text), this.props.content ? React.createElement("div", {
      className: "header_item header_button"
    }, this.props.content) : ''), React.createElement("hr", null));
  }
});
module.exports = Header;

},{"react":12}],2:[function(require,module,exports){
"use strict";

var React = require('react');

var StyleMenu = require('./StyleMenu.react.js');

var Header = require('./Header.react.js');

var InfoList = React.createClass({
  displayName: "InfoList",
  propTypes: {
    content: React.PropTypes.array,
    toJSX: React.PropTypes.func,
    comparator: React.PropTypes.func,
    title: React.PropTypes.string,
    orderings: React.PropTypes.array
  },
  getDefaultProps: function getDefaultProps() {
    return {
      orderings: []
    };
  },
  getInitialState: function getInitialState() {
    return {
      order: 0
    };
  },
  reorder: function reorder() {
    this.setState({
      order: (this.state.order + 1) % this.props.orderings.length
    });
  },
  setOrder: function setOrder(newOrder) {
    if (!(newOrder > -1) || !(newOrder < this.props.orderings.length)) {
      return;
    }

    this.setState({
      order: newOrder
    });
  },
  render: function render() {
    var self = this;
    var headerButton = this.props.orderings && this.props.orderings[this.state.order] ? React.createElement(StyleMenu, {
      text: 'order: ' + this.props.orderings[this.state.order],
      options: this.props.orderings,
      callback: this.setOrder
    }) : null;
    return React.createElement("div", {
      className: this.props.title.toLowerCase()
    }, React.createElement(Header, {
      align: "out",
      text: this.props.title,
      content: headerButton
    }), React.createElement("div", {
      className: this.props.title.toLowerCase() + '_table'
    }, this.props.content.sort(function (a, b) {
      return self.props.comparator(a, b, self.state.order);
    }).map(this.props.toJSX)));
  }
});
module.exports = InfoList;

},{"./Header.react.js":1,"./StyleMenu.react.js":3,"react":12}],3:[function(require,module,exports){
"use strict";

var React = require('react');

var StyleMenu = React.createClass({
  displayName: "StyleMenu",
  propTypes: {
    text: React.PropTypes.string,
    options: React.PropTypes.array,
    callback: React.PropTypes.func // function that gets called when option selected
    // callback(selected) where the argument is the index of the selected option in options[]

  },
  getInitialState: function getInitialState() {
    return {
      open: false
    };
  },
  toggleMenu: function toggleMenu() {
    this.setState({
      open: !this.state.open
    });
  },
  render: function render() {
    var maybeMenu = null;

    if (this.state.open) {
      var self = this;

      var callbackMaker = function callbackMaker(index) {
        return function () {
          self.props.callback(index);
          self.toggleMenu();
        };
      },
          maybeMenu = React.createElement("div", {
        className: "options_wrapper"
      }, this.props.options.map(function (option, i) {
        var cb = callbackMaker(i).bind(self);
        return React.createElement("div", {
          className: "option",
          onClick: cb
        }, option);
      }));
    }

    return React.createElement("div", {
      className: "menu_wrapper"
    }, React.createElement("div", {
      onClick: this.toggleMenu,
      className: "styleButton"
    }, React.createElement("div", null, this.props.text)), maybeMenu);
  }
});
module.exports = StyleMenu;

},{"react":12}],4:[function(require,module,exports){
"use strict";

var React = require('react');

var content = require('./content.js');

var InfoList = require('./InfoList.react.js');

var Header = require('./Header.react.js');

React.render(React.createElement("div", null, React.createElement("div", {
  className: "flexbody"
}, React.createElement("div", {
  className: "sidebar"
}, React.createElement("div", {
  className: "contact_info"
}, React.createElement("div", {
  className: "contact_row"
}, "314 630 9258 ", React.createElement("a", {
  href: "http://www.linkedin.com/pub/yale-thomas/80/511/295"
}, "linkedin")), React.createElement("div", {
  className: "contact_row"
}, React.createElement("a", {
  href: "mailto:lordchair@gmail.com?Subject=Resume Response",
  target: "_top"
}, "lordchair@gmail.com"), " ", React.createElement("a", {
  href: "http://github.com/lordchair"
}, "git"))), React.createElement(InfoList, {
  title: "Books",
  toJSX: content.bookToJSX,
  comparator: content.bookComparator,
  orderings: content.bookOrderings,
  content: content.BOOKS
}), React.createElement(InfoList, {
  title: "Skills",
  toJSX: content.skillToJSX,
  comparator: content.skillComparator,
  orderings: content.skillOrderings,
  content: content.SKILLS
}), React.createElement(InfoList, {
  title: "Classes",
  toJSX: content.classToJSX,
  comparator: content.classComparator,
  orderings: content.classOrderings,
  content: content.CLASSES
})), React.createElement("div", {
  className: "mainbar"
}, React.createElement("div", {
  className: "yale_name"
}, "Yale Thomas"), React.createElement("div", {
  className: "profile"
}, React.createElement(Header, {
  text: "Profile"
}), content.profile.map(function (para) {
  return React.createElement("p", null, para);
})), React.createElement(InfoList, {
  title: "Work",
  toJSX: content.profileToJSX,
  comparator: content.profileComparator,
  content: content.WORK
}), React.createElement(InfoList, {
  title: "Education",
  toJSX: content.profileToJSX,
  comparator: content.profileComparator,
  content: content.EDUCATION
}), React.createElement(InfoList, {
  title: "Projects",
  toJSX: content.profileToJSX,
  comparator: content.profileComparator,
  content: content.PROJECTS
})))), document.getElementById('app'));

},{"./Header.react.js":1,"./InfoList.react.js":2,"./content.js":5,"react":12}],5:[function(require,module,exports){
"use strict";

var React = require('react');

module.exports = Object.freeze({
  TIMELINE: [{
    start: 'May 2017',
    end: new Date().toLocaleDateString('en'),
    header: 'Tophatter',
    subheader: 'Full Stack Software Engineer',
    backgroundColor: 'rgb(69, 36, 160)'
  }, {
    start: 'Nov 2015',
    end: 'May 2017',
    header: 'Pandora',
    subheader: 'Web Team Engineer',
    backgroundColor: 'rgb(0, 160, 238)'
  }, {
    start: 'Aug 2014',
    end: 'Nov 2015',
    header: 'Rdio',
    subheader: 'Web Team Engineer',
    backgroundColor: 'rgb(14, 122, 204)'
  }, {
    start: 'May 2014',
    end: 'Aug 2014',
    header: 'Rdio',
    subheader: 'Web Team Intern',
    backgroundColor: 'rgb(14, 122, 204)'
  }, {
    start: 'May 2013',
    end: 'Aug 2013',
    header: 'Facebook',
    subheader: 'Site Integrity Team Intern',
    backgroundColor: 'rgba(60, 83, 143, 1.4)'
  }, {
    start: 'May 2012',
    end: 'Aug 2012',
    header: 'WASHU',
    subheader: 'Medical Imaging Dept. Intern',
    backgroundColor: 'rgba(38, 73, 50, 1.4)'
  }, {
    start: 'Sep 2011',
    end: 'May 2014',
    header: 'UIUC',
    subheader: 'Studying MatScE & CS',
    backgroundColor: 'rgba(246, 75, 5, 1.3)'
  }],
  // Profile stuff, array of string paragraphs
  profile: [],
  // Books
  BOOKS: [{
    title: "The Martian",
    author: 'Andy Weir',
    date: 'Nov 20 2014',
    genre: 'SciFi',
    fiction: true,
    rating: .95,
    reread: false
  }, {
    title: "Let's Explore Diabetes with Owls",
    author: 'David Sedaris',
    date: 'Nov 23 2014',
    genre: 'Comedy',
    fiction: false,
    rating: .75,
    reread: false
  }, {
    title: "The Tipping Point",
    author: 'Malcom Gladwell',
    date: 'Nov 25 2014',
    genre: 'Economics',
    fiction: false,
    rating: .8,
    reread: false
  }, {
    title: "Blink",
    author: 'Malcom Gladwell',
    date: 'Nov 28 2014',
    genre: 'Cognitive',
    fiction: false,
    rating: .8,
    reread: false
  }, {
    title: "Outliers",
    author: 'Malcom Gladwell',
    date: 'Nov 30 2014',
    genre: 'Economics',
    fiction: false,
    rating: .8,
    reread: false
  }, {
    title: "The Selfish Gene",
    author: 'Richard Dawkins',
    date: 'Dec 5 2014',
    genre: 'Biology',
    fiction: false,
    rating: .85,
    reread: true
  }, {
    title: "Hard-boiled Wonderland and the End of the World",
    author: 'Haruki Murakami',
    date: 'Dec 9 2014',
    genre: 'Supernatural',
    fiction: true,
    rating: .6,
    reread: false
  }, {
    title: "What It Is Like to Go to War",
    author: 'Karl Marlantes',
    date: 'Dec 14 2014',
    fiction: false,
    rating: .85,
    reread: false
  }, {
    title: "The Girl With All the Gifts",
    author: 'M. R. Carey',
    date: 'Dec 20 2014',
    genre: 'SciFi',
    fiction: true,
    rating: .65,
    reread: false
  }, {
    title: "Blindsight",
    author: 'Peter Watts',
    date: 'Feb 1 2015',
    genre: 'SciFi',
    fiction: true,
    rating: .75,
    reread: false
  }, {
    title: "Echopraxia",
    author: 'Peter Watts',
    date: 'Feb 10 2015',
    genre: 'SciFi',
    fiction: true,
    rating: .74,
    reread: false
  }, {
    title: "The Name of the Wind",
    author: 'Patrick Rothfuss',
    date: 'Feb 19 2015',
    genre: 'Fantasy',
    fiction: true,
    rating: .93,
    reread: false
  }, {
    title: "This Book is Full of Spiders",
    author: 'David Wong',
    date: 'Feb 21 2015',
    genre: 'Supernatural',
    fiction: true,
    rating: .7,
    reread: false
  }, {
    title: "John Dies at the End",
    author: 'David Wong',
    date: 'Feb 23 2015',
    genre: 'Supernatural',
    fiction: true,
    rating: .7,
    reread: true
  }, {
    title: "The Wise Man's Fear",
    author: 'Patrick Rothfuss',
    date: 'Mar 5 2015',
    genre: 'Fantasy',
    fiction: true,
    rating: .9,
    reread: false
  }, {
    title: "The Pillars of the Earth",
    author: 'Ken Follet',
    date: 'Mar 14 2015',
    genre: 'Historical Fiction',
    fiction: true,
    rating: .94,
    reread: false
  }, {
    title: "Rogues",
    author: 'George R. R. Martin and others',
    date: 'Mar 24 2015',
    genre: 'Fantasy',
    fiction: true,
    rating: .8,
    reread: false
  }, {
    title: "Ringworld",
    author: 'Larry Niven',
    date: 'Mar 28 2015',
    genre: 'SciFi',
    fiction: true,
    rating: .75,
    reread: true
  }, {
    title: "The Stand",
    author: 'Stephen King',
    date: 'Apr 7 2015',
    genre: 'Supernatural',
    fiction: true,
    rating: .79,
    reread: false
  }, {
    title: "Neuromancer",
    author: 'William Gibson',
    date: 'Apr 13 2015',
    genre: 'SciFi',
    fiction: true,
    rating: .8,
    reread: false
  }, {
    title: "Guns, Germs, and Steel",
    author: 'Jared Diamond',
    date: 'Apr 16 2015',
    genre: 'History',
    fiction: false,
    rating: .8,
    reread: false
  }, {
    title: "The Martian",
    author: 'Andy Weir',
    date: 'Apr 22 2015',
    genre: 'SciFi',
    fiction: true,
    rating: .95,
    reread: true
  }, {
    title: "It",
    author: 'Stephen King',
    date: 'Apr 28 2015',
    genre: 'Supernatural',
    fiction: true,
    rating: .795,
    reread: false
  }, {
    title: "SuperFreakonomics",
    author: 'Stephen Dubner/Stephen Levitt',
    date: 'May 8 2015',
    genre: 'Economics',
    fiction: false,
    rating: .8,
    reread: false
  }, {
    title: "Think Like a Freak",
    author: 'Stephen Dubner/Stephen Levitt',
    date: 'May 14 2015',
    genre: 'Economics',
    fiction: false,
    rating: .81,
    reread: false
  }, {
    title: "A Brief History of Time",
    author: 'Stephen Hawking',
    date: 'May 20 2015',
    genre: 'Cosmology',
    fiction: false,
    rating: .8,
    reread: false
  }, {
    title: "When to Rob a Bank",
    author: 'Stephen Dubner/Stephen Levitt',
    date: 'May 26 2015',
    genre: 'Economics',
    fiction: false,
    rating: .8,
    reread: false
  }, {
    title: "Anathem",
    author: 'Neal Stephenson',
    date: 'Jun 19 2015',
    genre: 'SciFi',
    fiction: true,
    rating: .775,
    reread: false
  }, {
    title: "Cryptonomicon",
    author: 'Neal Stephenson',
    date: 'Jul 6 2015',
    genre: 'Historical Fiction',
    fiction: true,
    rating: .785,
    reread: false
  }, {
    title: "Seveneves",
    author: 'Neal Stephenson',
    date: 'Jul 23 2015',
    genre: 'SciFi',
    fiction: true,
    rating: .875,
    reread: false
  }, {
    title: "Snow Crash",
    author: 'Neal Stephenson',
    date: 'Aug 1 2015',
    genre: 'SciFi',
    fiction: true,
    rating: .85,
    reread: false
  }, {
    title: "The Diamond Age",
    author: 'Neal Stephenson',
    date: 'Aug 9 2015',
    genre: 'SciFi',
    fiction: true,
    rating: .735,
    reread: false
  }, {
    title: "What the Dog Saw",
    author: 'Malcom Gladwell',
    date: 'Aug 20 2015',
    genre: 'Various',
    fiction: false,
    rating: .81,
    reread: false
  }, {
    title: "Hallucinations",
    author: 'Oliver Sacks',
    date: 'Aug 28 5 2015',
    genre: 'Neuroscience',
    fiction: false,
    rating: .85,
    reread: false
  }, {
    title: "The Man Who Mistook His Wife for a Hat",
    author: 'Oliver Sacks',
    date: 'Sept 3 2015',
    genre: 'Neuroscience',
    fiction: false,
    rating: .78,
    reread: false
  }, {
    title: "The Mind's Eye",
    author: 'Oliver Sacks',
    date: 'Sept 6 2015',
    genre: 'Neuroscience',
    fiction: false,
    rating: .8,
    reread: false
  }, {
    title: "Awakenings",
    author: 'Oliver Sacks',
    date: 'Sept 10 2015',
    genre: 'Neuroscience',
    fiction: false,
    rating: .75,
    reread: false
  }, {
    title: "David and Goliath",
    author: 'Malcom Gladwell',
    date: 'Sep 16 2015',
    genre: 'Economics',
    fiction: false,
    rating: .85,
    reread: false
  }, {
    title: "Ready Player One",
    author: 'Ernst Cline',
    date: 'Sept 22 2015',
    genre: 'SciFi',
    fiction: true,
    rating: .7,
    reread: false
  }, {
    title: "Flash Boys",
    author: 'Michael Lewis',
    date: 'Sep 25 2015',
    genre: 'Economics',
    fiction: false,
    rating: .95,
    reread: false
  }, {
    title: "The Big Short",
    author: 'Michael Lewis',
    date: 'Sep 28 2015',
    genre: 'Economics',
    fiction: false,
    rating: .9,
    reread: false
  }, {
    title: "Boomerang",
    author: 'Michael Lewis',
    date: 'Sep 30 2015',
    genre: 'Economics',
    fiction: false,
    rating: .9,
    reread: false
  }, {
    title: "Moneyball",
    author: 'Michael Lewis',
    date: 'Oct 3 2015',
    genre: 'Sports / Economics',
    fiction: false,
    rating: .85,
    reread: false
  }, {
    title: "Liar's Poker",
    author: 'Michael Lewis',
    date: 'Oct 5 2015',
    genre: 'Economics',
    fiction: false,
    rating: .85,
    reread: false
  }, {
    title: "Aurora",
    author: 'Kim Stanley Robinson',
    date: 'Oct 11 2015',
    genre: 'SciFi',
    fiction: true,
    rating: .84,
    reread: false
  }, {
    title: "The Practicing Mind",
    author: 'Thomas M. Sterner',
    date: 'Oct 14 2015',
    genre: 'Psychology',
    fiction: false,
    rating: .8,
    reread: false
  }, {
    title: "Misbehaving",
    author: 'Richard Thaler',
    date: 'Oct 16 2015',
    genre: 'Behavioral Economics',
    fiction: false,
    rating: .95,
    reread: false
  }, {
    title: "Boomerang",
    author: 'Michael Lewis',
    date: 'Oct 20 2015',
    genre: 'Economics',
    fiction: false,
    rating: .9,
    reread: true
  }, {
    title: "Thinking Fast and Slow",
    author: 'Daniel Kahneman',
    date: 'Oct 28 2015',
    genre: 'Behavioral Economics',
    fiction: false,
    rating: .98,
    reread: false
  }, {
    title: "How Not to Be Wrong",
    author: 'Jordan Ellenberg',
    date: 'Nov 10 2015',
    genre: 'Mathematics',
    fiction: false,
    rating: .9,
    reread: false
  }, {
    title: "Futuristic Violence and Fancy Suits",
    author: 'David Wong',
    date: 'Nov 15 2015',
    genre: 'SciFi',
    fiction: true,
    rating: .89,
    reread: false
  }, {
    title: "The Black Swan",
    author: 'Nassim Taleb',
    date: 'Nov 24 2015',
    genre: 'Epistemology / Cognitive / Economics',
    fiction: false,
    rating: .99,
    reread: false
  }, {
    title: "The Design of Everyday Things",
    author: 'Donald A. Norman',
    date: 'Nov 28 2015',
    genre: 'Design',
    fiction: false,
    rating: .82,
    reread: false
  }, {
    title: "The New New Thing",
    author: 'Michael Lewis',
    date: 'Dec 2 2015',
    genre: 'Economics',
    fiction: false,
    rating: .83,
    reread: false
  }, {
    title: "Superintelligence: Paths, Dangers, Strategies",
    author: 'Nick Bostrom',
    date: 'Dec 11 2015',
    genre: 'AI / Cognitive / Philosophy',
    fiction: false,
    rating: .935,
    reread: false
  }, {
    title: "Being Mortal",
    author: 'Atul Gawande',
    date: 'Dec 15 2015',
    genre: 'Medicine',
    fiction: false,
    rating: .91,
    reread: false
  }, {
    title: "Incognito: The Secret Lives of the Brain",
    author: 'David Eagleman',
    date: 'Dec 21 2015',
    genre: 'Cognitive / Psychology',
    fiction: false,
    rating: .96,
    reread: false
  }],
  bookOrderings: ['date read', 'title', 'author', 'non/fiction', 'rating'],
  bookToJSX: function bookToJSX(book) {
    var finishDate = new Date(book.date);
    var titleText = book.title;

    if (book.reread) {
      titleText += ' (reread)';
    }

    return React.createElement("div", {
      key: finishDate.getTime(),
      className: "books_row"
    }, React.createElement("div", {
      className: "book_row"
    }, React.createElement("div", {
      className: "book_title"
    }, titleText), React.createElement("div", {
      className: "book_rating_wrapper"
    }, React.createElement("div", {
      className: "book_rating",
      style: {
        width: book.rating * 100 + '%'
      }
    }))), React.createElement("div", {
      className: "book_row"
    }, React.createElement("div", null, book.author), React.createElement("div", null, finishDate.toLocaleDateString())));
  },
  bookComparator: function bookComparator(a, b, ordering) {
    var dateOrd = new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1;

    switch (ordering) {
      default:
        return dateOrd;

      case 1:
        if (a.title === b.title) {
          return dateOrd;
        }

        return a.title > b.title ? 1 : -1;

      case 2:
        if (a.author === b.author) {
          return dateOrd;
        }

        return a.author > b.author ? 1 : -1;

      case 3:
        if (a.fiction === b.fiction) {
          return dateOrd;
        }

        return a.fiction > b.fiction ? 1 : -1;

      case 4:
        if (a.rating === b.rating) {
          return dateOrd;
        }

        return a.rating < b.rating ? 1 : -1;
    }

    ordering = ordering || 0;

    if (ordering === 0) {
      // category sorting
      return a.category < b.category ? 1 : -1;
    } else if (ordering === 1) {
      // skill sorting
      return a.skill < b.skill ? 1 : -1;
    } else {
      // alph sorting
      return a.name > b.name ? 1 : -1;
    }
  },
  // Skill related stuff
  SKILLS: [{
    name: 'Ruby',
    skill: .7,
    category: 'backend'
  }, {
    name: 'Java',
    skill: .6,
    category: 'backend'
  }, {
    name: 'C++',
    skill: .5,
    category: 'backend'
  }, {
    name: 'Python',
    skill: .8,
    category: 'backend'
  }, {
    name: 'CSS',
    skill: .8,
    category: 'web'
  }, {
    name: 'HTML',
    skill: .8,
    category: 'web'
  }, {
    name: 'Javascript',
    skill: .9,
    category: 'web'
  }, {
    name: 'Bash',
    skill: .3,
    category: 'script'
  }, {
    name: 'SQL',
    skill: .5,
    category: 'backend'
  }, {
    name: 'SVN',
    skill: .3,
    category: 'version'
  }, {
    name: 'Git',
    skill: .7,
    category: 'version'
  }, {
    name: 'Matlab',
    skill: .3,
    category: 'math'
  }, {
    name: 'Mathematica',
    skill: .5,
    category: 'math'
  }, {
    name: 'Photoshop',
    skill: .6,
    category: 'adobe'
  }, {
    name: 'Indesign',
    skill: .8,
    category: 'adobe'
  }, {
    name: 'Illustrator',
    skill: .3,
    category: 'adobe'
  }],
  skillOrderings: ['category', 'experience', 'alphabetic'],
  skillToJSX: function skillToJSX(skill) {
    var skillText;

    if (skill.skill <= .3) {
      skillText = '+';
    } else if (skill.skill <= .6) {
      skillText = '++';
    } else {
      skillText = '+++';
    }

    return React.createElement("div", {
      key: skill.name,
      className: "skill_row"
    }, React.createElement("div", null, skill.name), React.createElement("div", null, skillText));
  },
  skillComparator: function skillComparator(a, b, ordering) {
    ordering = ordering || 0;

    if (ordering === 0) {
      // category sorting
      return a.category < b.category ? 1 : -1;
    } else if (ordering === 1) {
      // skill sorting
      return a.skill < b.skill ? 1 : -1;
    } else {
      // alph sorting
      return a.name > b.name ? 1 : -1;
    }
  },
  // Classes related stuff
  CLASSES: [{
    subject: 'MSE',
    number: 100,
    name: 'Engineering Orientation',
    semester: 1,
    category: 2
  }, {
    subject: 'MSE',
    number: 182,
    name: 'Intro to MatSE',
    semester: 1,
    category: 2
  }, {
    subject: 'CS',
    number: 125,
    name: 'Intro to CS',
    semester: 1,
    category: 1
  }, {
    subject: 'CS',
    number: 196,
    name: 'Freshman Honors',
    semester: 1,
    category: 1
  }, {
    subject: 'HIST',
    number: 253,
    name: 'Enlight. to Existentialsm',
    semester: 1,
    category: 0
  }, {
    subject: 'MATH',
    number: 231,
    name: 'Calculus II',
    semester: 1,
    category: 1
  }, {
    subject: 'MATH',
    number: 299,
    name: 'Topics in Mathematics',
    semester: 1,
    category: 1
  }, {
    subject: 'PHIL',
    number: 101,
    name: 'Intro to Philosophy',
    semester: 1,
    category: 0
  }, {
    subject: 'ANTH',
    number: 101,
    name: 'Intro to Anthropology',
    semester: 2,
    category: 0
  }, {
    subject: 'GEOL',
    number: 107,
    name: 'Physical Geology',
    semester: 2,
    category: 0
  }, {
    subject: 'MATH',
    number: 241,
    name: 'Calculus III',
    semester: 2,
    category: 1
  }, {
    subject: 'MATH',
    number: 415,
    name: 'Applied Linear Algebra',
    semester: 2,
    category: 1
  }, {
    subject: 'PHYS',
    number: 211,
    name: 'Univ Physics: Mechanics',
    semester: 2,
    category: 2
  }, {
    subject: 'MATH',
    number: 285,
    name: 'Intro Differential Eq.',
    semester: 3,
    category: 2
  }, {
    subject: 'MATH',
    number: 463,
    name: 'Statistics and Probability',
    semester: 3,
    category: 1
  }, {
    subject: 'PHIL',
    number: 202,
    name: 'Symbolic Logic',
    semester: 3,
    category: 1
  }, {
    subject: 'PHYS',
    number: 212,
    name: 'Univ Physics: Elec & Mag',
    semester: 3,
    category: 2
  }, {
    subject: 'CS',
    number: 225,
    name: 'Data Structures',
    semester: 4,
    category: 1
  }, {
    subject: 'CS',
    number: 357,
    name: 'Numerical Methods I',
    semester: 4,
    category: 1
  }, {
    subject: 'HIST',
    number: 461,
    name: 'Russia: Peter the Great',
    semester: 4,
    category: 0
  }, {
    subject: 'PHYS',
    number: 213,
    name: 'Univ Physics: Thermal',
    semester: 4,
    category: 2
  }, {
    subject: 'PHYS',
    number: 214,
    name: 'Univ Physics: Quantum',
    semester: 4,
    category: 2
  }, {
    subject: 'ARTD',
    number: 215,
    name: 'Introduction to Typography',
    semester: 5,
    category: 0
  }, {
    subject: 'ATMS',
    number: 120,
    name: 'Sev. & Hazardous Weather',
    semester: 5,
    category: 0
  }, {
    subject: 'CS',
    number: 173,
    name: 'Discrete Structures',
    semester: 5,
    category: 1
  }, {
    subject: 'CS',
    number: 440,
    name: 'Artificial Intelligence',
    semester: 5,
    category: 1
  }, {
    subject: 'CHEM',
    number: 232,
    name: 'Organic Chemistry',
    semester: 6,
    category: 2
  }, {
    subject: 'CPSC',
    number: 116,
    name: 'Global Food Production',
    semester: 6,
    category: 0
  }, {
    subject: 'MSE',
    number: 206,
    name: 'Mechanics for MatSE',
    semester: 6,
    category: 2
  }, {
    subject: 'MSE',
    number: 450,
    name: 'Polymer Science & Eng.',
    semester: 6,
    category: 2
  }],
  classOrderings: ['semester', 'subject', 'number', 'alphabetic'],
  classToJSX: function classToJSX(classRow) {
    return React.createElement("div", {
      key: classRow.name,
      className: "class_row"
    }, React.createElement("div", {
      className: "class_name"
    }, classRow.name), React.createElement("div", {
      className: "class_info"
    }, React.createElement("div", null, classRow.subject + '-'), React.createElement("div", null, classRow.number)));
  },
  classComparator: function classComparator(a, b, ordering) {
    ordering = ordering || 0;

    if (ordering === 0) {
      // semester sorting
      return a.semester > b.semester ? 1 : -1;
    } else if (ordering === 1) {
      // subject sorting
      return a.subject > b.subject ? 1 : -1;
    } else if (ordering === 2) {
      // number sorting
      return a.number < b.number ? 1 : -1;
    } else {
      // alph sorting
      return a.name > b.name ? 1 : -1;
    }
  },
  // Work / Projects / Education
  WORK: [{
    title: 'Rdio',
    // title_link: 'http://www.rdio.com',
    job_title: 'Web Team Engineer',
    start_date: '2014',
    end_date: 'Now',
    notes: ['Dropped out of school to pursue a full time software engineering position here', 'Amazing Learning Environment', 'Pitched, created, and deployed a viewport tracker for the content on our homepage', 'Implemented Rdio Select subscription tier on web', 'Upgraded multiple admin pages with better visualizations/UX', 'Working with: javascript(backbone and react), HTML, CSS, SQL, python']
  }, {
    title: 'Rdio',
    // title_link: 'http://www.rdio.com',
    job_title: 'Web Team Intern',
    end_date: '2014',
    notes: ['Finally learned how to really work effectively in a software development team.', 'Best front end training I have experienced. I did not know all the steps to creating and hosting a website, but now this page is an easy weekend project. (current page since rewritten in react)', 'Worked on "music feed", the current rdio.com homepage page.', 'Implemented a user exit survey that collects much more information than before.', 'Added analytics around the site and helped the non-technical staff to query/analyze the data.', 'Worked with: javascript, HTML, CSS, SQL']
  }, {
    title: 'Facebook',
    // title_link: 'http://www.facebook.com',
    job_title: 'Site Integrity Team Intern',
    end_date: '2013',
    notes: ['Worked with content review staff to improve internal tools that had been slowing them down.', 'Really enjoyed the challenge of making an interface that is intuitive and looks good.', 'Productivity could have been better, I was afraid of asking for help because I wanted to look smart. I learned from my experience.', 'Worked with: PHP, HTML, CSS']
  }, {
    title: 'WASHU',
    job_title: 'Medical Imaging Dept. Intern',
    end_date: '2012',
    notes: ['Worked with a self directed team of 3 on tool for XDS medical document transfer protocol.', 'Built test endpoint with ability to select custom datasets that contained relevant file formats.', 'Just enough HIPAA training that I am terrified of touching any medical documents for fear of getting sued.', 'Developed strong distaste for java server faces.', 'Worked with: java, HTML']
  }],
  EDUCATION: [{
    title: 'UIUC',
    start_date: '2011',
    end_date: '2014',
    notes: ['Studied Materials Science and Computer Science.', 'Eclectic class list.', '2nd place in Microsoft Windows Phone hackathon. I won a copy of viva pinata.', 'Participated in Engineering Open House the last 2 years I was there.', 'Dropped out after 3 years to pursue a full time software engineering position.']
  }, {
    title: 'St. Louis Priory School',
    start_date: '2006',
    end_date: '2011',
    notes: ['Tutored Chemistry and Physics for school program. Then proceeded to start much more lucrative independent classroom-style prep courses for Chemistry that I ran for the summers of 2011-12.', 'National Merit Semi-Finalist', 'FIRST robotics team 1329 leader']
  }],
  PROJECTS: [{
    title: 'Text Analyzer Webapp',
    title_link: 'http://textanalyzer.yale-thomas.com/',
    end_date: '2014',
    notes: ['Web app that visualizes word usage throughout long documents (think book series)', 'First attempt at webapp personal project.', 'Created about halfway through my last internship to test out web dev skills.', 'Try it out by clicking on the title above^^', 'Worked with: JS, HTML, CSS']
  }, {
    title: 'Engineering Open House',
    start_date: '2013',
    end_date: '2014',
    notes: ['EOH is a school wide tech demo.', '2013 - Designed, helped assemble, and programmed a Ferrofluid Music Visualizer.', '2014 - Designed, built, and programmed a Morse Code Keyboard.', 'Worked with: hardware, Arduino C, PureData(never again)']
  }, {
    title: 'FIRST Robotics',
    start_date: '2006',
    end_date: '2011',
    notes: ['Team 1329 leader from 2008-2011', 'Head of mechanics team.', 'Learned how to manage a group of high school underclassmen through a large project.', 'Worked with: hardware, java']
  }],
  profileToJSX: function profileToJSX(infoRow) {
    var mainTitle = infoRow.title_link ? React.createElement("a", {
      href: infoRow.title_link
    }, infoRow.title) : infoRow.title;
    var extraTitle = infoRow.job_title ? ' - ' + infoRow.job_title : null;
    var startDate = infoRow.start_date ? infoRow.start_date + ' - ' : null;
    return React.createElement("div", {
      key: infoRow.title + infoRow.end_date,
      className: "info_box"
    }, React.createElement("div", {
      className: "info_header"
    }, React.createElement("div", {
      className: "info_name"
    }, mainTitle, extraTitle), React.createElement("div", {
      className: "info_dates"
    }, startDate, infoRow.end_date)), React.createElement("ul", null, infoRow.notes.map(function (note) {
      return React.createElement("li", null, note);
    })));
  },
  profileComparator: function profileComparator(a, b, order) {
    if (a.end_date === 'Now') {
      return -1;
    }

    if (b.end_date === 'Now') {
      return 1;
    }

    return a.end_date < b.end_date ? 1 : -1;
  }
});

},{"react":12}],6:[function(require,module,exports){
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

'use strict';
/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],7:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],8:[function(require,module,exports){
(function (process){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var printWarning = function() {};

if (process.env.NODE_ENV !== 'production') {
  var ReactPropTypesSecret = require('./lib/ReactPropTypesSecret');
  var loggedTypeFailures = {};

  printWarning = function(text) {
    var message = 'Warning: ' + text;
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            var err = Error(
              (componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' +
              'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.'
            );
            err.name = 'Invariant Violation';
            throw err;
          }
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        if (error && !(error instanceof Error)) {
          printWarning(
            (componentName || 'React class') + ': type specification of ' +
            location + ' `' + typeSpecName + '` is invalid; the type checker ' +
            'function must return `null` or an `Error` but returned a ' + typeof error + '. ' +
            'You may have forgotten to pass an argument to the type checker ' +
            'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' +
            'shape all require an argument).'
          )

        }
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          printWarning(
            'Failed ' + location + ' type: ' + error.message + (stack != null ? stack : '')
          );
        }
      }
    }
  }
}

module.exports = checkPropTypes;

}).call(this,require('_process'))

},{"./lib/ReactPropTypesSecret":9,"_process":7}],9:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;

},{}],10:[function(require,module,exports){
(function (process){
/** @license React v16.6.0
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';



if (process.env.NODE_ENV !== "production") {
  (function() {
'use strict';

var _assign = require('object-assign');
var checkPropTypes = require('prop-types/checkPropTypes');

// TODO: this is special because it gets imported during build.

var ReactVersion = '16.6.0';

// The Symbol used to tag the ReactElement-like types. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.
var hasSymbol = typeof Symbol === 'function' && Symbol.for;

var REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for('react.element') : 0xeac7;
var REACT_PORTAL_TYPE = hasSymbol ? Symbol.for('react.portal') : 0xeaca;
var REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for('react.fragment') : 0xeacb;
var REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for('react.strict_mode') : 0xeacc;
var REACT_PROFILER_TYPE = hasSymbol ? Symbol.for('react.profiler') : 0xead2;
var REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for('react.provider') : 0xeacd;
var REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for('react.context') : 0xeace;
var REACT_CONCURRENT_MODE_TYPE = hasSymbol ? Symbol.for('react.concurrent_mode') : 0xeacf;
var REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for('react.forward_ref') : 0xead0;
var REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for('react.suspense') : 0xead1;
var REACT_MEMO_TYPE = hasSymbol ? Symbol.for('react.memo') : 0xead3;
var REACT_LAZY_TYPE = hasSymbol ? Symbol.for('react.lazy') : 0xead4;

var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';

function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }
  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }
  return null;
}

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function () {};

{
  validateFormat = function (format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error = void 0;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

// Relying on the `invariant()` implementation lets us
// preserve the format and params in the www builds.

/**
 * Forked from fbjs/warning:
 * https://github.com/facebook/fbjs/blob/e66ba20ad5be433eb54423f2b097d829324d9de6/packages/fbjs/src/__forks__/warning.js
 *
 * Only change is we use console.warn instead of console.error,
 * and do nothing when 'console' is not supported.
 * This really simplifies the code.
 * ---
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var lowPriorityWarning = function () {};

{
  var printWarning = function (format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.warn(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  lowPriorityWarning = function (condition, format) {
    if (format === undefined) {
      throw new Error('`lowPriorityWarning(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

var lowPriorityWarning$1 = lowPriorityWarning;

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warningWithoutStack = function () {};

{
  warningWithoutStack = function (condition, format) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    if (format === undefined) {
      throw new Error('`warningWithoutStack(condition, format, ...args)` requires a warning ' + 'message argument');
    }
    if (args.length > 8) {
      // Check before the condition to catch violations early.
      throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
    }
    if (condition) {
      return;
    }
    if (typeof console !== 'undefined') {
      var _args$map = args.map(function (item) {
        return '' + item;
      }),
          a = _args$map[0],
          b = _args$map[1],
          c = _args$map[2],
          d = _args$map[3],
          e = _args$map[4],
          f = _args$map[5],
          g = _args$map[6],
          h = _args$map[7];

      var message = 'Warning: ' + format;

      // We intentionally don't use spread (or .apply) because it breaks IE9:
      // https://github.com/facebook/react/issues/13610
      switch (args.length) {
        case 0:
          console.error(message);
          break;
        case 1:
          console.error(message, a);
          break;
        case 2:
          console.error(message, a, b);
          break;
        case 3:
          console.error(message, a, b, c);
          break;
        case 4:
          console.error(message, a, b, c, d);
          break;
        case 5:
          console.error(message, a, b, c, d, e);
          break;
        case 6:
          console.error(message, a, b, c, d, e, f);
          break;
        case 7:
          console.error(message, a, b, c, d, e, f, g);
          break;
        case 8:
          console.error(message, a, b, c, d, e, f, g, h);
          break;
        default:
          throw new Error('warningWithoutStack() currently supports at most 8 arguments.');
      }
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      var argIndex = 0;
      var _message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      throw new Error(_message);
    } catch (x) {}
  };
}

var warningWithoutStack$1 = warningWithoutStack;

var didWarnStateUpdateForUnmountedComponent = {};

function warnNoop(publicInstance, callerName) {
  {
    var _constructor = publicInstance.constructor;
    var componentName = _constructor && (_constructor.displayName || _constructor.name) || 'ReactClass';
    var warningKey = componentName + '.' + callerName;
    if (didWarnStateUpdateForUnmountedComponent[warningKey]) {
      return;
    }
    warningWithoutStack$1(false, "Can't call %s on a component that is not yet mounted. " + 'This is a no-op, but it might indicate a bug in your application. ' + 'Instead, assign to `this.state` directly or define a `state = {};` ' + 'class property with the desired state in the %s component.', callerName, componentName);
    didWarnStateUpdateForUnmountedComponent[warningKey] = true;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {
  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState');
  }
};

var emptyObject = {};
{
  Object.freeze(emptyObject);
}

/**
 * Base class helpers for the updating state of a component.
 */
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowPriorityWarning$1(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]);
        return undefined;
      }
    });
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 */
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy();
pureComponentPrototype.constructor = PureComponent;
// Avoid an extra prototype jump for these methods.
_assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;

// an immutable object with a single mutable value
function createRef() {
  var refObject = {
    current: null
  };
  {
    Object.seal(refObject);
  }
  return refObject;
}

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {
  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null,
  currentDispatcher: null
};

var BEFORE_SLASH_RE = /^(.*)[\\\/]/;

var describeComponentFrame = function (name, source, ownerName) {
  var sourceInfo = '';
  if (source) {
    var path = source.fileName;
    var fileName = path.replace(BEFORE_SLASH_RE, '');
    {
      // In DEV, include code for a common special case:
      // prefer "folder/index.js" instead of just "index.js".
      if (/^index\./.test(fileName)) {
        var match = path.match(BEFORE_SLASH_RE);
        if (match) {
          var pathBeforeSlash = match[1];
          if (pathBeforeSlash) {
            var folderName = pathBeforeSlash.replace(BEFORE_SLASH_RE, '');
            fileName = folderName + '/' + fileName;
          }
        }
      }
    }
    sourceInfo = ' (at ' + fileName + ':' + source.lineNumber + ')';
  } else if (ownerName) {
    sourceInfo = ' (created by ' + ownerName + ')';
  }
  return '\n    in ' + (name || 'Unknown') + sourceInfo;
};

var Resolved = 1;


function refineResolvedLazyComponent(lazyComponent) {
  return lazyComponent._status === Resolved ? lazyComponent._result : null;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var functionName = innerType.displayName || innerType.name || '';
  return outerType.displayName || (functionName !== '' ? wrapperName + '(' + functionName + ')' : wrapperName);
}

function getComponentName(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }
  {
    if (typeof type.tag === 'number') {
      warningWithoutStack$1(false, 'Received an unexpected object in getComponentName(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }
  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }
  if (typeof type === 'string') {
    return type;
  }
  switch (type) {
    case REACT_CONCURRENT_MODE_TYPE:
      return 'ConcurrentMode';
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';
    case REACT_PORTAL_TYPE:
      return 'Portal';
    case REACT_PROFILER_TYPE:
      return 'Profiler';
    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';
    case REACT_SUSPENSE_TYPE:
      return 'Suspense';
  }
  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return 'Context.Consumer';
      case REACT_PROVIDER_TYPE:
        return 'Context.Provider';
      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_LAZY_TYPE:
        {
          var thenable = type;
          var resolvedThenable = refineResolvedLazyComponent(thenable);
          if (resolvedThenable) {
            return getComponentName(resolvedThenable);
          }
        }
    }
  }
  return null;
}

var ReactDebugCurrentFrame = {};

var currentlyValidatingElement = null;

function setCurrentlyValidatingElement(element) {
  {
    currentlyValidatingElement = element;
  }
}

{
  // Stack implementation injected by the current renderer.
  ReactDebugCurrentFrame.getCurrentStack = null;

  ReactDebugCurrentFrame.getStackAddendum = function () {
    var stack = '';

    // Add an extra top frame while an element is being validated
    if (currentlyValidatingElement) {
      var name = getComponentName(currentlyValidatingElement.type);
      var owner = currentlyValidatingElement._owner;
      stack += describeComponentFrame(name, currentlyValidatingElement._source, owner && getComponentName(owner.type));
    }

    // Delegate to the injected renderer-specific implementation
    var impl = ReactDebugCurrentFrame.getCurrentStack;
    if (impl) {
      stack += impl() || '';
    }

    return stack;
  };
}

var ReactSharedInternals = {
  ReactCurrentOwner: ReactCurrentOwner,
  // Used by renderers to avoid bundling object-assign twice in UMD bundles:
  assign: _assign
};

{
  _assign(ReactSharedInternals, {
    // These should not be included in production.
    ReactDebugCurrentFrame: ReactDebugCurrentFrame,
    // Shim for React DOM 16.0.0 which still destructured (but not used) this.
    // TODO: remove in React 17.0.
    ReactComponentTreeHook: {}
  });
}

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = warningWithoutStack$1;

{
  warning = function (condition, format) {
    if (condition) {
      return;
    }
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();
    // eslint-disable-next-line react-internal/warning-and-invariant-args

    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    warningWithoutStack$1.apply(undefined, [false, format + '%s'].concat(args, [stack]));
  };
}

var warning$1 = warning;

var hasOwnProperty = Object.prototype.hasOwnProperty;

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown = void 0;
var specialPropRefWarningShown = void 0;

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      warningWithoutStack$1(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      warningWithoutStack$1(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName);
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    });
    // self and source are DEV only properties.
    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    });
    // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.
    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */
function createElement(type, config, children) {
  var propName = void 0;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  {
    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }
      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}

/**
 * Return a function that produces ReactElements of a given type.
 * See https://reactjs.org/docs/react-api.html#createfactory
 */


function cloneAndReplaceKey(oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
}

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */
function cloneElement(element, config, children) {
  !!(element === null || element === undefined) ? invariant(false, 'React.cloneElement(...): The argument must be a React element, but you passed %s.', element) : void 0;

  var propName = void 0;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps = void 0;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
}

/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */
function isValidElement(object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
}

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */
function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

var POOL_SIZE = 10;
var traverseContextPool = [];
function getPooledTraverseContext(mapResult, keyPrefix, mapFunction, mapContext) {
  if (traverseContextPool.length) {
    var traverseContext = traverseContextPool.pop();
    traverseContext.result = mapResult;
    traverseContext.keyPrefix = keyPrefix;
    traverseContext.func = mapFunction;
    traverseContext.context = mapContext;
    traverseContext.count = 0;
    return traverseContext;
  } else {
    return {
      result: mapResult,
      keyPrefix: keyPrefix,
      func: mapFunction,
      context: mapContext,
      count: 0
    };
  }
}

function releaseTraverseContext(traverseContext) {
  traverseContext.result = null;
  traverseContext.keyPrefix = null;
  traverseContext.func = null;
  traverseContext.context = null;
  traverseContext.count = 0;
  if (traverseContextPool.length < POOL_SIZE) {
    traverseContextPool.push(traverseContext);
  }
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  var invokeCallback = false;

  if (children === null) {
    invokeCallback = true;
  } else {
    switch (type) {
      case 'string':
      case 'number':
        invokeCallback = true;
        break;
      case 'object':
        switch (children.$$typeof) {
          case REACT_ELEMENT_TYPE:
          case REACT_PORTAL_TYPE:
            invokeCallback = true;
        }
    }
  }

  if (invokeCallback) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child = void 0;
  var nextName = void 0;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (typeof iteratorFn === 'function') {
      {
        // Warn about using Maps as children
        if (iteratorFn === children.entries) {
          !didWarnAboutMaps ? warning$1(false, 'Using Maps as children is unsupported and will likely yield ' + 'unexpected results. Convert it to a sequence/iterable of keyed ' + 'ReactElements instead.') : void 0;
          didWarnAboutMaps = true;
        }
      }

      var iterator = iteratorFn.call(children);
      var step = void 0;
      var ii = 0;
      while (!(step = iterator.next()).done) {
        child = step.value;
        nextName = nextNamePrefix + getComponentKey(child, ii++);
        subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
      }
    } else if (type === 'object') {
      var addendum = '';
      {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead.' + ReactDebugCurrentFrame.getStackAddendum();
      }
      var childrenString = '' + children;
      invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum);
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (typeof component === 'object' && component !== null && component.key != null) {
    // Explicit key
    return escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = getPooledTraverseContext(null, null, forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  releaseTraverseContext(traverseContext);
}

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, function (c) {
      return c;
    });
  } else if (mappedChild != null) {
    if (isValidElement(mappedChild)) {
      mappedChild = cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = getPooledTraverseContext(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  releaseTraverseContext(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children) {
  return traverseAllChildren(children, function () {
    return null;
  }, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, function (child) {
    return child;
  });
  return result;
}

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !isValidElement(children) ? invariant(false, 'React.Children.only expected to receive a single React element child.') : void 0;
  return children;
}

function createContext(defaultValue, calculateChangedBits) {
  if (calculateChangedBits === undefined) {
    calculateChangedBits = null;
  } else {
    {
      !(calculateChangedBits === null || typeof calculateChangedBits === 'function') ? warningWithoutStack$1(false, 'createContext: Expected the optional second argument to be a ' + 'function. Instead received: %s', calculateChangedBits) : void 0;
    }
  }

  var context = {
    $$typeof: REACT_CONTEXT_TYPE,
    _calculateChangedBits: calculateChangedBits,
    // As a workaround to support multiple concurrent renderers, we categorize
    // some renderers as primary and others as secondary. We only expect
    // there to be two concurrent renderers at most: React Native (primary) and
    // Fabric (secondary); React DOM (primary) and React ART (secondary).
    // Secondary renderers store their context values on separate fields.
    _currentValue: defaultValue,
    _currentValue2: defaultValue,
    // These are circular
    Provider: null,
    Consumer: null
  };

  context.Provider = {
    $$typeof: REACT_PROVIDER_TYPE,
    _context: context
  };

  var hasWarnedAboutUsingNestedContextConsumers = false;
  var hasWarnedAboutUsingConsumerProvider = false;

  {
    // A separate object, but proxies back to the original context object for
    // backwards compatibility. It has a different $$typeof, so we can properly
    // warn for the incorrect usage of Context as a Consumer.
    var Consumer = {
      $$typeof: REACT_CONTEXT_TYPE,
      _context: context,
      _calculateChangedBits: context._calculateChangedBits
    };
    // $FlowFixMe: Flow complains about not setting a value, which is intentional here
    Object.defineProperties(Consumer, {
      Provider: {
        get: function () {
          if (!hasWarnedAboutUsingConsumerProvider) {
            hasWarnedAboutUsingConsumerProvider = true;
            warning$1(false, 'Rendering <Context.Consumer.Provider> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Provider> instead?');
          }
          return context.Provider;
        },
        set: function (_Provider) {
          context.Provider = _Provider;
        }
      },
      _currentValue: {
        get: function () {
          return context._currentValue;
        },
        set: function (_currentValue) {
          context._currentValue = _currentValue;
        }
      },
      _currentValue2: {
        get: function () {
          return context._currentValue2;
        },
        set: function (_currentValue2) {
          context._currentValue2 = _currentValue2;
        }
      },
      Consumer: {
        get: function () {
          if (!hasWarnedAboutUsingNestedContextConsumers) {
            hasWarnedAboutUsingNestedContextConsumers = true;
            warning$1(false, 'Rendering <Context.Consumer.Consumer> is not supported and will be removed in ' + 'a future major release. Did you mean to render <Context.Consumer> instead?');
          }
          return context.Consumer;
        }
      }
    });
    // $FlowFixMe: Flow complains about missing properties because it doesn't understand defineProperty
    context.Consumer = Consumer;
  }

  {
    context._currentRenderer = null;
    context._currentRenderer2 = null;
  }

  return context;
}

function lazy(ctor) {
  return {
    $$typeof: REACT_LAZY_TYPE,
    _ctor: ctor,
    // React uses these fields to store the result.
    _status: -1,
    _result: null
  };
}

function forwardRef(render) {
  {
    if (typeof render !== 'function') {
      warningWithoutStack$1(false, 'forwardRef requires a render function but was given %s.', render === null ? 'null' : typeof render);
    } else {
      !(
      // Do not warn for 0 arguments because it could be due to usage of the 'arguments' object
      render.length === 0 || render.length === 2) ? warningWithoutStack$1(false, 'forwardRef render functions accept exactly two parameters: props and ref. %s', render.length === 1 ? 'Did you forget to use the ref parameter?' : 'Any additional parameter will be undefined.') : void 0;
    }

    if (render != null) {
      !(render.defaultProps == null && render.propTypes == null) ? warningWithoutStack$1(false, 'forwardRef render functions do not support propTypes or defaultProps. ' + 'Did you accidentally pass a React component?') : void 0;
    }
  }

  return {
    $$typeof: REACT_FORWARD_REF_TYPE,
    render: render
  };
}

function isValidElementType(type) {
  return typeof type === 'string' || typeof type === 'function' ||
  // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
  type === REACT_FRAGMENT_TYPE || type === REACT_CONCURRENT_MODE_TYPE || type === REACT_PROFILER_TYPE || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || typeof type === 'object' && type !== null && (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE);
}

function memo(type, compare) {
  {
    if (!isValidElementType(type)) {
      warningWithoutStack$1(false, 'memo: The first argument must be a component. Instead ' + 'received: %s', type === null ? 'null' : typeof type);
    }
  }
  return {
    $$typeof: REACT_MEMO_TYPE,
    type: type,
    compare: compare === undefined ? null : compare
  };
}

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

var propTypesMisspellWarningShown = void 0;

{
  propTypesMisspellWarningShown = false;
}

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = getComponentName(ReactCurrentOwner.current.type);
    if (name) {
      return '\n\nCheck the render method of `' + name + '`.';
    }
  }
  return '';
}

function getSourceInfoErrorAddendum(elementProps) {
  if (elementProps !== null && elementProps !== undefined && elementProps.__source !== undefined) {
    var source = elementProps.__source;
    var fileName = source.fileName.replace(/^.*[\\\/]/, '');
    var lineNumber = source.lineNumber;
    return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = '\n\nCheck the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
    return;
  }
  ownerHasKeyUseWarning[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + getComponentName(element._owner.type) + '.';
  }

  setCurrentlyValidatingElement(element);
  {
    warning$1(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.', currentComponentErrorInfo, childOwner);
  }
  setCurrentlyValidatingElement(null);
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    if (typeof iteratorFn === 'function') {
      // Entry iterators used to provide implicit keys,
      // but now we print a separate warning for them later.
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step = void 0;
        while (!(step = iterator.next()).done) {
          if (isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var type = element.type;
  var name = void 0,
      propTypes = void 0;
  if (typeof type === 'function') {
    // Class or function component
    name = type.displayName || type.name;
    propTypes = type.propTypes;
  } else if (typeof type === 'object' && type !== null && type.$$typeof === REACT_FORWARD_REF_TYPE) {
    // ForwardRef
    var functionName = type.render.displayName || type.render.name || '';
    name = type.displayName || (functionName !== '' ? 'ForwardRef(' + functionName + ')' : 'ForwardRef');
    propTypes = type.propTypes;
  } else {
    return;
  }
  if (propTypes) {
    setCurrentlyValidatingElement(element);
    checkPropTypes(propTypes, element.props, 'prop', name, ReactDebugCurrentFrame.getStackAddendum);
    setCurrentlyValidatingElement(null);
  } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
    propTypesMisspellWarningShown = true;
    warningWithoutStack$1(false, 'Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', name || 'Unknown');
  }
  if (typeof type.getDefaultProps === 'function') {
    !type.getDefaultProps.isReactClassApproved ? warningWithoutStack$1(false, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */
function validateFragmentProps(fragment) {
  setCurrentlyValidatingElement(fragment);

  var keys = Object.keys(fragment.props);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (key !== 'children' && key !== 'key') {
      warning$1(false, 'Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);
      break;
    }
  }

  if (fragment.ref !== null) {
    warning$1(false, 'Invalid attribute `ref` supplied to `React.Fragment`.');
  }

  setCurrentlyValidatingElement(null);
}

function createElementWithValidation(type, props, children) {
  var validType = isValidElementType(type);

  // We warn in this case but don't throw. We expect the element creation to
  // succeed and there will likely be errors in render.
  if (!validType) {
    var info = '';
    if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
      info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
    }

    var sourceInfo = getSourceInfoErrorAddendum(props);
    if (sourceInfo) {
      info += sourceInfo;
    } else {
      info += getDeclarationErrorAddendum();
    }

    var typeString = void 0;
    if (type === null) {
      typeString = 'null';
    } else if (Array.isArray(type)) {
      typeString = 'array';
    } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
      typeString = '<' + (getComponentName(type.type) || 'Unknown') + ' />';
      info = ' Did you accidentally export a JSX literal instead of a component?';
    } else {
      typeString = typeof type;
    }

    warning$1(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
  }

  var element = createElement.apply(this, arguments);

  // The result can be nullish if a mock or a custom function is used.
  // TODO: Drop this when these are no longer allowed as the type argument.
  if (element == null) {
    return element;
  }

  // Skip key warning if the type isn't valid since our key validation logic
  // doesn't expect a non-string/function type and can throw confusing errors.
  // We don't want exception behavior to differ between dev and prod.
  // (Rendering will throw with a helpful message and as soon as the type is
  // fixed, the key warnings will appear.)
  if (validType) {
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], type);
    }
  }

  if (type === REACT_FRAGMENT_TYPE) {
    validateFragmentProps(element);
  } else {
    validatePropTypes(element);
  }

  return element;
}

function createFactoryWithValidation(type) {
  var validatedFactory = createElementWithValidation.bind(null, type);
  validatedFactory.type = type;
  // Legacy hook: remove it
  {
    Object.defineProperty(validatedFactory, 'type', {
      enumerable: false,
      get: function () {
        lowPriorityWarning$1(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.');
        Object.defineProperty(this, 'type', {
          value: type
        });
        return type;
      }
    });
  }

  return validatedFactory;
}

function cloneElementWithValidation(element, props, children) {
  var newElement = cloneElement.apply(this, arguments);
  for (var i = 2; i < arguments.length; i++) {
    validateChildKeys(arguments[i], newElement.type);
  }
  validatePropTypes(newElement);
  return newElement;
}

var React = {
  Children: {
    map: mapChildren,
    forEach: forEachChildren,
    count: countChildren,
    toArray: toArray,
    only: onlyChild
  },

  createRef: createRef,
  Component: Component,
  PureComponent: PureComponent,

  createContext: createContext,
  forwardRef: forwardRef,
  lazy: lazy,
  memo: memo,

  Fragment: REACT_FRAGMENT_TYPE,
  StrictMode: REACT_STRICT_MODE_TYPE,
  unstable_ConcurrentMode: REACT_CONCURRENT_MODE_TYPE,
  Suspense: REACT_SUSPENSE_TYPE,
  unstable_Profiler: REACT_PROFILER_TYPE,

  createElement: createElementWithValidation,
  cloneElement: cloneElementWithValidation,
  createFactory: createFactoryWithValidation,
  isValidElement: isValidElement,

  version: ReactVersion,

  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: ReactSharedInternals
};



var React$2 = Object.freeze({
	default: React
});

var React$3 = ( React$2 && React ) || React$2;

// TODO: decide on the top-level export form.
// This is hacky but makes it work with both Rollup and Jest.
var react = React$3.default || React$3;

module.exports = react;
  })();
}

}).call(this,require('_process'))

},{"_process":7,"object-assign":6,"prop-types/checkPropTypes":8}],11:[function(require,module,exports){
/** @license React v16.6.0
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';var k=require("object-assign"),n="function"===typeof Symbol&&Symbol.for,p=n?Symbol.for("react.element"):60103,q=n?Symbol.for("react.portal"):60106,r=n?Symbol.for("react.fragment"):60107,t=n?Symbol.for("react.strict_mode"):60108,u=n?Symbol.for("react.profiler"):60114,v=n?Symbol.for("react.provider"):60109,w=n?Symbol.for("react.context"):60110,x=n?Symbol.for("react.concurrent_mode"):60111,y=n?Symbol.for("react.forward_ref"):60112,z=n?Symbol.for("react.suspense"):60113,A=n?Symbol.for("react.memo"):
60115,B=n?Symbol.for("react.lazy"):60116,C="function"===typeof Symbol&&Symbol.iterator;function aa(a,b,e,c,d,g,h,f){if(!a){a=void 0;if(void 0===b)a=Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");else{var l=[e,c,d,g,h,f],m=0;a=Error(b.replace(/%s/g,function(){return l[m++]}));a.name="Invariant Violation"}a.framesToPop=1;throw a;}}
function D(a){for(var b=arguments.length-1,e="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=0;c<b;c++)e+="&args[]="+encodeURIComponent(arguments[c+1]);aa(!1,"Minified React error #"+a+"; visit %s for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ",e)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},F={};
function G(a,b,e){this.props=a;this.context=b;this.refs=F;this.updater=e||E}G.prototype.isReactComponent={};G.prototype.setState=function(a,b){"object"!==typeof a&&"function"!==typeof a&&null!=a?D("85"):void 0;this.updater.enqueueSetState(this,a,b,"setState")};G.prototype.forceUpdate=function(a){this.updater.enqueueForceUpdate(this,a,"forceUpdate")};function H(){}H.prototype=G.prototype;function I(a,b,e){this.props=a;this.context=b;this.refs=F;this.updater=e||E}var J=I.prototype=new H;
J.constructor=I;k(J,G.prototype);J.isPureReactComponent=!0;var K={current:null,currentDispatcher:null},L=Object.prototype.hasOwnProperty,M={key:!0,ref:!0,__self:!0,__source:!0};
function N(a,b,e){var c=void 0,d={},g=null,h=null;if(null!=b)for(c in void 0!==b.ref&&(h=b.ref),void 0!==b.key&&(g=""+b.key),b)L.call(b,c)&&!M.hasOwnProperty(c)&&(d[c]=b[c]);var f=arguments.length-2;if(1===f)d.children=e;else if(1<f){for(var l=Array(f),m=0;m<f;m++)l[m]=arguments[m+2];d.children=l}if(a&&a.defaultProps)for(c in f=a.defaultProps,f)void 0===d[c]&&(d[c]=f[c]);return{$$typeof:p,type:a,key:g,ref:h,props:d,_owner:K.current}}
function ba(a,b){return{$$typeof:p,type:a.type,key:b,ref:a.ref,props:a.props,_owner:a._owner}}function O(a){return"object"===typeof a&&null!==a&&a.$$typeof===p}function escape(a){var b={"=":"=0",":":"=2"};return"$"+(""+a).replace(/[=:]/g,function(a){return b[a]})}var P=/\/+/g,Q=[];function R(a,b,e,c){if(Q.length){var d=Q.pop();d.result=a;d.keyPrefix=b;d.func=e;d.context=c;d.count=0;return d}return{result:a,keyPrefix:b,func:e,context:c,count:0}}
function S(a){a.result=null;a.keyPrefix=null;a.func=null;a.context=null;a.count=0;10>Q.length&&Q.push(a)}
function T(a,b,e,c){var d=typeof a;if("undefined"===d||"boolean"===d)a=null;var g=!1;if(null===a)g=!0;else switch(d){case "string":case "number":g=!0;break;case "object":switch(a.$$typeof){case p:case q:g=!0}}if(g)return e(c,a,""===b?"."+U(a,0):b),1;g=0;b=""===b?".":b+":";if(Array.isArray(a))for(var h=0;h<a.length;h++){d=a[h];var f=b+U(d,h);g+=T(d,f,e,c)}else if(null===a||"object"!==typeof a?f=null:(f=C&&a[C]||a["@@iterator"],f="function"===typeof f?f:null),"function"===typeof f)for(a=f.call(a),h=
0;!(d=a.next()).done;)d=d.value,f=b+U(d,h++),g+=T(d,f,e,c);else"object"===d&&(e=""+a,D("31","[object Object]"===e?"object with keys {"+Object.keys(a).join(", ")+"}":e,""));return g}function V(a,b,e){return null==a?0:T(a,"",b,e)}function U(a,b){return"object"===typeof a&&null!==a&&null!=a.key?escape(a.key):b.toString(36)}function ca(a,b){a.func.call(a.context,b,a.count++)}
function da(a,b,e){var c=a.result,d=a.keyPrefix;a=a.func.call(a.context,b,a.count++);Array.isArray(a)?W(a,c,e,function(a){return a}):null!=a&&(O(a)&&(a=ba(a,d+(!a.key||b&&b.key===a.key?"":(""+a.key).replace(P,"$&/")+"/")+e)),c.push(a))}function W(a,b,e,c,d){var g="";null!=e&&(g=(""+e).replace(P,"$&/")+"/");b=R(b,g,c,d);V(a,da,b);S(b)}
var X={Children:{map:function(a,b,e){if(null==a)return a;var c=[];W(a,c,null,b,e);return c},forEach:function(a,b,e){if(null==a)return a;b=R(null,null,b,e);V(a,ca,b);S(b)},count:function(a){return V(a,function(){return null},null)},toArray:function(a){var b=[];W(a,b,null,function(a){return a});return b},only:function(a){O(a)?void 0:D("143");return a}},createRef:function(){return{current:null}},Component:G,PureComponent:I,createContext:function(a,b){void 0===b&&(b=null);a={$$typeof:w,_calculateChangedBits:b,
_currentValue:a,_currentValue2:a,Provider:null,Consumer:null};a.Provider={$$typeof:v,_context:a};return a.Consumer=a},forwardRef:function(a){return{$$typeof:y,render:a}},lazy:function(a){return{$$typeof:B,_ctor:a,_status:-1,_result:null}},memo:function(a,b){return{$$typeof:A,type:a,compare:void 0===b?null:b}},Fragment:r,StrictMode:t,unstable_ConcurrentMode:x,Suspense:z,unstable_Profiler:u,createElement:N,cloneElement:function(a,b,e){null===a||void 0===a?D("267",a):void 0;var c=void 0,d=k({},a.props),
g=a.key,h=a.ref,f=a._owner;if(null!=b){void 0!==b.ref&&(h=b.ref,f=K.current);void 0!==b.key&&(g=""+b.key);var l=void 0;a.type&&a.type.defaultProps&&(l=a.type.defaultProps);for(c in b)L.call(b,c)&&!M.hasOwnProperty(c)&&(d[c]=void 0===b[c]&&void 0!==l?l[c]:b[c])}c=arguments.length-2;if(1===c)d.children=e;else if(1<c){l=Array(c);for(var m=0;m<c;m++)l[m]=arguments[m+2];d.children=l}return{$$typeof:p,type:a.type,key:g,ref:h,props:d,_owner:f}},createFactory:function(a){var b=N.bind(null,a);b.type=a;return b},
isValidElement:O,version:"16.6.0",__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED:{ReactCurrentOwner:K,assign:k}},Y={default:X},Z=Y&&X||Y;module.exports=Z.default||Z;

},{"object-assign":6}],12:[function(require,module,exports){
(function (process){
'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}

}).call(this,require('_process'))

},{"./cjs/react.development.js":10,"./cjs/react.production.min.js":11,"_process":7}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9IZWFkZXIucmVhY3QuanMiLCJqcy9JbmZvTGlzdC5yZWFjdC5qcyIsImpzL1N0eWxlTWVudS5yZWFjdC5qcyIsImpzL2FwcC5qcyIsImpzL2NvbnRlbnQuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcy5qcyIsIm5vZGVfbW9kdWxlcy9wcm9wLXR5cGVzL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9janMvcmVhY3QuZGV2ZWxvcG1lbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvY2pzL3JlYWN0LnByb2R1Y3Rpb24ubWluLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxJQUFJLEtBQUssR0FBRyxPQUFPLENBQW5CLE9BQW1CLENBQW5COztBQUVBLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBTCxXQUFBLENBQWtCO0FBQUEsRUFBQSxXQUFBLEVBQUEsUUFBQTtBQUM3QixFQUFBLFNBQVMsRUFBRTtBQUNULElBQUEsSUFBSSxFQUFFLEtBQUssQ0FBTCxTQUFBLENBREcsTUFBQTtBQUVULElBQUEsS0FBSyxFQUFFLEtBQUssQ0FBTCxTQUFBLENBRkUsTUFBQTtBQUdULElBQUEsT0FBTyxFQUFFLEtBQUssQ0FBTCxTQUFBLENBQWdCO0FBSGhCLEdBRGtCO0FBTTdCLEVBQUEsTUFBTSxFQUFFLFNBQUEsTUFBQSxHQUFXO0FBQ2pCLFdBQ0UsS0FBQSxDQUFBLGFBQUEsQ0FBQSxLQUFBLEVBQUE7QUFBSyxNQUFBLFNBQVMsRUFBRyxLQUFBLEtBQUEsQ0FBQSxLQUFBLElBQUEsTUFBQSxHQUFBLDJCQUFBLEdB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LENBQUE7QUFBWTs7QUFDeEMsUUFBSSxDQUFDLENBQUQsUUFBQSxLQUFKLEtBQUEsRUFBMEI7QUFBRSxhQUFBLENBQUE7QUFBVzs7QUFDdkMsV0FBTyxDQUFDLENBQUQsUUFBQSxHQUFhLENBQUMsQ0FBZCxRQUFBLEdBQUEsQ0FBQSxHQUE4QixDQUFyQyxDQUFBO0FBQ0Q7QUEzdkI0QixDQUFkLENBQWpCOzs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeExBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMzRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDNXNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xuXG52YXIgSGVhZGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBwcm9wVHlwZXM6IHtcbiAgICB0ZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGFsaWduOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgIGNvbnRlbnQ6IFJlYWN0LlByb3BUeXBlcy5lbGVtZW50XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy5hbGlnbiA9PSAnbGVmdCcgPyBcInNlY3Rpb25faGVhZGVyIGFsaWduX2xlZnRcIiA6IFwic2VjdGlvbl9oZWFkZXJcIiB9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1fd3JhcHBlclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyX2l0ZW0gaGVhZGVyX3RpdGxlXCI+e3RoaXMucHJvcHMudGV4dH08L2Rpdj57dGhpcy5wcm9wcy5jb250ZW50ID8gKDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyX2l0ZW0gaGVhZGVyX2J1dHRvblwiPnt0aGlzLnByb3BzLmNvbnRlbnR9PC9kaXY+KSA6ICcnfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGhyLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhlYWRlcjtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgU3R5bGVNZW51ID0gcmVxdWlyZSgnLi9TdHlsZU1lbnUucmVhY3QuanMnKTtcbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL0hlYWRlci5yZWFjdC5qcycpO1xuXG52YXIgSW5mb0xpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHByb3BUeXBlczoge1xuICAgIGNvbnRlbnQ6IFJlYWN0LlByb3BUeXBlcy5hcnJheSxcbiAgICB0b0pTWDogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgY29tcGFyYXRvcjogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgdGl0bGU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgb3JkZXJpbmdzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXlcbiAgfSxcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgb3JkZXJpbmdzOiBbXVxuICAgIH1cbiAgfSxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geyBvcmRlcjogMCB9O1xuICB9LFxuICByZW9yZGVyOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgb3JkZXI6ICgodGhpcy5zdGF0ZS5vcmRlciArIDEpICUgdGhpcy5wcm9wcy5vcmRlcmluZ3MubGVuZ3RoKSB9KTtcbiAgfSxcbiAgc2V0T3JkZXI6IGZ1bmN0aW9uKG5ld09yZGVyKSB7XG4gICAgaWYgKCEobmV3T3JkZXIgPiAtMSkgfHwgIShuZXdPcmRlciA8IHRoaXMucHJvcHMub3JkZXJpbmdzLmxlbmd0aCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG9yZGVyOiBuZXdPcmRlciB9KTtcbiAgfSxcblxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgaGVhZGVyQnV0dG9uID0gKHRoaXMucHJvcHMub3JkZXJpbmdzICYmIHRoaXMucHJvcHMub3JkZXJpbmdzW3RoaXMuc3RhdGUub3JkZXJdKSA/ICg8U3R5bGVNZW51IHRleHQ9eydvcmRlcjogJyArIHRoaXMucHJvcHMub3JkZXJpbmdzW3RoaXMuc3RhdGUub3JkZXJdfSBvcHRpb25zPXt0aGlzLnByb3BzLm9yZGVyaW5nc30gIGNhbGxiYWNrPXt0aGlzLnNldE9yZGVyfSAvPikgOiBudWxsO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5wcm9wcy50aXRsZS50b0xvd2VyQ2FzZSgpfT5cbiAgICAgICAgPEhlYWRlciBhbGlnbj0nb3V0JyB0ZXh0PXt0aGlzLnByb3BzLnRpdGxlfSBjb250ZW50PXtoZWFkZXJCdXR0b259IC8+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnRpdGxlLnRvTG93ZXJDYXNlKCkgKyAnX3RhYmxlJ30+XG4gICAgICAgICAge3RoaXMucHJvcHMuY29udGVudC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHsgcmV0dXJuIHNlbGYucHJvcHMuY29tcGFyYXRvcihhLCBiLCBzZWxmLnN0YXRlLm9yZGVyKTsgfSkubWFwKHRoaXMucHJvcHMudG9KU1gpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gSW5mb0xpc3Q7IiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIFN0eWxlTWVudSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcHJvcFR5cGVzOiB7XG4gICAgdGV4dDogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICBvcHRpb25zOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gICAgY2FsbGJhY2s6IFJlYWN0LlByb3BUeXBlcy5mdW5jIC8vIGZ1bmN0aW9uIHRoYXQgZ2V0cyBjYWxsZWQgd2hlbiBvcHRpb24gc2VsZWN0ZWRcbiAgICAvLyBjYWxsYmFjayhzZWxlY3RlZCkgd2hlcmUgdGhlIGFyZ3VtZW50IGlzIHRoZSBpbmRleCBvZiB0aGUgc2VsZWN0ZWQgb3B0aW9uIGluIG9wdGlvbnNbXVxuICB9LFxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7IG9wZW46IGZhbHNlIH07XG4gIH0sXG5cbiAgdG9nZ2xlTWVudTogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IG9wZW46ICF0aGlzLnN0YXRlLm9wZW4gfSk7XG4gIH0sXG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWF5YmVNZW51ID0gbnVsbDtcblxuICAgIGlmICh0aGlzLnN0YXRlLm9wZW4pIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHZhciBjYWxsYmFja01ha2VyID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNlbGYucHJvcHMuY2FsbGJhY2soaW5kZXgpO1xuICAgICAgICAgIHNlbGYudG9nZ2xlTWVudSgpO1xuICAgICAgICB9O1xuICAgICAgfSxcbiAgICAgIG1heWJlTWVudSA9IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J29wdGlvbnNfd3JhcHBlcic+XG4gICAgICAgICAge3RoaXMucHJvcHMub3B0aW9ucy5tYXAoZnVuY3Rpb24ob3B0aW9uLCBpKSB7XG4gICAgICAgICAgICB2YXIgY2IgPSBjYWxsYmFja01ha2VyKGkpLmJpbmQoc2VsZik7XG4gICAgICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPSdvcHRpb24nIG9uQ2xpY2s9e2NifT57b3B0aW9ufTwvZGl2Pik7XG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nbWVudV93cmFwcGVyJz5cbiAgICAgICAgPGRpdiBvbkNsaWNrPXt0aGlzLnRvZ2dsZU1lbnV9IGNsYXNzTmFtZT0nc3R5bGVCdXR0b24nPlxuICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMudGV4dH08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHttYXliZU1lbnV9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBTdHlsZU1lbnU7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKCcuL2NvbnRlbnQuanMnKTtcbnZhciBJbmZvTGlzdCA9IHJlcXVpcmUoJy4vSW5mb0xpc3QucmVhY3QuanMnKTtcbnZhciBIZWFkZXIgPSByZXF1aXJlKCcuL0hlYWRlci5yZWFjdC5qcycpO1xuXG5SZWFjdC5yZW5kZXIoXG4gIDxkaXY+XG4gICAgPGRpdiBjbGFzc05hbWU9J2ZsZXhib2R5Jz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdzaWRlYmFyJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbnRhY3RfaW5mbyc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbnRhY3Rfcm93Jz4zMTQgNjMwIDkyNTggPGEgaHJlZj1cImh0dHA6Ly93d3cubGlua2VkaW4uY29tL3B1Yi95YWxlLXRob21hcy84MC81MTEvMjk1XCI+bGlua2VkaW48L2E+PC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NvbnRhY3Rfcm93Jz48YSBocmVmPVwibWFpbHRvOmxvcmRjaGFpckBnbWFpbC5jb20/U3ViamVjdD1SZXN1bWUgUmVzcG9uc2VcIiB0YXJnZXQ9XCJfdG9wXCI+bG9yZGNoYWlyQGdtYWlsLmNvbTwvYT4gPGEgaHJlZj0naHR0cDovL2dpdGh1Yi5jb20vbG9yZGNoYWlyJz5naXQ8L2E+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8SW5mb0xpc3QgdGl0bGU9J0Jvb2tzJyB0b0pTWD17Y29udGVudC5ib29rVG9KU1h9IGNvbXBhcmF0b3I9e2NvbnRlbnQuYm9va0NvbXBhcmF0b3J9IG9yZGVyaW5ncz17Y29udGVudC5ib29rT3JkZXJpbmdzfSBjb250ZW50PXtjb250ZW50LkJPT0tTfSAvPlxuICAgICAgICA8SW5mb0xpc3QgdGl0bGU9J1NraWxscycgdG9KU1g9e2NvbnRlbnQuc2tpbGxUb0pTWH0gY29tcGFyYXRvcj17Y29udGVudC5za2lsbENvbXBhcmF0b3J9IG9yZGVyaW5ncz17Y29udGVudC5za2lsbE9yZGVyaW5nc30gY29udGVudD17Y29udGVudC5TS0lMTFN9IC8+XG4gICAgICAgIDxJbmZvTGlzdCB0aXRsZT0nQ2xhc3NlcycgdG9KU1g9e2NvbnRlbnQuY2xhc3NUb0pTWH0gY29tcGFyYXRvcj17Y29udGVudC5jbGFzc0NvbXBhcmF0b3J9IG9yZGVyaW5ncz17Y29udGVudC5jbGFzc09yZGVyaW5nc30gY29udGVudD17Y29udGVudC5DTEFTU0VTfSAvPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nbWFpbmJhcic+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSd5YWxlX25hbWUnPllhbGUgVGhvbWFzPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdwcm9maWxlJz5cbiAgICAgICAgICA8SGVhZGVyIHRleHQ9J1Byb2ZpbGUnIC8+XG4gICAgICAgICAge2NvbnRlbnQucHJvZmlsZS5tYXAoZnVuY3Rpb24ocGFyYSkgeyByZXR1cm4gKDxwPntwYXJhfTwvcD4pOyB9KX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxJbmZvTGlzdCB0aXRsZT0nV29yaycgdG9KU1g9e2NvbnRlbnQucHJvZmlsZVRvSlNYfSBjb21wYXJhdG9yPXtjb250ZW50LnByb2ZpbGVDb21wYXJhdG9yfSBjb250ZW50PXtjb250ZW50LldPUkt9IC8+XG4gICAgICAgIDxJbmZvTGlzdCB0aXRsZT0nRWR1Y2F0aW9uJyB0b0pTWD17Y29udGVudC5wcm9maWxlVG9KU1h9IGNvbXBhcmF0b3I9e2NvbnRlbnQucHJvZmlsZUNvbXBhcmF0b3J9IGNvbnRlbnQ9e2NvbnRlbnQuRURVQ0FUSU9OfSAvPlxuICAgICAgICA8SW5mb0xpc3QgdGl0bGU9J1Byb2plY3RzJyB0b0pTWD17Y29udGVudC5wcm9maWxlVG9KU1h9IGNvbXBhcmF0b3I9e2NvbnRlbnQucHJvZmlsZUNvbXBhcmF0b3J9IGNvbnRlbnQ9e2NvbnRlbnQuUFJPSkVDVFN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG5cbiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpICk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZnJlZXplKHtcbiAgVElNRUxJTkU6IFtcbiAgICB7XG4gICAgICBzdGFydDogJ01heSAyMDE3JyxcbiAgICAgIGVuZDogbmV3IERhdGUoKS50b0xvY2FsZURhdGVTdHJpbmcoJ2VuJyksXG4gICAgICBoZWFkZXI6ICdUb3BoYXR0ZXInLFxuICAgICAgc3ViaGVhZGVyOiAnRnVsbCBTdGFjayBTb2Z0d2FyZSBFbmdpbmVlcicsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2IoNjksIDM2LCAxNjApJ1xuICAgIH0sXG4gICAge1xuICAgICAgc3RhcnQ6ICdOb3YgMjAxNScsXG4gICAgICBlbmQ6ICdNYXkgMjAxNycsXG4gICAgICBoZWFkZXI6ICdQYW5kb3JhJyxcbiAgICAgIHN1YmhlYWRlcjogJ1dlYiBUZWFtIEVuZ2luZWVyJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYigwLCAxNjAsIDIzOCknXG4gICAgfSxcbiAgICB7XG4gICAgICBzdGFydDogJ0F1ZyAyMDE0JyxcbiAgICAgIGVuZDogJ05vdiAyMDE1JyxcbiAgICAgIGhlYWRlcjogJ1JkaW8nLFxuICAgICAgc3ViaGVhZGVyOiAnV2ViIFRlYW0gRW5naW5lZXInLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiKDE0LCAxMjIsIDIwNCknXG4gICAgfSxcbiAgICB7XG4gICAgICBzdGFydDogJ01heSAyMDE0JyxcbiAgICAgIGVuZDogJ0F1ZyAyMDE0JyxcbiAgICAgIGhlYWRlcjogJ1JkaW8nLFxuICAgICAgc3ViaGVhZGVyOiAnV2ViIFRlYW0gSW50ZXJuJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYigxNCwgMTIyLCAyMDQpJ1xuICAgIH0sXG4gICAge1xuICAgICAgc3RhcnQ6ICdNYXkgMjAxMycsXG4gICAgICBlbmQ6ICdBdWcgMjAxMycsXG4gICAgICBoZWFkZXI6ICdGYWNlYm9vaycsXG4gICAgICBzdWJoZWFkZXI6ICdTaXRlIEludGVncml0eSBUZWFtIEludGVybicsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDYwLCA4MywgMTQzLCAxLjQpJ1xuICAgIH0sXG4gICAge1xuICAgICAgc3RhcnQ6ICdNYXkgMjAxMicsXG4gICAgICBlbmQ6ICdBdWcgMjAxMicsXG4gICAgICBoZWFkZXI6ICdXQVNIVScsXG4gICAgICBzdWJoZWFkZXI6ICdNZWRpY2FsIEltYWdpbmcgRGVwdC4gSW50ZXJuJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMzgsIDczLCA1MCwgMS40KSdcbiAgICB9LFxuICAgIHtcbiAgICAgIHN0YXJ0OiAnU2VwIDIwMTEnLFxuICAgICAgZW5kOiAnTWF5IDIwMTQnLFxuICAgICAgaGVhZGVyOiAnVUlVQycsXG4gICAgICBzdWJoZWFkZXI6ICdTdHVkeWluZyBNYXRTY0UgJiBDUycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI0NiwgNzUsIDUsIDEuMyknXG4gICAgfSxcbiAgXSxcblxuICAvLyBQcm9maWxlIHN0dWZmLCBhcnJheSBvZiBzdHJpbmcgcGFyYWdyYXBoc1xuICBwcm9maWxlOiBbXG4gIF0sXG5cbiAgLy8gQm9va3NcbiAgQk9PS1M6IFtcbiAgICB7XG4gICAgICB0aXRsZTogICBcIlRoZSBNYXJ0aWFuXCIsXG4gICAgICBhdXRob3I6ICAnQW5keSBXZWlyJyxcbiAgICAgIGRhdGU6ICAgICdOb3YgMjAgMjAxNCcsXG4gICAgICBnZW5yZTogICAnU2NpRmknLFxuICAgICAgZmljdGlvbjogdHJ1ZSwgcmF0aW5nOiAgLjk1LCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJMZXQncyBFeHBsb3JlIERpYWJldGVzIHdpdGggT3dsc1wiLFxuICAgICAgYXV0aG9yOiAgJ0RhdmlkIFNlZGFyaXMnLFxuICAgICAgZGF0ZTogICAgJ05vdiAyMyAyMDE0JyxcbiAgICAgIGdlbnJlOiAgICdDb21lZHknLFxuICAgICAgZmljdGlvbjogZmFsc2UsIHJhdGluZzogIC43NSwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiVGhlIFRpcHBpbmcgUG9pbnRcIixcbiAgICAgIGF1dGhvcjogICdNYWxjb20gR2xhZHdlbGwnLFxuICAgICAgZGF0ZTogICAgJ05vdiAyNSAyMDE0JyxcbiAgICAgIGdlbnJlOiAgICdFY29ub21pY3MnLFxuICAgICAgZmljdGlvbjogZmFsc2UsIHJhdGluZzogIC44LCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJCbGlua1wiLFxuICAgICAgYXV0aG9yOiAgJ01hbGNvbSBHbGFkd2VsbCcsXG4gICAgICBkYXRlOiAgICAnTm92IDI4IDIwMTQnLFxuICAgICAgZ2VucmU6ICAgJ0NvZ25pdGl2ZScsXG4gICAgICBmaWN0aW9uOiBmYWxzZSwgcmF0aW5nOiAgLjgsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIk91dGxpZXJzXCIsXG4gICAgICBhdXRob3I6ICAnTWFsY29tIEdsYWR3ZWxsJyxcbiAgICAgIGRhdGU6ICAgICdOb3YgMzAgMjAxNCcsXG4gICAgICBnZW5yZTogICAnRWNvbm9taWNzJyxcbiAgICAgIGZpY3Rpb246IGZhbHNlLCByYXRpbmc6ICAuOCwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiVGhlIFNlbGZpc2ggR2VuZVwiLFxuICAgICAgYXV0aG9yOiAgJ1JpY2hhcmQgRGF3a2lucycsXG4gICAgICBkYXRlOiAgICAnRGVjIDUgMjAxNCcsXG4gICAgICBnZW5yZTogICAnQmlvbG9neScsXG4gICAgICBmaWN0aW9uOiBmYWxzZSwgcmF0aW5nOiAgLjg1LCByZXJlYWQ6ICB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIkhhcmQtYm9pbGVkIFdvbmRlcmxhbmQgYW5kIHRoZSBFbmQgb2YgdGhlIFdvcmxkXCIsXG4gICAgICBhdXRob3I6ICAnSGFydWtpIE11cmFrYW1pJyxcbiAgICAgIGRhdGU6ICAgICdEZWMgOSAyMDE0JyxcbiAgICAgIGdlbnJlOiAgICdTdXBlcm5hdHVyYWwnLFxuICAgICAgZmljdGlvbjogdHJ1ZSwgcmF0aW5nOiAgLjYsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIldoYXQgSXQgSXMgTGlrZSB0byBHbyB0byBXYXJcIixcbiAgICAgIGF1dGhvcjogICdLYXJsIE1hcmxhbnRlcycsXG4gICAgICBkYXRlOiAgICAnRGVjIDE0IDIwMTQnLFxuICAgICAgZmljdGlvbjogZmFsc2UsIHJhdGluZzogIC44NSwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiVGhlIEdpcmwgV2l0aCBBbGwgdGhlIEdpZnRzXCIsXG4gICAgICBhdXRob3I6ICAnTS4gUi4gQ2FyZXknLFxuICAgICAgZGF0ZTogICAgJ0RlYyAyMCAyMDE0JyxcbiAgICAgIGdlbnJlOiAgICdTY2lGaScsXG4gICAgICBmaWN0aW9uOiB0cnVlLCByYXRpbmc6ICAuNjUsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIkJsaW5kc2lnaHRcIixcbiAgICAgIGF1dGhvcjogICdQZXRlciBXYXR0cycsXG4gICAgICBkYXRlOiAgICAnRmViIDEgMjAxNScsXG4gICAgICBnZW5yZTogICAnU2NpRmknLFxuICAgICAgZmljdGlvbjogdHJ1ZSwgcmF0aW5nOiAgLjc1LCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJFY2hvcHJheGlhXCIsXG4gICAgICBhdXRob3I6ICAnUGV0ZXIgV2F0dHMnLFxuICAgICAgZGF0ZTogICAgJ0ZlYiAxMCAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdTY2lGaScsXG4gICAgICBmaWN0aW9uOiB0cnVlLCByYXRpbmc6ICAuNzQsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIlRoZSBOYW1lIG9mIHRoZSBXaW5kXCIsXG4gICAgICBhdXRob3I6ICAnUGF0cmljayBSb3RoZnVzcycsXG4gICAgICBkYXRlOiAgICAnRmViIDE5IDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ0ZhbnRhc3knLFxuICAgICAgZmljdGlvbjogdHJ1ZSwgcmF0aW5nOiAgLjkzLCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJUaGlzIEJvb2sgaXMgRnVsbCBvZiBTcGlkZXJzXCIsXG4gICAgICBhdXRob3I6ICAnRGF2aWQgV29uZycsXG4gICAgICBkYXRlOiAgICAnRmViIDIxIDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ1N1cGVybmF0dXJhbCcsXG4gICAgICBmaWN0aW9uOiB0cnVlLCByYXRpbmc6ICAuNywgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiSm9obiBEaWVzIGF0IHRoZSBFbmRcIixcbiAgICAgIGF1dGhvcjogICdEYXZpZCBXb25nJyxcbiAgICAgIGRhdGU6ICAgICdGZWIgMjMgMjAxNScsXG4gICAgICBnZW5yZTogICAnU3VwZXJuYXR1cmFsJyxcbiAgICAgIGZpY3Rpb246IHRydWUsIHJhdGluZzogIC43LCByZXJlYWQ6ICB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIlRoZSBXaXNlIE1hbidzIEZlYXJcIixcbiAgICAgIGF1dGhvcjogICdQYXRyaWNrIFJvdGhmdXNzJyxcbiAgICAgIGRhdGU6ICAgICdNYXIgNSAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdGYW50YXN5JyxcbiAgICAgIGZpY3Rpb246IHRydWUsIHJhdGluZzogIC45LCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJUaGUgUGlsbGFycyBvZiB0aGUgRWFydGhcIixcbiAgICAgIGF1dGhvcjogICdLZW4gRm9sbGV0JyxcbiAgICAgIGRhdGU6ICAgICdNYXIgMTQgMjAxNScsXG4gICAgICBnZW5yZTogICAnSGlzdG9yaWNhbCBGaWN0aW9uJyxcbiAgICAgIGZpY3Rpb246IHRydWUsIHJhdGluZzogIC45NCwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiUm9ndWVzXCIsXG4gICAgICBhdXRob3I6ICAnR2VvcmdlIFIuIFIuIE1hcnRpbiBhbmQgb3RoZXJzJyxcbiAgICAgIGRhdGU6ICAgICdNYXIgMjQgMjAxNScsXG4gICAgICBnZW5yZTogICAnRmFudGFzeScsXG4gICAgICBmaWN0aW9uOiB0cnVlLCByYXRpbmc6ICAuOCwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiUmluZ3dvcmxkXCIsXG4gICAgICBhdXRob3I6ICAnTGFycnkgTml2ZW4nLFxuICAgICAgZGF0ZTogICAgJ01hciAyOCAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdTY2lGaScsXG4gICAgICBmaWN0aW9uOiB0cnVlLCByYXRpbmc6ICAuNzUsIHJlcmVhZDogIHRydWVcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiVGhlIFN0YW5kXCIsXG4gICAgICBhdXRob3I6ICAnU3RlcGhlbiBLaW5nJyxcbiAgICAgIGRhdGU6ICAgICdBcHIgNyAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdTdXBlcm5hdHVyYWwnLFxuICAgICAgZmljdGlvbjogdHJ1ZSwgcmF0aW5nOiAgLjc5LCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJOZXVyb21hbmNlclwiLFxuICAgICAgYXV0aG9yOiAgJ1dpbGxpYW0gR2lic29uJyxcbiAgICAgIGRhdGU6ICAgICdBcHIgMTMgMjAxNScsXG4gICAgICBnZW5yZTogICAnU2NpRmknLFxuICAgICAgZmljdGlvbjogdHJ1ZSwgcmF0aW5nOiAgLjgsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIkd1bnMsIEdlcm1zLCBhbmQgU3RlZWxcIixcbiAgICAgIGF1dGhvcjogICdKYXJlZCBEaWFtb25kJyxcbiAgICAgIGRhdGU6ICAgICdBcHIgMTYgMjAxNScsXG4gICAgICBnZW5yZTogICAnSGlzdG9yeScsXG4gICAgICBmaWN0aW9uOiBmYWxzZSwgcmF0aW5nOiAgLjgsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIlRoZSBNYXJ0aWFuXCIsXG4gICAgICBhdXRob3I6ICAnQW5keSBXZWlyJyxcbiAgICAgIGRhdGU6ICAgICdBcHIgMjIgMjAxNScsXG4gICAgICBnZW5yZTogICAnU2NpRmknLFxuICAgICAgZmljdGlvbjogdHJ1ZSwgcmF0aW5nOiAgLjk1LCByZXJlYWQ6ICB0cnVlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIkl0XCIsXG4gICAgICBhdXRob3I6ICAnU3RlcGhlbiBLaW5nJyxcbiAgICAgIGRhdGU6ICAgICdBcHIgMjggMjAxNScsXG4gICAgICBnZW5yZTogICAnU3VwZXJuYXR1cmFsJyxcbiAgICAgIGZpY3Rpb246IHRydWUsIHJhdGluZzogIC43OTUsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIlN1cGVyRnJlYWtvbm9taWNzXCIsXG4gICAgICBhdXRob3I6ICAnU3RlcGhlbiBEdWJuZXIvU3RlcGhlbiBMZXZpdHQnLFxuICAgICAgZGF0ZTogICAgJ01heSA4IDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ0Vjb25vbWljcycsXG4gICAgICBmaWN0aW9uOiBmYWxzZSwgcmF0aW5nOiAgLjgsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIlRoaW5rIExpa2UgYSBGcmVha1wiLFxuICAgICAgYXV0aG9yOiAgJ1N0ZXBoZW4gRHVibmVyL1N0ZXBoZW4gTGV2aXR0JyxcbiAgICAgIGRhdGU6ICAgICdNYXkgMTQgMjAxNScsXG4gICAgICBnZW5yZTogICAnRWNvbm9taWNzJyxcbiAgICAgIGZpY3Rpb246IGZhbHNlLCByYXRpbmc6ICAuODEsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIkEgQnJpZWYgSGlzdG9yeSBvZiBUaW1lXCIsXG4gICAgICBhdXRob3I6ICAnU3RlcGhlbiBIYXdraW5nJyxcbiAgICAgIGRhdGU6ICAgICdNYXkgMjAgMjAxNScsXG4gICAgICBnZW5yZTogICAnQ29zbW9sb2d5JyxcbiAgICAgIGZpY3Rpb246IGZhbHNlLCByYXRpbmc6ICAuOCwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiV2hlbiB0byBSb2IgYSBCYW5rXCIsXG4gICAgICBhdXRob3I6ICAnU3RlcGhlbiBEdWJuZXIvU3RlcGhlbiBMZXZpdHQnLFxuICAgICAgZGF0ZTogICAgJ01heSAyNiAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdFY29ub21pY3MnLFxuICAgICAgZmljdGlvbjogZmFsc2UsIHJhdGluZzogIC44LCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJBbmF0aGVtXCIsXG4gICAgICBhdXRob3I6ICAnTmVhbCBTdGVwaGVuc29uJyxcbiAgICAgIGRhdGU6ICAgICdKdW4gMTkgMjAxNScsXG4gICAgICBnZW5yZTogICAnU2NpRmknLFxuICAgICAgZmljdGlvbjogdHJ1ZSwgcmF0aW5nOiAgLjc3NSwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiQ3J5cHRvbm9taWNvblwiLFxuICAgICAgYXV0aG9yOiAgJ05lYWwgU3RlcGhlbnNvbicsXG4gICAgICBkYXRlOiAgICAnSnVsIDYgMjAxNScsXG4gICAgICBnZW5yZTogICAnSGlzdG9yaWNhbCBGaWN0aW9uJyxcbiAgICAgIGZpY3Rpb246IHRydWUsIHJhdGluZzogIC43ODUsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIlNldmVuZXZlc1wiLFxuICAgICAgYXV0aG9yOiAgJ05lYWwgU3RlcGhlbnNvbicsXG4gICAgICBkYXRlOiAgICAnSnVsIDIzIDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ1NjaUZpJyxcbiAgICAgIGZpY3Rpb246IHRydWUsIHJhdGluZzogIC44NzUsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIlNub3cgQ3Jhc2hcIixcbiAgICAgIGF1dGhvcjogICdOZWFsIFN0ZXBoZW5zb24nLFxuICAgICAgZGF0ZTogICAgJ0F1ZyAxIDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ1NjaUZpJyxcbiAgICAgIGZpY3Rpb246IHRydWUsIHJhdGluZzogIC44NSwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiVGhlIERpYW1vbmQgQWdlXCIsXG4gICAgICBhdXRob3I6ICAnTmVhbCBTdGVwaGVuc29uJyxcbiAgICAgIGRhdGU6ICAgICdBdWcgOSAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdTY2lGaScsXG4gICAgICBmaWN0aW9uOiB0cnVlLCByYXRpbmc6ICAuNzM1LCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJXaGF0IHRoZSBEb2cgU2F3XCIsXG4gICAgICBhdXRob3I6ICAnTWFsY29tIEdsYWR3ZWxsJyxcbiAgICAgIGRhdGU6ICAgICdBdWcgMjAgMjAxNScsXG4gICAgICBnZW5yZTogICAnVmFyaW91cycsXG4gICAgICBmaWN0aW9uOiBmYWxzZSwgcmF0aW5nOiAgLjgxLCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJIYWxsdWNpbmF0aW9uc1wiLFxuICAgICAgYXV0aG9yOiAgJ09saXZlciBTYWNrcycsXG4gICAgICBkYXRlOiAgICAnQXVnIDI4IDUgMjAxNScsXG4gICAgICBnZW5yZTogICAnTmV1cm9zY2llbmNlJyxcbiAgICAgIGZpY3Rpb246IGZhbHNlLCByYXRpbmc6ICAuODUsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIlRoZSBNYW4gV2hvIE1pc3Rvb2sgSGlzIFdpZmUgZm9yIGEgSGF0XCIsXG4gICAgICBhdXRob3I6ICAnT2xpdmVyIFNhY2tzJyxcbiAgICAgIGRhdGU6ICAgICdTZXB0IDMgMjAxNScsXG4gICAgICBnZW5yZTogICAnTmV1cm9zY2llbmNlJyxcbiAgICAgIGZpY3Rpb246IGZhbHNlLCByYXRpbmc6ICAuNzgsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIlRoZSBNaW5kJ3MgRXllXCIsXG4gICAgICBhdXRob3I6ICAnT2xpdmVyIFNhY2tzJyxcbiAgICAgIGRhdGU6ICAgICdTZXB0IDYgMjAxNScsXG4gICAgICBnZW5yZTogICAnTmV1cm9zY2llbmNlJyxcbiAgICAgIGZpY3Rpb246IGZhbHNlLCByYXRpbmc6ICAuOCwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiQXdha2VuaW5nc1wiLFxuICAgICAgYXV0aG9yOiAgJ09saXZlciBTYWNrcycsXG4gICAgICBkYXRlOiAgICAnU2VwdCAxMCAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdOZXVyb3NjaWVuY2UnLFxuICAgICAgZmljdGlvbjogZmFsc2UsIHJhdGluZzogIC43NSwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiRGF2aWQgYW5kIEdvbGlhdGhcIixcbiAgICAgIGF1dGhvcjogICdNYWxjb20gR2xhZHdlbGwnLFxuICAgICAgZGF0ZTogICAgJ1NlcCAxNiAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdFY29ub21pY3MnLFxuICAgICAgZmljdGlvbjogZmFsc2UsIHJhdGluZzogIC44NSwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiUmVhZHkgUGxheWVyIE9uZVwiLFxuICAgICAgYXV0aG9yOiAgJ0VybnN0IENsaW5lJyxcbiAgICAgIGRhdGU6ICAgICdTZXB0IDIyIDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ1NjaUZpJyxcbiAgICAgIGZpY3Rpb246IHRydWUsIHJhdGluZzogIC43LCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJGbGFzaCBCb3lzXCIsXG4gICAgICBhdXRob3I6ICAnTWljaGFlbCBMZXdpcycsXG4gICAgICBkYXRlOiAgICAnU2VwIDI1IDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ0Vjb25vbWljcycsXG4gICAgICBmaWN0aW9uOiBmYWxzZSwgcmF0aW5nOiAgLjk1LCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJUaGUgQmlnIFNob3J0XCIsXG4gICAgICBhdXRob3I6ICAnTWljaGFlbCBMZXdpcycsXG4gICAgICBkYXRlOiAgICAnU2VwIDI4IDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ0Vjb25vbWljcycsXG4gICAgICBmaWN0aW9uOiBmYWxzZSwgcmF0aW5nOiAgLjksIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIkJvb21lcmFuZ1wiLFxuICAgICAgYXV0aG9yOiAgJ01pY2hhZWwgTGV3aXMnLFxuICAgICAgZGF0ZTogICAgJ1NlcCAzMCAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdFY29ub21pY3MnLFxuICAgICAgZmljdGlvbjogZmFsc2UsIHJhdGluZzogIC45LCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJNb25leWJhbGxcIixcbiAgICAgIGF1dGhvcjogICdNaWNoYWVsIExld2lzJyxcbiAgICAgIGRhdGU6ICAgICdPY3QgMyAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdTcG9ydHMgLyBFY29ub21pY3MnLFxuICAgICAgZmljdGlvbjogZmFsc2UsIHJhdGluZzogIC44NSwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiTGlhcidzIFBva2VyXCIsXG4gICAgICBhdXRob3I6ICAnTWljaGFlbCBMZXdpcycsXG4gICAgICBkYXRlOiAgICAnT2N0IDUgMjAxNScsXG4gICAgICBnZW5yZTogICAnRWNvbm9taWNzJyxcbiAgICAgIGZpY3Rpb246IGZhbHNlLCByYXRpbmc6ICAuODUsIHJlcmVhZDogIGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIkF1cm9yYVwiLFxuICAgICAgYXV0aG9yOiAgJ0tpbSBTdGFubGV5IFJvYmluc29uJyxcbiAgICAgIGRhdGU6ICAgICdPY3QgMTEgMjAxNScsXG4gICAgICBnZW5yZTogICAnU2NpRmknLFxuICAgICAgZmljdGlvbjogdHJ1ZSwgcmF0aW5nOiAgLjg0LCByZXJlYWQ6ICBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJUaGUgUHJhY3RpY2luZyBNaW5kXCIsXG4gICAgICBhdXRob3I6ICAnVGhvbWFzIE0uIFN0ZXJuZXInLFxuICAgICAgZGF0ZTogICAgJ09jdCAxNCAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdQc3ljaG9sb2d5JyxcbiAgICAgIGZpY3Rpb246IGZhbHNlLCByYXRpbmc6ICAuOCwgcmVyZWFkOiAgZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiTWlzYmVoYXZpbmdcIixcbiAgICAgIGF1dGhvcjogICdSaWNoYXJkIFRoYWxlcicsXG4gICAgICBkYXRlOiAgICAnT2N0IDE2IDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ0JlaGF2aW9yYWwgRWNvbm9taWNzJyxcbiAgICAgIGZpY3Rpb246IGZhbHNlLCByYXRpbmc6ICAuOTUsIHJlcmVhZDogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiQm9vbWVyYW5nXCIsXG4gICAgICBhdXRob3I6ICAnTWljaGFlbCBMZXdpcycsXG4gICAgICBkYXRlOiAgICAnT2N0IDIwIDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ0Vjb25vbWljcycsXG4gICAgICBmaWN0aW9uOiBmYWxzZSwgcmF0aW5nOiAgLjksIHJlcmVhZDogdHJ1ZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJUaGlua2luZyBGYXN0IGFuZCBTbG93XCIsXG4gICAgICBhdXRob3I6ICAnRGFuaWVsIEthaG5lbWFuJyxcbiAgICAgIGRhdGU6ICAgICdPY3QgMjggMjAxNScsXG4gICAgICBnZW5yZTogICAnQmVoYXZpb3JhbCBFY29ub21pY3MnLFxuICAgICAgZmljdGlvbjogZmFsc2UsIHJhdGluZzogIC45OCwgcmVyZWFkOiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJIb3cgTm90IHRvIEJlIFdyb25nXCIsXG4gICAgICBhdXRob3I6ICAnSm9yZGFuIEVsbGVuYmVyZycsXG4gICAgICBkYXRlOiAgICAnTm92IDEwIDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ01hdGhlbWF0aWNzJyxcbiAgICAgIGZpY3Rpb246IGZhbHNlLCByYXRpbmc6ICAuOSwgcmVyZWFkOiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJGdXR1cmlzdGljIFZpb2xlbmNlIGFuZCBGYW5jeSBTdWl0c1wiLFxuICAgICAgYXV0aG9yOiAgJ0RhdmlkIFdvbmcnLFxuICAgICAgZGF0ZTogICAgJ05vdiAxNSAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdTY2lGaScsXG4gICAgICBmaWN0aW9uOiB0cnVlLCByYXRpbmc6ICAuODksIHJlcmVhZDogZmFsc2VcbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAgIFwiVGhlIEJsYWNrIFN3YW5cIixcbiAgICAgIGF1dGhvcjogICdOYXNzaW0gVGFsZWInLFxuICAgICAgZGF0ZTogICAgJ05vdiAyNCAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdFcGlzdGVtb2xvZ3kgLyBDb2duaXRpdmUgLyBFY29ub21pY3MnLFxuICAgICAgZmljdGlvbjogZmFsc2UsIHJhdGluZzogIC45OSwgcmVyZWFkOiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJUaGUgRGVzaWduIG9mIEV2ZXJ5ZGF5IFRoaW5nc1wiLFxuICAgICAgYXV0aG9yOiAgJ0RvbmFsZCBBLiBOb3JtYW4nLFxuICAgICAgZGF0ZTogICAgJ05vdiAyOCAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdEZXNpZ24nLFxuICAgICAgZmljdGlvbjogZmFsc2UsIHJhdGluZzogIC44MiwgcmVyZWFkOiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJUaGUgTmV3IE5ldyBUaGluZ1wiLFxuICAgICAgYXV0aG9yOiAgJ01pY2hhZWwgTGV3aXMnLFxuICAgICAgZGF0ZTogICAgJ0RlYyAyIDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ0Vjb25vbWljcycsXG4gICAgICBmaWN0aW9uOiBmYWxzZSwgcmF0aW5nOiAgLjgzLCByZXJlYWQ6IGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIlN1cGVyaW50ZWxsaWdlbmNlOiBQYXRocywgRGFuZ2VycywgU3RyYXRlZ2llc1wiLFxuICAgICAgYXV0aG9yOiAgJ05pY2sgQm9zdHJvbScsXG4gICAgICBkYXRlOiAgICAnRGVjIDExIDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ0FJIC8gQ29nbml0aXZlIC8gUGhpbG9zb3BoeScsXG4gICAgICBmaWN0aW9uOiBmYWxzZSwgcmF0aW5nOiAgLjkzNSwgcmVyZWFkOiBmYWxzZVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICAgXCJCZWluZyBNb3J0YWxcIixcbiAgICAgIGF1dGhvcjogICdBdHVsIEdhd2FuZGUnLFxuICAgICAgZGF0ZTogICAgJ0RlYyAxNSAyMDE1JyxcbiAgICAgIGdlbnJlOiAgICdNZWRpY2luZScsXG4gICAgICBmaWN0aW9uOiBmYWxzZSwgcmF0aW5nOiAgLjkxLCByZXJlYWQ6IGZhbHNlXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogICBcIkluY29nbml0bzogVGhlIFNlY3JldCBMaXZlcyBvZiB0aGUgQnJhaW5cIixcbiAgICAgIGF1dGhvcjogICdEYXZpZCBFYWdsZW1hbicsXG4gICAgICBkYXRlOiAgICAnRGVjIDIxIDIwMTUnLFxuICAgICAgZ2VucmU6ICAgJ0NvZ25pdGl2ZSAvIFBzeWNob2xvZ3knLFxuICAgICAgZmljdGlvbjogZmFsc2UsIHJhdGluZzogIC45NiwgcmVyZWFkOiBmYWxzZVxuICAgIH1cbiAgXSxcbiAgYm9va09yZGVyaW5nczogW1xuICAgICdkYXRlIHJlYWQnLFxuICAgICd0aXRsZScsXG4gICAgJ2F1dGhvcicsXG4gICAgJ25vbi9maWN0aW9uJyxcbiAgICAncmF0aW5nJ1xuICBdLFxuICBib29rVG9KU1g6IGZ1bmN0aW9uKGJvb2spIHtcbiAgICB2YXIgZmluaXNoRGF0ZSA9IG5ldyBEYXRlKGJvb2suZGF0ZSk7XG4gICAgdmFyIHRpdGxlVGV4dCA9IGJvb2sudGl0bGU7XG4gICAgaWYgKGJvb2sucmVyZWFkKSB7XG4gICAgICB0aXRsZVRleHQgKz0gJyAocmVyZWFkKSc7XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGtleT17ZmluaXNoRGF0ZS5nZXRUaW1lKCl9IGNsYXNzTmFtZT0nYm9va3Nfcm93Jz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Jvb2tfcm93Jz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYm9va190aXRsZSc+e3RpdGxlVGV4dH08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYm9va19yYXRpbmdfd3JhcHBlcic+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nYm9va19yYXRpbmcnIHN0eWxlPXt7IHdpZHRoOiBib29rLnJhdGluZyAqIDEwMCArICclJyB9fSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Jvb2tfcm93Jz5cbiAgICAgICAgICA8ZGl2Pntib29rLmF1dGhvcn08L2Rpdj5cbiAgICAgICAgICA8ZGl2PntmaW5pc2hEYXRlLnRvTG9jYWxlRGF0ZVN0cmluZygpfTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIGJvb2tDb21wYXJhdG9yOiBmdW5jdGlvbihhLCBiLCBvcmRlcmluZykge1xuICAgIHZhciBkYXRlT3JkID0gbmV3IERhdGUoYS5kYXRlKS5nZXRUaW1lKCkgPCBuZXcgRGF0ZShiLmRhdGUpLmdldFRpbWUoKSA/IDEgOiAtMTtcblxuICAgIHN3aXRjaCAob3JkZXJpbmcpIHtcbiAgICAgIGRlZmF1bHQ6IHJldHVybiBkYXRlT3JkO1xuICAgICAgY2FzZSAxOlxuICAgICAgICBpZiAoYS50aXRsZSA9PT0gYi50aXRsZSkgeyByZXR1cm4gZGF0ZU9yZDsgfVxuICAgICAgICByZXR1cm4gYS50aXRsZSA+IGIudGl0bGUgPyAxIDogLTE7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGlmIChhLmF1dGhvciA9PT0gYi5hdXRob3IpIHsgcmV0dXJuIGRhdGVPcmQ7IH1cbiAgICAgICAgcmV0dXJuIGEuYXV0aG9yID4gYi5hdXRob3IgPyAxIDogLTE7XG4gICAgICBjYXNlIDM6XG4gICAgICAgIGlmIChhLmZpY3Rpb24gPT09IGIuZmljdGlvbikgeyByZXR1cm4gZGF0ZU9yZDsgfVxuICAgICAgICByZXR1cm4gYS5maWN0aW9uID4gYi5maWN0aW9uID8gMSA6IC0xO1xuICAgICAgY2FzZSA0OlxuICAgICAgICBpZiAoYS5yYXRpbmcgPT09IGIucmF0aW5nKSB7IHJldHVybiBkYXRlT3JkOyB9XG4gICAgICAgIHJldHVybiBhLnJhdGluZyA8IGIucmF0aW5nID8gMSA6IC0xO1xuICAgIH1cblxuICAgIG9yZGVyaW5nID0gb3JkZXJpbmcgfHwgMDtcbiAgICBpZiAob3JkZXJpbmcgPT09IDApIHtcbiAgICAgIC8vIGNhdGVnb3J5IHNvcnRpbmdcbiAgICAgIHJldHVybiBhLmNhdGVnb3J5IDwgYi5jYXRlZ29yeSA/IDEgOiAtMTtcbiAgICB9IGVsc2UgaWYgKG9yZGVyaW5nID09PSAxKSB7XG4gICAgICAvLyBza2lsbCBzb3J0aW5nXG4gICAgICByZXR1cm4gYS5za2lsbCA8IGIuc2tpbGwgPyAxIDogLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFscGggc29ydGluZ1xuICAgICAgcmV0dXJuIGEubmFtZSA+IGIubmFtZSA/IDEgOiAtMTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gU2tpbGwgcmVsYXRlZCBzdHVmZlxuICBTS0lMTFM6IFtcbiAgICB7IG5hbWU6ICdSdWJ5Jywgc2tpbGw6IC43LCBjYXRlZ29yeTogJ2JhY2tlbmQnIH0sXG4gICAgeyBuYW1lOiAnSmF2YScsIHNraWxsOiAuNiwgY2F0ZWdvcnk6ICdiYWNrZW5kJyB9LFxuICAgIHsgbmFtZTogJ0MrKycsIHNraWxsOiAuNSwgY2F0ZWdvcnk6ICdiYWNrZW5kJyB9LFxuICAgIHsgbmFtZTogJ1B5dGhvbicsIHNraWxsOiAuOCwgY2F0ZWdvcnk6ICdiYWNrZW5kJyB9LFxuICAgIHsgbmFtZTogJ0NTUycsIHNraWxsOiAuOCwgY2F0ZWdvcnk6ICd3ZWInIH0sXG4gICAgeyBuYW1lOiAnSFRNTCcsIHNraWxsOiAuOCwgY2F0ZWdvcnk6ICd3ZWInIH0sXG4gICAgeyBuYW1lOiAnSmF2YXNjcmlwdCcsIHNraWxsOiAuOSwgY2F0ZWdvcnk6ICd3ZWInIH0sXG4gICAgeyBuYW1lOiAnQmFzaCcsIHNraWxsOiAuMywgY2F0ZWdvcnk6ICdzY3JpcHQnIH0sXG4gICAgeyBuYW1lOiAnU1FMJywgc2tpbGw6IC41LCBjYXRlZ29yeTogJ2JhY2tlbmQnIH0sXG4gICAgeyBuYW1lOiAnU1ZOJywgc2tpbGw6IC4zLCBjYXRlZ29yeTogJ3ZlcnNpb24nIH0sXG4gICAgeyBuYW1lOiAnR2l0Jywgc2tpbGw6IC43LCBjYXRlZ29yeTogJ3ZlcnNpb24nIH0sXG4gICAgeyBuYW1lOiAnTWF0bGFiJywgc2tpbGw6IC4zLCBjYXRlZ29yeTogJ21hdGgnIH0sXG4gICAgeyBuYW1lOiAnTWF0aGVtYXRpY2EnLCBza2lsbDogLjUsIGNhdGVnb3J5OiAnbWF0aCcgfSxcbiAgICB7IG5hbWU6ICdQaG90b3Nob3AnLCBza2lsbDogLjYsIGNhdGVnb3J5OiAnYWRvYmUnIH0sXG4gICAgeyBuYW1lOiAnSW5kZXNpZ24nLCBza2lsbDogLjgsIGNhdGVnb3J5OiAnYWRvYmUnIH0sXG4gICAgeyBuYW1lOiAnSWxsdXN0cmF0b3InLCBza2lsbDogLjMsIGNhdGVnb3J5OiAnYWRvYmUnIH1cbiAgXSxcbiAgc2tpbGxPcmRlcmluZ3M6IFtcbiAgICAnY2F0ZWdvcnknLFxuICAgICdleHBlcmllbmNlJyxcbiAgICAnYWxwaGFiZXRpYydcbiAgXSxcbiAgc2tpbGxUb0pTWDogZnVuY3Rpb24oc2tpbGwpIHtcbiAgICB2YXIgc2tpbGxUZXh0O1xuICAgIGlmIChza2lsbC5za2lsbCA8PSAuMykgeyBza2lsbFRleHQgPSAnKyc7IH1cbiAgICBlbHNlIGlmIChza2lsbC5za2lsbCA8PSAuNikgeyBza2lsbFRleHQgPSAnKysnOyB9XG4gICAgZWxzZSB7IHNraWxsVGV4dCA9ICcrKysnOyB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYga2V5PXtza2lsbC5uYW1lfSBjbGFzc05hbWU9J3NraWxsX3Jvdyc+XG4gICAgICAgIDxkaXY+e3NraWxsLm5hbWV9PC9kaXY+PGRpdj57c2tpbGxUZXh0fTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSxcbiAgc2tpbGxDb21wYXJhdG9yOiBmdW5jdGlvbihhLCBiLCBvcmRlcmluZykge1xuICAgIG9yZGVyaW5nID0gb3JkZXJpbmcgfHwgMDtcbiAgICBpZiAob3JkZXJpbmcgPT09IDApIHtcbiAgICAgIC8vIGNhdGVnb3J5IHNvcnRpbmdcbiAgICAgIHJldHVybiBhLmNhdGVnb3J5IDwgYi5jYXRlZ29yeSA/IDEgOiAtMTtcbiAgICB9IGVsc2UgaWYgKG9yZGVyaW5nID09PSAxKSB7XG4gICAgICAvLyBza2lsbCBzb3J0aW5nXG4gICAgICByZXR1cm4gYS5za2lsbCA8IGIuc2tpbGwgPyAxIDogLTE7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGFscGggc29ydGluZ1xuICAgICAgcmV0dXJuIGEubmFtZSA+IGIubmFtZSA/IDEgOiAtMTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gQ2xhc3NlcyByZWxhdGVkIHN0dWZmXG4gIENMQVNTRVM6IFtcbiAgICB7IHN1YmplY3Q6ICdNU0UnLCBudW1iZXI6IDEwMCwgbmFtZTogJ0VuZ2luZWVyaW5nIE9yaWVudGF0aW9uJywgc2VtZXN0ZXI6IDEsIGNhdGVnb3J5OiAyIH0sXG4gICAgeyBzdWJqZWN0OiAnTVNFJywgbnVtYmVyOiAxODIsIG5hbWU6ICdJbnRybyB0byBNYXRTRScsIHNlbWVzdGVyOiAxLCBjYXRlZ29yeTogMiB9LFxuICAgIHsgc3ViamVjdDogJ0NTJywgbnVtYmVyOiAxMjUsIG5hbWU6ICdJbnRybyB0byBDUycsIHNlbWVzdGVyOiAxLCBjYXRlZ29yeTogMSB9LFxuICAgIHsgc3ViamVjdDogJ0NTJywgbnVtYmVyOiAxOTYsIG5hbWU6ICdGcmVzaG1hbiBIb25vcnMnLCBzZW1lc3RlcjogMSwgY2F0ZWdvcnk6IDEgfSxcbiAgICB7IHN1YmplY3Q6ICdISVNUJywgbnVtYmVyOiAyNTMsIG5hbWU6ICdFbmxpZ2h0LiB0byBFeGlzdGVudGlhbHNtJywgc2VtZXN0ZXI6IDEsIGNhdGVnb3J5OiAwIH0sXG4gICAgeyBzdWJqZWN0OiAnTUFUSCcsIG51bWJlcjogMjMxLCBuYW1lOiAnQ2FsY3VsdXMgSUknLCBzZW1lc3RlcjogMSwgY2F0ZWdvcnk6IDEgfSxcbiAgICB7IHN1YmplY3Q6ICdNQVRIJywgbnVtYmVyOiAyOTksIG5hbWU6ICdUb3BpY3MgaW4gTWF0aGVtYXRpY3MnLCBzZW1lc3RlcjogMSwgY2F0ZWdvcnk6IDEgfSxcbiAgICB7IHN1YmplY3Q6ICdQSElMJywgbnVtYmVyOiAxMDEsIG5hbWU6ICdJbnRybyB0byBQaGlsb3NvcGh5Jywgc2VtZXN0ZXI6IDEsIGNhdGVnb3J5OiAwIH0sXG4gICAgeyBzdWJqZWN0OiAnQU5USCcsIG51bWJlcjogMTAxLCBuYW1lOiAnSW50cm8gdG8gQW50aHJvcG9sb2d5Jywgc2VtZXN0ZXI6IDIsIGNhdGVnb3J5OiAwIH0sXG4gICAgeyBzdWJqZWN0OiAnR0VPTCcsIG51bWJlcjogMTA3LCBuYW1lOiAnUGh5c2ljYWwgR2VvbG9neScsIHNlbWVzdGVyOiAyLCBjYXRlZ29yeTogMCB9LFxuICAgIHsgc3ViamVjdDogJ01BVEgnLCBudW1iZXI6IDI0MSwgbmFtZTogJ0NhbGN1bHVzIElJSScsIHNlbWVzdGVyOiAyLCBjYXRlZ29yeTogMSB9LFxuICAgIHsgc3ViamVjdDogJ01BVEgnLCBudW1iZXI6IDQxNSwgbmFtZTogJ0FwcGxpZWQgTGluZWFyIEFsZ2VicmEnLCBzZW1lc3RlcjogMiwgY2F0ZWdvcnk6IDEgfSxcbiAgICB7IHN1YmplY3Q6ICdQSFlTJywgbnVtYmVyOiAyMTEsIG5hbWU6ICdVbml2IFBoeXNpY3M6IE1lY2hhbmljcycsIHNlbWVzdGVyOiAyLCBjYXRlZ29yeTogMiB9LFxuICAgIHsgc3ViamVjdDogJ01BVEgnLCBudW1iZXI6IDI4NSwgbmFtZTogJ0ludHJvIERpZmZlcmVudGlhbCBFcS4nLCBzZW1lc3RlcjogMywgY2F0ZWdvcnk6IDIgfSxcbiAgICB7IHN1YmplY3Q6ICdNQVRIJywgbnVtYmVyOiA0NjMsIG5hbWU6ICdTdGF0aXN0aWNzIGFuZCBQcm9iYWJpbGl0eScsIHNlbWVzdGVyOiAzLCBjYXRlZ29yeTogMSB9LFxuICAgIHsgc3ViamVjdDogJ1BISUwnLCBudW1iZXI6IDIwMiwgbmFtZTogJ1N5bWJvbGljIExvZ2ljJywgc2VtZXN0ZXI6IDMsIGNhdGVnb3J5OiAxIH0sXG4gICAgeyBzdWJqZWN0OiAnUEhZUycsIG51bWJlcjogMjEyLCBuYW1lOiAnVW5pdiBQaHlzaWNzOiBFbGVjICYgTWFnJywgc2VtZXN0ZXI6IDMsIGNhdGVnb3J5OiAyIH0sXG4gICAgeyBzdWJqZWN0OiAnQ1MnLCBudW1iZXI6IDIyNSwgbmFtZTogJ0RhdGEgU3RydWN0dXJlcycsIHNlbWVzdGVyOiA0LCBjYXRlZ29yeTogMSB9LFxuICAgIHsgc3ViamVjdDogJ0NTJywgbnVtYmVyOiAzNTcsIG5hbWU6ICdOdW1lcmljYWwgTWV0aG9kcyBJJywgc2VtZXN0ZXI6IDQsIGNhdGVnb3J5OiAxIH0sXG4gICAgeyBzdWJqZWN0OiAnSElTVCcsIG51bWJlcjogNDYxLCBuYW1lOiAnUnVzc2lhOiBQZXRlciB0aGUgR3JlYXQnLCBzZW1lc3RlcjogNCwgY2F0ZWdvcnk6IDAgfSxcbiAgICB7IHN1YmplY3Q6ICdQSFlTJywgbnVtYmVyOiAyMTMsIG5hbWU6ICdVbml2IFBoeXNpY3M6IFRoZXJtYWwnLCBzZW1lc3RlcjogNCwgY2F0ZWdvcnk6IDIgfSxcbiAgICB7IHN1YmplY3Q6ICdQSFlTJywgbnVtYmVyOiAyMTQsIG5hbWU6ICdVbml2IFBoeXNpY3M6IFF1YW50dW0nLCBzZW1lc3RlcjogNCwgY2F0ZWdvcnk6IDIgfSxcbiAgICB7IHN1YmplY3Q6ICdBUlREJywgbnVtYmVyOiAyMTUsIG5hbWU6ICdJbnRyb2R1Y3Rpb24gdG8gVHlwb2dyYXBoeScsIHNlbWVzdGVyOiA1LCBjYXRlZ29yeTogMCB9LFxuICAgIHsgc3ViamVjdDogJ0FUTVMnLCBudW1iZXI6IDEyMCwgbmFtZTogJ1Nldi4gJiBIYXphcmRvdXMgV2VhdGhlcicsIHNlbWVzdGVyOiA1LCBjYXRlZ29yeTogMCB9LFxuICAgIHsgc3ViamVjdDogJ0NTJywgbnVtYmVyOiAxNzMsIG5hbWU6ICdEaXNjcmV0ZSBTdHJ1Y3R1cmVzJywgc2VtZXN0ZXI6IDUsIGNhdGVnb3J5OiAxIH0sXG4gICAgeyBzdWJqZWN0OiAnQ1MnLCBudW1iZXI6IDQ0MCwgbmFtZTogJ0FydGlmaWNpYWwgSW50ZWxsaWdlbmNlJywgc2VtZXN0ZXI6IDUsIGNhdGVnb3J5OiAxIH0sXG4gICAgeyBzdWJqZWN0OiAnQ0hFTScsIG51bWJlcjogMjMyLCBuYW1lOiAnT3JnYW5pYyBDaGVtaXN0cnknLCBzZW1lc3RlcjogNiwgY2F0ZWdvcnk6IDIgfSxcbiAgICB7IHN1YmplY3Q6ICdDUFNDJywgbnVtYmVyOiAxMTYsIG5hbWU6ICdHbG9iYWwgRm9vZCBQcm9kdWN0aW9uJywgc2VtZXN0ZXI6IDYsIGNhdGVnb3J5OiAwIH0sXG4gICAgeyBzdWJqZWN0OiAnTVNFJywgbnVtYmVyOiAyMDYsIG5hbWU6ICdNZWNoYW5pY3MgZm9yIE1hdFNFJywgc2VtZXN0ZXI6IDYsIGNhdGVnb3J5OiAyIH0sXG4gICAgeyBzdWJqZWN0OiAnTVNFJywgbnVtYmVyOiA0NTAsIG5hbWU6ICdQb2x5bWVyIFNjaWVuY2UgJiBFbmcuJywgc2VtZXN0ZXI6IDYsIGNhdGVnb3J5OiAyIH1cbiAgXSxcbiAgY2xhc3NPcmRlcmluZ3M6IFtcbiAgICAnc2VtZXN0ZXInLFxuICAgICdzdWJqZWN0JyxcbiAgICAnbnVtYmVyJyxcbiAgICAnYWxwaGFiZXRpYydcbiAgXSxcbiAgY2xhc3NUb0pTWDogZnVuY3Rpb24oY2xhc3NSb3cpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBrZXk9e2NsYXNzUm93Lm5hbWV9IGNsYXNzTmFtZT0nY2xhc3Nfcm93Jz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2NsYXNzX25hbWUnPntjbGFzc1Jvdy5uYW1lfTwvZGl2PjxkaXYgY2xhc3NOYW1lPSdjbGFzc19pbmZvJz48ZGl2PntjbGFzc1Jvdy5zdWJqZWN0ICsgJy0nfTwvZGl2PjxkaXY+e2NsYXNzUm93Lm51bWJlcn08L2Rpdj48L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIGNsYXNzQ29tcGFyYXRvcjogZnVuY3Rpb24oYSwgYiwgb3JkZXJpbmcpIHtcbiAgICBvcmRlcmluZyA9IG9yZGVyaW5nIHx8IDA7XG4gICAgaWYgKG9yZGVyaW5nID09PSAwKSB7XG4gICAgICAvLyBzZW1lc3RlciBzb3J0aW5nXG4gICAgICByZXR1cm4gYS5zZW1lc3RlciA+IGIuc2VtZXN0ZXIgPyAxIDogLTE7XG4gICAgfSBlbHNlIGlmIChvcmRlcmluZyA9PT0gMSkge1xuICAgICAgLy8gc3ViamVjdCBzb3J0aW5nXG4gICAgICByZXR1cm4gYS5zdWJqZWN0ID4gYi5zdWJqZWN0ID8gMSA6IC0xO1xuICAgIH0gZWxzZSBpZiAob3JkZXJpbmcgPT09IDIpIHtcbiAgICAgIC8vIG51bWJlciBzb3J0aW5nXG4gICAgICByZXR1cm4gYS5udW1iZXIgPCBiLm51bWJlciA/IDEgOiAtMTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gYWxwaCBzb3J0aW5nXG4gICAgICByZXR1cm4gYS5uYW1lID4gYi5uYW1lID8gMSA6IC0xO1xuICAgIH1cbiAgfSxcblxuICAvLyBXb3JrIC8gUHJvamVjdHMgLyBFZHVjYXRpb25cbiAgV09SSzogW1xuICAgIHtcbiAgICAgIHRpdGxlOiAnUmRpbycsXG4gICAgICAvLyB0aXRsZV9saW5rOiAnaHR0cDovL3d3dy5yZGlvLmNvbScsXG4gICAgICBqb2JfdGl0bGU6ICdXZWIgVGVhbSBFbmdpbmVlcicsXG4gICAgICBzdGFydF9kYXRlOiAnMjAxNCcsXG4gICAgICBlbmRfZGF0ZTogJ05vdycsXG4gICAgICBub3RlczogW1xuICAgICAgICAnRHJvcHBlZCBvdXQgb2Ygc2Nob29sIHRvIHB1cnN1ZSBhIGZ1bGwgdGltZSBzb2Z0d2FyZSBlbmdpbmVlcmluZyBwb3NpdGlvbiBoZXJlJyxcbiAgICAgICAgJ0FtYXppbmcgTGVhcm5pbmcgRW52aXJvbm1lbnQnLFxuICAgICAgICAnUGl0Y2hlZCwgY3JlYXRlZCwgYW5kIGRlcGxveWVkIGEgdmlld3BvcnQgdHJhY2tlciBmb3IgdGhlIGNvbnRlbnQgb24gb3VyIGhvbWVwYWdlJyxcbiAgICAgICAgJ0ltcGxlbWVudGVkIFJkaW8gU2VsZWN0IHN1YnNjcmlwdGlvbiB0aWVyIG9uIHdlYicsXG4gICAgICAgICdVcGdyYWRlZCBtdWx0aXBsZSBhZG1pbiBwYWdlcyB3aXRoIGJldHRlciB2aXN1YWxpemF0aW9ucy9VWCcsXG4gICAgICAgICdXb3JraW5nIHdpdGg6IGphdmFzY3JpcHQoYmFja2JvbmUgYW5kIHJlYWN0KSwgSFRNTCwgQ1NTLCBTUUwsIHB5dGhvbidcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnUmRpbycsXG4gICAgICAvLyB0aXRsZV9saW5rOiAnaHR0cDovL3d3dy5yZGlvLmNvbScsXG4gICAgICBqb2JfdGl0bGU6ICdXZWIgVGVhbSBJbnRlcm4nLFxuICAgICAgZW5kX2RhdGU6ICcyMDE0JyxcbiAgICAgIG5vdGVzOiBbXG4gICAgICAgICdGaW5hbGx5IGxlYXJuZWQgaG93IHRvIHJlYWxseSB3b3JrIGVmZmVjdGl2ZWx5IGluIGEgc29mdHdhcmUgZGV2ZWxvcG1lbnQgdGVhbS4nLFxuICAgICAgICAnQmVzdCBmcm9udCBlbmQgdHJhaW5pbmcgSSBoYXZlIGV4cGVyaWVuY2VkLiBJIGRpZCBub3Qga25vdyBhbGwgdGhlIHN0ZXBzIHRvIGNyZWF0aW5nIGFuZCBob3N0aW5nIGEgd2Vic2l0ZSwgYnV0IG5vdyB0aGlzIHBhZ2UgaXMgYW4gZWFzeSB3ZWVrZW5kIHByb2plY3QuIChjdXJyZW50IHBhZ2Ugc2luY2UgcmV3cml0dGVuIGluIHJlYWN0KScsXG4gICAgICAgICdXb3JrZWQgb24gXCJtdXNpYyBmZWVkXCIsIHRoZSBjdXJyZW50IHJkaW8uY29tIGhvbWVwYWdlIHBhZ2UuJyxcbiAgICAgICAgJ0ltcGxlbWVudGVkIGEgdXNlciBleGl0IHN1cnZleSB0aGF0IGNvbGxlY3RzIG11Y2ggbW9yZSBpbmZvcm1hdGlvbiB0aGFuIGJlZm9yZS4nLFxuICAgICAgICAnQWRkZWQgYW5hbHl0aWNzIGFyb3VuZCB0aGUgc2l0ZSBhbmQgaGVscGVkIHRoZSBub24tdGVjaG5pY2FsIHN0YWZmIHRvIHF1ZXJ5L2FuYWx5emUgdGhlIGRhdGEuJyxcbiAgICAgICAgJ1dvcmtlZCB3aXRoOiBqYXZhc2NyaXB0LCBIVE1MLCBDU1MsIFNRTCdcbiAgICAgIF1cbiAgICB9LFxuICAgIHtcbiAgICAgIHRpdGxlOiAnRmFjZWJvb2snLFxuICAgICAgLy8gdGl0bGVfbGluazogJ2h0dHA6Ly93d3cuZmFjZWJvb2suY29tJyxcbiAgICAgIGpvYl90aXRsZTogJ1NpdGUgSW50ZWdyaXR5IFRlYW0gSW50ZXJuJyxcbiAgICAgIGVuZF9kYXRlOiAnMjAxMycsXG4gICAgICBub3RlczogW1xuICAgICAgICAnV29ya2VkIHdpdGggY29udGVudCByZXZpZXcgc3RhZmYgdG8gaW1wcm92ZSBpbnRlcm5hbCB0b29scyB0aGF0IGhhZCBiZWVuIHNsb3dpbmcgdGhlbSBkb3duLicsXG4gICAgICAgICdSZWFsbHkgZW5qb3llZCB0aGUgY2hhbGxlbmdlIG9mIG1ha2luZyBhbiBpbnRlcmZhY2UgdGhhdCBpcyBpbnR1aXRpdmUgYW5kIGxvb2tzIGdvb2QuJyxcbiAgICAgICAgJ1Byb2R1Y3Rpdml0eSBjb3VsZCBoYXZlIGJlZW4gYmV0dGVyLCBJIHdhcyBhZnJhaWQgb2YgYXNraW5nIGZvciBoZWxwIGJlY2F1c2UgSSB3YW50ZWQgdG8gbG9vayBzbWFydC4gSSBsZWFybmVkIGZyb20gbXkgZXhwZXJpZW5jZS4nLFxuICAgICAgICAnV29ya2VkIHdpdGg6IFBIUCwgSFRNTCwgQ1NTJ1xuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdXQVNIVScsXG4gICAgICBqb2JfdGl0bGU6ICdNZWRpY2FsIEltYWdpbmcgRGVwdC4gSW50ZXJuJyxcbiAgICAgIGVuZF9kYXRlOiAnMjAxMicsXG4gICAgICBub3RlczogW1xuICAgICAgICAnV29ya2VkIHdpdGggYSBzZWxmIGRpcmVjdGVkIHRlYW0gb2YgMyBvbiB0b29sIGZvciBYRFMgbWVkaWNhbCBkb2N1bWVudCB0cmFuc2ZlciBwcm90b2NvbC4nLFxuICAgICAgICAnQnVpbHQgdGVzdCBlbmRwb2ludCB3aXRoIGFiaWxpdHkgdG8gc2VsZWN0IGN1c3RvbSBkYXRhc2V0cyB0aGF0IGNvbnRhaW5lZCByZWxldmFudCBmaWxlIGZvcm1hdHMuJyxcbiAgICAgICAgJ0p1c3QgZW5vdWdoIEhJUEFBIHRyYWluaW5nIHRoYXQgSSBhbSB0ZXJyaWZpZWQgb2YgdG91Y2hpbmcgYW55IG1lZGljYWwgZG9jdW1lbnRzIGZvciBmZWFyIG9mIGdldHRpbmcgc3VlZC4nLFxuICAgICAgICAnRGV2ZWxvcGVkIHN0cm9uZyBkaXN0YXN0ZSBmb3IgamF2YSBzZXJ2ZXIgZmFjZXMuJyxcbiAgICAgICAgJ1dvcmtlZCB3aXRoOiBqYXZhLCBIVE1MJ1xuICAgICAgXVxuICAgIH0sXG4gIF0sXG4gIEVEVUNBVElPTjogW1xuICAgIHtcbiAgICAgIHRpdGxlOiAnVUlVQycsXG4gICAgICBzdGFydF9kYXRlOiAnMjAxMScsXG4gICAgICBlbmRfZGF0ZTogJzIwMTQnLFxuICAgICAgbm90ZXM6IFtcbiAgICAgICAgJ1N0dWRpZWQgTWF0ZXJpYWxzIFNjaWVuY2UgYW5kIENvbXB1dGVyIFNjaWVuY2UuJyxcbiAgICAgICAgJ0VjbGVjdGljIGNsYXNzIGxpc3QuJyxcbiAgICAgICAgJzJuZCBwbGFjZSBpbiBNaWNyb3NvZnQgV2luZG93cyBQaG9uZSBoYWNrYXRob24uIEkgd29uIGEgY29weSBvZiB2aXZhIHBpbmF0YS4nLFxuICAgICAgICAnUGFydGljaXBhdGVkIGluIEVuZ2luZWVyaW5nIE9wZW4gSG91c2UgdGhlIGxhc3QgMiB5ZWFycyBJIHdhcyB0aGVyZS4nLFxuICAgICAgICAnRHJvcHBlZCBvdXQgYWZ0ZXIgMyB5ZWFycyB0byBwdXJzdWUgYSBmdWxsIHRpbWUgc29mdHdhcmUgZW5naW5lZXJpbmcgcG9zaXRpb24uJ1xuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdTdC4gTG91aXMgUHJpb3J5IFNjaG9vbCcsXG4gICAgICBzdGFydF9kYXRlOiAnMjAwNicsXG4gICAgICBlbmRfZGF0ZTogJzIwMTEnLFxuICAgICAgbm90ZXM6IFtcbiAgICAgICAgJ1R1dG9yZWQgQ2hlbWlzdHJ5IGFuZCBQaHlzaWNzIGZvciBzY2hvb2wgcHJvZ3JhbS4gVGhlbiBwcm9jZWVkZWQgdG8gc3RhcnQgbXVjaCBtb3JlIGx1Y3JhdGl2ZSBpbmRlcGVuZGVudCBjbGFzc3Jvb20tc3R5bGUgcHJlcCBjb3Vyc2VzIGZvciBDaGVtaXN0cnkgdGhhdCBJIHJhbiBmb3IgdGhlIHN1bW1lcnMgb2YgMjAxMS0xMi4nLFxuICAgICAgICAnTmF0aW9uYWwgTWVyaXQgU2VtaS1GaW5hbGlzdCcsXG4gICAgICAgICdGSVJTVCByb2JvdGljcyB0ZWFtIDEzMjkgbGVhZGVyJ1xuICAgICAgXVxuICAgIH1cbiAgXSxcbiAgUFJPSkVDVFM6IFtcbiAgICB7XG4gICAgICB0aXRsZTogJ1RleHQgQW5hbHl6ZXIgV2ViYXBwJyxcbiAgICAgIHRpdGxlX2xpbms6ICdodHRwOi8vdGV4dGFuYWx5emVyLnlhbGUtdGhvbWFzLmNvbS8nLFxuICAgICAgZW5kX2RhdGU6ICcyMDE0JyxcbiAgICAgIG5vdGVzOiBbXG4gICAgICAgICdXZWIgYXBwIHRoYXQgdmlzdWFsaXplcyB3b3JkIHVzYWdlIHRocm91Z2hvdXQgbG9uZyBkb2N1bWVudHMgKHRoaW5rIGJvb2sgc2VyaWVzKScsXG4gICAgICAgICdGaXJzdCBhdHRlbXB0IGF0IHdlYmFwcCBwZXJzb25hbCBwcm9qZWN0LicsXG4gICAgICAgICdDcmVhdGVkIGFib3V0IGhhbGZ3YXkgdGhyb3VnaCBteSBsYXN0IGludGVybnNoaXAgdG8gdGVzdCBvdXQgd2ViIGRldiBza2lsbHMuJyxcbiAgICAgICAgJ1RyeSBpdCBvdXQgYnkgY2xpY2tpbmcgb24gdGhlIHRpdGxlIGFib3ZlXl4nLFxuICAgICAgICAnV29ya2VkIHdpdGg6IEpTLCBIVE1MLCBDU1MnXG4gICAgICBdXG4gICAgfSxcbiAgICB7XG4gICAgICB0aXRsZTogJ0VuZ2luZWVyaW5nIE9wZW4gSG91c2UnLFxuICAgICAgc3RhcnRfZGF0ZTogJzIwMTMnLFxuICAgICAgZW5kX2RhdGU6ICcyMDE0JyxcbiAgICAgIG5vdGVzOiBbXG4gICAgICAgICdFT0ggaXMgYSBzY2hvb2wgd2lkZSB0ZWNoIGRlbW8uJyxcbiAgICAgICAgJzIwMTMgLSBEZXNpZ25lZCwgaGVscGVkIGFzc2VtYmxlLCBhbmQgcHJvZ3JhbW1lZCBhIEZlcnJvZmx1aWQgTXVzaWMgVmlzdWFsaXplci4nLFxuICAgICAgICAnMjAxNCAtIERlc2lnbmVkLCBidWlsdCwgYW5kIHByb2dyYW1tZWQgYSBNb3JzZSBDb2RlIEtleWJvYXJkLicsXG4gICAgICAgICdXb3JrZWQgd2l0aDogaGFyZHdhcmUsIEFyZHVpbm8gQywgUHVyZURhdGEobmV2ZXIgYWdhaW4pJ1xuICAgICAgXVxuICAgIH0sXG4gICAge1xuICAgICAgdGl0bGU6ICdGSVJTVCBSb2JvdGljcycsXG4gICAgICBzdGFydF9kYXRlOiAnMjAwNicsXG4gICAgICBlbmRfZGF0ZTogJzIwMTEnLFxuICAgICAgbm90ZXM6IFtcbiAgICAgICAgJ1RlYW0gMTMyOSBsZWFkZXIgZnJvbSAyMDA4LTIwMTEnLFxuICAgICAgICAnSGVhZCBvZiBtZWNoYW5pY3MgdGVhbS4nLFxuICAgICAgICAnTGVhcm5lZCBob3cgdG8gbWFuYWdlIGEgZ3JvdXAgb2YgaGlnaCBzY2hvb2wgdW5kZXJjbGFzc21lbiB0aHJvdWdoIGEgbGFyZ2UgcHJvamVjdC4nLFxuICAgICAgICAnV29ya2VkIHdpdGg6IGhhcmR3YXJlLCBqYXZhJ1xuICAgICAgXVxuICAgIH0sXG4gIF0sXG4gIHByb2ZpbGVUb0pTWDogZnVuY3Rpb24oaW5mb1Jvdykge1xuICAgIHZhciBtYWluVGl0bGUgPSBpbmZvUm93LnRpdGxlX2xpbmsgPyAoPGEgaHJlZj17aW5mb1Jvdy50aXRsZV9saW5rfT57aW5mb1Jvdy50aXRsZX08L2E+KSA6IGluZm9Sb3cudGl0bGU7XG4gICAgdmFyIGV4dHJhVGl0bGUgPSAoaW5mb1Jvdy5qb2JfdGl0bGUpID8gJyAtICcgKyBpbmZvUm93LmpvYl90aXRsZSA6IG51bGw7XG4gICAgdmFyIHN0YXJ0RGF0ZSA9IGluZm9Sb3cuc3RhcnRfZGF0ZSA/IGluZm9Sb3cuc3RhcnRfZGF0ZSArICcgLSAnIDogbnVsbDtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBrZXk9e2luZm9Sb3cudGl0bGUgKyBpbmZvUm93LmVuZF9kYXRlfSBjbGFzc05hbWU9J2luZm9fYm94Jz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J2luZm9faGVhZGVyJz48ZGl2IGNsYXNzTmFtZT0naW5mb19uYW1lJz57bWFpblRpdGxlfXtleHRyYVRpdGxlfTwvZGl2PjxkaXYgY2xhc3NOYW1lPSdpbmZvX2RhdGVzJz57c3RhcnREYXRlfXtpbmZvUm93LmVuZF9kYXRlfTwvZGl2PjwvZGl2PlxuICAgICAgICA8dWw+XG4gICAgICAgICAge2luZm9Sb3cubm90ZXMubWFwKGZ1bmN0aW9uKG5vdGUpIHsgcmV0dXJuICg8bGk+e25vdGV9PC9saT4pOyB9KX1cbiAgICAgICAgPC91bD5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH0sXG4gIHByb2ZpbGVDb21wYXJhdG9yOiBmdW5jdGlvbihhLCBiLCBvcmRlcikge1xuICAgIGlmIChhLmVuZF9kYXRlID09PSAnTm93JykgeyByZXR1cm4gLTE7IH1cbiAgICBpZiAoYi5lbmRfZGF0ZSA9PT0gJ05vdycpIHsgcmV0dXJuIDE7IH1cbiAgICByZXR1cm4gYS5lbmRfZGF0ZSA8IGIuZW5kX2RhdGUgPyAxIDogLTE7XG4gIH0sXG59KTtcbiIsIi8qXG5vYmplY3QtYXNzaWduXG4oYykgU2luZHJlIFNvcmh1c1xuQGxpY2Vuc2UgTUlUXG4qL1xuXG4ndXNlIHN0cmljdCc7XG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xudmFyIGdldE93blByb3BlcnR5U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ldy13cmFwcGVyc1xuXHRcdHRlc3QxWzVdID0gJ2RlJztcblx0XHRpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDEpWzBdID09PSAnNScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QyID0ge307XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG5cdFx0XHR0ZXN0MlsnXycgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXSA9IGk7XG5cdFx0fVxuXHRcdHZhciBvcmRlcjIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MikubWFwKGZ1bmN0aW9uIChuKSB7XG5cdFx0XHRyZXR1cm4gdGVzdDJbbl07XG5cdFx0fSk7XG5cdFx0aWYgKG9yZGVyMi5qb2luKCcnKSAhPT0gJzAxMjM0NTY3ODknKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MyA9IHt9O1xuXHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24gKGxldHRlcikge1xuXHRcdFx0dGVzdDNbbGV0dGVyXSA9IGxldHRlcjtcblx0XHR9KTtcblx0XHRpZiAoT2JqZWN0LmtleXMoT2JqZWN0LmFzc2lnbih7fSwgdGVzdDMpKS5qb2luKCcnKSAhPT1cblx0XHRcdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXHR9IGNhdGNoIChlcnIpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChnZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoZnJvbSk7XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKHByb3BJc0VudW1lcmFibGUuY2FsbChmcm9tLCBzeW1ib2xzW2ldKSkge1xuXHRcdFx0XHRcdHRvW3N5bWJvbHNbaV1dID0gZnJvbVtzeW1ib2xzW2ldXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0bztcbn07XG4iLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwcmludFdhcm5pbmcgPSBmdW5jdGlvbigpIHt9O1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL2xpYi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuICB2YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG5cbiAgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24odGV4dCkge1xuICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyB0ZXh0O1xuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG59XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P0Z1bmN0aW9ufSBnZXRTdGFjayBSZXR1cm5zIHRoZSBjb21wb25lbnQgc3RhY2suXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1Byb3BUeXBlcyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGdldFN0YWNrKSB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgICAgaWYgKHR5cGVTcGVjcy5oYXNPd25Qcm9wZXJ0eSh0eXBlU3BlY05hbWUpKSB7XG4gICAgICAgIHZhciBlcnJvcjtcbiAgICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgICAgLy8gZmFpbCB0aGUgcmVuZGVyIHBoYXNlIHdoZXJlIGl0IGRpZG4ndCBmYWlsIGJlZm9yZS4gU28gd2UgbG9nIGl0LlxuICAgICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBpbnRlbnRpb25hbGx5IGFuIGludmFyaWFudCB0aGF0IGdldHMgY2F1Z2h0LiBJdCdzIHRoZSBzYW1lXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAgIGlmICh0eXBlb2YgdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciBlcnIgPSBFcnJvcihcbiAgICAgICAgICAgICAgKGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJykgKyAnOiAnICsgbG9jYXRpb24gKyAnIHR5cGUgYCcgKyB0eXBlU3BlY05hbWUgKyAnYCBpcyBpbnZhbGlkOyAnICtcbiAgICAgICAgICAgICAgJ2l0IG11c3QgYmUgYSBmdW5jdGlvbiwgdXN1YWxseSBmcm9tIHRoZSBgcHJvcC10eXBlc2AgcGFja2FnZSwgYnV0IHJlY2VpdmVkIGAnICsgdHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdICsgJ2AuJ1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVyci5uYW1lID0gJ0ludmFyaWFudCBWaW9sYXRpb24nO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlcnJvciA9IHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdKHZhbHVlcywgdHlwZVNwZWNOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgbnVsbCwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICAgIGVycm9yID0gZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yICYmICEoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikpIHtcbiAgICAgICAgICBwcmludFdhcm5pbmcoXG4gICAgICAgICAgICAoY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnKSArICc6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAnICtcbiAgICAgICAgICAgIGxvY2F0aW9uICsgJyBgJyArIHR5cGVTcGVjTmFtZSArICdgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArXG4gICAgICAgICAgICAnZnVuY3Rpb24gbXVzdCByZXR1cm4gYG51bGxgIG9yIGFuIGBFcnJvcmAgYnV0IHJldHVybmVkIGEgJyArIHR5cGVvZiBlcnJvciArICcuICcgK1xuICAgICAgICAgICAgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgK1xuICAgICAgICAgICAgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArXG4gICAgICAgICAgICAnc2hhcGUgYWxsIHJlcXVpcmUgYW4gYXJndW1lbnQpLidcbiAgICAgICAgICApXG5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiAhKGVycm9yLm1lc3NhZ2UgaW4gbG9nZ2VkVHlwZUZhaWx1cmVzKSkge1xuICAgICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgICAgbG9nZ2VkVHlwZUZhaWx1cmVzW2Vycm9yLm1lc3NhZ2VdID0gdHJ1ZTtcblxuICAgICAgICAgIHZhciBzdGFjayA9IGdldFN0YWNrID8gZ2V0U3RhY2soKSA6ICcnO1xuXG4gICAgICAgICAgcHJpbnRXYXJuaW5nKFxuICAgICAgICAgICAgJ0ZhaWxlZCAnICsgbG9jYXRpb24gKyAnIHR5cGU6ICcgKyBlcnJvci5tZXNzYWdlICsgKHN0YWNrICE9IG51bGwgPyBzdGFjayA6ICcnKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1Byb3BUeXBlcztcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0O1xuIiwiLyoqIEBsaWNlbnNlIFJlYWN0IHYxNi42LjBcbiAqIHJlYWN0LmRldmVsb3BtZW50LmpzXG4gKlxuICogQ29weXJpZ2h0IChjKSBGYWNlYm9vaywgSW5jLiBhbmQgaXRzIGFmZmlsaWF0ZXMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5cblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikge1xuICAoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xudmFyIGNoZWNrUHJvcFR5cGVzID0gcmVxdWlyZSgncHJvcC10eXBlcy9jaGVja1Byb3BUeXBlcycpO1xuXG4vLyBUT0RPOiB0aGlzIGlzIHNwZWNpYWwgYmVjYXVzZSBpdCBnZXRzIGltcG9ydGVkIGR1cmluZyBidWlsZC5cblxudmFyIFJlYWN0VmVyc2lvbiA9ICcxNi42LjAnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQtbGlrZSB0eXBlcy4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxudmFyIGhhc1N5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgU3ltYm9sLmZvcjtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmVsZW1lbnQnKSA6IDB4ZWFjNztcbnZhciBSRUFDVF9QT1JUQUxfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LnBvcnRhbCcpIDogMHhlYWNhO1xudmFyIFJFQUNUX0ZSQUdNRU5UX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mcmFnbWVudCcpIDogMHhlYWNiO1xudmFyIFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdHJpY3RfbW9kZScpIDogMHhlYWNjO1xudmFyIFJFQUNUX1BST0ZJTEVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm9maWxlcicpIDogMHhlYWQyO1xudmFyIFJFQUNUX1BST1ZJREVSX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5wcm92aWRlcicpIDogMHhlYWNkO1xudmFyIFJFQUNUX0NPTlRFWFRfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbnRleHQnKSA6IDB4ZWFjZTtcbnZhciBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0LmNvbmN1cnJlbnRfbW9kZScpIDogMHhlYWNmO1xudmFyIFJFQUNUX0ZPUldBUkRfUkVGX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5mb3J3YXJkX3JlZicpIDogMHhlYWQwO1xudmFyIFJFQUNUX1NVU1BFTlNFX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5zdXNwZW5zZScpIDogMHhlYWQxO1xudmFyIFJFQUNUX01FTU9fVFlQRSA9IGhhc1N5bWJvbCA/IFN5bWJvbC5mb3IoJ3JlYWN0Lm1lbW8nKSA6IDB4ZWFkMztcbnZhciBSRUFDVF9MQVpZX1RZUEUgPSBoYXNTeW1ib2wgPyBTeW1ib2wuZm9yKCdyZWFjdC5sYXp5JykgOiAweGVhZDQ7XG5cbnZhciBNQVlCRV9JVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbnZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJztcblxuZnVuY3Rpb24gZ2V0SXRlcmF0b3JGbihtYXliZUl0ZXJhYmxlKSB7XG4gIGlmIChtYXliZUl0ZXJhYmxlID09PSBudWxsIHx8IHR5cGVvZiBtYXliZUl0ZXJhYmxlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHZhciBtYXliZUl0ZXJhdG9yID0gTUFZQkVfSVRFUkFUT1JfU1lNQk9MICYmIG1heWJlSXRlcmFibGVbTUFZQkVfSVRFUkFUT1JfU1lNQk9MXSB8fCBtYXliZUl0ZXJhYmxlW0ZBVVhfSVRFUkFUT1JfU1lNQk9MXTtcbiAgaWYgKHR5cGVvZiBtYXliZUl0ZXJhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG1heWJlSXRlcmF0b3I7XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uICgpIHt9O1xuXG57XG4gIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gKGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCk7XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3IgPSB2b2lkIDA7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbi8vIFJlbHlpbmcgb24gdGhlIGBpbnZhcmlhbnQoKWAgaW1wbGVtZW50YXRpb24gbGV0cyB1c1xuLy8gcHJlc2VydmUgdGhlIGZvcm1hdCBhbmQgcGFyYW1zIGluIHRoZSB3d3cgYnVpbGRzLlxuXG4vKipcbiAqIEZvcmtlZCBmcm9tIGZianMvd2FybmluZzpcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9mYmpzL2Jsb2IvZTY2YmEyMGFkNWJlNDMzZWI1NDQyM2YyYjA5N2Q4MjkzMjRkOWRlNi9wYWNrYWdlcy9mYmpzL3NyYy9fX2ZvcmtzX18vd2FybmluZy5qc1xuICpcbiAqIE9ubHkgY2hhbmdlIGlzIHdlIHVzZSBjb25zb2xlLndhcm4gaW5zdGVhZCBvZiBjb25zb2xlLmVycm9yLFxuICogYW5kIGRvIG5vdGhpbmcgd2hlbiAnY29uc29sZScgaXMgbm90IHN1cHBvcnRlZC5cbiAqIFRoaXMgcmVhbGx5IHNpbXBsaWZpZXMgdGhlIGNvZGUuXG4gKiAtLS1cbiAqIFNpbWlsYXIgdG8gaW52YXJpYW50IGJ1dCBvbmx5IGxvZ3MgYSB3YXJuaW5nIGlmIHRoZSBjb25kaXRpb24gaXMgbm90IG1ldC5cbiAqIFRoaXMgY2FuIGJlIHVzZWQgdG8gbG9nIGlzc3VlcyBpbiBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMgaW4gY3JpdGljYWxcbiAqIHBhdGhzLiBSZW1vdmluZyB0aGUgbG9nZ2luZyBjb2RlIGZvciBwcm9kdWN0aW9uIGVudmlyb25tZW50cyB3aWxsIGtlZXAgdGhlXG4gKiBzYW1lIGxvZ2ljIGFuZCBmb2xsb3cgdGhlIHNhbWUgY29kZSBwYXRocy5cbiAqL1xuXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nID0gZnVuY3Rpb24gKCkge307XG5cbntcbiAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIChmb3JtYXQpIHtcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cblxuICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zb2xlLndhcm4obWVzc2FnZSk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIH0gY2F0Y2ggKHgpIHt9XG4gIH07XG5cbiAgbG93UHJpb3JpdHlXYXJuaW5nID0gZnVuY3Rpb24gKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Bsb3dQcmlvcml0eVdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQsIC4uLmFyZ3MpYCByZXF1aXJlcyBhIHdhcm5pbmcgJyArICdtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuMiA+IDIgPyBfbGVuMiAtIDIgOiAwKSwgX2tleTIgPSAyOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICB9XG5cbiAgICAgIHByaW50V2FybmluZy5hcHBseSh1bmRlZmluZWQsIFtmb3JtYXRdLmNvbmNhdChhcmdzKSk7XG4gICAgfVxuICB9O1xufVxuXG52YXIgbG93UHJpb3JpdHlXYXJuaW5nJDEgPSBsb3dQcmlvcml0eVdhcm5pbmc7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nV2l0aG91dFN0YWNrID0gZnVuY3Rpb24gKCkge307XG5cbntcbiAgd2FybmluZ1dpdGhvdXRTdGFjayA9IGZ1bmN0aW9uIChjb25kaXRpb24sIGZvcm1hdCkge1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nV2l0aG91dFN0YWNrKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgICBpZiAoYXJncy5sZW5ndGggPiA4KSB7XG4gICAgICAvLyBDaGVjayBiZWZvcmUgdGhlIGNvbmRpdGlvbiB0byBjYXRjaCB2aW9sYXRpb25zIGVhcmx5LlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCd3YXJuaW5nV2l0aG91dFN0YWNrKCkgY3VycmVudGx5IHN1cHBvcnRzIGF0IG1vc3QgOCBhcmd1bWVudHMuJyk7XG4gICAgfVxuICAgIGlmIChjb25kaXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIF9hcmdzJG1hcCA9IGFyZ3MubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHJldHVybiAnJyArIGl0ZW07XG4gICAgICB9KSxcbiAgICAgICAgICBhID0gX2FyZ3MkbWFwWzBdLFxuICAgICAgICAgIGIgPSBfYXJncyRtYXBbMV0sXG4gICAgICAgICAgYyA9IF9hcmdzJG1hcFsyXSxcbiAgICAgICAgICBkID0gX2FyZ3MkbWFwWzNdLFxuICAgICAgICAgIGUgPSBfYXJncyRtYXBbNF0sXG4gICAgICAgICAgZiA9IF9hcmdzJG1hcFs1XSxcbiAgICAgICAgICBnID0gX2FyZ3MkbWFwWzZdLFxuICAgICAgICAgIGggPSBfYXJncyRtYXBbN107XG5cbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQ7XG5cbiAgICAgIC8vIFdlIGludGVudGlvbmFsbHkgZG9uJ3QgdXNlIHNwcmVhZCAob3IgLmFwcGx5KSBiZWNhdXNlIGl0IGJyZWFrcyBJRTk6XG4gICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzEzNjEwXG4gICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCBhKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgYSwgYik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UsIGEsIGIsIGMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCBhLCBiLCBjLCBkKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgYSwgYiwgYywgZCwgZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UsIGEsIGIsIGMsIGQsIGUsIGYpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgY29uc29sZS5lcnJvcihtZXNzYWdlLCBhLCBiLCBjLCBkLCBlLCBmLCBnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4OlxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSwgYSwgYiwgYywgZCwgZSwgZiwgZywgaCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd3YXJuaW5nV2l0aG91dFN0YWNrKCkgY3VycmVudGx5IHN1cHBvcnRzIGF0IG1vc3QgOCBhcmd1bWVudHMuJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgIC8vIHRvIGZpbmQgdGhlIGNhbGxzaXRlIHRoYXQgY2F1c2VkIHRoaXMgd2FybmluZyB0byBmaXJlLlxuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBfbWVzc2FnZSA9ICdXYXJuaW5nOiAnICsgZm9ybWF0LnJlcGxhY2UoLyVzL2csIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGFyZ3NbYXJnSW5kZXgrK107XG4gICAgICB9KTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihfbWVzc2FnZSk7XG4gICAgfSBjYXRjaCAoeCkge31cbiAgfTtcbn1cblxudmFyIHdhcm5pbmdXaXRob3V0U3RhY2skMSA9IHdhcm5pbmdXaXRob3V0U3RhY2s7XG5cbnZhciBkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnQgPSB7fTtcblxuZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAge1xuICAgIHZhciBfY29uc3RydWN0b3IgPSBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICB2YXIgY29tcG9uZW50TmFtZSA9IF9jb25zdHJ1Y3RvciAmJiAoX2NvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8IF9jb25zdHJ1Y3Rvci5uYW1lKSB8fCAnUmVhY3RDbGFzcyc7XG4gICAgdmFyIHdhcm5pbmdLZXkgPSBjb21wb25lbnROYW1lICsgJy4nICsgY2FsbGVyTmFtZTtcbiAgICBpZiAoZGlkV2FyblN0YXRlVXBkYXRlRm9yVW5tb3VudGVkQ29tcG9uZW50W3dhcm5pbmdLZXldKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHdhcm5pbmdXaXRob3V0U3RhY2skMShmYWxzZSwgXCJDYW4ndCBjYWxsICVzIG9uIGEgY29tcG9uZW50IHRoYXQgaXMgbm90IHlldCBtb3VudGVkLiBcIiArICdUaGlzIGlzIGEgbm8tb3AsIGJ1dCBpdCBtaWdodCBpbmRpY2F0ZSBhIGJ1ZyBpbiB5b3VyIGFwcGxpY2F0aW9uLiAnICsgJ0luc3RlYWQsIGFzc2lnbiB0byBgdGhpcy5zdGF0ZWAgZGlyZWN0bHkgb3IgZGVmaW5lIGEgYHN0YXRlID0ge307YCAnICsgJ2NsYXNzIHByb3BlcnR5IHdpdGggdGhlIGRlc2lyZWQgc3RhdGUgaW4gdGhlICVzIGNvbXBvbmVudC4nLCBjYWxsZXJOYW1lLCBjb21wb25lbnROYW1lKTtcbiAgICBkaWRXYXJuU3RhdGVVcGRhdGVGb3JVbm1vdW50ZWRDb21wb25lbnRbd2FybmluZ0tleV0gPSB0cnVlO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gKi9cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2Ugd2Ugd2FudCB0byB0ZXN0LlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHByb3RlY3RlZFxuICAgKiBAZmluYWxcbiAgICovXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9LFxuXG4gIC8qKlxuICAgKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gICAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICAgKlxuICAgKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gICAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICAgKlxuICAgKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gICAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIGNvbXBvbmVudCBpcyB1cGRhdGVkLlxuICAgKiBAcGFyYW0gez9zdHJpbmd9IGNhbGxlck5hbWUgbmFtZSBvZiB0aGUgY2FsbGluZyBmdW5jdGlvbiBpbiB0aGUgcHVibGljIEFQSS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY2FsbGJhY2ssIGNhbGxlck5hbWUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGFsbCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyBvciBgc2V0U3RhdGVgIHRvIG11dGF0ZSBzdGF0ZS5cbiAgICogWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICAgKlxuICAgKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICAgKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBsZXRlU3RhdGUgTmV4dCBzdGF0ZS5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBjb21wb25lbnQgaXMgdXBkYXRlZC5cbiAgICogQHBhcmFtIHs/c3RyaW5nfSBjYWxsZXJOYW1lIG5hbWUgb2YgdGhlIGNhbGxpbmcgZnVuY3Rpb24gaW4gdGhlIHB1YmxpYyBBUEkuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjb21wbGV0ZVN0YXRlLCBjYWxsYmFjaywgY2FsbGVyTmFtZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAncmVwbGFjZVN0YXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBUaGlzIG9ubHkgZXhpc3RzIGJlY2F1c2UgX3BlbmRpbmdTdGF0ZSBpc1xuICAgKiBpbnRlcm5hbC4gVGhpcyBwcm92aWRlcyBhIG1lcmdpbmcgc3RyYXRlZ3kgdGhhdCBpcyBub3QgYXZhaWxhYmxlIHRvIGRlZXBcbiAgICogcHJvcGVydGllcyB3aGljaCBpcyBjb25mdXNpbmcuIFRPRE86IEV4cG9zZSBwZW5kaW5nU3RhdGUgb3IgZG9uJ3QgdXNlIGl0XG4gICAqIGR1cmluZyB0aGUgbWVyZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBzdGF0ZS5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBjb21wb25lbnQgaXMgdXBkYXRlZC5cbiAgICogQHBhcmFtIHs/c3RyaW5nfSBOYW1lIG9mIHRoZSBjYWxsaW5nIGZ1bmN0aW9uIGluIHRoZSBwdWJsaWMgQVBJLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVTZXRTdGF0ZTogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrLCBjYWxsZXJOYW1lKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG52YXIgZW1wdHlPYmplY3QgPSB7fTtcbntcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIENvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIC8vIElmIGEgY29tcG9uZW50IGhhcyBzdHJpbmcgcmVmcywgd2Ugd2lsbCBhc3NpZ24gYSBkaWZmZXJlbnQgb2JqZWN0IGxhdGVyLlxuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgLy8gcmVuZGVyZXIuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cbkNvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuXG4vKipcbiAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgdG8gbXV0YXRlXG4gKiBzdGF0ZS4gWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAgd2lsbCBydW4gc3luY2hyb25vdXNseSxcbiAqIGFzIHRoZXkgbWF5IGV2ZW50dWFsbHkgYmUgYmF0Y2hlZCB0b2dldGhlci4gIFlvdSBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNhbGwgdG8gc2V0U3RhdGUgaXMgYWN0dWFsbHlcbiAqIGNvbXBsZXRlZC5cbiAqXG4gKiBXaGVuIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgdG8gc2V0U3RhdGUsIGl0IHdpbGwgYmUgY2FsbGVkIGF0IHNvbWUgcG9pbnQgaW5cbiAqIHRoZSBmdXR1cmUgKG5vdCBzeW5jaHJvbm91c2x5KS4gSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdXAgdG8gZGF0ZVxuICogY29tcG9uZW50IGFyZ3VtZW50cyAoc3RhdGUsIHByb3BzLCBjb250ZXh0KS4gVGhlc2UgdmFsdWVzIGNhbiBiZSBkaWZmZXJlbnRcbiAqIGZyb20gdGhpcy4qIGJlY2F1c2UgeW91ciBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGFmdGVyIHJlY2VpdmVQcm9wcyBidXQgYmVmb3JlXG4gKiBzaG91bGRDb21wb25lbnRVcGRhdGUsIGFuZCB0aGlzIG5ldyBzdGF0ZSwgcHJvcHMsIGFuZCBjb250ZXh0IHdpbGwgbm90IHlldCBiZVxuICogYXNzaWduZWQgdG8gdGhpcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSBvciBmdW5jdGlvbiB0b1xuICogICAgICAgIHByb2R1Y2UgbmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGN1cnJlbnQgc3RhdGUuXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuQ29tcG9uZW50LnByb3RvdHlwZS5zZXRTdGF0ZSA9IGZ1bmN0aW9uIChwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrKSB7XG4gICEodHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgfHwgdHlwZW9mIHBhcnRpYWxTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyB8fCBwYXJ0aWFsU3RhdGUgPT0gbnVsbCkgPyBpbnZhcmlhbnQoZmFsc2UsICdzZXRTdGF0ZSguLi4pOiB0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcy4nKSA6IHZvaWQgMDtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbn07XG5cbi8qKlxuICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gKlxuICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gKlxuICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAqXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHVwZGF0ZSBpcyBjb21wbGV0ZS5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5Db21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcywgY2FsbGJhY2ssICdmb3JjZVVwZGF0ZScpO1xufTtcblxuLyoqXG4gKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICogbW9kZXJuIGJhc2UgY2xhc3MuIEluc3RlYWQsIHdlIGRlZmluZSBhIGdldHRlciB0aGF0IHdhcm5zIGlmIGl0J3MgYWNjZXNzZWQuXG4gKi9cbntcbiAgdmFyIGRlcHJlY2F0ZWRBUElzID0ge1xuICAgIGlzTW91bnRlZDogWydpc01vdW50ZWQnLCAnSW5zdGVhZCwgbWFrZSBzdXJlIHRvIGNsZWFuIHVwIHN1YnNjcmlwdGlvbnMgYW5kIHBlbmRpbmcgcmVxdWVzdHMgaW4gJyArICdjb21wb25lbnRXaWxsVW5tb3VudCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcy4nXSxcbiAgICByZXBsYWNlU3RhdGU6IFsncmVwbGFjZVN0YXRlJywgJ1JlZmFjdG9yIHlvdXIgY29kZSB0byB1c2Ugc2V0U3RhdGUgaW5zdGVhZCAoc2VlICcgKyAnaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zMjM2KS4nXVxuICB9O1xuICB2YXIgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nID0gZnVuY3Rpb24gKG1ldGhvZE5hbWUsIGluZm8pIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcG9uZW50LnByb3RvdHlwZSwgbWV0aG9kTmFtZSwge1xuICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvd1ByaW9yaXR5V2FybmluZyQxKGZhbHNlLCAnJXMoLi4uKSBpcyBkZXByZWNhdGVkIGluIHBsYWluIEphdmFTY3JpcHQgUmVhY3QgY2xhc3Nlcy4gJXMnLCBpbmZvWzBdLCBpbmZvWzFdKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcbiAgZm9yICh2YXIgZm5OYW1lIGluIGRlcHJlY2F0ZWRBUElzKSB7XG4gICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyhmbk5hbWUsIGRlcHJlY2F0ZWRBUElzW2ZuTmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBDb21wb25lbnREdW1teSgpIHt9XG5Db21wb25lbnREdW1teS5wcm90b3R5cGUgPSBDb21wb25lbnQucHJvdG90eXBlO1xuXG4vKipcbiAqIENvbnZlbmllbmNlIGNvbXBvbmVudCB3aXRoIGRlZmF1bHQgc2hhbGxvdyBlcXVhbGl0eSBjaGVjayBmb3Igc0NVLlxuICovXG5mdW5jdGlvbiBQdXJlQ29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgLy8gSWYgYSBjb21wb25lbnQgaGFzIHN0cmluZyByZWZzLCB3ZSB3aWxsIGFzc2lnbiBhIGRpZmZlcmVudCBvYmplY3QgbGF0ZXIuXG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG52YXIgcHVyZUNvbXBvbmVudFByb3RvdHlwZSA9IFB1cmVDb21wb25lbnQucHJvdG90eXBlID0gbmV3IENvbXBvbmVudER1bW15KCk7XG5wdXJlQ29tcG9uZW50UHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUHVyZUNvbXBvbmVudDtcbi8vIEF2b2lkIGFuIGV4dHJhIHByb3RvdHlwZSBqdW1wIGZvciB0aGVzZSBtZXRob2RzLlxuX2Fzc2lnbihwdXJlQ29tcG9uZW50UHJvdG90eXBlLCBDb21wb25lbnQucHJvdG90eXBlKTtcbnB1cmVDb21wb25lbnRQcm90b3R5cGUuaXNQdXJlUmVhY3RDb21wb25lbnQgPSB0cnVlO1xuXG4vLyBhbiBpbW11dGFibGUgb2JqZWN0IHdpdGggYSBzaW5nbGUgbXV0YWJsZSB2YWx1ZVxuZnVuY3Rpb24gY3JlYXRlUmVmKCkge1xuICB2YXIgcmVmT2JqZWN0ID0ge1xuICAgIGN1cnJlbnQ6IG51bGxcbiAgfTtcbiAge1xuICAgIE9iamVjdC5zZWFsKHJlZk9iamVjdCk7XG4gIH1cbiAgcmV0dXJuIHJlZk9iamVjdDtcbn1cblxuLyoqXG4gKiBLZWVwcyB0cmFjayBvZiB0aGUgY3VycmVudCBvd25lci5cbiAqXG4gKiBUaGUgY3VycmVudCBvd25lciBpcyB0aGUgY29tcG9uZW50IHdobyBzaG91bGQgb3duIGFueSBjb21wb25lbnRzIHRoYXQgYXJlXG4gKiBjdXJyZW50bHkgYmVpbmcgY29uc3RydWN0ZWQuXG4gKi9cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHtcbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBjdXJyZW50OiBudWxsLFxuICBjdXJyZW50RGlzcGF0Y2hlcjogbnVsbFxufTtcblxudmFyIEJFRk9SRV9TTEFTSF9SRSA9IC9eKC4qKVtcXFxcXFwvXS87XG5cbnZhciBkZXNjcmliZUNvbXBvbmVudEZyYW1lID0gZnVuY3Rpb24gKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKSB7XG4gIHZhciBzb3VyY2VJbmZvID0gJyc7XG4gIGlmIChzb3VyY2UpIHtcbiAgICB2YXIgcGF0aCA9IHNvdXJjZS5maWxlTmFtZTtcbiAgICB2YXIgZmlsZU5hbWUgPSBwYXRoLnJlcGxhY2UoQkVGT1JFX1NMQVNIX1JFLCAnJyk7XG4gICAge1xuICAgICAgLy8gSW4gREVWLCBpbmNsdWRlIGNvZGUgZm9yIGEgY29tbW9uIHNwZWNpYWwgY2FzZTpcbiAgICAgIC8vIHByZWZlciBcImZvbGRlci9pbmRleC5qc1wiIGluc3RlYWQgb2YganVzdCBcImluZGV4LmpzXCIuXG4gICAgICBpZiAoL15pbmRleFxcLi8udGVzdChmaWxlTmFtZSkpIHtcbiAgICAgICAgdmFyIG1hdGNoID0gcGF0aC5tYXRjaChCRUZPUkVfU0xBU0hfUkUpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICB2YXIgcGF0aEJlZm9yZVNsYXNoID0gbWF0Y2hbMV07XG4gICAgICAgICAgaWYgKHBhdGhCZWZvcmVTbGFzaCkge1xuICAgICAgICAgICAgdmFyIGZvbGRlck5hbWUgPSBwYXRoQmVmb3JlU2xhc2gucmVwbGFjZShCRUZPUkVfU0xBU0hfUkUsICcnKTtcbiAgICAgICAgICAgIGZpbGVOYW1lID0gZm9sZGVyTmFtZSArICcvJyArIGZpbGVOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBzb3VyY2VJbmZvID0gJyAoYXQgJyArIGZpbGVOYW1lICsgJzonICsgc291cmNlLmxpbmVOdW1iZXIgKyAnKSc7XG4gIH0gZWxzZSBpZiAob3duZXJOYW1lKSB7XG4gICAgc291cmNlSW5mbyA9ICcgKGNyZWF0ZWQgYnkgJyArIG93bmVyTmFtZSArICcpJztcbiAgfVxuICByZXR1cm4gJ1xcbiAgICBpbiAnICsgKG5hbWUgfHwgJ1Vua25vd24nKSArIHNvdXJjZUluZm87XG59O1xuXG52YXIgUmVzb2x2ZWQgPSAxO1xuXG5cbmZ1bmN0aW9uIHJlZmluZVJlc29sdmVkTGF6eUNvbXBvbmVudChsYXp5Q29tcG9uZW50KSB7XG4gIHJldHVybiBsYXp5Q29tcG9uZW50Ll9zdGF0dXMgPT09IFJlc29sdmVkID8gbGF6eUNvbXBvbmVudC5fcmVzdWx0IDogbnVsbDtcbn1cblxuZnVuY3Rpb24gZ2V0V3JhcHBlZE5hbWUob3V0ZXJUeXBlLCBpbm5lclR5cGUsIHdyYXBwZXJOYW1lKSB7XG4gIHZhciBmdW5jdGlvbk5hbWUgPSBpbm5lclR5cGUuZGlzcGxheU5hbWUgfHwgaW5uZXJUeXBlLm5hbWUgfHwgJyc7XG4gIHJldHVybiBvdXRlclR5cGUuZGlzcGxheU5hbWUgfHwgKGZ1bmN0aW9uTmFtZSAhPT0gJycgPyB3cmFwcGVyTmFtZSArICcoJyArIGZ1bmN0aW9uTmFtZSArICcpJyA6IHdyYXBwZXJOYW1lKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZSh0eXBlKSB7XG4gIGlmICh0eXBlID09IG51bGwpIHtcbiAgICAvLyBIb3N0IHJvb3QsIHRleHQgbm9kZSBvciBqdXN0IGludmFsaWQgdHlwZS5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICB7XG4gICAgaWYgKHR5cGVvZiB0eXBlLnRhZyA9PT0gJ251bWJlcicpIHtcbiAgICAgIHdhcm5pbmdXaXRob3V0U3RhY2skMShmYWxzZSwgJ1JlY2VpdmVkIGFuIHVuZXhwZWN0ZWQgb2JqZWN0IGluIGdldENvbXBvbmVudE5hbWUoKS4gJyArICdUaGlzIGlzIGxpa2VseSBhIGJ1ZyBpbiBSZWFjdC4gUGxlYXNlIGZpbGUgYW4gaXNzdWUuJyk7XG4gICAgfVxuICB9XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCBudWxsO1xuICB9XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlIFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFOlxuICAgICAgcmV0dXJuICdDb25jdXJyZW50TW9kZSc7XG4gICAgY2FzZSBSRUFDVF9GUkFHTUVOVF9UWVBFOlxuICAgICAgcmV0dXJuICdGcmFnbWVudCc7XG4gICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgIHJldHVybiAnUG9ydGFsJztcbiAgICBjYXNlIFJFQUNUX1BST0ZJTEVSX1RZUEU6XG4gICAgICByZXR1cm4gJ1Byb2ZpbGVyJztcbiAgICBjYXNlIFJFQUNUX1NUUklDVF9NT0RFX1RZUEU6XG4gICAgICByZXR1cm4gJ1N0cmljdE1vZGUnO1xuICAgIGNhc2UgUkVBQ1RfU1VTUEVOU0VfVFlQRTpcbiAgICAgIHJldHVybiAnU3VzcGVuc2UnO1xuICB9XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBzd2l0Y2ggKHR5cGUuJCR0eXBlb2YpIHtcbiAgICAgIGNhc2UgUkVBQ1RfQ09OVEVYVF9UWVBFOlxuICAgICAgICByZXR1cm4gJ0NvbnRleHQuQ29uc3VtZXInO1xuICAgICAgY2FzZSBSRUFDVF9QUk9WSURFUl9UWVBFOlxuICAgICAgICByZXR1cm4gJ0NvbnRleHQuUHJvdmlkZXInO1xuICAgICAgY2FzZSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFOlxuICAgICAgICByZXR1cm4gZ2V0V3JhcHBlZE5hbWUodHlwZSwgdHlwZS5yZW5kZXIsICdGb3J3YXJkUmVmJyk7XG4gICAgICBjYXNlIFJFQUNUX01FTU9fVFlQRTpcbiAgICAgICAgcmV0dXJuIGdldENvbXBvbmVudE5hbWUodHlwZS50eXBlKTtcbiAgICAgIGNhc2UgUkVBQ1RfTEFaWV9UWVBFOlxuICAgICAgICB7XG4gICAgICAgICAgdmFyIHRoZW5hYmxlID0gdHlwZTtcbiAgICAgICAgICB2YXIgcmVzb2x2ZWRUaGVuYWJsZSA9IHJlZmluZVJlc29sdmVkTGF6eUNvbXBvbmVudCh0aGVuYWJsZSk7XG4gICAgICAgICAgaWYgKHJlc29sdmVkVGhlbmFibGUpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRDb21wb25lbnROYW1lKHJlc29sdmVkVGhlbmFibGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxudmFyIFJlYWN0RGVidWdDdXJyZW50RnJhbWUgPSB7fTtcblxudmFyIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50ID0gbnVsbDtcblxuZnVuY3Rpb24gc2V0Q3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQoZWxlbWVudCkge1xuICB7XG4gICAgY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQgPSBlbGVtZW50O1xuICB9XG59XG5cbntcbiAgLy8gU3RhY2sgaW1wbGVtZW50YXRpb24gaW5qZWN0ZWQgYnkgdGhlIGN1cnJlbnQgcmVuZGVyZXIuXG4gIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0Q3VycmVudFN0YWNrID0gbnVsbDtcblxuICBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHN0YWNrID0gJyc7XG5cbiAgICAvLyBBZGQgYW4gZXh0cmEgdG9wIGZyYW1lIHdoaWxlIGFuIGVsZW1lbnQgaXMgYmVpbmcgdmFsaWRhdGVkXG4gICAgaWYgKGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KSB7XG4gICAgICB2YXIgbmFtZSA9IGdldENvbXBvbmVudE5hbWUoY3VycmVudGx5VmFsaWRhdGluZ0VsZW1lbnQudHlwZSk7XG4gICAgICB2YXIgb3duZXIgPSBjdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudC5fb3duZXI7XG4gICAgICBzdGFjayArPSBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIGN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50Ll9zb3VyY2UsIG93bmVyICYmIGdldENvbXBvbmVudE5hbWUob3duZXIudHlwZSkpO1xuICAgIH1cblxuICAgIC8vIERlbGVnYXRlIHRvIHRoZSBpbmplY3RlZCByZW5kZXJlci1zcGVjaWZpYyBpbXBsZW1lbnRhdGlvblxuICAgIHZhciBpbXBsID0gUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRDdXJyZW50U3RhY2s7XG4gICAgaWYgKGltcGwpIHtcbiAgICAgIHN0YWNrICs9IGltcGwoKSB8fCAnJztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhY2s7XG4gIH07XG59XG5cbnZhciBSZWFjdFNoYXJlZEludGVybmFscyA9IHtcbiAgUmVhY3RDdXJyZW50T3duZXI6IFJlYWN0Q3VycmVudE93bmVyLFxuICAvLyBVc2VkIGJ5IHJlbmRlcmVycyB0byBhdm9pZCBidW5kbGluZyBvYmplY3QtYXNzaWduIHR3aWNlIGluIFVNRCBidW5kbGVzOlxuICBhc3NpZ246IF9hc3NpZ25cbn07XG5cbntcbiAgX2Fzc2lnbihSZWFjdFNoYXJlZEludGVybmFscywge1xuICAgIC8vIFRoZXNlIHNob3VsZCBub3QgYmUgaW5jbHVkZWQgaW4gcHJvZHVjdGlvbi5cbiAgICBSZWFjdERlYnVnQ3VycmVudEZyYW1lOiBSZWFjdERlYnVnQ3VycmVudEZyYW1lLFxuICAgIC8vIFNoaW0gZm9yIFJlYWN0IERPTSAxNi4wLjAgd2hpY2ggc3RpbGwgZGVzdHJ1Y3R1cmVkIChidXQgbm90IHVzZWQpIHRoaXMuXG4gICAgLy8gVE9ETzogcmVtb3ZlIGluIFJlYWN0IDE3LjAuXG4gICAgUmVhY3RDb21wb25lbnRUcmVlSG9vazoge31cbiAgfSk7XG59XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gd2FybmluZ1dpdGhvdXRTdGFjayQxO1xuXG57XG4gIHdhcm5pbmcgPSBmdW5jdGlvbiAoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICBpZiAoY29uZGl0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBSZWFjdERlYnVnQ3VycmVudEZyYW1lID0gUmVhY3RTaGFyZWRJbnRlcm5hbHMuUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZTtcbiAgICB2YXIgc3RhY2sgPSBSZWFjdERlYnVnQ3VycmVudEZyYW1lLmdldFN0YWNrQWRkZW5kdW0oKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3QtaW50ZXJuYWwvd2FybmluZy1hbmQtaW52YXJpYW50LWFyZ3NcblxuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuXG4gICAgd2FybmluZ1dpdGhvdXRTdGFjayQxLmFwcGx5KHVuZGVmaW5lZCwgW2ZhbHNlLCBmb3JtYXQgKyAnJXMnXS5jb25jYXQoYXJncywgW3N0YWNrXSkpO1xuICB9O1xufVxuXG52YXIgd2FybmluZyQxID0gd2FybmluZztcblxudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIFJFU0VSVkVEX1BST1BTID0ge1xuICBrZXk6IHRydWUsXG4gIHJlZjogdHJ1ZSxcbiAgX19zZWxmOiB0cnVlLFxuICBfX3NvdXJjZTogdHJ1ZVxufTtcblxudmFyIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duID0gdm9pZCAwO1xudmFyIHNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duID0gdm9pZCAwO1xuXG5mdW5jdGlvbiBoYXNWYWxpZFJlZihjb25maWcpIHtcbiAge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ3JlZicpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcucmVmICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAna2V5JykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ2tleScpLmdldDtcbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmZpZy5rZXkgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgd2FybmluZ1dpdGhvdXRTdGFjayQxKGZhbHNlLCAnJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nS2V5LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgd2FybmluZ1dpdGhvdXRTdGFjayQxKGZhbHNlLCAnJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nUmVmLmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nUmVmLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIG5vIGluc3RhbmNlb2YgY2hlY2tcbiAqIHdpbGwgd29yay4gSW5zdGVhZCB0ZXN0ICQkdHlwZW9mIGZpZWxkIGFnYWluc3QgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIHRvIGNoZWNrXG4gKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHsqfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVmXG4gKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAqIGRpZmZlcmVudCBmcm9tIHRoZSBgb3duZXJgIHdoZW4gUmVhY3QuY3JlYXRlRWxlbWVudCBpcyBjYWxsZWQsIHNvIHRoYXQgd2VcbiAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gKiBjaGFuZ2UgaW4gYmVoYXZpb3IuXG4gKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0geyp9IG93bmVyXG4gKiBAcGFyYW0geyp9IHByb3BzXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpIHtcbiAgdmFyIGVsZW1lbnQgPSB7XG4gICAgLy8gVGhpcyB0YWcgYWxsb3dzIHVzIHRvIHVuaXF1ZWx5IGlkZW50aWZ5IHRoaXMgYXMgYSBSZWFjdCBFbGVtZW50XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0VMRU1FTlRfVFlQRSxcblxuICAgIC8vIEJ1aWx0LWluIHByb3BlcnRpZXMgdGhhdCBiZWxvbmcgb24gdGhlIGVsZW1lbnRcbiAgICB0eXBlOiB0eXBlLFxuICAgIGtleToga2V5LFxuICAgIHJlZjogcmVmLFxuICAgIHByb3BzOiBwcm9wcyxcblxuICAgIC8vIFJlY29yZCB0aGUgY29tcG9uZW50IHJlc3BvbnNpYmxlIGZvciBjcmVhdGluZyB0aGlzIGVsZW1lbnQuXG4gICAgX293bmVyOiBvd25lclxuICB9O1xuXG4gIHtcbiAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgLy8gYW4gZXh0ZXJuYWwgYmFja2luZyBzdG9yZSBzbyB0aGF0IHdlIGNhbiBmcmVlemUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgZWxlbWVudC5fc3RvcmUgPSB7fTtcblxuICAgIC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgLy8gdGhlIHZhbGlkYXRpb24gZmxhZyBub24tZW51bWVyYWJsZSAod2hlcmUgcG9zc2libGUsIHdoaWNoIHNob3VsZFxuICAgIC8vIGluY2x1ZGUgZXZlcnkgZW52aXJvbm1lbnQgd2UgcnVuIHRlc3RzIGluKSwgc28gdGhlIHRlc3QgZnJhbWV3b3JrXG4gICAgLy8gaWdub3JlcyBpdC5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH0pO1xuICAgIC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudCwgJ19zZWxmJywge1xuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgdmFsdWU6IHNlbGZcbiAgICB9KTtcbiAgICAvLyBUd28gZWxlbWVudHMgY3JlYXRlZCBpbiB0d28gZGlmZmVyZW50IHBsYWNlcyBzaG91bGQgYmUgY29uc2lkZXJlZFxuICAgIC8vIGVxdWFsIGZvciB0ZXN0aW5nIHB1cnBvc2VzIGFuZCB0aGVyZWZvcmUgd2UgaGlkZSBpdCBmcm9tIGVudW1lcmF0aW9uLlxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NvdXJjZScsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIHZhbHVlOiBzb3VyY2VcbiAgICB9KTtcbiAgICBpZiAoT2JqZWN0LmZyZWV6ZSkge1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50LnByb3BzKTtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCBvZiB0aGUgZ2l2ZW4gdHlwZS5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjY3JlYXRlZWxlbWVudFxuICovXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHR5cGUsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lID0gdm9pZCAwO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIHByb3BzID0ge307XG5cbiAgdmFyIGtleSA9IG51bGw7XG4gIHZhciByZWYgPSBudWxsO1xuICB2YXIgc2VsZiA9IG51bGw7XG4gIHZhciBzb3VyY2UgPSBudWxsO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgIH1cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIHNlbGYgPSBjb25maWcuX19zZWxmID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc2VsZjtcbiAgICBzb3VyY2UgPSBjb25maWcuX19zb3VyY2UgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zb3VyY2U7XG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgYXJlIGFkZGVkIHRvIGEgbmV3IHByb3BzIG9iamVjdFxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gQ2hpbGRyZW4gY2FuIGJlIG1vcmUgdGhhbiBvbmUgYXJndW1lbnQsIGFuZCB0aG9zZSBhcmUgdHJhbnNmZXJyZWQgb250b1xuICAvLyB0aGUgbmV3bHkgYWxsb2NhdGVkIHByb3BzIG9iamVjdC5cbiAgdmFyIGNoaWxkcmVuTGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aCAtIDI7XG4gIGlmIChjaGlsZHJlbkxlbmd0aCA9PT0gMSkge1xuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRyZW47XG4gIH0gZWxzZSBpZiAoY2hpbGRyZW5MZW5ndGggPiAxKSB7XG4gICAgdmFyIGNoaWxkQXJyYXkgPSBBcnJheShjaGlsZHJlbkxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbkxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZEFycmF5W2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICB9XG4gICAge1xuICAgICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgICAgT2JqZWN0LmZyZWV6ZShjaGlsZEFycmF5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuICAgIGZvciAocHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAge1xuICAgIGlmIChrZXkgfHwgcmVmKSB7XG4gICAgICB2YXIgZGlzcGxheU5hbWUgPSB0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJyA/IHR5cGUuZGlzcGxheU5hbWUgfHwgdHlwZS5uYW1lIHx8ICdVbmtub3duJyA6IHR5cGU7XG4gICAgICBpZiAoa2V5KSB7XG4gICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICB9XG4gICAgICBpZiAocmVmKSB7XG4gICAgICAgIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBSZWFjdEVsZW1lbnQodHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCwgcHJvcHMpO1xufVxuXG4vKipcbiAqIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgUmVhY3RFbGVtZW50cyBvZiBhIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI2NyZWF0ZWZhY3RvcnlcbiAqL1xuXG5cbmZ1bmN0aW9uIGNsb25lQW5kUmVwbGFjZUtleShvbGRFbGVtZW50LCBuZXdLZXkpIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBSZWFjdEVsZW1lbnQob2xkRWxlbWVudC50eXBlLCBuZXdLZXksIG9sZEVsZW1lbnQucmVmLCBvbGRFbGVtZW50Ll9zZWxmLCBvbGRFbGVtZW50Ll9zb3VyY2UsIG9sZEVsZW1lbnQuX293bmVyLCBvbGRFbGVtZW50LnByb3BzKTtcblxuICByZXR1cm4gbmV3RWxlbWVudDtcbn1cblxuLyoqXG4gKiBDbG9uZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCB1c2luZyBlbGVtZW50IGFzIHRoZSBzdGFydGluZyBwb2ludC5cbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjY2xvbmVlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIGNsb25lRWxlbWVudChlbGVtZW50LCBjb25maWcsIGNoaWxkcmVuKSB7XG4gICEhKGVsZW1lbnQgPT09IG51bGwgfHwgZWxlbWVudCA9PT0gdW5kZWZpbmVkKSA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0LmNsb25lRWxlbWVudCguLi4pOiBUaGUgYXJndW1lbnQgbXVzdCBiZSBhIFJlYWN0IGVsZW1lbnQsIGJ1dCB5b3UgcGFzc2VkICVzLicsIGVsZW1lbnQpIDogdm9pZCAwO1xuXG4gIHZhciBwcm9wTmFtZSA9IHZvaWQgMDtcblxuICAvLyBPcmlnaW5hbCBwcm9wcyBhcmUgY29waWVkXG4gIHZhciBwcm9wcyA9IF9hc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIC8vIFNlbGYgaXMgcHJlc2VydmVkIHNpbmNlIHRoZSBvd25lciBpcyBwcmVzZXJ2ZWQuXG4gIHZhciBzZWxmID0gZWxlbWVudC5fc2VsZjtcbiAgLy8gU291cmNlIGlzIHByZXNlcnZlZCBzaW5jZSBjbG9uZUVsZW1lbnQgaXMgdW5saWtlbHkgdG8gYmUgdGFyZ2V0ZWQgYnkgYVxuICAvLyB0cmFuc3BpbGVyLCBhbmQgdGhlIG9yaWdpbmFsIHNvdXJjZSBpcyBwcm9iYWJseSBhIGJldHRlciBpbmRpY2F0b3Igb2YgdGhlXG4gIC8vIHRydWUgb3duZXIuXG4gIHZhciBzb3VyY2UgPSBlbGVtZW50Ll9zb3VyY2U7XG5cbiAgLy8gT3duZXIgd2lsbCBiZSBwcmVzZXJ2ZWQsIHVubGVzcyByZWYgaXMgb3ZlcnJpZGRlblxuICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgLy8gU2lsZW50bHkgc3RlYWwgdGhlIHJlZiBmcm9tIHRoZSBwYXJlbnQuXG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgIH1cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIG92ZXJyaWRlIGV4aXN0aW5nIHByb3BzXG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHZvaWQgMDtcbiAgICBpZiAoZWxlbWVudC50eXBlICYmIGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIGRlZmF1bHRQcm9wcyA9IGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgfVxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmIChjb25maWdbcHJvcE5hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICByZXR1cm4gUmVhY3RFbGVtZW50KGVsZW1lbnQudHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKTtcbn1cblxuLyoqXG4gKiBWZXJpZmllcyB0aGUgb2JqZWN0IGlzIGEgUmVhY3RFbGVtZW50LlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNpc3ZhbGlkZWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSBSZWFjdEVsZW1lbnQuXG4gKiBAZmluYWxcbiAqL1xuZnVuY3Rpb24gaXNWYWxpZEVsZW1lbnQob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59XG5cbnZhciBTRVBBUkFUT1IgPSAnLic7XG52YXIgU1VCU0VQQVJBVE9SID0gJzonO1xuXG4vKipcbiAqIEVzY2FwZSBhbmQgd3JhcCBrZXkgc28gaXQgaXMgc2FmZSB0byB1c2UgYXMgYSByZWFjdGlkXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSB0byBiZSBlc2NhcGVkLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgZXNjYXBlZCBrZXkuXG4gKi9cbmZ1bmN0aW9uIGVzY2FwZShrZXkpIHtcbiAgdmFyIGVzY2FwZVJlZ2V4ID0gL1s9Ol0vZztcbiAgdmFyIGVzY2FwZXJMb29rdXAgPSB7XG4gICAgJz0nOiAnPTAnLFxuICAgICc6JzogJz0yJ1xuICB9O1xuICB2YXIgZXNjYXBlZFN0cmluZyA9ICgnJyArIGtleSkucmVwbGFjZShlc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVzY2FwZXJMb29rdXBbbWF0Y2hdO1xuICB9KTtcblxuICByZXR1cm4gJyQnICsgZXNjYXBlZFN0cmluZztcbn1cblxuLyoqXG4gKiBUT0RPOiBUZXN0IHRoYXQgYSBzaW5nbGUgY2hpbGQgYW5kIGFuIGFycmF5IHdpdGggb25lIGl0ZW0gaGF2ZSB0aGUgc2FtZSBrZXlcbiAqIHBhdHRlcm4uXG4gKi9cblxudmFyIGRpZFdhcm5BYm91dE1hcHMgPSBmYWxzZTtcblxudmFyIHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4ID0gL1xcLysvZztcbmZ1bmN0aW9uIGVzY2FwZVVzZXJQcm92aWRlZEtleSh0ZXh0KSB7XG4gIHJldHVybiAoJycgKyB0ZXh0KS5yZXBsYWNlKHVzZXJQcm92aWRlZEtleUVzY2FwZVJlZ2V4LCAnJCYvJyk7XG59XG5cbnZhciBQT09MX1NJWkUgPSAxMDtcbnZhciB0cmF2ZXJzZUNvbnRleHRQb29sID0gW107XG5mdW5jdGlvbiBnZXRQb29sZWRUcmF2ZXJzZUNvbnRleHQobWFwUmVzdWx0LCBrZXlQcmVmaXgsIG1hcEZ1bmN0aW9uLCBtYXBDb250ZXh0KSB7XG4gIGlmICh0cmF2ZXJzZUNvbnRleHRQb29sLmxlbmd0aCkge1xuICAgIHZhciB0cmF2ZXJzZUNvbnRleHQgPSB0cmF2ZXJzZUNvbnRleHRQb29sLnBvcCgpO1xuICAgIHRyYXZlcnNlQ29udGV4dC5yZXN1bHQgPSBtYXBSZXN1bHQ7XG4gICAgdHJhdmVyc2VDb250ZXh0LmtleVByZWZpeCA9IGtleVByZWZpeDtcbiAgICB0cmF2ZXJzZUNvbnRleHQuZnVuYyA9IG1hcEZ1bmN0aW9uO1xuICAgIHRyYXZlcnNlQ29udGV4dC5jb250ZXh0ID0gbWFwQ29udGV4dDtcbiAgICB0cmF2ZXJzZUNvbnRleHQuY291bnQgPSAwO1xuICAgIHJldHVybiB0cmF2ZXJzZUNvbnRleHQ7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3VsdDogbWFwUmVzdWx0LFxuICAgICAga2V5UHJlZml4OiBrZXlQcmVmaXgsXG4gICAgICBmdW5jOiBtYXBGdW5jdGlvbixcbiAgICAgIGNvbnRleHQ6IG1hcENvbnRleHQsXG4gICAgICBjb3VudDogMFxuICAgIH07XG4gIH1cbn1cblxuZnVuY3Rpb24gcmVsZWFzZVRyYXZlcnNlQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQpIHtcbiAgdHJhdmVyc2VDb250ZXh0LnJlc3VsdCA9IG51bGw7XG4gIHRyYXZlcnNlQ29udGV4dC5rZXlQcmVmaXggPSBudWxsO1xuICB0cmF2ZXJzZUNvbnRleHQuZnVuYyA9IG51bGw7XG4gIHRyYXZlcnNlQ29udGV4dC5jb250ZXh0ID0gbnVsbDtcbiAgdHJhdmVyc2VDb250ZXh0LmNvdW50ID0gMDtcbiAgaWYgKHRyYXZlcnNlQ29udGV4dFBvb2wubGVuZ3RoIDwgUE9PTF9TSVpFKSB7XG4gICAgdHJhdmVyc2VDb250ZXh0UG9vbC5wdXNoKHRyYXZlcnNlQ29udGV4dCk7XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZVNvRmFyIE5hbWUgb2YgdGhlIGtleSBwYXRoIHNvIGZhci5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugd2l0aCBlYWNoIGNoaWxkIGZvdW5kLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IFVzZWQgdG8gcGFzcyBpbmZvcm1hdGlvbiB0aHJvdWdob3V0IHRoZSB0cmF2ZXJzYWxcbiAqIHByb2Nlc3MuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sIG5hbWVTb0ZhciwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBjaGlsZHJlbjtcblxuICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgLy8gQWxsIG9mIHRoZSBhYm92ZSBhcmUgcGVyY2VpdmVkIGFzIG51bGwuXG4gICAgY2hpbGRyZW4gPSBudWxsO1xuICB9XG5cbiAgdmFyIGludm9rZUNhbGxiYWNrID0gZmFsc2U7XG5cbiAgaWYgKGNoaWxkcmVuID09PSBudWxsKSB7XG4gICAgaW52b2tlQ2FsbGJhY2sgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBzd2l0Y2ggKGNoaWxkcmVuLiQkdHlwZW9mKSB7XG4gICAgICAgICAgY2FzZSBSRUFDVF9FTEVNRU5UX1RZUEU6XG4gICAgICAgICAgY2FzZSBSRUFDVF9QT1JUQUxfVFlQRTpcbiAgICAgICAgICAgIGludm9rZUNhbGxiYWNrID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChpbnZva2VDYWxsYmFjaykge1xuICAgIGNhbGxiYWNrKHRyYXZlcnNlQ29udGV4dCwgY2hpbGRyZW4sXG4gICAgLy8gSWYgaXQncyB0aGUgb25seSBjaGlsZCwgdHJlYXQgdGhlIG5hbWUgYXMgaWYgaXQgd2FzIHdyYXBwZWQgaW4gYW4gYXJyYXlcbiAgICAvLyBzbyB0aGF0IGl0J3MgY29uc2lzdGVudCBpZiB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIGdyb3dzLlxuICAgIG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGRyZW4sIDApIDogbmFtZVNvRmFyKTtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIHZhciBjaGlsZCA9IHZvaWQgMDtcbiAgdmFyIG5leHROYW1lID0gdm9pZCAwO1xuICB2YXIgc3VidHJlZUNvdW50ID0gMDsgLy8gQ291bnQgb2YgY2hpbGRyZW4gZm91bmQgaW4gdGhlIGN1cnJlbnQgc3VidHJlZS5cbiAgdmFyIG5leHROYW1lUHJlZml4ID0gbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiA6IG5hbWVTb0ZhciArIFNVQlNFUEFSQVRPUjtcblxuICBpZiAoQXJyYXkuaXNBcnJheShjaGlsZHJlbikpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaSk7XG4gICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKGNoaWxkcmVuKTtcbiAgICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHtcbiAgICAgICAgLy8gV2FybiBhYm91dCB1c2luZyBNYXBzIGFzIGNoaWxkcmVuXG4gICAgICAgIGlmIChpdGVyYXRvckZuID09PSBjaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgICAgIWRpZFdhcm5BYm91dE1hcHMgPyB3YXJuaW5nJDEoZmFsc2UsICdVc2luZyBNYXBzIGFzIGNoaWxkcmVuIGlzIHVuc3VwcG9ydGVkIGFuZCB3aWxsIGxpa2VseSB5aWVsZCAnICsgJ3VuZXhwZWN0ZWQgcmVzdWx0cy4gQ29udmVydCBpdCB0byBhIHNlcXVlbmNlL2l0ZXJhYmxlIG9mIGtleWVkICcgKyAnUmVhY3RFbGVtZW50cyBpbnN0ZWFkLicpIDogdm9pZCAwO1xuICAgICAgICAgIGRpZFdhcm5BYm91dE1hcHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChjaGlsZHJlbik7XG4gICAgICB2YXIgc3RlcCA9IHZvaWQgMDtcbiAgICAgIHZhciBpaSA9IDA7XG4gICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgIGNoaWxkID0gc3RlcC52YWx1ZTtcbiAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaWkrKyk7XG4gICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBhZGRlbmR1bSA9ICcnO1xuICAgICAge1xuICAgICAgICBhZGRlbmR1bSA9ICcgSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSAnICsgJ2luc3RlYWQuJyArIFJlYWN0RGVidWdDdXJyZW50RnJhbWUuZ2V0U3RhY2tBZGRlbmR1bSgpO1xuICAgICAgfVxuICAgICAgdmFyIGNoaWxkcmVuU3RyaW5nID0gJycgKyBjaGlsZHJlbjtcbiAgICAgIGludmFyaWFudChmYWxzZSwgJ09iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIFJlYWN0IGNoaWxkIChmb3VuZDogJXMpLiVzJywgY2hpbGRyZW5TdHJpbmcgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gJ29iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjaGlsZHJlbikuam9pbignLCAnKSArICd9JyA6IGNoaWxkcmVuU3RyaW5nLCBhZGRlbmR1bSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN1YnRyZWVDb3VudDtcbn1cblxuLyoqXG4gKiBUcmF2ZXJzZXMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLCBidXRcbiAqIG1pZ2h0IGFsc28gYmUgc3BlY2lmaWVkIHRocm91Z2ggYXR0cmlidXRlczpcbiAqXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMuY2hpbGRyZW4sIC4uLilgXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMubGVmdFBhbmVsQ2hpbGRyZW4sIC4uLilgXG4gKlxuICogVGhlIGB0cmF2ZXJzZUNvbnRleHRgIGlzIGFuIG9wdGlvbmFsIGFyZ3VtZW50IHRoYXQgaXMgcGFzc2VkIHRocm91Z2ggdGhlXG4gKiBlbnRpcmUgdHJhdmVyc2FsLiBJdCBjYW4gYmUgdXNlZCB0byBzdG9yZSBhY2N1bXVsYXRpb25zIG9yIGFueXRoaW5nIGVsc2UgdGhhdFxuICogdGhlIGNhbGxiYWNrIG1pZ2h0IGZpbmQgcmVsZXZhbnQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBvYmplY3QuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgVG8gaW52b2tlIHVwb24gdHJhdmVyc2luZyBlYWNoIGNoaWxkLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IENvbnRleHQgZm9yIHRyYXZlcnNhbC5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sICcnLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSBhIGtleSBzdHJpbmcgdGhhdCBpZGVudGlmaWVzIGEgY29tcG9uZW50IHdpdGhpbiBhIHNldC5cbiAqXG4gKiBAcGFyYW0geyp9IGNvbXBvbmVudCBBIGNvbXBvbmVudCB0aGF0IGNvdWxkIGNvbnRhaW4gYSBtYW51YWwga2V5LlxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IEluZGV4IHRoYXQgaXMgdXNlZCBpZiBhIG1hbnVhbCBrZXkgaXMgbm90IHByb3ZpZGVkLlxuICogQHJldHVybiB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRDb21wb25lbnRLZXkoY29tcG9uZW50LCBpbmRleCkge1xuICAvLyBEbyBzb21lIHR5cGVjaGVja2luZyBoZXJlIHNpbmNlIHdlIGNhbGwgdGhpcyBibGluZGx5LiBXZSB3YW50IHRvIGVuc3VyZVxuICAvLyB0aGF0IHdlIGRvbid0IGJsb2NrIHBvdGVudGlhbCBmdXR1cmUgRVMgQVBJcy5cbiAgaWYgKHR5cGVvZiBjb21wb25lbnQgPT09ICdvYmplY3QnICYmIGNvbXBvbmVudCAhPT0gbnVsbCAmJiBjb21wb25lbnQua2V5ICE9IG51bGwpIHtcbiAgICAvLyBFeHBsaWNpdCBrZXlcbiAgICByZXR1cm4gZXNjYXBlKGNvbXBvbmVudC5rZXkpO1xuICB9XG4gIC8vIEltcGxpY2l0IGtleSBkZXRlcm1pbmVkIGJ5IHRoZSBpbmRleCBpbiB0aGUgc2V0XG4gIHJldHVybiBpbmRleC50b1N0cmluZygzNik7XG59XG5cbmZ1bmN0aW9uIGZvckVhY2hTaW5nbGVDaGlsZChib29rS2VlcGluZywgY2hpbGQsIG5hbWUpIHtcbiAgdmFyIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jLFxuICAgICAgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cbiAgZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5mb3JlYWNoXG4gKlxuICogVGhlIHByb3ZpZGVkIGZvckVhY2hGdW5jKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZvckVhY2hGdW5jXG4gKiBAcGFyYW0geyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgZm9yIGZvckVhY2hDb250ZXh0LlxuICovXG5mdW5jdGlvbiBmb3JFYWNoQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gZ2V0UG9vbGVkVHJhdmVyc2VDb250ZXh0KG51bGwsIG51bGwsIGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hTaW5nbGVDaGlsZCwgdHJhdmVyc2VDb250ZXh0KTtcbiAgcmVsZWFzZVRyYXZlcnNlQ29udGV4dCh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG5mdW5jdGlvbiBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0KGJvb2tLZWVwaW5nLCBjaGlsZCwgY2hpbGRLZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGJvb2tLZWVwaW5nLnJlc3VsdCxcbiAgICAgIGtleVByZWZpeCA9IGJvb2tLZWVwaW5nLmtleVByZWZpeCxcbiAgICAgIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jLFxuICAgICAgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cblxuICB2YXIgbWFwcGVkQ2hpbGQgPSBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXBwZWRDaGlsZCkpIHtcbiAgICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKG1hcHBlZENoaWxkLCByZXN1bHQsIGNoaWxkS2V5LCBmdW5jdGlvbiAoYykge1xuICAgICAgcmV0dXJuIGM7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAobWFwcGVkQ2hpbGQgIT0gbnVsbCkge1xuICAgIGlmIChpc1ZhbGlkRWxlbWVudChtYXBwZWRDaGlsZCkpIHtcbiAgICAgIG1hcHBlZENoaWxkID0gY2xvbmVBbmRSZXBsYWNlS2V5KG1hcHBlZENoaWxkLFxuICAgICAgLy8gS2VlcCBib3RoIHRoZSAobWFwcGVkKSBhbmQgb2xkIGtleXMgaWYgdGhleSBkaWZmZXIsIGp1c3QgYXNcbiAgICAgIC8vIHRyYXZlcnNlQWxsQ2hpbGRyZW4gdXNlZCB0byBkbyBmb3Igb2JqZWN0cyBhcyBjaGlsZHJlblxuICAgICAga2V5UHJlZml4ICsgKG1hcHBlZENoaWxkLmtleSAmJiAoIWNoaWxkIHx8IGNoaWxkLmtleSAhPT0gbWFwcGVkQ2hpbGQua2V5KSA/IGVzY2FwZVVzZXJQcm92aWRlZEtleShtYXBwZWRDaGlsZC5rZXkpICsgJy8nIDogJycpICsgY2hpbGRLZXkpO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChtYXBwZWRDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgYXJyYXksIHByZWZpeCwgZnVuYywgY29udGV4dCkge1xuICB2YXIgZXNjYXBlZFByZWZpeCA9ICcnO1xuICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICBlc2NhcGVkUHJlZml4ID0gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHByZWZpeCkgKyAnLyc7XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IGdldFBvb2xlZFRyYXZlcnNlQ29udGV4dChhcnJheSwgZXNjYXBlZFByZWZpeCwgZnVuYywgY29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIHJlbGVhc2VUcmF2ZXJzZUNvbnRleHQodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBNYXBzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9yZWFjdGpzLm9yZy9kb2NzL3JlYWN0LWFwaS5odG1sI3JlYWN0Y2hpbGRyZW5tYXBcbiAqXG4gKiBUaGUgcHJvdmlkZWQgbWFwRnVuY3Rpb24oY2hpbGQsIGtleSwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmdW5jIFRoZSBtYXAgZnVuY3Rpb24uXG4gKiBAcGFyYW0geyp9IGNvbnRleHQgQ29udGV4dCBmb3IgbWFwRnVuY3Rpb24uXG4gKiBAcmV0dXJuIHtvYmplY3R9IE9iamVjdCBjb250YWluaW5nIHRoZSBvcmRlcmVkIG1hcCBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBtYXBDaGlsZHJlbihjaGlsZHJlbiwgZnVuYywgY29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIHJlc3VsdCwgbnVsbCwgZnVuYywgY29udGV4dCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ291bnQgdGhlIG51bWJlciBvZiBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzXG4gKiBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvcmVhY3QtYXBpLmh0bWwjcmVhY3RjaGlsZHJlbmNvdW50XG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4uXG4gKi9cbmZ1bmN0aW9uIGNvdW50Q2hpbGRyZW4oY2hpbGRyZW4pIHtcbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSwgbnVsbCk7XG59XG5cbi8qKlxuICogRmxhdHRlbiBhIGNoaWxkcmVuIG9iamVjdCAodHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gKSBhbmRcbiAqIHJldHVybiBhbiBhcnJheSB3aXRoIGFwcHJvcHJpYXRlbHkgcmUta2V5ZWQgY2hpbGRyZW4uXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGNoaWxkcmVudG9hcnJheVxuICovXG5mdW5jdGlvbiB0b0FycmF5KGNoaWxkcmVuKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBmdW5jdGlvbiAoY2hpbGQpIHtcbiAgICByZXR1cm4gY2hpbGQ7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGNoaWxkIGluIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiBhbmQgdmVyaWZpZXMgdGhhdCB0aGVyZVxuICogaXMgb25seSBvbmUgY2hpbGQgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogU2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWFjdC1hcGkuaHRtbCNyZWFjdGNoaWxkcmVub25seVxuICpcbiAqIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIG9mIHRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGEgc2luZ2xlIGNoaWxkIGdldHNcbiAqIHBhc3NlZCB3aXRob3V0IGEgd3JhcHBlciwgYnV0IHRoZSBwdXJwb3NlIG9mIHRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHRvXG4gKiBhYnN0cmFjdCBhd2F5IHRoZSBwYXJ0aWN1bGFyIHN0cnVjdHVyZSBvZiBjaGlsZHJlbi5cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IGNoaWxkcmVuIENoaWxkIGNvbGxlY3Rpb24gc3RydWN0dXJlLlxuICogQHJldHVybiB7UmVhY3RFbGVtZW50fSBUaGUgZmlyc3QgYW5kIG9ubHkgYFJlYWN0RWxlbWVudGAgY29udGFpbmVkIGluIHRoZVxuICogc3RydWN0dXJlLlxuICovXG5mdW5jdGlvbiBvbmx5Q2hpbGQoY2hpbGRyZW4pIHtcbiAgIWlzVmFsaWRFbGVtZW50KGNoaWxkcmVuKSA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLicpIDogdm9pZCAwO1xuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoZGVmYXVsdFZhbHVlLCBjYWxjdWxhdGVDaGFuZ2VkQml0cykge1xuICBpZiAoY2FsY3VsYXRlQ2hhbmdlZEJpdHMgPT09IHVuZGVmaW5lZCkge1xuICAgIGNhbGN1bGF0ZUNoYW5nZWRCaXRzID0gbnVsbDtcbiAgfSBlbHNlIHtcbiAgICB7XG4gICAgICAhKGNhbGN1bGF0ZUNoYW5nZWRCaXRzID09PSBudWxsIHx8IHR5cGVvZiBjYWxjdWxhdGVDaGFuZ2VkQml0cyA9PT0gJ2Z1bmN0aW9uJykgPyB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdjcmVhdGVDb250ZXh0OiBFeHBlY3RlZCB0aGUgb3B0aW9uYWwgc2Vjb25kIGFyZ3VtZW50IHRvIGJlIGEgJyArICdmdW5jdGlvbi4gSW5zdGVhZCByZWNlaXZlZDogJXMnLCBjYWxjdWxhdGVDaGFuZ2VkQml0cykgOiB2b2lkIDA7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNvbnRleHQgPSB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX0NPTlRFWFRfVFlQRSxcbiAgICBfY2FsY3VsYXRlQ2hhbmdlZEJpdHM6IGNhbGN1bGF0ZUNoYW5nZWRCaXRzLFxuICAgIC8vIEFzIGEgd29ya2Fyb3VuZCB0byBzdXBwb3J0IG11bHRpcGxlIGNvbmN1cnJlbnQgcmVuZGVyZXJzLCB3ZSBjYXRlZ29yaXplXG4gICAgLy8gc29tZSByZW5kZXJlcnMgYXMgcHJpbWFyeSBhbmQgb3RoZXJzIGFzIHNlY29uZGFyeS4gV2Ugb25seSBleHBlY3RcbiAgICAvLyB0aGVyZSB0byBiZSB0d28gY29uY3VycmVudCByZW5kZXJlcnMgYXQgbW9zdDogUmVhY3QgTmF0aXZlIChwcmltYXJ5KSBhbmRcbiAgICAvLyBGYWJyaWMgKHNlY29uZGFyeSk7IFJlYWN0IERPTSAocHJpbWFyeSkgYW5kIFJlYWN0IEFSVCAoc2Vjb25kYXJ5KS5cbiAgICAvLyBTZWNvbmRhcnkgcmVuZGVyZXJzIHN0b3JlIHRoZWlyIGNvbnRleHQgdmFsdWVzIG9uIHNlcGFyYXRlIGZpZWxkcy5cbiAgICBfY3VycmVudFZhbHVlOiBkZWZhdWx0VmFsdWUsXG4gICAgX2N1cnJlbnRWYWx1ZTI6IGRlZmF1bHRWYWx1ZSxcbiAgICAvLyBUaGVzZSBhcmUgY2lyY3VsYXJcbiAgICBQcm92aWRlcjogbnVsbCxcbiAgICBDb25zdW1lcjogbnVsbFxuICB9O1xuXG4gIGNvbnRleHQuUHJvdmlkZXIgPSB7XG4gICAgJCR0eXBlb2Y6IFJFQUNUX1BST1ZJREVSX1RZUEUsXG4gICAgX2NvbnRleHQ6IGNvbnRleHRcbiAgfTtcblxuICB2YXIgaGFzV2FybmVkQWJvdXRVc2luZ05lc3RlZENvbnRleHRDb25zdW1lcnMgPSBmYWxzZTtcbiAgdmFyIGhhc1dhcm5lZEFib3V0VXNpbmdDb25zdW1lclByb3ZpZGVyID0gZmFsc2U7XG5cbiAge1xuICAgIC8vIEEgc2VwYXJhdGUgb2JqZWN0LCBidXQgcHJveGllcyBiYWNrIHRvIHRoZSBvcmlnaW5hbCBjb250ZXh0IG9iamVjdCBmb3JcbiAgICAvLyBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS4gSXQgaGFzIGEgZGlmZmVyZW50ICQkdHlwZW9mLCBzbyB3ZSBjYW4gcHJvcGVybHlcbiAgICAvLyB3YXJuIGZvciB0aGUgaW5jb3JyZWN0IHVzYWdlIG9mIENvbnRleHQgYXMgYSBDb25zdW1lci5cbiAgICB2YXIgQ29uc3VtZXIgPSB7XG4gICAgICAkJHR5cGVvZjogUkVBQ1RfQ09OVEVYVF9UWVBFLFxuICAgICAgX2NvbnRleHQ6IGNvbnRleHQsXG4gICAgICBfY2FsY3VsYXRlQ2hhbmdlZEJpdHM6IGNvbnRleHQuX2NhbGN1bGF0ZUNoYW5nZWRCaXRzXG4gICAgfTtcbiAgICAvLyAkRmxvd0ZpeE1lOiBGbG93IGNvbXBsYWlucyBhYm91dCBub3Qgc2V0dGluZyBhIHZhbHVlLCB3aGljaCBpcyBpbnRlbnRpb25hbCBoZXJlXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoQ29uc3VtZXIsIHtcbiAgICAgIFByb3ZpZGVyOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGlmICghaGFzV2FybmVkQWJvdXRVc2luZ0NvbnN1bWVyUHJvdmlkZXIpIHtcbiAgICAgICAgICAgIGhhc1dhcm5lZEFib3V0VXNpbmdDb25zdW1lclByb3ZpZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIHdhcm5pbmckMShmYWxzZSwgJ1JlbmRlcmluZyA8Q29udGV4dC5Db25zdW1lci5Qcm92aWRlcj4gaXMgbm90IHN1cHBvcnRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluICcgKyAnYSBmdXR1cmUgbWFqb3IgcmVsZWFzZS4gRGlkIHlvdSBtZWFuIHRvIHJlbmRlciA8Q29udGV4dC5Qcm92aWRlcj4gaW5zdGVhZD8nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuUHJvdmlkZXI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKF9Qcm92aWRlcikge1xuICAgICAgICAgIGNvbnRleHQuUHJvdmlkZXIgPSBfUHJvdmlkZXI7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBfY3VycmVudFZhbHVlOiB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0Ll9jdXJyZW50VmFsdWU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKF9jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgICBjb250ZXh0Ll9jdXJyZW50VmFsdWUgPSBfY3VycmVudFZhbHVlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgX2N1cnJlbnRWYWx1ZTI6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbnRleHQuX2N1cnJlbnRWYWx1ZTI7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKF9jdXJyZW50VmFsdWUyKSB7XG4gICAgICAgICAgY29udGV4dC5fY3VycmVudFZhbHVlMiA9IF9jdXJyZW50VmFsdWUyO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgQ29uc3VtZXI6IHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgaWYgKCFoYXNXYXJuZWRBYm91dFVzaW5nTmVzdGVkQ29udGV4dENvbnN1bWVycykge1xuICAgICAgICAgICAgaGFzV2FybmVkQWJvdXRVc2luZ05lc3RlZENvbnRleHRDb25zdW1lcnMgPSB0cnVlO1xuICAgICAgICAgICAgd2FybmluZyQxKGZhbHNlLCAnUmVuZGVyaW5nIDxDb250ZXh0LkNvbnN1bWVyLkNvbnN1bWVyPiBpcyBub3Qgc3VwcG9ydGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gJyArICdhIGZ1dHVyZSBtYWpvciByZWxlYXNlLiBEaWQgeW91IG1lYW4gdG8gcmVuZGVyIDxDb250ZXh0LkNvbnN1bWVyPiBpbnN0ZWFkPycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY29udGV4dC5Db25zdW1lcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIC8vICRGbG93Rml4TWU6IEZsb3cgY29tcGxhaW5zIGFib3V0IG1pc3NpbmcgcHJvcGVydGllcyBiZWNhdXNlIGl0IGRvZXNuJ3QgdW5kZXJzdGFuZCBkZWZpbmVQcm9wZXJ0eVxuICAgIGNvbnRleHQuQ29uc3VtZXIgPSBDb25zdW1lcjtcbiAgfVxuXG4gIHtcbiAgICBjb250ZXh0Ll9jdXJyZW50UmVuZGVyZXIgPSBudWxsO1xuICAgIGNvbnRleHQuX2N1cnJlbnRSZW5kZXJlcjIgPSBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGNvbnRleHQ7XG59XG5cbmZ1bmN0aW9uIGxhenkoY3Rvcikge1xuICByZXR1cm4ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9MQVpZX1RZUEUsXG4gICAgX2N0b3I6IGN0b3IsXG4gICAgLy8gUmVhY3QgdXNlcyB0aGVzZSBmaWVsZHMgdG8gc3RvcmUgdGhlIHJlc3VsdC5cbiAgICBfc3RhdHVzOiAtMSxcbiAgICBfcmVzdWx0OiBudWxsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGZvcndhcmRSZWYocmVuZGVyKSB7XG4gIHtcbiAgICBpZiAodHlwZW9mIHJlbmRlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgd2FybmluZ1dpdGhvdXRTdGFjayQxKGZhbHNlLCAnZm9yd2FyZFJlZiByZXF1aXJlcyBhIHJlbmRlciBmdW5jdGlvbiBidXQgd2FzIGdpdmVuICVzLicsIHJlbmRlciA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVvZiByZW5kZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAhKFxuICAgICAgLy8gRG8gbm90IHdhcm4gZm9yIDAgYXJndW1lbnRzIGJlY2F1c2UgaXQgY291bGQgYmUgZHVlIHRvIHVzYWdlIG9mIHRoZSAnYXJndW1lbnRzJyBvYmplY3RcbiAgICAgIHJlbmRlci5sZW5ndGggPT09IDAgfHwgcmVuZGVyLmxlbmd0aCA9PT0gMikgPyB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdmb3J3YXJkUmVmIHJlbmRlciBmdW5jdGlvbnMgYWNjZXB0IGV4YWN0bHkgdHdvIHBhcmFtZXRlcnM6IHByb3BzIGFuZCByZWYuICVzJywgcmVuZGVyLmxlbmd0aCA9PT0gMSA/ICdEaWQgeW91IGZvcmdldCB0byB1c2UgdGhlIHJlZiBwYXJhbWV0ZXI/JyA6ICdBbnkgYWRkaXRpb25hbCBwYXJhbWV0ZXIgd2lsbCBiZSB1bmRlZmluZWQuJykgOiB2b2lkIDA7XG4gICAgfVxuXG4gICAgaWYgKHJlbmRlciAhPSBudWxsKSB7XG4gICAgICAhKHJlbmRlci5kZWZhdWx0UHJvcHMgPT0gbnVsbCAmJiByZW5kZXIucHJvcFR5cGVzID09IG51bGwpID8gd2FybmluZ1dpdGhvdXRTdGFjayQxKGZhbHNlLCAnZm9yd2FyZFJlZiByZW5kZXIgZnVuY3Rpb25zIGRvIG5vdCBzdXBwb3J0IHByb3BUeXBlcyBvciBkZWZhdWx0UHJvcHMuICcgKyAnRGlkIHlvdSBhY2NpZGVudGFsbHkgcGFzcyBhIFJlYWN0IGNvbXBvbmVudD8nKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFLFxuICAgIHJlbmRlcjogcmVuZGVyXG4gIH07XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSB7XG4gIHJldHVybiB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgfHxcbiAgLy8gTm90ZTogaXRzIHR5cGVvZiBtaWdodCBiZSBvdGhlciB0aGFuICdzeW1ib2wnIG9yICdudW1iZXInIGlmIGl0J3MgYSBwb2x5ZmlsbC5cbiAgdHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9DT05DVVJSRU5UX01PREVfVFlQRSB8fCB0eXBlID09PSBSRUFDVF9QUk9GSUxFUl9UWVBFIHx8IHR5cGUgPT09IFJFQUNUX1NUUklDVF9NT0RFX1RZUEUgfHwgdHlwZSA9PT0gUkVBQ1RfU1VTUEVOU0VfVFlQRSB8fCB0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiAodHlwZS4kJHR5cGVvZiA9PT0gUkVBQ1RfTEFaWV9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX01FTU9fVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9QUk9WSURFUl9UWVBFIHx8IHR5cGUuJCR0eXBlb2YgPT09IFJFQUNUX0NPTlRFWFRfVFlQRSB8fCB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFKTtcbn1cblxuZnVuY3Rpb24gbWVtbyh0eXBlLCBjb21wYXJlKSB7XG4gIHtcbiAgICBpZiAoIWlzVmFsaWRFbGVtZW50VHlwZSh0eXBlKSkge1xuICAgICAgd2FybmluZ1dpdGhvdXRTdGFjayQxKGZhbHNlLCAnbWVtbzogVGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBjb21wb25lbnQuIEluc3RlYWQgJyArICdyZWNlaXZlZDogJXMnLCB0eXBlID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIHR5cGUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgICQkdHlwZW9mOiBSRUFDVF9NRU1PX1RZUEUsXG4gICAgdHlwZTogdHlwZSxcbiAgICBjb21wYXJlOiBjb21wYXJlID09PSB1bmRlZmluZWQgPyBudWxsIDogY29tcGFyZVxuICB9O1xufVxuXG4vKipcbiAqIFJlYWN0RWxlbWVudFZhbGlkYXRvciBwcm92aWRlcyBhIHdyYXBwZXIgYXJvdW5kIGEgZWxlbWVudCBmYWN0b3J5XG4gKiB3aGljaCB2YWxpZGF0ZXMgdGhlIHByb3BzIHBhc3NlZCB0byB0aGUgZWxlbWVudC4gVGhpcyBpcyBpbnRlbmRlZCB0byBiZVxuICogdXNlZCBvbmx5IGluIERFViBhbmQgY291bGQgYmUgcmVwbGFjZWQgYnkgYSBzdGF0aWMgdHlwZSBjaGVja2VyIGZvciBsYW5ndWFnZXNcbiAqIHRoYXQgc3VwcG9ydCBpdC5cbiAqL1xuXG52YXIgcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24gPSB2b2lkIDA7XG5cbntcbiAgcHJvcFR5cGVzTWlzc3BlbGxXYXJuaW5nU2hvd24gPSBmYWxzZTtcbn1cblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkge1xuICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIHZhciBuYW1lID0gZ2V0Q29tcG9uZW50TmFtZShSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LnR5cGUpO1xuICAgIGlmIChuYW1lKSB7XG4gICAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuZnVuY3Rpb24gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0oZWxlbWVudFByb3BzKSB7XG4gIGlmIChlbGVtZW50UHJvcHMgIT09IG51bGwgJiYgZWxlbWVudFByb3BzICE9PSB1bmRlZmluZWQgJiYgZWxlbWVudFByb3BzLl9fc291cmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudFByb3BzLl9fc291cmNlO1xuICAgIHZhciBmaWxlTmFtZSA9IHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJyk7XG4gICAgdmFyIGxpbmVOdW1iZXIgPSBzb3VyY2UubGluZU51bWJlcjtcbiAgICByZXR1cm4gJ1xcblxcbkNoZWNrIHlvdXIgY29kZSBhdCAnICsgZmlsZU5hbWUgKyAnOicgKyBsaW5lTnVtYmVyICsgJy4nO1xuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgaWYgKCFpbmZvKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG4gICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgIGluZm8gPSAnXFxuXFxuQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8JyArIHBhcmVudE5hbWUgKyAnPi4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5mbztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gKiB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcblxuICB2YXIgY3VycmVudENvbXBvbmVudEVycm9ySW5mbyA9IGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSk7XG4gIGlmIChvd25lckhhc0tleVVzZVdhcm5pbmdbY3VycmVudENvbXBvbmVudEVycm9ySW5mb10pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgb3duZXJIYXNLZXlVc2VXYXJuaW5nW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dID0gdHJ1ZTtcblxuICAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAvLyBwcm9wZXJ0eSwgaXQgbWF5IGJlIHRoZSBjcmVhdG9yIG9mIHRoZSBjaGlsZCB0aGF0J3MgcmVzcG9uc2libGUgZm9yXG4gIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cbiAgdmFyIGNoaWxkT3duZXIgPSAnJztcbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAvLyBHaXZlIHRoZSBjb21wb25lbnQgdGhhdCBvcmlnaW5hbGx5IGNyZWF0ZWQgdGhpcyBjaGlsZC5cbiAgICBjaGlsZE93bmVyID0gJyBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSAnICsgZ2V0Q29tcG9uZW50TmFtZShlbGVtZW50Ll9vd25lci50eXBlKSArICcuJztcbiAgfVxuXG4gIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KGVsZW1lbnQpO1xuICB7XG4gICAgd2FybmluZyQxKGZhbHNlLCAnRWFjaCBjaGlsZCBpbiBhbiBhcnJheSBvciBpdGVyYXRvciBzaG91bGQgaGF2ZSBhIHVuaXF1ZSBcImtleVwiIHByb3AuJyArICclcyVzIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmcta2V5cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4nLCBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvLCBjaGlsZE93bmVyKTtcbiAgfVxuICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChudWxsKTtcbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhhdCBldmVyeSBlbGVtZW50IGVpdGhlciBpcyBwYXNzZWQgaW4gYSBzdGF0aWMgbG9jYXRpb24sIGluIGFuXG4gKiBhcnJheSB3aXRoIGFuIGV4cGxpY2l0IGtleXMgcHJvcGVydHkgZGVmaW5lZCwgb3IgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgbm9kZSdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUsIHBhcmVudFR5cGUpIHtcbiAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gbm9kZVtpXTtcbiAgICAgIGlmIChpc1ZhbGlkRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShjaGlsZCwgcGFyZW50VHlwZSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzVmFsaWRFbGVtZW50KG5vZGUpKSB7XG4gICAgLy8gVGhpcyBlbGVtZW50IHdhcyBwYXNzZWQgaW4gYSB2YWxpZCBsb2NhdGlvbi5cbiAgICBpZiAobm9kZS5fc3RvcmUpIHtcbiAgICAgIG5vZGUuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG4gICAgfVxuICB9IGVsc2UgaWYgKG5vZGUpIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4obm9kZSk7XG4gICAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAvLyBFbnRyeSBpdGVyYXRvcnMgdXNlZCB0byBwcm92aWRlIGltcGxpY2l0IGtleXMsXG4gICAgICAvLyBidXQgbm93IHdlIHByaW50IGEgc2VwYXJhdGUgd2FybmluZyBmb3IgdGhlbSBsYXRlci5cbiAgICAgIGlmIChpdGVyYXRvckZuICE9PSBub2RlLmVudHJpZXMpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG5vZGUpO1xuICAgICAgICB2YXIgc3RlcCA9IHZvaWQgMDtcbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIGlmIChpc1ZhbGlkRWxlbWVudChzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShzdGVwLnZhbHVlLCBwYXJlbnRUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBHaXZlbiBhbiBlbGVtZW50LCB2YWxpZGF0ZSB0aGF0IGl0cyBwcm9wcyBmb2xsb3cgdGhlIHByb3BUeXBlcyBkZWZpbml0aW9uLFxuICogcHJvdmlkZWQgYnkgdGhlIHR5cGUuXG4gKlxuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCkge1xuICB2YXIgdHlwZSA9IGVsZW1lbnQudHlwZTtcbiAgdmFyIG5hbWUgPSB2b2lkIDAsXG4gICAgICBwcm9wVHlwZXMgPSB2b2lkIDA7XG4gIGlmICh0eXBlb2YgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIC8vIENsYXNzIG9yIGZ1bmN0aW9uIGNvbXBvbmVudFxuICAgIG5hbWUgPSB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZTtcbiAgICBwcm9wVHlwZXMgPSB0eXBlLnByb3BUeXBlcztcbiAgfSBlbHNlIGlmICh0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcgJiYgdHlwZSAhPT0gbnVsbCAmJiB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9GT1JXQVJEX1JFRl9UWVBFKSB7XG4gICAgLy8gRm9yd2FyZFJlZlxuICAgIHZhciBmdW5jdGlvbk5hbWUgPSB0eXBlLnJlbmRlci5kaXNwbGF5TmFtZSB8fCB0eXBlLnJlbmRlci5uYW1lIHx8ICcnO1xuICAgIG5hbWUgPSB0eXBlLmRpc3BsYXlOYW1lIHx8IChmdW5jdGlvbk5hbWUgIT09ICcnID8gJ0ZvcndhcmRSZWYoJyArIGZ1bmN0aW9uTmFtZSArICcpJyA6ICdGb3J3YXJkUmVmJyk7XG4gICAgcHJvcFR5cGVzID0gdHlwZS5wcm9wVHlwZXM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwcm9wVHlwZXMpIHtcbiAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChlbGVtZW50KTtcbiAgICBjaGVja1Byb3BUeXBlcyhwcm9wVHlwZXMsIGVsZW1lbnQucHJvcHMsICdwcm9wJywgbmFtZSwgUmVhY3REZWJ1Z0N1cnJlbnRGcmFtZS5nZXRTdGFja0FkZGVuZHVtKTtcbiAgICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChudWxsKTtcbiAgfSBlbHNlIGlmICh0eXBlLlByb3BUeXBlcyAhPT0gdW5kZWZpbmVkICYmICFwcm9wVHlwZXNNaXNzcGVsbFdhcm5pbmdTaG93bikge1xuICAgIHByb3BUeXBlc01pc3NwZWxsV2FybmluZ1Nob3duID0gdHJ1ZTtcbiAgICB3YXJuaW5nV2l0aG91dFN0YWNrJDEoZmFsc2UsICdDb21wb25lbnQgJXMgZGVjbGFyZWQgYFByb3BUeXBlc2AgaW5zdGVhZCBvZiBgcHJvcFR5cGVzYC4gRGlkIHlvdSBtaXNzcGVsbCB0aGUgcHJvcGVydHkgYXNzaWdubWVudD8nLCBuYW1lIHx8ICdVbmtub3duJyk7XG4gIH1cbiAgaWYgKHR5cGVvZiB0eXBlLmdldERlZmF1bHRQcm9wcyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICF0eXBlLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA/IHdhcm5pbmdXaXRob3V0U3RhY2skMShmYWxzZSwgJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGEgZnJhZ21lbnQsIHZhbGlkYXRlIHRoYXQgaXQgY2FuIG9ubHkgYmUgcHJvdmlkZWQgd2l0aCBmcmFnbWVudCBwcm9wc1xuICogQHBhcmFtIHtSZWFjdEVsZW1lbnR9IGZyYWdtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlRnJhZ21lbnRQcm9wcyhmcmFnbWVudCkge1xuICBzZXRDdXJyZW50bHlWYWxpZGF0aW5nRWxlbWVudChmcmFnbWVudCk7XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhmcmFnbWVudC5wcm9wcyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIGlmIChrZXkgIT09ICdjaGlsZHJlbicgJiYga2V5ICE9PSAna2V5Jykge1xuICAgICAgd2FybmluZyQxKGZhbHNlLCAnSW52YWxpZCBwcm9wIGAlc2Agc3VwcGxpZWQgdG8gYFJlYWN0LkZyYWdtZW50YC4gJyArICdSZWFjdC5GcmFnbWVudCBjYW4gb25seSBoYXZlIGBrZXlgIGFuZCBgY2hpbGRyZW5gIHByb3BzLicsIGtleSk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBpZiAoZnJhZ21lbnQucmVmICE9PSBudWxsKSB7XG4gICAgd2FybmluZyQxKGZhbHNlLCAnSW52YWxpZCBhdHRyaWJ1dGUgYHJlZmAgc3VwcGxpZWQgdG8gYFJlYWN0LkZyYWdtZW50YC4nKTtcbiAgfVxuXG4gIHNldEN1cnJlbnRseVZhbGlkYXRpbmdFbGVtZW50KG51bGwpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50V2l0aFZhbGlkYXRpb24odHlwZSwgcHJvcHMsIGNoaWxkcmVuKSB7XG4gIHZhciB2YWxpZFR5cGUgPSBpc1ZhbGlkRWxlbWVudFR5cGUodHlwZSk7XG5cbiAgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgaWYgKCF2YWxpZFR5cGUpIHtcbiAgICB2YXIgaW5mbyA9ICcnO1xuICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICBpbmZvICs9ICcgWW91IGxpa2VseSBmb3Jnb3QgdG8gZXhwb3J0IHlvdXIgY29tcG9uZW50IGZyb20gdGhlIGZpbGUgJyArIFwiaXQncyBkZWZpbmVkIGluLCBvciB5b3UgbWlnaHQgaGF2ZSBtaXhlZCB1cCBkZWZhdWx0IGFuZCBuYW1lZCBpbXBvcnRzLlwiO1xuICAgIH1cblxuICAgIHZhciBzb3VyY2VJbmZvID0gZ2V0U291cmNlSW5mb0Vycm9yQWRkZW5kdW0ocHJvcHMpO1xuICAgIGlmIChzb3VyY2VJbmZvKSB7XG4gICAgICBpbmZvICs9IHNvdXJjZUluZm87XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZm8gKz0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGVTdHJpbmcgPSB2b2lkIDA7XG4gICAgaWYgKHR5cGUgPT09IG51bGwpIHtcbiAgICAgIHR5cGVTdHJpbmcgPSAnbnVsbCc7XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHR5cGUpKSB7XG4gICAgICB0eXBlU3RyaW5nID0gJ2FycmF5JztcbiAgICB9IGVsc2UgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCAmJiB0eXBlLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgIHR5cGVTdHJpbmcgPSAnPCcgKyAoZ2V0Q29tcG9uZW50TmFtZSh0eXBlLnR5cGUpIHx8ICdVbmtub3duJykgKyAnIC8+JztcbiAgICAgIGluZm8gPSAnIERpZCB5b3UgYWNjaWRlbnRhbGx5IGV4cG9ydCBhIEpTWCBsaXRlcmFsIGluc3RlYWQgb2YgYSBjb21wb25lbnQ/JztcbiAgICB9IGVsc2Uge1xuICAgICAgdHlwZVN0cmluZyA9IHR5cGVvZiB0eXBlO1xuICAgIH1cblxuICAgIHdhcm5pbmckMShmYWxzZSwgJ1JlYWN0LmNyZWF0ZUVsZW1lbnQ6IHR5cGUgaXMgaW52YWxpZCAtLSBleHBlY3RlZCBhIHN0cmluZyAoZm9yICcgKyAnYnVpbHQtaW4gY29tcG9uZW50cykgb3IgYSBjbGFzcy9mdW5jdGlvbiAoZm9yIGNvbXBvc2l0ZSAnICsgJ2NvbXBvbmVudHMpIGJ1dCBnb3Q6ICVzLiVzJywgdHlwZVN0cmluZywgaW5mbyk7XG4gIH1cblxuICB2YXIgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAvLyBUaGUgcmVzdWx0IGNhbiBiZSBudWxsaXNoIGlmIGEgbW9jayBvciBhIGN1c3RvbSBmdW5jdGlvbiBpcyB1c2VkLlxuICAvLyBUT0RPOiBEcm9wIHRoaXMgd2hlbiB0aGVzZSBhcmUgbm8gbG9uZ2VyIGFsbG93ZWQgYXMgdGhlIHR5cGUgYXJndW1lbnQuXG4gIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuXG4gIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gIC8vIGRvZXNuJ3QgZXhwZWN0IGEgbm9uLXN0cmluZy9mdW5jdGlvbiB0eXBlIGFuZCBjYW4gdGhyb3cgY29uZnVzaW5nIGVycm9ycy5cbiAgLy8gV2UgZG9uJ3Qgd2FudCBleGNlcHRpb24gYmVoYXZpb3IgdG8gZGlmZmVyIGJldHdlZW4gZGV2IGFuZCBwcm9kLlxuICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAvLyBmaXhlZCwgdGhlIGtleSB3YXJuaW5ncyB3aWxsIGFwcGVhci4pXG4gIGlmICh2YWxpZFR5cGUpIHtcbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCB0eXBlKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZSA9PT0gUkVBQ1RfRlJBR01FTlRfVFlQRSkge1xuICAgIHZhbGlkYXRlRnJhZ21lbnRQcm9wcyhlbGVtZW50KTtcbiAgfSBlbHNlIHtcbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KTtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVGYWN0b3J5V2l0aFZhbGlkYXRpb24odHlwZSkge1xuICB2YXIgdmFsaWRhdGVkRmFjdG9yeSA9IGNyZWF0ZUVsZW1lbnRXaXRoVmFsaWRhdGlvbi5iaW5kKG51bGwsIHR5cGUpO1xuICB2YWxpZGF0ZWRGYWN0b3J5LnR5cGUgPSB0eXBlO1xuICAvLyBMZWdhY3kgaG9vazogcmVtb3ZlIGl0XG4gIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodmFsaWRhdGVkRmFjdG9yeSwgJ3R5cGUnLCB7XG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsb3dQcmlvcml0eVdhcm5pbmckMShmYWxzZSwgJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd0eXBlJywge1xuICAgICAgICAgIHZhbHVlOiB0eXBlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiB2YWxpZGF0ZWRGYWN0b3J5O1xufVxuXG5mdW5jdGlvbiBjbG9uZUVsZW1lbnRXaXRoVmFsaWRhdGlvbihlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgdmFyIG5ld0VsZW1lbnQgPSBjbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgZm9yICh2YXIgaSA9IDI7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIG5ld0VsZW1lbnQudHlwZSk7XG4gIH1cbiAgdmFsaWRhdGVQcm9wVHlwZXMobmV3RWxlbWVudCk7XG4gIHJldHVybiBuZXdFbGVtZW50O1xufVxuXG52YXIgUmVhY3QgPSB7XG4gIENoaWxkcmVuOiB7XG4gICAgbWFwOiBtYXBDaGlsZHJlbixcbiAgICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gICAgY291bnQ6IGNvdW50Q2hpbGRyZW4sXG4gICAgdG9BcnJheTogdG9BcnJheSxcbiAgICBvbmx5OiBvbmx5Q2hpbGRcbiAgfSxcblxuICBjcmVhdGVSZWY6IGNyZWF0ZVJlZixcbiAgQ29tcG9uZW50OiBDb21wb25lbnQsXG4gIFB1cmVDb21wb25lbnQ6IFB1cmVDb21wb25lbnQsXG5cbiAgY3JlYXRlQ29udGV4dDogY3JlYXRlQ29udGV4dCxcbiAgZm9yd2FyZFJlZjogZm9yd2FyZFJlZixcbiAgbGF6eTogbGF6eSxcbiAgbWVtbzogbWVtbyxcblxuICBGcmFnbWVudDogUkVBQ1RfRlJBR01FTlRfVFlQRSxcbiAgU3RyaWN0TW9kZTogUkVBQ1RfU1RSSUNUX01PREVfVFlQRSxcbiAgdW5zdGFibGVfQ29uY3VycmVudE1vZGU6IFJFQUNUX0NPTkNVUlJFTlRfTU9ERV9UWVBFLFxuICBTdXNwZW5zZTogUkVBQ1RfU1VTUEVOU0VfVFlQRSxcbiAgdW5zdGFibGVfUHJvZmlsZXI6IFJFQUNUX1BST0ZJTEVSX1RZUEUsXG5cbiAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudFdpdGhWYWxpZGF0aW9uLFxuICBjbG9uZUVsZW1lbnQ6IGNsb25lRWxlbWVudFdpdGhWYWxpZGF0aW9uLFxuICBjcmVhdGVGYWN0b3J5OiBjcmVhdGVGYWN0b3J5V2l0aFZhbGlkYXRpb24sXG4gIGlzVmFsaWRFbGVtZW50OiBpc1ZhbGlkRWxlbWVudCxcblxuICB2ZXJzaW9uOiBSZWFjdFZlcnNpb24sXG5cbiAgX19TRUNSRVRfSU5URVJOQUxTX0RPX05PVF9VU0VfT1JfWU9VX1dJTExfQkVfRklSRUQ6IFJlYWN0U2hhcmVkSW50ZXJuYWxzXG59O1xuXG5cblxudmFyIFJlYWN0JDIgPSBPYmplY3QuZnJlZXplKHtcblx0ZGVmYXVsdDogUmVhY3Rcbn0pO1xuXG52YXIgUmVhY3QkMyA9ICggUmVhY3QkMiAmJiBSZWFjdCApIHx8IFJlYWN0JDI7XG5cbi8vIFRPRE86IGRlY2lkZSBvbiB0aGUgdG9wLWxldmVsIGV4cG9ydCBmb3JtLlxuLy8gVGhpcyBpcyBoYWNreSBidXQgbWFrZXMgaXQgd29yayB3aXRoIGJvdGggUm9sbHVwIGFuZCBKZXN0LlxudmFyIHJlYWN0ID0gUmVhY3QkMy5kZWZhdWx0IHx8IFJlYWN0JDM7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVhY3Q7XG4gIH0pKCk7XG59XG4iLCIvKiogQGxpY2Vuc2UgUmVhY3QgdjE2LjYuMFxuICogcmVhY3QucHJvZHVjdGlvbi5taW4uanNcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIEZhY2Vib29rLCBJbmMuIGFuZCBpdHMgYWZmaWxpYXRlcy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7dmFyIGs9cmVxdWlyZShcIm9iamVjdC1hc3NpZ25cIiksbj1cImZ1bmN0aW9uXCI9PT10eXBlb2YgU3ltYm9sJiZTeW1ib2wuZm9yLHA9bj9TeW1ib2wuZm9yKFwicmVhY3QuZWxlbWVudFwiKTo2MDEwMyxxPW4/U3ltYm9sLmZvcihcInJlYWN0LnBvcnRhbFwiKTo2MDEwNixyPW4/U3ltYm9sLmZvcihcInJlYWN0LmZyYWdtZW50XCIpOjYwMTA3LHQ9bj9TeW1ib2wuZm9yKFwicmVhY3Quc3RyaWN0X21vZGVcIik6NjAxMDgsdT1uP1N5bWJvbC5mb3IoXCJyZWFjdC5wcm9maWxlclwiKTo2MDExNCx2PW4/U3ltYm9sLmZvcihcInJlYWN0LnByb3ZpZGVyXCIpOjYwMTA5LHc9bj9TeW1ib2wuZm9yKFwicmVhY3QuY29udGV4dFwiKTo2MDExMCx4PW4/U3ltYm9sLmZvcihcInJlYWN0LmNvbmN1cnJlbnRfbW9kZVwiKTo2MDExMSx5PW4/U3ltYm9sLmZvcihcInJlYWN0LmZvcndhcmRfcmVmXCIpOjYwMTEyLHo9bj9TeW1ib2wuZm9yKFwicmVhY3Quc3VzcGVuc2VcIik6NjAxMTMsQT1uP1N5bWJvbC5mb3IoXCJyZWFjdC5tZW1vXCIpOlxuNjAxMTUsQj1uP1N5bWJvbC5mb3IoXCJyZWFjdC5sYXp5XCIpOjYwMTE2LEM9XCJmdW5jdGlvblwiPT09dHlwZW9mIFN5bWJvbCYmU3ltYm9sLml0ZXJhdG9yO2Z1bmN0aW9uIGFhKGEsYixlLGMsZCxnLGgsZil7aWYoIWEpe2E9dm9pZCAwO2lmKHZvaWQgMD09PWIpYT1FcnJvcihcIk1pbmlmaWVkIGV4Y2VwdGlvbiBvY2N1cnJlZDsgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50IGZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuXCIpO2Vsc2V7dmFyIGw9W2UsYyxkLGcsaCxmXSxtPTA7YT1FcnJvcihiLnJlcGxhY2UoLyVzL2csZnVuY3Rpb24oKXtyZXR1cm4gbFttKytdfSkpO2EubmFtZT1cIkludmFyaWFudCBWaW9sYXRpb25cIn1hLmZyYW1lc1RvUG9wPTE7dGhyb3cgYTt9fVxuZnVuY3Rpb24gRChhKXtmb3IodmFyIGI9YXJndW1lbnRzLmxlbmd0aC0xLGU9XCJodHRwczovL3JlYWN0anMub3JnL2RvY3MvZXJyb3ItZGVjb2Rlci5odG1sP2ludmFyaWFudD1cIithLGM9MDtjPGI7YysrKWUrPVwiJmFyZ3NbXT1cIitlbmNvZGVVUklDb21wb25lbnQoYXJndW1lbnRzW2MrMV0pO2FhKCExLFwiTWluaWZpZWQgUmVhY3QgZXJyb3IgI1wiK2ErXCI7IHZpc2l0ICVzIGZvciB0aGUgZnVsbCBtZXNzYWdlIG9yIHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCBmb3IgZnVsbCBlcnJvcnMgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4gXCIsZSl9dmFyIEU9e2lzTW91bnRlZDpmdW5jdGlvbigpe3JldHVybiExfSxlbnF1ZXVlRm9yY2VVcGRhdGU6ZnVuY3Rpb24oKXt9LGVucXVldWVSZXBsYWNlU3RhdGU6ZnVuY3Rpb24oKXt9LGVucXVldWVTZXRTdGF0ZTpmdW5jdGlvbigpe319LEY9e307XG5mdW5jdGlvbiBHKGEsYixlKXt0aGlzLnByb3BzPWE7dGhpcy5jb250ZXh0PWI7dGhpcy5yZWZzPUY7dGhpcy51cGRhdGVyPWV8fEV9Ry5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudD17fTtHLnByb3RvdHlwZS5zZXRTdGF0ZT1mdW5jdGlvbihhLGIpe1wib2JqZWN0XCIhPT10eXBlb2YgYSYmXCJmdW5jdGlvblwiIT09dHlwZW9mIGEmJm51bGwhPWE/RChcIjg1XCIpOnZvaWQgMDt0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsYSxiLFwic2V0U3RhdGVcIil9O0cucHJvdG90eXBlLmZvcmNlVXBkYXRlPWZ1bmN0aW9uKGEpe3RoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcyxhLFwiZm9yY2VVcGRhdGVcIil9O2Z1bmN0aW9uIEgoKXt9SC5wcm90b3R5cGU9Ry5wcm90b3R5cGU7ZnVuY3Rpb24gSShhLGIsZSl7dGhpcy5wcm9wcz1hO3RoaXMuY29udGV4dD1iO3RoaXMucmVmcz1GO3RoaXMudXBkYXRlcj1lfHxFfXZhciBKPUkucHJvdG90eXBlPW5ldyBIO1xuSi5jb25zdHJ1Y3Rvcj1JO2soSixHLnByb3RvdHlwZSk7Si5pc1B1cmVSZWFjdENvbXBvbmVudD0hMDt2YXIgSz17Y3VycmVudDpudWxsLGN1cnJlbnREaXNwYXRjaGVyOm51bGx9LEw9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxNPXtrZXk6ITAscmVmOiEwLF9fc2VsZjohMCxfX3NvdXJjZTohMH07XG5mdW5jdGlvbiBOKGEsYixlKXt2YXIgYz12b2lkIDAsZD17fSxnPW51bGwsaD1udWxsO2lmKG51bGwhPWIpZm9yKGMgaW4gdm9pZCAwIT09Yi5yZWYmJihoPWIucmVmKSx2b2lkIDAhPT1iLmtleSYmKGc9XCJcIitiLmtleSksYilMLmNhbGwoYixjKSYmIU0uaGFzT3duUHJvcGVydHkoYykmJihkW2NdPWJbY10pO3ZhciBmPWFyZ3VtZW50cy5sZW5ndGgtMjtpZigxPT09ZilkLmNoaWxkcmVuPWU7ZWxzZSBpZigxPGYpe2Zvcih2YXIgbD1BcnJheShmKSxtPTA7bTxmO20rKylsW21dPWFyZ3VtZW50c1ttKzJdO2QuY2hpbGRyZW49bH1pZihhJiZhLmRlZmF1bHRQcm9wcylmb3IoYyBpbiBmPWEuZGVmYXVsdFByb3BzLGYpdm9pZCAwPT09ZFtjXSYmKGRbY109ZltjXSk7cmV0dXJueyQkdHlwZW9mOnAsdHlwZTphLGtleTpnLHJlZjpoLHByb3BzOmQsX293bmVyOksuY3VycmVudH19XG5mdW5jdGlvbiBiYShhLGIpe3JldHVybnskJHR5cGVvZjpwLHR5cGU6YS50eXBlLGtleTpiLHJlZjphLnJlZixwcm9wczphLnByb3BzLF9vd25lcjphLl9vd25lcn19ZnVuY3Rpb24gTyhhKXtyZXR1cm5cIm9iamVjdFwiPT09dHlwZW9mIGEmJm51bGwhPT1hJiZhLiQkdHlwZW9mPT09cH1mdW5jdGlvbiBlc2NhcGUoYSl7dmFyIGI9e1wiPVwiOlwiPTBcIixcIjpcIjpcIj0yXCJ9O3JldHVyblwiJFwiKyhcIlwiK2EpLnJlcGxhY2UoL1s9Ol0vZyxmdW5jdGlvbihhKXtyZXR1cm4gYlthXX0pfXZhciBQPS9cXC8rL2csUT1bXTtmdW5jdGlvbiBSKGEsYixlLGMpe2lmKFEubGVuZ3RoKXt2YXIgZD1RLnBvcCgpO2QucmVzdWx0PWE7ZC5rZXlQcmVmaXg9YjtkLmZ1bmM9ZTtkLmNvbnRleHQ9YztkLmNvdW50PTA7cmV0dXJuIGR9cmV0dXJue3Jlc3VsdDphLGtleVByZWZpeDpiLGZ1bmM6ZSxjb250ZXh0OmMsY291bnQ6MH19XG5mdW5jdGlvbiBTKGEpe2EucmVzdWx0PW51bGw7YS5rZXlQcmVmaXg9bnVsbDthLmZ1bmM9bnVsbDthLmNvbnRleHQ9bnVsbDthLmNvdW50PTA7MTA+US5sZW5ndGgmJlEucHVzaChhKX1cbmZ1bmN0aW9uIFQoYSxiLGUsYyl7dmFyIGQ9dHlwZW9mIGE7aWYoXCJ1bmRlZmluZWRcIj09PWR8fFwiYm9vbGVhblwiPT09ZClhPW51bGw7dmFyIGc9ITE7aWYobnVsbD09PWEpZz0hMDtlbHNlIHN3aXRjaChkKXtjYXNlIFwic3RyaW5nXCI6Y2FzZSBcIm51bWJlclwiOmc9ITA7YnJlYWs7Y2FzZSBcIm9iamVjdFwiOnN3aXRjaChhLiQkdHlwZW9mKXtjYXNlIHA6Y2FzZSBxOmc9ITB9fWlmKGcpcmV0dXJuIGUoYyxhLFwiXCI9PT1iP1wiLlwiK1UoYSwwKTpiKSwxO2c9MDtiPVwiXCI9PT1iP1wiLlwiOmIrXCI6XCI7aWYoQXJyYXkuaXNBcnJheShhKSlmb3IodmFyIGg9MDtoPGEubGVuZ3RoO2grKyl7ZD1hW2hdO3ZhciBmPWIrVShkLGgpO2crPVQoZCxmLGUsYyl9ZWxzZSBpZihudWxsPT09YXx8XCJvYmplY3RcIiE9PXR5cGVvZiBhP2Y9bnVsbDooZj1DJiZhW0NdfHxhW1wiQEBpdGVyYXRvclwiXSxmPVwiZnVuY3Rpb25cIj09PXR5cGVvZiBmP2Y6bnVsbCksXCJmdW5jdGlvblwiPT09dHlwZW9mIGYpZm9yKGE9Zi5jYWxsKGEpLGg9XG4wOyEoZD1hLm5leHQoKSkuZG9uZTspZD1kLnZhbHVlLGY9YitVKGQsaCsrKSxnKz1UKGQsZixlLGMpO2Vsc2VcIm9iamVjdFwiPT09ZCYmKGU9XCJcIithLEQoXCIzMVwiLFwiW29iamVjdCBPYmplY3RdXCI9PT1lP1wib2JqZWN0IHdpdGgga2V5cyB7XCIrT2JqZWN0LmtleXMoYSkuam9pbihcIiwgXCIpK1wifVwiOmUsXCJcIikpO3JldHVybiBnfWZ1bmN0aW9uIFYoYSxiLGUpe3JldHVybiBudWxsPT1hPzA6VChhLFwiXCIsYixlKX1mdW5jdGlvbiBVKGEsYil7cmV0dXJuXCJvYmplY3RcIj09PXR5cGVvZiBhJiZudWxsIT09YSYmbnVsbCE9YS5rZXk/ZXNjYXBlKGEua2V5KTpiLnRvU3RyaW5nKDM2KX1mdW5jdGlvbiBjYShhLGIpe2EuZnVuYy5jYWxsKGEuY29udGV4dCxiLGEuY291bnQrKyl9XG5mdW5jdGlvbiBkYShhLGIsZSl7dmFyIGM9YS5yZXN1bHQsZD1hLmtleVByZWZpeDthPWEuZnVuYy5jYWxsKGEuY29udGV4dCxiLGEuY291bnQrKyk7QXJyYXkuaXNBcnJheShhKT9XKGEsYyxlLGZ1bmN0aW9uKGEpe3JldHVybiBhfSk6bnVsbCE9YSYmKE8oYSkmJihhPWJhKGEsZCsoIWEua2V5fHxiJiZiLmtleT09PWEua2V5P1wiXCI6KFwiXCIrYS5rZXkpLnJlcGxhY2UoUCxcIiQmL1wiKStcIi9cIikrZSkpLGMucHVzaChhKSl9ZnVuY3Rpb24gVyhhLGIsZSxjLGQpe3ZhciBnPVwiXCI7bnVsbCE9ZSYmKGc9KFwiXCIrZSkucmVwbGFjZShQLFwiJCYvXCIpK1wiL1wiKTtiPVIoYixnLGMsZCk7VihhLGRhLGIpO1MoYil9XG52YXIgWD17Q2hpbGRyZW46e21hcDpmdW5jdGlvbihhLGIsZSl7aWYobnVsbD09YSlyZXR1cm4gYTt2YXIgYz1bXTtXKGEsYyxudWxsLGIsZSk7cmV0dXJuIGN9LGZvckVhY2g6ZnVuY3Rpb24oYSxiLGUpe2lmKG51bGw9PWEpcmV0dXJuIGE7Yj1SKG51bGwsbnVsbCxiLGUpO1YoYSxjYSxiKTtTKGIpfSxjb3VudDpmdW5jdGlvbihhKXtyZXR1cm4gVihhLGZ1bmN0aW9uKCl7cmV0dXJuIG51bGx9LG51bGwpfSx0b0FycmF5OmZ1bmN0aW9uKGEpe3ZhciBiPVtdO1coYSxiLG51bGwsZnVuY3Rpb24oYSl7cmV0dXJuIGF9KTtyZXR1cm4gYn0sb25seTpmdW5jdGlvbihhKXtPKGEpP3ZvaWQgMDpEKFwiMTQzXCIpO3JldHVybiBhfX0sY3JlYXRlUmVmOmZ1bmN0aW9uKCl7cmV0dXJue2N1cnJlbnQ6bnVsbH19LENvbXBvbmVudDpHLFB1cmVDb21wb25lbnQ6SSxjcmVhdGVDb250ZXh0OmZ1bmN0aW9uKGEsYil7dm9pZCAwPT09YiYmKGI9bnVsbCk7YT17JCR0eXBlb2Y6dyxfY2FsY3VsYXRlQ2hhbmdlZEJpdHM6Yixcbl9jdXJyZW50VmFsdWU6YSxfY3VycmVudFZhbHVlMjphLFByb3ZpZGVyOm51bGwsQ29uc3VtZXI6bnVsbH07YS5Qcm92aWRlcj17JCR0eXBlb2Y6dixfY29udGV4dDphfTtyZXR1cm4gYS5Db25zdW1lcj1hfSxmb3J3YXJkUmVmOmZ1bmN0aW9uKGEpe3JldHVybnskJHR5cGVvZjp5LHJlbmRlcjphfX0sbGF6eTpmdW5jdGlvbihhKXtyZXR1cm57JCR0eXBlb2Y6QixfY3RvcjphLF9zdGF0dXM6LTEsX3Jlc3VsdDpudWxsfX0sbWVtbzpmdW5jdGlvbihhLGIpe3JldHVybnskJHR5cGVvZjpBLHR5cGU6YSxjb21wYXJlOnZvaWQgMD09PWI/bnVsbDpifX0sRnJhZ21lbnQ6cixTdHJpY3RNb2RlOnQsdW5zdGFibGVfQ29uY3VycmVudE1vZGU6eCxTdXNwZW5zZTp6LHVuc3RhYmxlX1Byb2ZpbGVyOnUsY3JlYXRlRWxlbWVudDpOLGNsb25lRWxlbWVudDpmdW5jdGlvbihhLGIsZSl7bnVsbD09PWF8fHZvaWQgMD09PWE/RChcIjI2N1wiLGEpOnZvaWQgMDt2YXIgYz12b2lkIDAsZD1rKHt9LGEucHJvcHMpLFxuZz1hLmtleSxoPWEucmVmLGY9YS5fb3duZXI7aWYobnVsbCE9Yil7dm9pZCAwIT09Yi5yZWYmJihoPWIucmVmLGY9Sy5jdXJyZW50KTt2b2lkIDAhPT1iLmtleSYmKGc9XCJcIitiLmtleSk7dmFyIGw9dm9pZCAwO2EudHlwZSYmYS50eXBlLmRlZmF1bHRQcm9wcyYmKGw9YS50eXBlLmRlZmF1bHRQcm9wcyk7Zm9yKGMgaW4gYilMLmNhbGwoYixjKSYmIU0uaGFzT3duUHJvcGVydHkoYykmJihkW2NdPXZvaWQgMD09PWJbY10mJnZvaWQgMCE9PWw/bFtjXTpiW2NdKX1jPWFyZ3VtZW50cy5sZW5ndGgtMjtpZigxPT09YylkLmNoaWxkcmVuPWU7ZWxzZSBpZigxPGMpe2w9QXJyYXkoYyk7Zm9yKHZhciBtPTA7bTxjO20rKylsW21dPWFyZ3VtZW50c1ttKzJdO2QuY2hpbGRyZW49bH1yZXR1cm57JCR0eXBlb2Y6cCx0eXBlOmEudHlwZSxrZXk6ZyxyZWY6aCxwcm9wczpkLF9vd25lcjpmfX0sY3JlYXRlRmFjdG9yeTpmdW5jdGlvbihhKXt2YXIgYj1OLmJpbmQobnVsbCxhKTtiLnR5cGU9YTtyZXR1cm4gYn0sXG5pc1ZhbGlkRWxlbWVudDpPLHZlcnNpb246XCIxNi42LjBcIixfX1NFQ1JFVF9JTlRFUk5BTFNfRE9fTk9UX1VTRV9PUl9ZT1VfV0lMTF9CRV9GSVJFRDp7UmVhY3RDdXJyZW50T3duZXI6Syxhc3NpZ246a319LFk9e2RlZmF1bHQ6WH0sWj1ZJiZYfHxZO21vZHVsZS5leHBvcnRzPVouZGVmYXVsdHx8WjtcbiIsIid1c2Ugc3RyaWN0JztcblxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbicpIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5wcm9kdWN0aW9uLm1pbi5qcycpO1xufSBlbHNlIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2Nqcy9yZWFjdC5kZXZlbG9wbWVudC5qcycpO1xufVxuIl19
