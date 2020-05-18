const books =[
  { id:11111,
    name: 'Grokking Algorithms: An illustrated guide for programmers and other curious people',
    author: 'Aditya Bhargava',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51cV560hqBL._SX396_BO1,204,203,200_.jpg',
    plot: 'Grokking Algorithms is a fully illustrated, friendly guide that teaches you how to apply common ' +
      'algorithms to the practical problems you face every day as a programmer. You\'ll start with sorting and ' +
      ' you build up your skills in thinking algorithmically, you\'ll tackle more complex concerns such as data ' +
      'searching and, as compression and artificial intelligence. Each carefully presented example includes helpful  ' +
      'diagrams and fully annotated code samples in Python.'
},
  { id:22222,
    name: 'Eloquent JavaScript, 3rd Edition: A Modern Introduction to Programming',
    author: 'Marijn Haverbeke',
    image: 'https://m.media-amazon.com/images/I/51-5ZXYtcML.jpg',
    plot: 'Completely revised and updated, this best-selling introduction to programming in JavaScript focuses on ' +
      'writing real applications.'
  },
  { id:33333,
    name: 'Cracking the Coding Interview: 189 Programming Questions and Solutions',
    author: 'Gayle Laakmann McDowell',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51l5XzLln+L._SX348_BO1,204,203,200_.jpg',
    plot: 'I am not a recruiter. I am a software engineer. And as such, I know what it\'s like to be asked to whip ' +
      'up brilliant algorithms on the spot and then write flawless code on a whiteboard. I\'ve been through this as ' +
      'a candidate and as an interviewer.'
  }
];
localStorage.setItem('booksList',JSON.stringify(books));
