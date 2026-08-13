/* =========================================================================
   CV  —  structured content for cv.html. Edit freely; the page re-renders.
   Publications on the CV page are pulled from data/publications.js, so you
   only maintain your paper list in one place.
   Each section below is a simple list of entries.
   ========================================================================= */

window.CV = {
  pdf: "assets/CV.pdf",
  updated: "July 2026",

  interest:
    "My research aims to integrate natural language processing, AI and education to " +
    "understand learners better. My work develops methods to capture learner understanding " +
    "and context from learner–educator interactions, and devises personalized pedagogical " +
    "approaches to bring the most educational benefit to learners through machine learning " +
    "and LLM applications.",

  /* title, org, date, and optional items[] (bullet notes) */
  education: [
    { title: "Ph.D. Candidate, School of Computing", org: "KAIST, Daejeon, South Korea",
      date: "Sep 2021 – Present", items: ["Advisor: Alice Oh"] },
    { title: "M.S., School of Computing", org: "KAIST, Daejeon, South Korea",
      date: "Mar 2020 – Aug 2021",
      items: ["Advisor: Alice Oh",
              "Thesis: Code-based question answering model and training dataset for programming education"] },
    { title: "B.S., School of Computing", org: "KAIST, Daejeon, South Korea",
      date: "Sep 2015 – Aug 2019", items: [] }
  ],

  teaching: [
    { title: "Head Teaching Assistant — Introduction to Programming (CS101)",
      org: "KAIST", date: "Spring 2021 – Present" },
    { title: "Teaching Assistant — Artificial Intelligence and Machine Learning (CS570)",
      org: "KAIST", date: "Spring 2020" },
    { title: "Teaching Assistant — Introduction to Programming (CS101)",
      org: "KAIST", date: "Fall 2018, Spring 2019, Fall 2020" }
  ],

  mentoring: [
    { title: "Research Mentor — Yen Shin", org: "", date: "Fall 2024 – Fall 2025",
      items: ["Mentorship resulted in a co-authored publication at the NeurIPS 2025 Tackling Climate Change with ML Workshop"] },
    { title: "Research Mentor — Hyungjo Bhang, Jeongin Bae", org: "", date: "Spring 2023", items: [] }
  ],

  /* grouped services: each group has a label and a list of {title, year} */
  services: [
    { group: "Organizer", items: [
      { title: "Pre-ACL International NLP Workshop at KAIST", year: "2024" }
    ]},
    { group: "Reviewer", items: [
      { title: "NeurIPS Datasets and Benchmarks", year: "2021" },
      { title: "EMNLP", year: "2021" },
      { title: "Learning@Scale", year: "2026" }
    ]},
    { group: "Volunteer", items: [
      { title: "COLING Student Volunteer", year: "2022" },
      { title: "FAccT Student Volunteer", year: "2022" },
      { title: "Festival of Learning Student Volunteer", year: "2026" },
      { title: "ICML Workshop on Human-AI Co-Creativity", year: "2026" }
    ]}
  ],

  awards: [
    { title: "Outstanding Teaching Assistant Award", org: "School of Computing, KAIST", date: "Fall 2025",
      items: ["Recognized for excellence in instructional support and course management"] },
    { title: "Graduate Scholarship", org: "KAIST", date: "Spring 2020 – Spring 2025", items: [] },
    { title: "Undergraduate Full Tuition Scholarship", org: "KAIST", date: "Fall 2015 – Spring 2019", items: [] },
    { title: "Dean's List", org: "School of Computing, KAIST", date: "Spring 2018, Fall 2018",
      items: ["Top 3% in the department"] },
    { title: "Department Valedictorian", org: "School of Computing, KAIST", date: "Spring 2018",
      items: ["Top-ranking undergraduate student in the department"] },
    { title: "LINE Scholarship", org: "LINE Corporation", date: "Fall 2017", items: [] }
  ]
};
