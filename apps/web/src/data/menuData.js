export const categories = [
  'Baked Rolls Menu',
  'Domburi Menu',
  'Gunkan Sushi Menu',
  'Hot Rolls Menu',
  'Maki Rolls Menu',
  'Special Rolls Menu',
  'Nigiri Menu',
  'No Raw Fish Menu',
  'No Spicy Sushi Menu',
  'Noodles Menu',
  'Norwegian Salmon Menu',
  'Onigiri Menu',
  'Philadelphia Menu',
  'Poke Bowl Menu',
  'Roll Menu (Full List)',
  'Salad Menu',
  'Sauce Menu'
];

export const categoryTranslationKeys = {
  'Baked Rolls Menu': 'BAKED_ROLLS',
  'Domburi Menu': 'DOMBURI',
  'Gunkan Sushi Menu': 'GUNKAN',
  'Hot Rolls Menu': 'HOT_ROLLS',
  'Maki Rolls Menu': 'MAKI',
  'Special Rolls Menu': 'SPECIAL_ROLLS',
  'Nigiri Menu': 'NIGIRI',
  'No Raw Fish Menu': 'NO_RAW_FISH',
  'No Spicy Sushi Menu': 'NO_SPICY',
  'Noodles Menu': 'NOODLES',
  'Norwegian Salmon Menu': 'NORWEGIAN_SALMON',
  'Onigiri Menu': 'ONIGIRI',
  'Philadelphia Menu': 'PHILADELPHIA',
  'Poke Bowl Menu': 'POKE_BOWL',
  'Roll Menu (Full List)': 'ROLLS',
  'Salad Menu': 'SALAD',
  'Sauce Menu': 'SAUCES'
};

export const getCategoryTranslationKey = (category) => categoryTranslationKeys[category] || category;

const getDesc = (name) => ({
  en: "Delicious and freshly prepared with premium ingredients.",
  ka: "უგემრიელესი და ახლად მომზადებული პრემიუმ ინგრედიენტებით.",
  ru: "Вкусные и свежеприготовленные из премиальных ингредиентов."
});

const getName = (name) => ({
  en: name,
  ka: name,
  ru: name
});

export const menuItems = [
  // BAKED ROLLS MENU
  { id: 1, name: getName('Baked Chicken Roll'), description: getDesc(), price: 25, category: 'Baked Rolls Menu', image: '/images/baked%20chicken%20.jpg' },
  { id: 2, name: getName('Baked Shrimp Roll'), description: getDesc(), price: 33, category: 'Baked Rolls Menu', image: '/images/baked%20shrimp.jpg' },
  { id: 3, name: getName('Baked Roll with Eel'), description: getDesc(), price: 33, category: 'Baked Rolls Menu', image: '/images/baked%20unagi.jpg' },
  { id: 4, name: getName('Baked Salmon Roll'), description: getDesc(), price: 33, category: 'Baked Rolls Menu', image: '/images/baked%20salmon.jpg' },

  // DOMBURI MENU
  { id: 5, name: getName('Domburi with Shrimp'), description: getDesc(), price: 36, category: 'Domburi Menu', image: '/images/domburi%20shrimp.jpg' },
  { id: 6, name: getName('Domburi with Chicken'), description: getDesc(), price: 32, category: 'Domburi Menu', image: '/images/domburi%20chicken%20.jpg' },

  // GUNKAN SUSHI MENU
  { id: 7, name: getName('Gunkan with Red Caviar'), description: getDesc(), price: 10, category: 'Gunkan Sushi Menu', image: '/images/Gunkan with Red Caviar.png' },
  { id: 8, name: getName('Gunkan with Spicy Unagi'), description: getDesc(), price: 9, category: 'Gunkan Sushi Menu', image: '/images/gunkan%20unagi.jpg' },
  { id: 9, name: getName('Gunkan with Spicy Salmon'), description: getDesc(), price: 10, category: 'Gunkan Sushi Menu', image: '/images/gunkan%20salmon.jpg' },
  { id: 10, name: getName('Gunkan with Spicy Shrimp'), description: getDesc(), price: 9, category: 'Gunkan Sushi Menu', image: '/images/gunkan%20shrimp.jpg' },

  // HOT ROLLS MENU
  { id: 11, name: getName('Roll "Hot Dog" with Crab'), description: getDesc(), price: 30, category: 'Hot Rolls Menu', image: '/images/hot%20dog%20roll%20crab.jpg' },
  { id: 12, name: getName('Roll "Hot Dog Mix" with Fried Salmon and Crab'), description: getDesc(), price: 33, category: 'Hot Rolls Menu', image: '/images/hot%20dog%20roll%20mix.jpg' },
  { id: 13, name: getName('Roll "Hot Dog" with Fried Salmon'), description: getDesc(), price: 35, category: 'Hot Rolls Menu', image: '/images/hot%20dog%20roll%20salmon.jpg' },
  { id: 14, name: getName('Hot Set – 4 Tempura Rolls'), description: getDesc(), price: 32, category: 'Hot Rolls Menu', image: '/images/set%20hot%20rolls.jpg' },
  { id: 15, name: getName('Roll "Sandwich" with Salmon and Unagi'), description: getDesc(), price: 40, category: 'Hot Rolls Menu', image: '/images/sandwich%20roll.jpg' },
  { id: 16, name: getName('Hot Roll "California" with Crab'), description: getDesc(), price: 33, category: 'Hot Rolls Menu', image: '/images/hot%20roll%20crab.jpg' },
  { id: 17, name: getName('Hot Roll with Unagi'), description: getDesc(), price: 35, category: 'Hot Rolls Menu', image: '/images/hot%20roll%20unagi.jpg' },
  { id: 18, name: getName('Hot Roll with Shrimp'), description: getDesc(), price: 33, category: 'Hot Rolls Menu', image: '/images/hot%20roll%20shrimp.jpg' },

  // MAKI ROLLS MENU
  { id: 19, name: getName('Maki with Avocado'), description: getDesc(), price: 8, category: 'Maki Rolls Menu', image: '/images/maki%20avocado.jpg' },
  { id: 20, name: getName('Maki with Unagi'), description: getDesc(), price: 16, category: 'Maki Rolls Menu', image: '/images/maki%20unagi.jpg' },
  { id: 21, name: getName('Maki with Salmon'), description: getDesc(), price: 11, category: 'Maki Rolls Menu', image: '/images/maki%20salmon.jpg' },
  { id: 22, name: getName('Maki with Cucumber'), description: getDesc(), price: 6, category: 'Maki Rolls Menu', image: '/images/maki%20cucumber.jpg' },
  { id: 23, name: getName('Maki with Shrimp'), description: getDesc(), price: 13, category: 'Maki Rolls Menu', image: '/images/maki%20shrimp%20.jpg' },
  { id: 24, name: getName('Maki with Takuan'), description: getDesc(), price: 6, category: 'Maki Rolls Menu', image: '/images/maki%20takuan.jpg' },

  // SPECIAL ROLLS MENU
  { id: 25, name: getName('Roll with Fried Salmon "Bonito"'), description: getDesc(), price: 26, category: 'Special Rolls Menu', image: '/images/bonito%20fried%20salmon.jpg' },
  { id: 26, name: getName('Roll "Hot Dog Mix" with Fried Salmon and Crab'), description: getDesc(), price: 33, category: 'Special Rolls Menu', image: '/images/hot%20dog%20roll%20mix.jpg' },
  { id: 27, name: getName('Roll "Hot Dog" with Crab'), description: getDesc(), price: 30, category: 'Special Rolls Menu', image: '/images/hot%20dog%20roll%20crab.jpg' },
  { id: 28, name: getName('Roll "Hot Dog" with Fried Salmon'), description: getDesc(), price: 35, category: 'Special Rolls Menu', image: '/images/hot%20dog%20roll%20salmon.jpg' },
  { id: 29, name: getName('Cheesy Fried Salmon Roll'), description: getDesc(), price: 26, category: 'Special Rolls Menu', image: '/images/cheesy%20roll.jpg' },
  { id: 30, name: getName('Philadelphia with Fried Salmon'), description: getDesc(), price: 35, category: 'Special Rolls Menu', image: '/images/philadelphia%20fried%20salmon.jpg' },

  // NIGIRI MENU
  { id: 31, name: getName('Nigiri Tamago'), description: getDesc(), price: 6, category: 'Nigiri Menu', image: '/images/nigiri%20tomago.jpg' },
  { id: 32, name: getName('Nigiri with Unagi'), description: getDesc(), price: 9, category: 'Nigiri Menu', image: '/images/nigiri%20unagi.jpg' },
  { id: 33, name: getName('Nigiri with Shrimp'), description: getDesc(), price: 8, category: 'Nigiri Menu', image: '/images/nigiri%20shrimp.jpg' },
  { id: 34, name: getName('Nigiri with Salmon'), description: getDesc(), price: 8, category: 'Nigiri Menu', image: '/images/nigiri%20salmon%20.jpg' },

  // NO RAW FISH MENU
  { id: 35, name: getName('Roll "Hot Dog" with Crab'), description: getDesc(), price: 30, category: 'No Raw Fish Menu', image: '/images/hot%20dog%20roll%20crab.jpg' },
  { id: 36, name: getName('Roll "Hot Dog" with Fried Salmon'), description: getDesc(), price: 35, category: 'No Raw Fish Menu', image: '/images/hot%20dog%20roll%20salmon.jpg' },
  { id: 37, name: getName('Roll "Hot Dog Mix" with Fried Salmon and Crab'), description: getDesc(), price: 33, category: 'No Raw Fish Menu', image: '/images/hot%20dog%20roll%20mix.jpg' },
  { id: 38, name: getName('Roll with Fried Salmon "Bonito"'), description: getDesc(), price: 26, category: 'No Raw Fish Menu', image: '/images/bonito%20fried%20salmon.jpg' },
  { id: 39, name: getName('Cheesy Fried Salmon Roll'), description: getDesc(), price: 26, category: 'No Raw Fish Menu', image: '/images/cheesy%20roll.jpg' },
  { id: 40, name: getName('"Alaska" Shrimp Roll'), description: getDesc(), price: 38, category: 'No Raw Fish Menu', image: '/images/alaska%20roll.jpg' },
  { id: 41, name: getName('Baked Shrimp Roll'), description: getDesc(), price: 33, category: 'No Raw Fish Menu', image: '/images/baked%20shrimp.jpg' },
  { id: 42, name: getName('Combo Shrimp'), description: getDesc(), price: 34, category: 'No Raw Fish Menu', image: '/images/combo%20shrimp.jpg' },
  { id: 43, name: getName('Donburi with Shrimps'), description: getDesc(), price: 36, category: 'No Raw Fish Menu', image: '/images/domburi%20shrimp.jpg' },
  { id: 44, name: getName('Hot Roll with Shrimp'), description: getDesc(), price: 30, category: 'No Raw Fish Menu', image: '/images/hot%20roll%20shrimp.jpg' },
  { id: 45, name: getName('Baked Chicken Roll'), description: getDesc(), price: 25, category: 'No Raw Fish Menu', image: '/images/baked%20chicken%20.jpg' },
  { id: 46, name: getName('Chicken Roll'), description: getDesc(), price: 28, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1664739531822-03f1f38f96e7' },

  // NO SPICY SUSHI MENU
  { id: 47, name: getName('Baked Roll with Eel'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: '/images/baked%20unagi.jpg' },
  { id: 48, name: getName('Baked Salmon Roll'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: '/images/baked%20salmon.jpg' },
  { id: 49, name: getName('Noodles with Shrimps'), description: getDesc(), price: 28, category: 'No Spicy Sushi Menu', image: '/images/noodles%20shrimp.jpg' },
  { id: 50, name: getName('Tofu Noodles'), description: getDesc(), price: 22, category: 'No Spicy Sushi Menu', image: '/images/noodles%20tofu.jpg' },
  { id: 51, name: getName('Chicken Noodles'), description: getDesc(), price: 20, category: 'No Spicy Sushi Menu', image: '/images/noodles%20chicken.jpg' },
  { id: 52, name: getName('Poke Bowl with Chicken'), description: getDesc(), price: 25, category: 'No Spicy Sushi Menu', image: '/images/Poke%20Bowl%20with%20Chicken.png' },
  { id: 53, name: getName('Poke Bowl with Shrimp'), description: getDesc(), price: 35, category: 'No Spicy Sushi Menu', image: '/images/Poke%20Bowl%20with%20Shrimp.png' },
  { id: 54, name: getName('Poke Bowl with Salmon'), description: getDesc(), price: 31, category: 'No Spicy Sushi Menu', image: '/images/Poke%20Bowl%20with%20Salmon.png' },
  { id: 55, name: getName('Hot Roll "California" with Crab'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: '/images/hot%20roll%20crab.jpg' },
  { id: 56, name: getName('Hot Roll with Shrimp'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: '/images/hot%20roll%20shrimp.jpg' },
  { id: 57, name: getName('Hot Roll with Unagi'), description: getDesc(), price: 35, category: 'No Spicy Sushi Menu', image: '/images/hot%20roll%20unagi.jpg' },
  { id: 58, name: getName('Nigiri with Unagi'), description: getDesc(), price: 9, category: 'No Spicy Sushi Menu', image: '/images/nigiri%20unagi.jpg' },
  { id: 59, name: getName('Nigiri with Shrimp'), description: getDesc(), price: 8, category: 'No Spicy Sushi Menu', image: '/images/nigiri%20shrimp.jpg' },
  { id: 60, name: getName('Nigiri with Salmon'), description: getDesc(), price: 8, category: 'No Spicy Sushi Menu', image: '/images/nigiri%20salmon%20.jpg' },
  { id: 61, name: getName('Maki with Avocado'), description: getDesc(), price: 8, category: 'No Spicy Sushi Menu', image: '/images/maki%20avocado.jpg' },
  { id: 62, name: getName('Maki with Unagi'), description: getDesc(), price: 16, category: 'No Spicy Sushi Menu', image: '/images/maki%20unagi.jpg' },
  { id: 63, name: getName('Maki with Salmon'), description: getDesc(), price: 11, category: 'No Spicy Sushi Menu', image: '/images/maki%20salmon.jpg' },
  { id: 64, name: getName('Maki with Cucumber'), description: getDesc(), price: 6, category: 'No Spicy Sushi Menu', image: '/images/maki%20cucumber.jpg' },
  { id: 65, name: getName('Maki with Shrimp'), description: getDesc(), price: 13, category: 'No Spicy Sushi Menu', image: '/images/maki%20shrimp%20.jpg' },
  { id: 66, name: getName('Maki with Takuan'), description: getDesc(), price: 6, category: 'No Spicy Sushi Menu', image: '/images/maki%20takuan.jpg' },
  { id: 67, name: getName('Hot Roll Salmon'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: '/images/hot%20roll%20salmon.jpg' },
  { id: 68, name: getName('California Roll with Salmon'), description: getDesc(), price: 30, category: 'No Spicy Sushi Menu', image: '/images/california%20salmon.jpg' },
  { id: 69, name: getName('California Roll with Crab'), description: getDesc(), price: 26, category: 'No Spicy Sushi Menu', image: '/images/california%20crab.jpg' },
  { id: 70, name: getName('Roll Philadelphia'), description: getDesc(), price: 34, category: 'No Spicy Sushi Menu', image: '/images/philadelphia.jpg' },
  { id: 71, name: getName('Philadelphia Luxury Roll'), description: getDesc(), price: 42, category: 'No Spicy Sushi Menu', image: '/images/philadelphia%20lux.jpg' },
  { id: 72, name: getName('Chicken Roll'), description: getDesc(), price: 23, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1679279727888-7f39dd520b8b' },
  { id: 73, name: getName('Alaska Shrimp Roll'), description: getDesc(), price: 38, category: 'No Spicy Sushi Menu', image: '/images/alaska%20roll.jpg' },
  { id: 74, name: getName('Shrimp Tempura Roll'), description: getDesc(), price: 25, category: 'No Spicy Sushi Menu', image: '/images/shrimp%20tempura%20roll.jpg' },
  { id: 75, name: getName('Unagi Roll'), description: getDesc(), price: 40, category: 'No Spicy Sushi Menu', image: '/images/unagi%20roll.jpg' },
  { id: 76, name: getName('Wakame Salad'), description: getDesc(), price: 13, category: 'No Spicy Sushi Menu', image: '/images/Wakame%20salad.jpg' },
  { id: 77, name: getName('Domburi with Shrimps'), description: getDesc(), price: 36, category: 'No Spicy Sushi Menu', image: '/images/domburi%20shrimp.jpg' },
  { id: 78, name: getName('Domburi with Chicken'), description: getDesc(), price: 32, category: 'No Spicy Sushi Menu', image: '/images/domburi%20chicken%20.jpg' },

  // NOODLES MENU
  { id: 79, name: getName('Noodle Lunch'), description: getDesc(), price: 42, category: 'Noodles Menu', image: '/images/noodels%20lunch.jpg' },
  { id: 80, name: getName('Noodles with Shrimps'), description: getDesc(), price: 28, category: 'Noodles Menu', image: '/images/noodles%20shrimp.jpg' },
  { id: 81, name: getName('Tofu Noodles'), description: getDesc(), price: 22, category: 'Noodles Menu', image: '/images/noodles%20tofu.jpg' },
  { id: 82, name: getName('Chicken Noodles'), description: getDesc(), price: 20, category: 'Noodles Menu', image: '/images/noodles%20chicken.jpg' },

  // NORWEGIAN SALMON MENU
  { id: 83, name: getName('Citrus Salted Norwegian Salmon (200g)'), description: getDesc(), price: 30, category: 'Norwegian Salmon Menu', image: 'https://images.unsplash.com/photo-1608731002187-d3448d224d18' },
  { id: 84, name: getName('Salted Norwegian Salmon (200g)'), description: getDesc(), price: 30, category: 'Norwegian Salmon Menu', image: 'https://images.unsplash.com/photo-1697122334427-833eaf1799b9' },

  // ONIGIRI MENU
  { id: 85, name: getName('Onigiri Set'), description: getDesc(), price: 50, category: 'Onigiri Menu', image: '/images/set%20onigiri.jpg' },
  { id: 86, name: getName('Onigiri Shrimp'), description: getDesc(), price: 10, category: 'Onigiri Menu', image: '/images/onigiri%20shrimp.jpg' },
  { id: 87, name: getName('Onigiri Salmon'), description: getDesc(), price: 10, category: 'Onigiri Menu', image: '/images/onigiri%20salmon.jpg' },
  { id: 88, name: getName('Onigiri Unagi'), description: getDesc(), price: 11, category: 'Onigiri Menu', image: '/images/onigiri%20unagi.jpg' },
  { id: 89, name: getName('Onigiri Crab'), description: getDesc(), price: 8, category: 'Onigiri Menu', image: '/images/onigiri%20crab.jpg' },

  // PHILADELPHIA MENU
  { id: 90, name: getName('Philadelphia Luxury Roll'), description: getDesc(), price: 42, category: 'Philadelphia Menu', image: '/images/philadelphia%20lux.jpg' },
  { id: 91, name: getName('Philadelphia Shrimp'), description: getDesc(), price: 34, category: 'Philadelphia Menu', image: '/images/philadelrhia%20shrimp.jpg' },
  { id: 92, name: getName('Philadelphia with Fried Salmon'), description: getDesc(), price: 35, category: 'Philadelphia Menu', image: '/images/philadelphia%20fried%20salmon.jpg' },
  { id: 93, name: getName('Roll Philadelphia'), description: getDesc(), price: 34, category: 'Philadelphia Menu', image: '/images/philadelphia.jpg' },

  // POKE BOWL MENU
  { id: 94, name: getName('Poke Bowl with Chicken'), description: getDesc(), price: 25, category: 'Poke Bowl Menu', image: '/images/Poke%20Bowl%20with%20Chicken.png' },
  { id: 95, name: getName('Poke Bowl with Salmon'), description: getDesc(), price: 31, category: 'Poke Bowl Menu', image: '/images/Poke%20Bowl%20with%20Salmon.png' },
  { id: 96, name: getName('Poke Bowl with Shrimp'), description: getDesc(), price: 35, category: 'Poke Bowl Menu', image: '/images/Poke%20Bowl%20with%20Shrimp.png' },

  // ROLL MENU (FULL LIST)
  { id: 97, name: getName('Roll "Snow Crab"'), description: getDesc(), price: 20, category: 'Roll Menu (Full List)', image: '/images/crab%20roll.jpg' },
  { id: 98, name: getName('Roll "Hot Dog" with Crab'), description: getDesc(), price: 30, category: 'Roll Menu (Full List)', image: '/images/hot%20dog%20roll%20crab.jpg' },
  { id: 99, name: getName('Roll "Hot Dog Mix" with Fried Salmon and Crab'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/hot%20dog%20roll%20mix.jpg' },
  { id: 100, name: getName('Roll "Hot Dog" with Fried Salmon'), description: getDesc(), price: 35, category: 'Roll Menu (Full List)', image: '/images/hot%20dog%20roll%20salmon.jpg' },
  { id: 101, name: getName('Roll with Fried Salmon "Bonito"'), description: getDesc(), price: 26, category: 'Roll Menu (Full List)', image: '/images/bonito%20fried%20salmon.jpg' },
  { id: 102, name: getName('Cheesy Fried Salmon'), description: getDesc(), price: 26, category: 'Roll Menu (Full List)', image: '/images/cheesy%20roll.jpg' },
  { id: 103, name: getName('Philadelphia with Fried Salmon'), description: getDesc(), price: 35, category: 'Roll Menu (Full List)', image: '/images/philadelphia%20fried%20salmon.jpg' },
  { id: 104, name: getName('Philadelphia Shrimp'), description: getDesc(), price: 34, category: 'Roll Menu (Full List)', image: '/images/philadelrhia%20shrimp.jpg' },
  { id: 105, name: getName('Baked Chicken Roll'), description: getDesc(), price: 25, category: 'Roll Menu (Full List)', image: '/images/baked%20chicken%20.jpg' },
  { id: 106, name: getName('Baked Shrimp Roll'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/baked%20shrimp.jpg' },
  { id: 107, name: getName('Baked Roll with Eel'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/baked%20unagi.jpg' },
  { id: 108, name: getName('Baked Salmon Roll'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/baked%20salmon.jpg' },
  { id: 109, name: getName('Rainbow Roll'), description: getDesc(), price: 36, category: 'Roll Menu (Full List)', image: '/images/rainbow%20roll.jpg' },
  { id: 110, name: getName('Roll Canada'), description: getDesc(), price: 38, category: 'Roll Menu (Full List)', image: '/images/canada%20roll.jpg' },
  { id: 111, name: getName('Hot Set – 4 Tempura Rolls'), description: getDesc(), price: 132, category: 'Roll Menu (Full List)', image: '/images/set%20hot%20rolls.jpg' },
  { id: 112, name: getName('Roll "Sandwich" with Salmon and Unagi'), description: getDesc(), price: 40, category: 'Roll Menu (Full List)', image: '/images/sandwich%20roll.jpg' },
  { id: 113, name: getName('Hot Roll "California" with Crab'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/hot%20roll%20crab.jpg' },
  { id: 114, name: getName('Hot Roll with Unagi'), description: getDesc(), price: 35, category: 'Roll Menu (Full List)', image: '/images/hot%20roll%20unagi.jpg' },
  { id: 115, name: getName('Hot Roll with Shrimp'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/hot%20roll%20shrimp.jpg' },
  { id: 116, name: getName('Philadelphia Luxury Roll'), description: getDesc(), price: 42, category: 'Roll Menu (Full List)', image: '/images/philadelphia%20lux.jpg' },
  { id: 117, name: getName('Roll Philadelphia'), description: getDesc(), price: 34, category: 'Roll Menu (Full List)', image: '/images/philadelphia.jpg' },
  { id: 118, name: getName('California Roll with Crab'), description: getDesc(), price: 26, category: 'Roll Menu (Full List)', image: '/images/california%20crab.jpg' },
  { id: 119, name: getName('California Roll with Salmon'), description: getDesc(), price: 30, category: 'Roll Menu (Full List)', image: '/images/california%20salmon.jpg' },
  { id: 120, name: getName('Salmon Roll'), description: getDesc(), price: 36, category: 'Roll Menu (Full List)', image: '/images/salmon%20roll.jpg' },
  { id: 121, name: getName('Chicken Roll'), description: getDesc(), price: 23, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1691851684721-add6c86bc69d' },
  { id: 122, name: getName('Alaska Shrimp Roll'), description: getDesc(), price: 38, category: 'Roll Menu (Full List)', image: '/images/alaska%20roll.jpg' },
  { id: 123, name: getName('Vegetarian Roll'), description: getDesc(), price: 18, category: 'Roll Menu (Full List)', image: '/images/vegan%20roll.jpg' },
  { id: 124, name: getName('Hot Roll Salmon'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/hot%20roll%20salmon.jpg' },
  { id: 125, name: getName('Shrimp Tempura Roll'), description: getDesc(), price: 25, category: 'Roll Menu (Full List)', image: '/images/shrimp%20tempura%20roll.jpg' },
  { id: 126, name: getName('Unagi Roll'), description: getDesc(), price: 40, category: 'Roll Menu (Full List)', image: '/images/unagi%20roll.jpg' },

  // SALAD MENU
  { id: 127, name: getName('Wakame Salad'), description: getDesc(), price: 13, category: 'Salad Menu', image: '/images/Wakame%20salad.jpg' },
  { id: 128, name: getName('Spicy Kimchi Salad'), description: getDesc(), price: 13, category: 'Salad Menu', image: '/images/Spicy%20Kimchi%20Salad.png' },

  // SAUCE MENU
  { id: 129, name: getName('Spicy Sauce'), description: getDesc(), price: 1, category: 'Sauce Menu', image: '/images/Spicy Sauce.png' },
  { id: 130, name: getName('Teriyaki Sauce'), description: getDesc(), price: 1, category: 'Sauce Menu', image: '/images/Teriyaki Sauce.png' },
  { id: 131, name: getName('Unagi Sauce'), description: getDesc(), price: 1, category: 'Sauce Menu', image: '/images/Unagi Sauce.png' }
];