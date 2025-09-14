const menuItems = [
  // Eelroad
  {
    id: 1,
    category: 'starter',
    price: 6,
    name: {
      et: 'Caesari salat',
      en: 'Caesar Salad',
      ru: 'Салат Цезарь',
    },
    description: {
      et: '(Kana, rooma salat, parmesani juust, krutoonid)',
      en: '(Chicken, romaine lettuce, parmesan cheese, croutons)',
      ru: '(Курица, римский салат, пармезан, сухарики)',
    },
  },
  {
    id: 2,
    category: 'starter',
    price: 5,
    name: {
      et: 'Seljanka supp',
      en: 'Solyanka Soup',
      ru: 'Суп солянка',
    },
    description: {
      et: '(Lihatükid, hapukurk, tomatipasta, sibul, oliivid)',
      en: '(Meat pieces, pickles, tomato paste, onion, olives)',
      ru: '(Мясо, солёный огурец, томатная паста, лук, оливки)',
    },
  },

  // Pearoad
  {
    id: 3,
    category: 'main',
    price: 10,
    name: {
      et: 'Pizza',
      en: 'Pizza',
      ru: 'Пицца',
    },
    description: {
      et: '(Tomatikaste, mozzarella, pepperoni)',
      en: '(Tomato sauce, mozzarella, pepperoni)',
      ru: '(Томатный соус, моцарелла, пепперони)',
    },
  },
  {
    id: 4,
    category: 'main',
    price: 7,
    name: {
      et: 'Burger',
      en: 'Burger',
      ru: 'Бургер',
    },
    description: {
      et: '(Veiselihapihv, cheddar, salat, tomat, kaste)',
      en: '(Beef patty, cheddar, lettuce, tomato, sauce)',
      ru: '(Говяжья котлета, чеддер, салат, томат, соус)',
    },
  },
  {
    id: 5,
    category: 'main',
    price: 8,
    name: {
      et: 'Pasta',
      en: 'Pasta',
      ru: 'Паста',
    },
    description: {
      et: '(Penne, koorene kastmes, kana, juust)',
      en: '(Penne, creamy sauce, chicken, cheese)',
      ru: '(Пенне, сливочный соус, курица, сыр)',
    },
  },
  {
    id: 6,
    category: 'main',
    price: 6,
    name: {
      et: 'Pelmeenid',
      en: 'Dumplings',
      ru: 'Пельмени',
    },
    description: {
      et: '(Hakkliha, tainas, hapukoor kõrvale)',
      en: '(Minced meat, dough, served with sour cream)',
      ru: '(Фарш, тесто, со сметаной)',
    },
  },
  {
    id: 7,
    category: 'main',
    price: 7,
    name: {
      et: 'Vegan Wrap',
      en: 'Vegan Wrap',
      ru: 'Веганский ролл',
    },
    description: {
      et: '(Falafel, hummus, tomat, salat, lavašš)',
      en: '(Falafel, hummus, tomato, lettuce, lavash)',
      ru: '(Фалафель, хумус, помидор, салат, лаваш)',
    },
  },
  {
    id: 8,
    category: 'main',
    price: 12,
    name: {
      et: 'Sushi Kombo',
      en: 'Sushi Combo',
      ru: 'Суши Комбо',
    },
    description: {
      et: '(Lõhe, kurk, avokaado, riis, norileht)',
      en: '(Salmon, cucumber, avocado, rice, nori)',
      ru: '(Лосось, огурец, авокадо, рис, нори)',
    },
  },

  // Magustoidud
  {
    id: 9,
    category: 'dessert',
    price: 4,
    name: {
      et: 'Õunapirukas',
      en: 'Apple Pie',
      ru: 'Яблочный пирог',
    },
    description: {
      et: '(Õunad, kaneel, suhkur, lehttainas)',
      en: '(Apples, cinnamon, sugar, puff pastry)',
      ru: '(Яблоки, корица, сахар, слоёное тесто)',
    },
  },
  {
    id: 10,
    category: 'dessert',
    price: 4,
    name: {
      et: 'Šokolaadikook',
      en: 'Chocolate Cake',
      ru: 'Шоколадный торт',
    },
    description: {
      et: '(Tume šokolaad, jahu, muna, või, suhkur)',
      en: '(Dark chocolate, flour, eggs, butter, sugar)',
      ru: '(Тёмный шоколад, мука, яйца, масло, сахар)',
    },
  },

  // Joogid
  {
    id: 11,
    category: 'drink',
    price: 2,
    name: {
      et: 'Kohv',
      en: 'Coffee',
      ru: 'Кофе',
    },
    description: {
      et: '(Must kohv, valikuline piim või suhkur)',
      en: '(Black coffee, optional milk or sugar)',
      ru: '(Чёрный кофе, по желанию молоко или сахар)',
    },
  },
  {
    id: 12,
    category: 'drink',
    price: 3,
    name: {
      et: 'Latte',
      en: 'Latte',
      ru: 'Латте',
    },
    description: {
      et: '(Espresso, aurutatud piim, vaht)',
      en: '(Espresso, steamed milk, foam)',
      ru: '(Эспрессо, парное молоко, пена)',
    },
  },
  {
    id: 13,
    category: 'drink',
    price: 2,
    name: {
      et: 'Coca-Cola',
      en: 'Coca-Cola',
      ru: 'Кока-Кола',
    },
    description: {
      et: '(Karastusjook, 330ml purk)',
      en: '(Soft drink, 330ml can)',
      ru: '(Газированный напиток, банка 330мл)',
    },
  },
  {
    id: 14,
    category: 'drink',
    price: 2,
    name: {
      et: 'Apelsinimahl',
      en: 'Orange Juice',
      ru: 'Апельсиновый сок',
    },
    description: {
      et: '(100% apelsinimahl, ilma lisatud suhkruta)',
      en: '(100% orange juice, no added sugar)',
      ru: '(100% апельсиновый сок, без добавленного сахара)',
    },
  },
  {
    id: 15,
    category: 'drink',
    price: 1,
    name: {
      et: 'Vesi',
      en: 'Water',
      ru: 'Вода',
    },
    description: {
      et: '(Allikavesi, 500ml pudel)',
      en: '(Spring water, 500ml bottle)',
      ru: '(Родниковая вода, бутылка 500мл)',
    },
  },
];

export default menuItems;
