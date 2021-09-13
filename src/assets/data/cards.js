export const cardsReact = [
  {
    question: "Cakes",
    cards: [
      {
        number: "A",
        question: "Keys",
        value: true,
        revealed: false,
        picked: false,
      },
    ],
  },
  {
    question: "Cupcakes",
    cards: [
      {
        number: "A",
        question: "True",
        value: true,
        revealed: false,
        picked: false,
      },
    ],
  },
];

const cardsAgile = [
  {
    question: "Beer",
    cardsAmount: 31,
    author: "Ewa",
    type: "Agile Basics",
    cards: [
      {
        number: "A",
        question: "When the Sprint Goal becomes obsolete",
        value: true,
        revealed: false,
        picked: false,
      },
      {
        number: "B",
        question: "When the sales department has an important new opportunity",
        value: false,
        revealed: false,
        picked: false,
      },
    ],
  },
  {
    question: "Wines",
    cards: [
      {
        number: "A",
        question: "The Development Team and Scrum Master",
        value: true,
        revealed: false,
        picked: false,
      },
      {
        number: "B",
        question: "The Scrum Master and Product Owner",
        value: false,
        revealed: false,
        picked: false,
      },
      {
        number: "C",
        question: "The Development Team",
        value: false,
        revealed: false,
        picked: false,
      },
    ],
  },
 
];

const cardsDesign = [
  {
    question: "Tops",
    type: "selec",
    cards: [
      {
        number: "XL",
        question: "Extra Large",
        value: true,
        revealed: false,
        picked: false,
      },
      {
        number: "L",
        question: "Large",
        value: true,
        revealed: false,
        picked: false,
      },
      {
        number: "MD",
        question: "Medium",
        value: true,
        revealed: false,
        picked: false,
      },
      {
        number: "SM",
        question: "No",
        value: true,
        revealed: false,
        picked: false,
      },
    ],
  },
  {
    question: "Hats",
    cards: [
      {
        number: "Y",
        question: "Yellow",
        value: true,
        revealed: false,
        picked: false,
      },
      {
        number: "G",
        question: "Green",
        value: true,
        revealed: false,
        picked: false,
      },
    ],
  },
  {
    question: "Scarfs",
    cards: [
      {
        number: "16",
        question: "16GB",
        value: true,
        revealed: false,
        picked: false,
      },
      {
        number: "32",
        question: "32GB",
        value: true,
        revealed: false,
        picked: false,
      },
    ],
  },
];

const Brandon = {
  id: "1128349857",
  cardsAmount: 10,
  author: "Fifi's",
  type: "Favorites",
  label: "Custom crochet",
  cards: cardsDesign,
  color: "rgb(78,15,255)",
  labelColor: "rgb(89,80,249)",
  image:
    "https://i0.wp.com/www.anniedesigncrochet.com/wp-content/uploads/2019/08/20190808_100156.jpg?fit=3456%2C3456&ssl=1",
  about:
    "Coffee buff. Web enthusiast. Unapologetic student. Gamer. Avid organizer.",
};

const Ewa = {
  id: "3832934409",
  cardsAmount: 31,
  author: "Ewa",
  type: "Discover",
  label: "Brenwise Wimnes",
  cards: cardsAgile,
  color: "rgb(138,85,192)",
  labelColor: "rgb(163,109,217)",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg",

  about:
    "Wannabe entrepreneur. Reader. Devoted organizer. Social media lover. Analyst.",
};

const Jennifer = {
  id: "2849503859",
  cardsAmount: 16,
  author: "Melly's treats",
  type: "Categories",
  label: "Cakes and pastry",
  cards: cardsReact,
  color: "rgb(255,94,107)",
  labelColor: "rgb(255,130,140)",
  image:
    "https://upload.wikimedia.org/wikipedia/commons/0/04/Pound_layer_cake.jpg",
  about: "Web nerd. Alcohol trailblazer. Organizer. Hipster-friendly explorer.",
};

export { Brandon, Ewa, Jennifer };
