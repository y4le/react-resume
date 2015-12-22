var React = require('react');
module.exports = Object.freeze({
  TIMELINE: [
    {
      start: 'Sep 2011',
      end: 'May 2014',
      header: 'UIUC',
      subheader: 'Studying MatScE & CS',
      backgroundColor: 'rgba(246, 75, 5, 1.3)'
    },
    {
      start: 'Aug 2014',
      end: new Date().toLocaleDateString('en'),
      header: 'Rdio',
      subheader: 'Web Team Engineer',
      backgroundColor: 'rgb(14, 122, 204)'
    },
    {
      start: 'May 2014',
      end: 'Aug 2014',
      header: 'Rdio',
      subheader: 'Web Team Intern',
      backgroundColor: 'rgb(14, 122, 204)'
    },    
    {
      start: 'May 2013',
      end: 'Aug 2013',
      header: 'Facebook',
      subheader: 'Site Integrity Team Intern',
      backgroundColor: 'rgba(60, 83, 143, 1.4)'
    },
    {
      start: 'May 2012',
      end: 'Aug 2012',
      header: 'WASHU',
      subheader: 'Medical Imaging Dept. Intern',
      backgroundColor: 'rgba(38, 73, 50, 1.4)'
    }
  ],

  // Profile stuff, array of string paragraphs
  profile: [
    "I am a front end software engineer on Rdio's web team. Getting to this point has been an interesting journey. I was 3/4 of the way through a MatSE degree at UIUC when I decided to drop out and take the job Rdio offered me near the end of my internship.",
    "I entered MatSE with the intention of studying/making low level simulations of materials to predict behavior, but I became fascinated with the ways materials science has influenced some algorithmic design. Simulated annealing is so called because it takes inspiration from the way a phase transition plays out in cooling glass. That apparently simple physical process of cooling will always come up with a good-enough solution to the incredibly complex problem of arranging moles of atoms into a semi-crystalline structure.",
    "I decided to drop out of school for many reasons, but there are two big ones. First off, I took a serious look at the job market for MatSE students and realized that the jobs I was interested in required at least a masters degree, and I was not up for that much more school. Second, I want to continue to learn to be a software engineer, and I would not have been able to take any more CS classes if I wanted to graduate on time. I didn't want to leave such a fertile learning environment, I improved my programming abilities more during my internship at Rdio than in 3 years of classes."
  ],

  // Books
  BOOKS: [
    { 
      title:   "The Martian",
      author:  'Andy Weir',
      date:    'Nov 20 2014',
      genre:   'SciFi',
      fiction: true, rating:  .95, reread:  false
    },
    { 
      title:   "Let's Explore Diabetes with Owls",
      author:  'David Sedaris',
      date:    'Nov 23 2014',
      genre:   'Comedy',
      fiction: false, rating:  .75, reread:  false
    },
    { 
      title:   "The Tipping Point",
      author:  'Malcom Gladwell',
      date:    'Nov 25 2014',
      genre:   'Economics',
      fiction: false, rating:  .8, reread:  false
    },
    { 
      title:   "Blink",
      author:  'Malcom Gladwell',
      date:    'Nov 28 2014',
      genre:   'Cognitive',
      fiction: false, rating:  .8, reread:  false
    },
    { 
      title:   "Outliers",
      author:  'Malcom Gladwell',
      date:    'Nov 30 2014',
      genre:   'Economics',
      fiction: false, rating:  .8, reread:  false
    },
    { 
      title:   "The Selfish Gene",
      author:  'Richard Dawkins',
      date:    'Dec 5 2014',
      genre:   'Biology',
      fiction: false, rating:  .85, reread:  true
    },
    { 
      title:   "Hard-boiled Wonderland and the End of the World",
      author:  'Haruki Murakami',
      date:    'Dec 9 2014',
      genre:   'Supernatural',
      fiction: true, rating:  .6, reread:  false
    },
    { 
      title:   "What It Is Like to Go to War",
      author:  'Karl Marlantes',
      date:    'Dec 14 2014',
      fiction: false, rating:  .85, reread:  false
    },
    { 
      title:   "The Girl With All the Gifts",
      author:  'M. R. Carey',
      date:    'Dec 20 2014',
      genre:   'SciFi',
      fiction: true, rating:  .65, reread:  false
    },
    { 
      title:   "Blindsight",
      author:  'Peter Watts',
      date:    'Feb 1 2015',
      genre:   'SciFi',
      fiction: true, rating:  .75, reread:  false
    },
    { 
      title:   "Echopraxia",
      author:  'Peter Watts',
      date:    'Feb 10 2015',
      genre:   'SciFi',
      fiction: true, rating:  .74, reread:  false
    },
    { 
      title:   "The Name of the Wind",
      author:  'Patrick Rothfuss',
      date:    'Feb 19 2015',
      genre:   'Fantasy',
      fiction: true, rating:  .93, reread:  false
    },
    { 
      title:   "This Book is Full of Spiders",
      author:  'David Wong',
      date:    'Feb 21 2015',
      genre:   'Supernatural',
      fiction: true, rating:  .7, reread:  false
    },
    { 
      title:   "John Dies at the End",
      author:  'David Wong',
      date:    'Feb 23 2015',
      genre:   'Supernatural',
      fiction: true, rating:  .7, reread:  true
    },
    { 
      title:   "The Wise Man's Fear",
      author:  'Patrick Rothfuss',
      date:    'Mar 5 2015',
      genre:   'Fantasy',
      fiction: true, rating:  .9, reread:  false
    },
    { 
      title:   "The Pillars of the Earth",
      author:  'Ken Follet',
      date:    'Mar 14 2015',
      genre:   'Historical Fiction',
      fiction: true, rating:  .94, reread:  false
    },
    { 
      title:   "Rogues",
      author:  'George R. R. Martin and others',
      date:    'Mar 24 2015',
      genre:   'Fantasy',
      fiction: true, rating:  .8, reread:  false
    },
    { 
      title:   "Ringworld",
      author:  'Larry Niven',
      date:    'Mar 28 2015',
      genre:   'SciFi',
      fiction: true, rating:  .75, reread:  true
    },
    { 
      title:   "The Stand",
      author:  'Stephen King',
      date:    'Apr 7 2015',
      genre:   'Supernatural',
      fiction: true, rating:  .79, reread:  false
    },
    { 
      title:   "Neuromancer",
      author:  'William Gibson',
      date:    'Apr 13 2015',
      genre:   'SciFi',
      fiction: true, rating:  .8, reread:  false
    },
    { 
      title:   "Guns, Germs, and Steel",
      author:  'Jared Diamond',
      date:    'Apr 16 2015',
      genre:   'History',
      fiction: false, rating:  .8, reread:  false
    },
    { 
      title:   "The Martian",
      author:  'Andy Weir',
      date:    'Apr 22 2015',
      genre:   'SciFi',
      fiction: true, rating:  .95, reread:  true
    },
    { 
      title:   "It",
      author:  'Stephen King',
      date:    'Apr 28 2015',
      genre:   'Supernatural',
      fiction: true, rating:  .795, reread:  false
    },
    { 
      title:   "SuperFreakonomics",
      author:  'Stephen Dubner/Stephen Levitt',
      date:    'May 8 2015',
      genre:   'Economics',
      fiction: false, rating:  .8, reread:  false
    },
    { 
      title:   "Think Like a Freak",
      author:  'Stephen Dubner/Stephen Levitt',
      date:    'May 14 2015',
      genre:   'Economics',
      fiction: false, rating:  .81, reread:  false
    },
    { 
      title:   "A Brief History of Time",
      author:  'Stephen Hawking',
      date:    'May 20 2015',
      genre:   'Cosmology',
      fiction: false, rating:  .8, reread:  false
    },
    { 
      title:   "When to Rob a Bank",
      author:  'Stephen Dubner/Stephen Levitt',
      date:    'May 26 2015',
      genre:   'Economics',
      fiction: false, rating:  .8, reread:  false
    },
    { 
      title:   "Anathem",
      author:  'Neal Stephenson',
      date:    'Jun 19 2015',
      genre:   'SciFi',
      fiction: true, rating:  .775, reread:  false
    },
    { 
      title:   "Cryptonomicon",
      author:  'Neal Stephenson',
      date:    'Jul 6 2015',
      genre:   'Historical Fiction',
      fiction: true, rating:  .785, reread:  false
    },
    { 
      title:   "Seveneves",
      author:  'Neal Stephenson',
      date:    'Jul 23 2015',
      genre:   'SciFi',
      fiction: true, rating:  .875, reread:  false
    },
    { 
      title:   "Snow Crash",
      author:  'Neal Stephenson',
      date:    'Aug 1 2015',
      genre:   'SciFi',
      fiction: true, rating:  .85, reread:  false
    },
    { 
      title:   "The Diamond Age",
      author:  'Neal Stephenson',
      date:    'Aug 9 2015',
      genre:   'SciFi',
      fiction: true, rating:  .735, reread:  false
    },
    { 
      title:   "What the Dog Saw",
      author:  'Malcom Gladwell',
      date:    'Aug 20 2015',
      genre:   'Various',
      fiction: false, rating:  .81, reread:  false
    },
    { 
      title:   "Hallucinations",
      author:  'Oliver Sacks',
      date:    'Aug 28 5 2015',
      genre:   'Neuroscience',
      fiction: false, rating:  .85, reread:  false
    },
    { 
      title:   "The Man Who Mistook His Wife for a Hat",
      author:  'Oliver Sacks',
      date:    'Sept 3 2015',
      genre:   'Neuroscience',
      fiction: false, rating:  .78, reread:  false
    },
    { 
      title:   "The Mind's Eye",
      author:  'Oliver Sacks',
      date:    'Sept 6 2015',
      genre:   'Neuroscience',
      fiction: false, rating:  .8, reread:  false
    },
    { 
      title:   "Awakenings",
      author:  'Oliver Sacks',
      date:    'Sept 10 2015',
      genre:   'Neuroscience',
      fiction: false, rating:  .75, reread:  false
    },
    { 
      title:   "David and Goliath",
      author:  'Malcom Gladwell',
      date:    'Sep 16 2015',
      genre:   'Economics',
      fiction: false, rating:  .85, reread:  false
    },
    { 
      title:   "Ready Player One",
      author:  'Ernst Cline',
      date:    'Sept 22 2015',
      genre:   'SciFi',
      fiction: true, rating:  .7, reread:  false
    },
    { 
      title:   "Flash Boys",
      author:  'Michael Lewis',
      date:    'Sep 25 2015',
      genre:   'Economics',
      fiction: false, rating:  .95, reread:  false
    },
    { 
      title:   "The Big Short",
      author:  'Michael Lewis',
      date:    'Sep 28 2015',
      genre:   'Economics',
      fiction: false, rating:  .9, reread:  false
    },
    { 
      title:   "Boomerang",
      author:  'Michael Lewis',
      date:    'Sep 30 2015',
      genre:   'Economics',
      fiction: false, rating:  .9, reread:  false
    },
    { 
      title:   "Moneyball",
      author:  'Michael Lewis',
      date:    'Oct 3 2015',
      genre:   'Sports / Economics',
      fiction: false, rating:  .85, reread:  false
    },
    { 
      title:   "Liar's Poker",
      author:  'Michael Lewis',
      date:    'Oct 5 2015',
      genre:   'Economics',
      fiction: false, rating:  .85, reread:  false
    },
    { 
      title:   "Aurora",
      author:  'Kim Stanley Robinson',
      date:    'Oct 11 2015',
      genre:   'SciFi',
      fiction: true, rating:  .84, reread:  false
    },
    { 
      title:   "The Practicing Mind",
      author:  'Thomas M. Sterner',
      date:    'Oct 14 2015',
      genre:   'Psychology',
      fiction: false, rating:  .8, reread:  false
    },
    { 
      title:   "Misbehaving",
      author:  'Richard Thaler',
      date:    'Oct 16 2015',
      genre:   'Behavioral Economics',
      fiction: false, rating:  .95, reread: false
    },
    { 
      title:   "Boomerang",
      author:  'Michael Lewis',
      date:    'Oct 20 2015',
      genre:   'Economics',
      fiction: false, rating:  .9, reread: true
    },
    { 
      title:   "Thinking Fast and Slow",
      author:  'Daniel Kahneman',
      date:    'Oct 28 2015',
      genre:   'Behavioral Economics',
      fiction: false, rating:  .98, reread: false
    },
    { 
      title:   "How Not to Be Wrong",
      author:  'Jordan Ellenberg',
      date:    'Nov 10 2015',
      genre:   'Mathematics',
      fiction: false, rating:  .9, reread: false
    },
    { 
      title:   "Futuristic Violence and Fancy Suits",
      author:  'David Wong',
      date:    'Nov 15 2015',
      genre:   'SciFi',
      fiction: true, rating:  .89, reread: false
    },
    {
      title:   "The Black Swan",
      author:  'Nassim Taleb',
      date:    'Nov 24 2015',
      genre:   'Epistemology / Cognitive / Economics',
      fiction: false, rating:  .99, reread: false
    },
    {
      title:   "The Design of Everyday Things",
      author:  'Donald A. Norman',
      date:    'Nov 28 2015',
      genre:   'Design',
      fiction: false, rating:  .82, reread: false
    },
    {
      title:   "The New New Thing",
      author:  'Michael Lewis',
      date:    'Dec 2 2015',
      genre:   'Economics',
      fiction: false, rating:  .83, reread: false
    },
    {
      title:   "Superintelligence: Paths, Dangers, Strategies",
      author:  'Nick Bostrom',
      date:    'Dec 11 2015',
      genre:   'AI / Cognitive / Philosophy',
      fiction: false, rating:  .935, reread: false
    },
    {
      title:   "Being Mortal",
      author:  'Atul Gawande',
      date:    'Dec 15 2015',
      genre:   'Medicine',
      fiction: false, rating:  .91, reread: false
    },
    {
      title:   "Incognito: The Secret Lives of the Brain",
      author:  'David Eagleman',
      date:    'Dec 21 2015',
      genre:   'Cognitive / Psychology',
      fiction: false, rating:  .96, reread: false
    }
  ],
  bookOrderings: [
    'date read',
    'title',
    'author',
    'non/fiction',
    'rating'
  ],
  bookToJSX: function(book) {
    var finishDate = new Date(book.date);
    var titleText = book.title;
    if (book.reread) {
      titleText += ' (reread)';
    }
    return (
      <div key={finishDate.getTime()} className='books_row'>
        <div className='book_row'>
          <div className='book_title'>{titleText}</div>
          <div className='book_rating_wrapper'>
            <div className='book_rating' style={{ width: book.rating * 100 + '%' }} />
          </div>
        </div>
        <div className='book_row'>
          <div>{book.author}</div>
          <div>{finishDate.toLocaleDateString()}</div>
        </div>
      </div>
    );
  },
  bookComparator: function(a, b, ordering) {
    var dateOrd = new Date(a.date).getTime() < new Date(b.date).getTime() ? 1 : -1;

    switch (ordering) {
      default: return dateOrd;
      case 1: 
        if (a.title === b.title) { return dateOrd; }
        return a.title > b.title ? 1 : -1;
      case 2:
        if (a.author === b.author) { return dateOrd; }
        return a.author > b.author ? 1 : -1;
      case 3:
        if (a.fiction === b.fiction) { return dateOrd; }
        return a.fiction > b.fiction ? 1 : -1;
      case 4:
        if (a.rating === b.rating) { return dateOrd; }
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
  SKILLS: [
    { name: 'Java', skill: .6, category: 'backend' },
    { name: 'C++', skill: .5, category: 'backend' },
    { name: 'Python', skill: .4, category: 'backend' },
    { name: 'CSS', skill: .8, category: 'web' },
    { name: 'HTML', skill: .8, category: 'web' },
    { name: 'Javascript', skill: .9, category: 'web' },
    { name: 'Bash', skill: .3, category: 'script' },
    { name: 'SQL', skill: .5, category: 'backend' },
    { name: 'SVN', skill: .3, category: 'version' },
    { name: 'Git', skill: .7, category: 'version' },
    { name: 'Matlab', skill: .3, category: 'math' },
    { name: 'Mathematica', skill: .5, category: 'math' },
    { name: 'Photoshop', skill: .6, category: 'adobe' },
    { name: 'Indesign', skill: .8, category: 'adobe' },
    { name: 'Illustrator', skill: .3, category: 'adobe' }
  ],
  skillOrderings: [
    'category',
    'experience',
    'alphabetic'
  ],
  skillToJSX: function(skill) {
    var skillText;
    if (skill.skill <= .3) { skillText = 'Passable'; }
    else if (skill.skill <= .6) { skillText = 'Proficient'; }
    else { skillText = 'Professional'; }
    return (
      <div key={skill.name} className='skill_row'>
        <div>{skill.name}</div><div>{skillText}</div>
      </div>
    );
  },
  skillComparator: function(a, b, ordering) {
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
  CLASSES: [
    { subject: 'MSE', number: 100, name: 'Engineering Orientation', semester: 1, category: 2 },
    { subject: 'MSE', number: 182, name: 'Intro to MatSE', semester: 1, category: 2 },
    { subject: 'CS', number: 125, name: 'Intro to CS', semester: 1, category: 1 },
    { subject: 'CS', number: 196, name: 'Freshman Honors', semester: 1, category: 1 },
    { subject: 'HIST', number: 253, name: 'Enlight. to Existentialsm', semester: 1, category: 0 },
    { subject: 'MATH', number: 231, name: 'Calculus II', semester: 1, category: 1 },
    { subject: 'MATH', number: 299, name: 'Topics in Mathematics', semester: 1, category: 1 },
    { subject: 'PHIL', number: 101, name: 'Intro to Philosophy', semester: 1, category: 0 },
    { subject: 'ANTH', number: 101, name: 'Intro to Anthropology', semester: 2, category: 0 },
    { subject: 'GEOL', number: 107, name: 'Physical Geology', semester: 2, category: 0 },
    { subject: 'MATH', number: 241, name: 'Calculus III', semester: 2, category: 1 },
    { subject: 'MATH', number: 415, name: 'Applied Linear Algebra', semester: 2, category: 1 },
    { subject: 'PHYS', number: 211, name: 'Univ Physics: Mechanics', semester: 2, category: 2 },
    { subject: 'MATH', number: 285, name: 'Intro Differential Eq.', semester: 3, category: 2 },
    { subject: 'MATH', number: 463, name: 'Statistics and Probability', semester: 3, category: 1 },
    { subject: 'PHIL', number: 202, name: 'Symbolic Logic', semester: 3, category: 1 },
    { subject: 'PHYS', number: 212, name: 'Univ Physics: Elec & Mag', semester: 3, category: 2 },
    { subject: 'CS', number: 225, name: 'Data Structures', semester: 4, category: 1 },
    { subject: 'CS', number: 357, name: 'Numerical Methods I', semester: 4, category: 1 },
    { subject: 'HIST', number: 461, name: 'Russia: Peter the Great', semester: 4, category: 0 },
    { subject: 'PHYS', number: 213, name: 'Univ Physics: Thermal', semester: 4, category: 2 },
    { subject: 'PHYS', number: 214, name: 'Univ Physics: Quantum', semester: 4, category: 2 },
    { subject: 'ARTD', number: 215, name: 'Introduction to Typography', semester: 5, category: 0 },
    { subject: 'ATMS', number: 120, name: 'Sev. & Hazardous Weather', semester: 5, category: 0 },
    { subject: 'CS', number: 173, name: 'Discrete Structures', semester: 5, category: 1 },
    { subject: 'CS', number: 440, name: 'Artificial Intelligence', semester: 5, category: 1 },
    { subject: 'CHEM', number: 232, name: 'Organic Chemistry', semester: 6, category: 2 },
    { subject: 'CPSC', number: 116, name: 'Global Food Production', semester: 6, category: 0 },
    { subject: 'MSE', number: 206, name: 'Mechanics for MatSE', semester: 6, category: 2 },
    { subject: 'MSE', number: 450, name: 'Polymer Science & Eng.', semester: 6, category: 2 }
  ],  
  classOrderings: [
    'semester',
    'subject',
    'number',
    'alphabetic'
  ],
  classToJSX: function(classRow) {
    return (
      <div key={classRow.name} className='class_row'>
        <div className='class_name'>{classRow.name}</div><div className='class_info'><div>{classRow.subject + '-'}</div><div>{classRow.number}</div></div>
      </div>
    );
  },
  classComparator: function(a, b, ordering) {
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
  WORK: [
    {
      title: 'Rdio',
      // title_link: 'http://www.rdio.com',
      job_title: 'Web Team Engineer',
      start_date: '2014',
      end_date: 'Now',
      notes: [
        'Dropped out of school to pursue a full time software engineering position here',
        'Amazing Learning Environment',
        'Pitched, created, and deployed a viewport tracker for the content on our homepage',
        'Implemented Rdio Select subscription tier on web',
        'Upgraded multiple admin pages with better visualizations/UX',
        'Working with: javascript(backbone and react), HTML, CSS, SQL, python'
      ]
    },
    {
      title: 'Rdio',
      // title_link: 'http://www.rdio.com',
      job_title: 'Web Team Intern',
      end_date: '2014',
      notes: [
        'Finally learned how to really work effectively in a software development team.',
        'Best front end training I have experienced. I did not know all the steps to creating and hosting a website, but now this page is an easy weekend project. (current page since rewritten in react)',
        'Worked on "music feed", the current rdio.com homepage page.',
        'Implemented a user exit survey that collects much more information than before.',
        'Added analytics around the site and helped the non-technical staff to query/analyze the data.',
        'Worked with: javascript, HTML, CSS, SQL'
      ]
    },
    {
      title: 'Facebook',
      // title_link: 'http://www.facebook.com',
      job_title: 'Site Integrity Team Intern',
      end_date: '2013',
      notes: [
        'Worked with content review staff to improve internal tools that had been slowing them down.',
        'Really enjoyed the challenge of making an interface that is intuitive and looks good.',
        'Productivity could have been better, I was afraid of asking for help because I wanted to look smart. I learned from my experience.',
        'Worked with: PHP, HTML, CSS'
      ]
    },
    {
      title: 'WASHU',
      job_title: 'Medical Imaging Dept. Intern',
      end_date: '2012',
      notes: [
        'Worked with a self directed team of 3 on tool for XDS medical document transfer protocol.',
        'Built test endpoint with ability to select custom datasets that contained relevant file formats.',
        'Just enough HIPAA training that I am terrified of touching any medical documents for fear of getting sued.',
        'Developed strong distaste for java server faces.',
        'Worked with: java, HTML'
      ]
    },
  ],
  EDUCATION: [
    {
      title: 'UIUC',
      start_date: '2011',
      end_date: '2014',
      notes: [
        'Studied Materials Science and Computer Science.',
        'Eclectic class list.',
        '2nd place in Microsoft Windows Phone hackathon. I won a copy of viva pinata.',
        'Participated in Engineering Open House the last 2 years I was there.',
        'Dropped out after 3 years to pursue a full time software engineering position.'
      ]
    },
    {
      title: 'St. Louis Priory School',
      start_date: '2006',
      end_date: '2011',
      notes: [
        'Tutored Chemistry and Physics for school program. Then proceeded to start much more lucrative independent classroom-style prep courses for Chemistry that I ran for the summers of 2011-12.',
        'National Merit Semi-Finalist',
        'FIRST robotics team 1329 leader'
      ]
    }
  ],
  PROJECTS: [
    {
      title: 'Text Analyzer Webapp',
      title_link: 'http://textanalyzer.yale-thomas.com/',
      end_date: '2014',
      notes: [
        'Web app that visualizes word usage throughout long documents (think book series)',
        'First attempt at webapp personal project.',
        'Created about halfway through my last internship to test out web dev skills.',
        'Try it out by clicking on the title above^^',
        'Worked with: JS, HTML, CSS'
      ]
    },
    {
      title: 'Engineering Open House',
      start_date: '2013',
      end_date: '2014',
      notes: [
        'EOH is a school wide tech demo.',
        '2013 - Designed, helped assemble, and programmed a Ferrofluid Music Visualizer.',
        '2014 - Designed, built, and programmed a Morse Code Keyboard.',
        'Worked with: hardware, Arduino C, PureData(never again)'
      ]
    },
    {
      title: 'FIRST Robotics',
      start_date: '2006',
      end_date: '2011',
      notes: [
        'Team 1329 leader from 2008-2011',
        'Head of mechanics team.',
        'Learned how to manage a group of high school underclassmen through a large project.',
        'Worked with: hardware, java'
      ]
    },
  ],
  profileToJSX: function(infoRow) {
    var mainTitle = infoRow.title_link ? (<a href={infoRow.title_link}>{infoRow.title}</a>) : infoRow.title;
    var extraTitle = (infoRow.job_title) ? ' - ' + infoRow.job_title : null;
    var startDate = infoRow.start_date ? infoRow.start_date + ' - ' : null;
    return (
      <div key={infoRow.title + infoRow.end_date} className='info_box'>
        <div className='info_header'><div className='info_name'>{mainTitle}{extraTitle}</div><div className='info_dates'>{startDate}{infoRow.end_date}</div></div>
        <ul>
          {infoRow.notes.map(function(note) { return (<li>{note}</li>); })}
        </ul>
      </div>
    );
  },
  profileComparator: function(a, b, order) {
    if (a.end_date === 'Now') { return -1; }
    if (b.end_date === 'Now') { return 1; }
    return a.end_date < b.end_date ? 1 : -1;
  },
});
