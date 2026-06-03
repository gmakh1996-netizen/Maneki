export const categories = [
  'Set Menu',
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
  'Set Menu': 'SETS',
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
  { id: 1, name: getName('Baked Chicken Roll'), description: getDesc(), price: 25, category: 'Baked Rolls Menu', image: '/images/webp/baked%20chicken%20.webp' },
  { id: 2, name: getName('Baked Shrimp Roll'), description: getDesc(), price: 33, category: 'Baked Rolls Menu', image: '/images/webp/baked%20shrimp.webp' },
  { id: 3, name: getName('Baked Roll with Eel'), description: getDesc(), price: 33, category: 'Baked Rolls Menu', image: '/images/webp/baked%20unagi.webp' },
  { id: 4, name: getName('Baked Salmon Roll'), description: getDesc(), price: 33, category: 'Baked Rolls Menu', image: '/images/webp/baked%20salmon.webp' },

  // DOMBURI MENU
  { id: 5, name: getName('Domburi with Shrimp'), description: getDesc(), price: 36, category: 'Domburi Menu', image: '/images/webp/domburi%20shrimp.webp' },
  { id: 6, name: getName('Domburi with Chicken'), description: getDesc(), price: 32, category: 'Domburi Menu', image: '/images/webp/domburi%20chicken%20.webp' },

  // GUNKAN SUSHI MENU
  { id: 7, name: getName('Gunkan with Red Caviar'), description: getDesc(), price: 10, category: 'Gunkan Sushi Menu', image: '/images/webp/Gunkan with Red Caviar.webp' },
  { id: 8, name: getName('Gunkan with Spicy Unagi'), description: getDesc(), price: 9, category: 'Gunkan Sushi Menu', image: '/images/webp/gunkan%20unagi.webp' },
  { id: 9, name: getName('Gunkan with Spicy Salmon'), description: getDesc(), price: 10, category: 'Gunkan Sushi Menu', image: '/images/webp/gunkan%20salmon.webp' },
  { id: 10, name: getName('Gunkan with Spicy Shrimp'), description: getDesc(), price: 9, category: 'Gunkan Sushi Menu', image: '/images/webp/gunkan%20shrimp.webp' },

  // HOT ROLLS MENU
  { id: 11, name: getName('Roll "Hot Dog" with Crab'), description: getDesc(), price: 30, category: 'Hot Rolls Menu', image: '/images/webp/hot%20dog%20roll%20crab.webp' },
  { id: 12, name: getName('Roll "Hot Dog Mix" with Fried Salmon and Crab'), description: getDesc(), price: 33, category: 'Hot Rolls Menu', image: '/images/webp/hot%20dog%20roll%20mix.webp' },
  { id: 13, name: getName('Roll "Hot Dog" with Fried Salmon'), description: getDesc(), price: 35, category: 'Hot Rolls Menu', image: '/images/webp/hot%20dog%20roll%20salmon.webp' },
  { id: 14, name: getName('Hot Set – 4 Tempura Rolls'), description: getDesc(), price: 32, category: 'Hot Rolls Menu', image: '/images/webp/set%20hot%20rolls.webp' },
  { id: 15, name: getName('Roll "Sandwich" with Salmon and Unagi'), description: getDesc(), price: 40, category: 'Hot Rolls Menu', image: '/images/webp/sandwich%20roll.webp' },
  { id: 16, name: getName('Hot Roll "California" with Crab'), description: getDesc(), price: 33, category: 'Hot Rolls Menu', image: '/images/webp/hot%20roll%20crab.webp' },
  { id: 17, name: getName('Hot Roll with Unagi'), description: getDesc(), price: 35, category: 'Hot Rolls Menu', image: '/images/webp/hot%20roll%20unagi.webp' },
  { id: 18, name: getName('Hot Roll with Shrimp'), description: getDesc(), price: 33, category: 'Hot Rolls Menu', image: '/images/webp/hot%20roll%20shrimp.webp' },

  // MAKI ROLLS MENU
  { id: 19, name: getName('Maki with Avocado'), description: getDesc(), price: 8, category: 'Maki Rolls Menu', image: '/images/webp/maki%20avocado.webp' },
  { id: 20, name: getName('Maki with Unagi'), description: getDesc(), price: 16, category: 'Maki Rolls Menu', image: '/images/webp/maki%20unagi.webp' },
  { id: 21, name: getName('Maki with Salmon'), description: getDesc(), price: 11, category: 'Maki Rolls Menu', image: '/images/webp/maki%20salmon.webp' },
  { id: 22, name: getName('Maki with Cucumber'), description: getDesc(), price: 6, category: 'Maki Rolls Menu', image: '/images/webp/maki%20cucumber.webp' },
  { id: 23, name: getName('Maki with Shrimp'), description: getDesc(), price: 13, category: 'Maki Rolls Menu', image: '/images/webp/maki%20shrimp%20.webp' },
  { id: 24, name: getName('Maki with Takuan'), description: getDesc(), price: 6, category: 'Maki Rolls Menu', image: '/images/webp/maki%20takuan.webp' },

  // SPECIAL ROLLS MENU
  { id: 25, name: getName('Roll with Fried Salmon "Bonito"'), description: getDesc(), price: 26, category: 'Special Rolls Menu', image: '/images/webp/bonito%20fried%20salmon.webp' },
  { id: 26, name: getName('Roll "Hot Dog Mix" with Fried Salmon and Crab'), description: getDesc(), price: 33, category: 'Special Rolls Menu', image: '/images/webp/hot%20dog%20roll%20mix.webp' },
  { id: 27, name: getName('Roll "Hot Dog" with Crab'), description: getDesc(), price: 30, category: 'Special Rolls Menu', image: '/images/webp/hot%20dog%20roll%20crab.webp' },
  { id: 28, name: getName('Roll "Hot Dog" with Fried Salmon'), description: getDesc(), price: 35, category: 'Special Rolls Menu', image: '/images/webp/hot%20dog%20roll%20salmon.webp' },
  { id: 29, name: getName('Cheesy Fried Salmon Roll'), description: getDesc(), price: 26, category: 'Special Rolls Menu', image: '/images/webp/cheesy%20roll.webp' },
  { id: 30, name: getName('Philadelphia with Fried Salmon'), description: getDesc(), price: 35, category: 'Special Rolls Menu', image: '/images/webp/philadelphia%20fried%20salmon.webp' },

  // NIGIRI MENU
  { id: 31, name: getName('Nigiri Tamago'), description: getDesc(), price: 6, category: 'Nigiri Menu', image: '/images/webp/nigiri%20tomago.webp' },
  { id: 32, name: getName('Nigiri with Unagi'), description: getDesc(), price: 9, category: 'Nigiri Menu', image: '/images/webp/nigiri%20unagi.webp' },
  { id: 33, name: getName('Nigiri with Shrimp'), description: getDesc(), price: 8, category: 'Nigiri Menu', image: '/images/webp/nigiri%20shrimp.webp' },
  { id: 34, name: getName('Nigiri with Salmon'), description: getDesc(), price: 8, category: 'Nigiri Menu', image: '/images/webp/nigiri%20salmon%20.webp' },

  // NO RAW FISH MENU
  { id: 35, name: getName('Roll "Hot Dog" with Crab'), description: getDesc(), price: 30, category: 'No Raw Fish Menu', image: '/images/webp/hot%20dog%20roll%20crab.webp' },
  { id: 36, name: getName('Roll "Hot Dog" with Fried Salmon'), description: getDesc(), price: 35, category: 'No Raw Fish Menu', image: '/images/webp/hot%20dog%20roll%20salmon.webp' },
  { id: 37, name: getName('Roll "Hot Dog Mix" with Fried Salmon and Crab'), description: getDesc(), price: 33, category: 'No Raw Fish Menu', image: '/images/webp/hot%20dog%20roll%20mix.webp' },
  { id: 38, name: getName('Roll with Fried Salmon "Bonito"'), description: getDesc(), price: 26, category: 'No Raw Fish Menu', image: '/images/webp/bonito%20fried%20salmon.webp' },
  { id: 39, name: getName('Cheesy Fried Salmon Roll'), description: getDesc(), price: 26, category: 'No Raw Fish Menu', image: '/images/webp/cheesy%20roll.webp' },
  { id: 40, name: getName('"Alaska" Shrimp Roll'), description: getDesc(), price: 38, category: 'No Raw Fish Menu', image: '/images/webp/alaska%20roll.webp' },
  { id: 41, name: getName('Baked Shrimp Roll'), description: getDesc(), price: 33, category: 'No Raw Fish Menu', image: '/images/webp/baked%20shrimp.webp' },
  { id: 42, name: getName('Combo Shrimp'), description: getDesc(), price: 34, category: 'No Raw Fish Menu', image: '/images/webp/combo%20shrimp.webp' },
  { id: 43, name: getName('Donburi with Shrimps'), description: getDesc(), price: 36, category: 'No Raw Fish Menu', image: '/images/webp/domburi%20shrimp.webp' },
  { id: 44, name: getName('Hot Roll with Shrimp'), description: getDesc(), price: 30, category: 'No Raw Fish Menu', image: '/images/webp/hot%20roll%20shrimp.webp' },
  { id: 45, name: getName('Baked Chicken Roll'), description: getDesc(), price: 25, category: 'No Raw Fish Menu', image: '/images/webp/baked%20chicken%20.webp' },
  { id: 46, name: getName('Chicken Roll'), description: getDesc(), price: 28, category: 'No Raw Fish Menu', image: '/images/webp/Chicken Roll.webp' },

  // NO SPICY SUSHI MENU
  { id: 47, name: getName('Baked Roll with Eel'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: '/images/webp/baked%20unagi.webp' },
  { id: 48, name: getName('Baked Salmon Roll'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: '/images/webp/baked%20salmon.webp' },
  { id: 49, name: getName('Noodles with Shrimps'), description: getDesc(), price: 28, category: 'No Spicy Sushi Menu', image: '/images/webp/noodles%20shrimp.webp' },
  { id: 50, name: getName('Tofu Noodles'), description: getDesc(), price: 22, category: 'No Spicy Sushi Menu', image: '/images/webp/noodles%20tofu.webp' },
  { id: 51, name: getName('Chicken Noodles'), description: getDesc(), price: 20, category: 'No Spicy Sushi Menu', image: '/images/webp/noodles%20chicken.webp' },
  { id: 52, name: getName('Poke Bowl with Chicken'), description: getDesc(), price: 25, category: 'No Spicy Sushi Menu', image: '/images/webp/Poke%20Bowl%20with%20Chicken.webp' },
  { id: 53, name: getName('Poke Bowl with Shrimp'), description: getDesc(), price: 35, category: 'No Spicy Sushi Menu', image: '/images/webp/Poke%20Bowl%20with%20Shrimp.webp' },
  { id: 54, name: getName('Poke Bowl with Salmon'), description: getDesc(), price: 31, category: 'No Spicy Sushi Menu', image: '/images/webp/Poke%20Bowl%20with%20Salmon.webp' },
  { id: 55, name: getName('Hot Roll "California" with Crab'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: '/images/webp/hot%20roll%20crab.webp' },
  { id: 56, name: getName('Hot Roll with Shrimp'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: '/images/webp/hot%20roll%20shrimp.webp' },
  { id: 57, name: getName('Hot Roll with Unagi'), description: getDesc(), price: 35, category: 'No Spicy Sushi Menu', image: '/images/webp/hot%20roll%20unagi.webp' },
  { id: 58, name: getName('Nigiri with Unagi'), description: getDesc(), price: 9, category: 'No Spicy Sushi Menu', image: '/images/webp/nigiri%20unagi.webp' },
  { id: 59, name: getName('Nigiri with Shrimp'), description: getDesc(), price: 8, category: 'No Spicy Sushi Menu', image: '/images/webp/nigiri%20shrimp.webp' },
  { id: 60, name: getName('Nigiri with Salmon'), description: getDesc(), price: 8, category: 'No Spicy Sushi Menu', image: '/images/webp/nigiri%20salmon%20.webp' },
  { id: 61, name: getName('Maki with Avocado'), description: getDesc(), price: 8, category: 'No Spicy Sushi Menu', image: '/images/webp/maki%20avocado.webp' },
  { id: 62, name: getName('Maki with Unagi'), description: getDesc(), price: 16, category: 'No Spicy Sushi Menu', image: '/images/webp/maki%20unagi.webp' },
  { id: 63, name: getName('Maki with Salmon'), description: getDesc(), price: 11, category: 'No Spicy Sushi Menu', image: '/images/webp/maki%20salmon.webp' },
  { id: 64, name: getName('Maki with Cucumber'), description: getDesc(), price: 6, category: 'No Spicy Sushi Menu', image: '/images/webp/maki%20cucumber.webp' },
  { id: 65, name: getName('Maki with Shrimp'), description: getDesc(), price: 13, category: 'No Spicy Sushi Menu', image: '/images/webp/maki%20shrimp%20.webp' },
  { id: 66, name: getName('Maki with Takuan'), description: getDesc(), price: 6, category: 'No Spicy Sushi Menu', image: '/images/webp/maki%20takuan.webp' },
  { id: 67, name: getName('Hot Roll Salmon'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: '/images/webp/hot%20roll%20salmon.webp' },
  { id: 68, name: getName('California Roll with Salmon'), description: getDesc(), price: 30, category: 'No Spicy Sushi Menu', image: '/images/webp/california%20salmon.webp' },
  { id: 69, name: getName('California Roll with Crab'), description: getDesc(), price: 26, category: 'No Spicy Sushi Menu', image: '/images/webp/california%20crab.webp' },
  { id: 70, name: getName('Roll Philadelphia'), description: getDesc(), price: 34, category: 'No Spicy Sushi Menu', image: '/images/webp/philadelphia.webp' },
  { id: 71, name: getName('Philadelphia Luxury Roll'), description: getDesc(), price: 42, category: 'No Spicy Sushi Menu', image: '/images/webp/philadelphia%20lux.webp' },
  { id: 72, name: getName('Chicken Roll'), description: getDesc(), price: 23, category: 'No Spicy Sushi Menu', image: '/images/webp/Chicken Roll.webp' },
  { id: 73, name: getName('Alaska Shrimp Roll'), description: getDesc(), price: 38, category: 'No Spicy Sushi Menu', image: '/images/webp/alaska%20roll.webp' },
  { id: 74, name: getName('Shrimp Tempura Roll'), description: getDesc(), price: 25, category: 'No Spicy Sushi Menu', image: '/images/webp/shrimp%20tempura%20roll.webp' },
  { id: 75, name: getName('Unagi Roll'), description: getDesc(), price: 40, category: 'No Spicy Sushi Menu', image: '/images/webp/unagi%20roll.webp' },
  { id: 76, name: getName('Wakame Salad'), description: getDesc(), price: 13, category: 'No Spicy Sushi Menu', image: '/images/webp/Wakame%20salad.webp' },
  { id: 77, name: getName('Domburi with Shrimps'), description: getDesc(), price: 36, category: 'No Spicy Sushi Menu', image: '/images/webp/domburi%20shrimp.webp' },
  { id: 78, name: getName('Domburi with Chicken'), description: getDesc(), price: 32, category: 'No Spicy Sushi Menu', image: '/images/webp/domburi%20chicken%20.webp' },

  // NOODLES MENU
  { id: 79, name: getName('Noodle Lunch'), description: getDesc(), price: 42, category: 'Noodles Menu', image: '/images/webp/noodels%20lunch.webp' },
  { id: 80, name: getName('Noodles with Shrimps'), description: getDesc(), price: 28, category: 'Noodles Menu', image: '/images/webp/noodles%20shrimp.webp' },
  { id: 81, name: getName('Tofu Noodles'), description: getDesc(), price: 22, category: 'Noodles Menu', image: '/images/webp/noodles%20tofu.webp' },
  { id: 82, name: getName('Chicken Noodles'), description: getDesc(), price: 20, category: 'Noodles Menu', image: '/images/webp/noodles%20chicken.webp' },

  // NORWEGIAN SALMON MENU
  { id: 83, name: getName('Citrus Salted Norwegian Salmon (200g)'), description: getDesc(), price: 30, category: 'Norwegian Salmon Menu', image: 'https://images.unsplash.com/photo-1608731002187-d3448d224d18' },
  { id: 84, name: getName('Salted Norwegian Salmon (200g)'), description: getDesc(), price: 30, category: 'Norwegian Salmon Menu', image: 'https://images.unsplash.com/photo-1697122334427-833eaf1799b9' },

  // ONIGIRI MENU
  { id: 85, name: getName('Onigiri Set'), description: getDesc(), price: 50, category: 'Onigiri Menu', image: '/images/webp/set%20onigiri.webp' },
  { id: 86, name: getName('Onigiri Shrimp'), description: getDesc(), price: 10, category: 'Onigiri Menu', image: '/images/webp/onigiri%20shrimp.webp' },
  { id: 87, name: getName('Onigiri Salmon'), description: getDesc(), price: 10, category: 'Onigiri Menu', image: '/images/webp/onigiri%20salmon.webp' },
  { id: 88, name: getName('Onigiri Unagi'), description: getDesc(), price: 11, category: 'Onigiri Menu', image: '/images/webp/onigiri%20unagi.webp' },
  { id: 89, name: getName('Onigiri Crab'), description: getDesc(), price: 8, category: 'Onigiri Menu', image: '/images/webp/onigiri%20crab.webp' },

  // PHILADELPHIA MENU
  { id: 90, name: getName('Philadelphia Luxury Roll'), description: getDesc(), price: 42, category: 'Philadelphia Menu', image: '/images/webp/philadelphia%20lux.webp' },
  { id: 91, name: getName('Philadelphia Shrimp'), description: getDesc(), price: 34, category: 'Philadelphia Menu', image: '/images/webp/philadelrhia%20shrimp.webp' },
  { id: 92, name: getName('Philadelphia with Fried Salmon'), description: getDesc(), price: 35, category: 'Philadelphia Menu', image: '/images/webp/philadelphia%20fried%20salmon.webp' },
  { id: 93, name: getName('Roll Philadelphia'), description: getDesc(), price: 34, category: 'Philadelphia Menu', image: '/images/webp/philadelphia.webp' },

  // POKE BOWL MENU
  { id: 94, name: getName('Poke Bowl with Chicken'), description: getDesc(), price: 25, category: 'Poke Bowl Menu', image: '/images/webp/Poke%20Bowl%20with%20Chicken.webp' },
  { id: 95, name: getName('Poke Bowl with Salmon'), description: getDesc(), price: 31, category: 'Poke Bowl Menu', image: '/images/webp/Poke%20Bowl%20with%20Salmon.webp' },
  { id: 96, name: getName('Poke Bowl with Shrimp'), description: getDesc(), price: 35, category: 'Poke Bowl Menu', image: '/images/webp/Poke%20Bowl%20with%20Shrimp.webp' },

  // ROLL MENU (FULL LIST)
  { id: 97, name: getName('Roll "Snow Crab"'), description: getDesc(), price: 20, category: 'Roll Menu (Full List)', image: '/images/webp/crab%20roll.webp' },
  { id: 98, name: getName('Roll "Hot Dog" with Crab'), description: getDesc(), price: 30, category: 'Roll Menu (Full List)', image: '/images/webp/hot%20dog%20roll%20crab.webp' },
  { id: 99, name: getName('Roll "Hot Dog Mix" with Fried Salmon and Crab'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/webp/hot%20dog%20roll%20mix.webp' },
  { id: 100, name: getName('Roll "Hot Dog" with Fried Salmon'), description: getDesc(), price: 35, category: 'Roll Menu (Full List)', image: '/images/webp/hot%20dog%20roll%20salmon.webp' },
  { id: 101, name: getName('Roll with Fried Salmon "Bonito"'), description: getDesc(), price: 26, category: 'Roll Menu (Full List)', image: '/images/webp/bonito%20fried%20salmon.webp' },
  { id: 102, name: getName('Cheesy Fried Salmon'), description: getDesc(), price: 26, category: 'Roll Menu (Full List)', image: '/images/webp/cheesy%20roll.webp' },
  { id: 103, name: getName('Philadelphia with Fried Salmon'), description: getDesc(), price: 35, category: 'Roll Menu (Full List)', image: '/images/webp/philadelphia%20fried%20salmon.webp' },
  { id: 104, name: getName('Philadelphia Shrimp'), description: getDesc(), price: 34, category: 'Roll Menu (Full List)', image: '/images/webp/philadelrhia%20shrimp.webp' },
  { id: 105, name: getName('Baked Chicken Roll'), description: getDesc(), price: 25, category: 'Roll Menu (Full List)', image: '/images/webp/baked%20chicken%20.webp' },
  { id: 106, name: getName('Baked Shrimp Roll'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/webp/baked%20shrimp.webp' },
  { id: 107, name: getName('Baked Roll with Eel'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/webp/baked%20unagi.webp' },
  { id: 108, name: getName('Baked Salmon Roll'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/webp/baked%20salmon.webp' },
  { id: 109, name: getName('Rainbow Roll'), description: getDesc(), price: 36, category: 'Roll Menu (Full List)', image: '/images/webp/rainbow%20roll.webp' },
  { id: 110, name: getName('Roll Canada'), description: getDesc(), price: 38, category: 'Roll Menu (Full List)', image: '/images/webp/canada%20roll.webp' },
  { id: 111, name: getName('Hot Set – 4 Tempura Rolls'), description: getDesc(), price: 132, category: 'Roll Menu (Full List)', image: '/images/webp/set%20hot%20rolls.webp' },
  { id: 112, name: getName('Roll "Sandwich" with Salmon and Unagi'), description: getDesc(), price: 40, category: 'Roll Menu (Full List)', image: '/images/webp/sandwich%20roll.webp' },
  { id: 113, name: getName('Hot Roll "California" with Crab'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/webp/hot%20roll%20crab.webp' },
  { id: 114, name: getName('Hot Roll with Unagi'), description: getDesc(), price: 35, category: 'Roll Menu (Full List)', image: '/images/webp/hot%20roll%20unagi.webp' },
  { id: 115, name: getName('Hot Roll with Shrimp'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/webp/hot%20roll%20shrimp.webp' },
  { id: 116, name: getName('Philadelphia Luxury Roll'), description: getDesc(), price: 42, category: 'Roll Menu (Full List)', image: '/images/webp/philadelphia%20lux.webp' },
  { id: 117, name: getName('Roll Philadelphia'), description: getDesc(), price: 34, category: 'Roll Menu (Full List)', image: '/images/webp/philadelphia.webp' },
  { id: 118, name: getName('California Roll with Crab'), description: getDesc(), price: 26, category: 'Roll Menu (Full List)', image: '/images/webp/california%20crab.webp' },
  { id: 119, name: getName('California Roll with Salmon'), description: getDesc(), price: 30, category: 'Roll Menu (Full List)', image: '/images/webp/california%20salmon.webp' },
  { id: 120, name: getName('Salmon Roll'), description: getDesc(), price: 36, category: 'Roll Menu (Full List)', image: '/images/webp/salmon%20roll.webp' },
  { id: 121, name: getName('Chicken Roll'), description: getDesc(), price: 23, category: 'Roll Menu (Full List)', image: '/images/webp/Chicken Roll.webp' },
  { id: 122, name: getName('Alaska Shrimp Roll'), description: getDesc(), price: 38, category: 'Roll Menu (Full List)', image: '/images/webp/alaska%20roll.webp' },
  { id: 123, name: getName('Vegetarian Roll'), description: getDesc(), price: 18, category: 'Roll Menu (Full List)', image: '/images/webp/vegan%20roll.webp' },
  { id: 124, name: getName('Hot Roll Salmon'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: '/images/webp/hot%20roll%20salmon.webp' },
  { id: 125, name: getName('Shrimp Tempura Roll'), description: getDesc(), price: 25, category: 'Roll Menu (Full List)', image: '/images/webp/shrimp%20tempura%20roll.webp' },
  { id: 126, name: getName('Unagi Roll'), description: getDesc(), price: 40, category: 'Roll Menu (Full List)', image: '/images/webp/unagi%20roll.webp' },

  // SALAD MENU
  { id: 127, name: getName('Wakame Salad'), description: getDesc(), price: 13, category: 'Salad Menu', image: '/images/webp/Wakame%20salad.webp' },
  { id: 128, name: getName('Spicy Kimchi Salad'), description: getDesc(), price: 13, category: 'Salad Menu', image: '/images/webp/Spicy Kimchi Salad.webp' },

  // SAUCE MENU
  { id: 129, name: getName('Spicy Sauce'), description: getDesc(), price: 1, category: 'Sauce Menu', image: '/images/webp/Spicy Sauce.webp' },
  { id: 130, name: getName('Teriyaki Sauce'), description: getDesc(), price: 1, category: 'Sauce Menu', image: '/images/webp/Teriyaki Sauce.webp' },
  { id: 131, name: getName('Unagi Sauce'), description: getDesc(), price: 1, category: 'Sauce Menu', image: '/images/webp/Unagi Sauce.webp' }
];