var React = require('react');
module.exports = Object.freeze({
  // Profile stuff, array of string paragraphs
  profile: [
    "I am a front end software engineer on Rdio's web team. Getting to this point has been an interesting journey. I was 3/4 of the way through a MatSE degree at UIUC when I decided to drop out and take the job Rdio offered me near the end of my internship.",
    "I entered MatSE with the intention of studying/making low level simulations of materials to predict behavior, but I became fascinated with the ways materials science has influenced some algorithmic design. Simulated annealing is so called because it takes inspiration from the way a phase transition plays out in cooling glass. That apparently simple physical process of cooling will always come up with a good-enough solution to the incredibly complex problem of arranging moles of atoms into a semi-crystalline structure.",
    "I decided to drop out of school for many reasons, but there are two big ones. First off, I took a serious look at the job market for MatSE students and realized that the jobs I was interested in required at least a masters degree, and I was not up for that much more school. Second, I want to continue to learn to be a software engineer, and I would not have been able to take any more CS classes if I wanted to graduate on time. I didn't want to leave such a fertile learning environment, I improved my programming abilities more during my internship at Rdio than in 3 years of classes."
  ],

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