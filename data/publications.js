/* =========================================================================
   PUBLICATIONS  —  edit this file to add / remove / reorder papers.
   -------------------------------------------------------------------------
   Each entry:
     title    : paper title (string)
     authors  : array of author names, in order. Your own name (see ME below)
                is highlighted automatically. Add "*" for equal contribution
                (e.g. "Changyoon Lee*") — highlighting still works.
     venue    : the citation line — conference, journal, arXiv, workshop, etc.
     year     : number, used for sorting (newest first) and the year badge
     type     : "conference" | "journal" | "workshop" | "preprint"
                (controls the filter tabs)
     note     : (optional) small note under the authors, e.g. "* Equal contribution"
     award    : (optional) highlighted note, e.g. "Best Paper"
     links    : array of buttons, each { label, url }. Add as many as you like:
                { label: "PDF", url }, { label: "Code", url }, { label: "Data", url },
                { label: "arXiv", url }, { label: "Slides", url }, { label: "BibTeX", url }
   ========================================================================= */

window.ME = "Changyoon Lee";           // your name — highlighted in author lists

window.PUBLICATIONS = [
  {
    title: "ML-IAM: Emulating Integrated Assessment Models With Machine Learning",
    authors: ["Yen Shin", "Changyoon Lee", "Eunsu Kim", "Junho Myung", "Kiwoong Park",
              "Jiheun Ha", "Min-Young Choi", "Bomi Kim", "Hyun W. Ka", "Jung-Hun Woo",
              "Alice Oh", "Haewon McJeon"],
    venue: "Tackling Climate Change with ML Workshop, NeurIPS 2025",
    year: 2025,
    type: "workshop",
    links: [
      { label: "Paper", url: "https://egusphere.copernicus.org/preprints/2026/egusphere-2025-5305/egusphere-2025-5305.pdf" }
    ]
  },
  {
    title: "Learning from Teaching Assistants to Formulate Subgoals for Programming Tasks: Exploring the Potential for AI Teaching Assistants",
    authors: ["Changyoon Lee", "Junho Myung", "Jieun Han", "Jiho Jin", "Alice Oh"],
    venue: "LLM in Education Workshop (EDM 2024) · HuCLLM Workshop (ACL 2024)",
    year: 2024,
    type: "workshop",
    links: [
      { label: "Paper", url: "https://ceur-ws.org/Vol-3840/L3MNGET24_paper5.pdf" }
    ]
  },
  {
    title: "Rethinking Annotation: Can Language Learners Contribute?",
    authors: ["Haneul Yoo", "Rifki Afina Putri", "Changyoon Lee", "Youngin Lee",
              "So-Yeon Ahn", "Dongyeop Kang", "Alice Oh"],
    venue: "ACL 2023",
    year: 2023,
    type: "conference",
    links: [
      { label: "Paper", url: "https://aclanthology.org/2023.acl-long.822/" }
    ]
  },
  {
    title: "CS1QA: A Dataset for Assisting Code-based Question Answering in an Introductory Programming Course",
    authors: ["Changyoon Lee", "Seonwoo Yeon", "Alice Oh"],
    venue: "NAACL 2022",
    year: 2022,
    type: "conference",
    links: [
      { label: "Paper", url: "https://aclanthology.org/2022.naacl-main.148/" }
    ]
  },
  {
    title: "Snapstream: Snapshot-based Interaction in Live Streaming for Visual Art",
    authors: ["Saelyne Yang", "Changyoon Lee", "Hijung Valentina Shin", "Juho Kim"],
    venue: "CHI 2020",
    year: 2020,
    type: "conference",
    links: [
      { label: "Paper", url: "https://dl.acm.org/doi/10.1145/3313831.3376390" }
    ]
  },
  {
    title: "automaTA: Human-Machine Interaction for Answering Context-Specific Questions",
    authors: ["Changyoon Lee*", "Donghoon Han*", "Hyoungwook Jin*", "Alice Oh"],
    venue: "Learning at Scale (L@S) 2019",
    year: 2019,
    type: "conference",
    note: "* Equal contribution",
    links: [
      { label: "Paper", url: "https://dl.acm.org/doi/10.1145/3330430.3333658" }
    ]
  },
  {
    title: "VocaBot: Language Learning App Powered by a Conversational Agent",
    authors: ["Changyoon Lee", "Kyung Je Jo", "Juho Kim"],
    venue: "HCI Korea 2019",
    year: 2019,
    type: "conference",
    links: [
      { label: "Paper", url: "https://www.dbpia.co.kr/journal/articleDetail?nodeId=NODE08008119" }
    ]
  },

  /* ---- Preprints (type "preprint") ---- */
  {
    title: "K-BrowseComp: A Web Browsing Agent Benchmark Grounded in Korean Contexts",
    authors: ["Nahyun Lee", "Dongkeun Yoon", "Guijin Son", "Geewook Kim", "Dayoon Ko",
              "Jeonghun Park", "Haneul Yoo", "Jaewon Cho", "Junghun Park", "Changyoon Lee",
              "Kyochul Jang", "Jaeyeon Kim", "Eunsu Kim", "Woojin Cho", "Seungone Kim"],
    venue: "arXiv preprint",
    year: 2026,
    type: "preprint",
    links: [
      { label: "arXiv", url: "https://arxiv.org/abs/2606.02404" }
    ]
  }
];
