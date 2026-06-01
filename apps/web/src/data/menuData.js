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
  { id: 1, name: getName('Baked Chicken Roll'), description: getDesc(), price: 25, category: 'Baked Rolls Menu', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 2, name: getName('Baked Shrimp Roll'), description: getDesc(), price: 33, category: 'Baked Rolls Menu', image: 'https://images.unsplash.com/photo-1535333184447-47c6e2319336' },
  { id: 3, name: getName('Baked Roll with Eel'), description: getDesc(), price: 33, category: 'Baked Rolls Menu', image: 'https://images.unsplash.com/photo-1679279727888-7f39dd520b8b' },
  { id: 4, name: getName('Baked Salmon Roll'), description: getDesc(), price: 33, category: 'Baked Rolls Menu', image: 'https://images.unsplash.com/photo-1608731002248-747dee753517' },

  // DOMBURI MENU
  { id: 5, name: getName('Domburi with Shrimp'), description: getDesc(), price: 36, category: 'Domburi Menu', image: 'https://images.unsplash.com/photo-1547592180-85f173990554' },
  { id: 6, name: getName('Domburi with Chicken'), description: getDesc(), price: 32, category: 'Domburi Menu', image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624' },

  // GUNKAN SUSHI MENU
  { id: 7, name: getName('Gunkan with Red Caviar'), description: getDesc(), price: 10, category: 'Gunkan Sushi Menu', image: 'https://images.unsplash.com/photo-1695226320311-60ebf0fec644' },
  { id: 8, name: getName('Gunkan with Spicy Unagi'), description: getDesc(), price: 9, category: 'Gunkan Sushi Menu', image: 'https://images.unsplash.com/photo-1693082147611-2c8cd3765c71' },
  { id: 9, name: getName('Gunkan with Spicy Salmon'), description: getDesc(), price: 10, category: 'Gunkan Sushi Menu', image: 'https://images.unsplash.com/photo-1632850071873-118663d31165' },
  { id: 10, name: getName('Gunkan with Spicy Shrimp'), description: getDesc(), price: 9, category: 'Gunkan Sushi Menu', image: 'https://images.unsplash.com/photo-1535333184447-47c6e2319336' },

  // HOT ROLLS MENU
  { id: 11, name: getName('Roll "Hot Dog" with Crab'), description: getDesc(), price: 30, category: 'Hot Rolls Menu', image: 'https://images.unsplash.com/photo-1535333184447-47c6e2319336' },
  { id: 12, name: getName('Roll "Hot Dog Mix" with Fried Salmon and Crab'), description: getDesc(), price: 33, category: 'Hot Rolls Menu', image: 'https://images.unsplash.com/photo-1699790717628-64b5c6aa607a' },
  { id: 13, name: getName('Roll "Hot Dog" with Fried Salmon'), description: getDesc(), price: 35, category: 'Hot Rolls Menu', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 14, name: getName('Hot Set – 4 Tempura Rolls'), description: getDesc(), price: 32, category: 'Hot Rolls Menu', image: 'https://images.unsplash.com/photo-1657309996398-ef968fd0f825' },
  { id: 15, name: getName('Roll "Sandwich" with Salmon and Unagi'), description: getDesc(), price: 40, category: 'Hot Rolls Menu', image: 'https://images.unsplash.com/photo-1562436260-8c9216eeb703' },
  { id: 16, name: getName('Hot Roll "California" with Crab'), description: getDesc(), price: 33, category: 'Hot Rolls Menu', image: 'https://images.unsplash.com/photo-1558540718-bef14732c6d7' },
  { id: 17, name: getName('Hot Roll with Unagi'), description: getDesc(), price: 35, category: 'Hot Rolls Menu', image: 'https://images.unsplash.com/photo-1632850071873-118663d31165' },
  { id: 18, name: getName('Hot Roll with Shrimp'), description: getDesc(), price: 33, category: 'Hot Rolls Menu', image: 'https://images.unsplash.com/photo-1664739531822-03f1f38f96e7' },

  // MAKI ROLLS MENU
  { id: 19, name: getName('Maki with Avocado'), description: getDesc(), price: 8, category: 'Maki Rolls Menu', image: 'https://images.unsplash.com/photo-1679279727888-7f39dd520b8b' },
  { id: 20, name: getName('Maki with Unagi'), description: getDesc(), price: 16, category: 'Maki Rolls Menu', image: 'https://images.unsplash.com/photo-1664739531822-03f1f38f96e7' },
  { id: 21, name: getName('Maki with Salmon'), description: getDesc(), price: 11, category: 'Maki Rolls Menu', image: 'https://images.unsplash.com/photo-1558540718-bef14732c6d7' },
  { id: 22, name: getName('Maki with Cucumber'), description: getDesc(), price: 6, category: 'Maki Rolls Menu', image: 'https://images.unsplash.com/photo-1636425730695-febe95eda12e' },
  { id: 23, name: getName('Maki with Shrimp'), description: getDesc(), price: 13, category: 'Maki Rolls Menu', image: 'https://images.unsplash.com/photo-1535333184447-47c6e2319336' },
  { id: 24, name: getName('Maki with Takuan'), description: getDesc(), price: 6, category: 'Maki Rolls Menu', image: 'https://images.unsplash.com/photo-1691851684721-add6c86bc69d' },

  // SPECIAL ROLLS MENU
  { id: 25, name: getName('Roll with Fried Salmon "Bonito"'), description: getDesc(), price: 26, category: 'Special Rolls Menu', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 26, name: getName('Roll "Hot Dog Mix" with Fried Salmon and Crab'), description: getDesc(), price: 33, category: 'Special Rolls Menu', image: 'https://images.unsplash.com/photo-1679279727888-7f39dd520b8b' },
  { id: 27, name: getName('Roll "Hot Dog" with Crab'), description: getDesc(), price: 30, category: 'Special Rolls Menu', image: 'https://images.unsplash.com/photo-1691851684721-add6c86bc69d' },
  { id: 28, name: getName('Roll "Hot Dog" with Fried Salmon'), description: getDesc(), price: 35, category: 'Special Rolls Menu', image: 'https://images.unsplash.com/photo-1625938145312-c18f06f53be0' },
  { id: 29, name: getName('Cheesy Fried Salmon Roll'), description: getDesc(), price: 26, category: 'Special Rolls Menu', image: 'https://images.unsplash.com/photo-1693524638956-67befec01e45' },
  { id: 30, name: getName('Philadelphia with Fried Salmon'), description: getDesc(), price: 35, category: 'Special Rolls Menu', image: 'https://images.unsplash.com/photo-1667510294170-1ec3df48862d' },

  // NIGIRI MENU
  { id: 31, name: getName('Nigiri Tamago'), description: getDesc(), price: 6, category: 'Nigiri Menu', image: 'https://images.unsplash.com/photo-1693370366525-79a8d274d243' },
  { id: 32, name: getName('Nigiri with Unagi'), description: getDesc(), price: 9, category: 'Nigiri Menu', image: 'https://images.unsplash.com/photo-1541376434184-e019677c8aee' },
  { id: 33, name: getName('Nigiri with Shrimp'), description: getDesc(), price: 8, category: 'Nigiri Menu', image: 'https://images.unsplash.com/photo-1670417404304-5b8794aedda7' },
  { id: 34, name: getName('Nigiri with Salmon'), description: getDesc(), price: 8, category: 'Nigiri Menu', image: 'https://images.unsplash.com/photo-1559981350-e61f63d42530' },

  // NO RAW FISH MENU
  { id: 35, name: getName('Roll "Hot Dog" with Crab'), description: getDesc(), price: 30, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1699790717628-64b5c6aa607a' },
  { id: 36, name: getName('Roll "Hot Dog" with Fried Salmon'), description: getDesc(), price: 35, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 37, name: getName('Roll "Hot Dog Mix" with Fried Salmon and Crab'), description: getDesc(), price: 33, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1608731002187-d3448d224d18' },
  { id: 38, name: getName('Roll with Fried Salmon "Bonito"'), description: getDesc(), price: 26, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1697122334427-833eaf1799b9' },
  { id: 39, name: getName('Cheesy Fried Salmon Roll'), description: getDesc(), price: 26, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1535333184447-47c6e2319336' },
  { id: 40, name: getName('"Alaska" Shrimp Roll'), description: getDesc(), price: 38, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1636425730695-febe95eda12e' },
  { id: 41, name: getName('Baked Shrimp Roll'), description: getDesc(), price: 33, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1679279727888-7f39dd520b8b' },
  { id: 42, name: getName('Combo Shrimp'), description: getDesc(), price: 34, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 43, name: getName('Donburi with Shrimps'), description: getDesc(), price: 36, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1699790717628-64b5c6aa607a' },
  { id: 44, name: getName('Hot Roll with Shrimp'), description: getDesc(), price: 30, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1558540718-bef14732c6d7' },
  { id: 45, name: getName('Baked Chicken Roll'), description: getDesc(), price: 25, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1632850071873-118663d31165' },
  { id: 46, name: getName('Chicken Roll'), description: getDesc(), price: 28, category: 'No Raw Fish Menu', image: 'https://images.unsplash.com/photo-1664739531822-03f1f38f96e7' },

  // NO SPICY SUSHI MENU
  { id: 47, name: getName('Baked Roll with Eel'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 48, name: getName('Baked Salmon Roll'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1679279727888-7f39dd520b8b' },
  { id: 49, name: getName('Noodles with Shrimps'), description: getDesc(), price: 28, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1691851684721-add6c86bc69d' },
  { id: 50, name: getName('Tofu Noodles'), description: getDesc(), price: 22, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1625938145312-c18f06f53be0' },
  { id: 51, name: getName('Chicken Noodles'), description: getDesc(), price: 20, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1693524638956-67befec01e45' },
  { id: 52, name: getName('Poke Bowl with Chicken'), description: getDesc(), price: 25, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1667510294170-1ec3df48862d' },
  { id: 53, name: getName('Poke Bowl with Shrimp'), description: getDesc(), price: 35, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1693370366525-79a8d274d243' },
  { id: 54, name: getName('Poke Bowl with Salmon'), description: getDesc(), price: 31, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1541376434184-e019677c8aee' },
  { id: 55, name: getName('Hot Roll "California" with Crab'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1670417404304-5b8794aedda7' },
  { id: 56, name: getName('Hot Roll with Shrimp'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1559981350-e61f63d42530' },
  { id: 57, name: getName('Hot Roll with Unagi'), description: getDesc(), price: 35, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1699790717628-64b5c6aa607a' },
  { id: 58, name: getName('Nigiri with Unagi'), description: getDesc(), price: 9, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 59, name: getName('Nigiri with Shrimp'), description: getDesc(), price: 8, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1608731002187-d3448d224d18' },
  { id: 60, name: getName('Nigiri with Salmon'), description: getDesc(), price: 8, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1697122334427-833eaf1799b9' },
  { id: 61, name: getName('Maki with Avocado'), description: getDesc(), price: 8, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1535333184447-47c6e2319336' },
  { id: 62, name: getName('Maki with Unagi'), description: getDesc(), price: 16, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1636425730695-febe95eda12e' },
  { id: 63, name: getName('Maki with Salmon'), description: getDesc(), price: 11, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1679279727888-7f39dd520b8b' },
  { id: 64, name: getName('Maki with Cucumber'), description: getDesc(), price: 6, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1691851684721-add6c86bc69d' },
  { id: 65, name: getName('Maki with Shrimp'), description: getDesc(), price: 13, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 66, name: getName('Maki with Takuan'), description: getDesc(), price: 6, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1699790717628-64b5c6aa607a' },
  { id: 67, name: getName('Hot Roll Salmon'), description: getDesc(), price: 33, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1558540718-bef14732c6d7' },
  { id: 68, name: getName('California Roll with Salmon'), description: getDesc(), price: 30, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1632850071873-118663d31165' },
  { id: 69, name: getName('California Roll with Crab'), description: getDesc(), price: 26, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1664739531822-03f1f38f96e7' },
  { id: 70, name: getName('Roll Philadelphia'), description: getDesc(), price: 34, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1699790717628-64b5c6aa607a' },
  { id: 71, name: getName('Philadelphia Luxury Roll'), description: getDesc(), price: 42, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 72, name: getName('Chicken Roll'), description: getDesc(), price: 23, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1679279727888-7f39dd520b8b' },
  { id: 73, name: getName('Alaska Shrimp Roll'), description: getDesc(), price: 38, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1691851684721-add6c86bc69d' },
  { id: 74, name: getName('Shrimp Tempura Roll'), description: getDesc(), price: 25, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1625938145312-c18f06f53be0' },
  { id: 75, name: getName('Unagi Roll'), description: getDesc(), price: 40, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1693524638956-67befec01e45' },
  { id: 76, name: getName('Wakame Salad'), description: getDesc(), price: 13, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1667510294170-1ec3df48862d' },
  { id: 77, name: getName('Domburi with Shrimps'), description: getDesc(), price: 36, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1693370366525-79a8d274d243' },
  { id: 78, name: getName('Domburi with Chicken'), description: getDesc(), price: 32, category: 'No Spicy Sushi Menu', image: 'https://images.unsplash.com/photo-1541376434184-e019677c8aee' },

  // NOODLES MENU
  { id: 79, name: getName('Noodle Lunch'), description: getDesc(), price: 42, category: 'Noodles Menu', image: 'https://images.unsplash.com/photo-1670417404304-5b8794aedda7' },
  { id: 80, name: getName('Noodles with Shrimps'), description: getDesc(), price: 28, category: 'Noodles Menu', image: 'https://images.unsplash.com/photo-1559981350-e61f63d42530' },
  { id: 81, name: getName('Tofu Noodles'), description: getDesc(), price: 22, category: 'Noodles Menu', image: 'https://images.unsplash.com/photo-1699790717628-64b5c6aa607a' },
  { id: 82, name: getName('Chicken Noodles'), description: getDesc(), price: 20, category: 'Noodles Menu', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },

  // NORWEGIAN SALMON MENU
  { id: 83, name: getName('Citrus Salted Norwegian Salmon (200g)'), description: getDesc(), price: 30, category: 'Norwegian Salmon Menu', image: 'https://images.unsplash.com/photo-1608731002187-d3448d224d18' },
  { id: 84, name: getName('Salted Norwegian Salmon (200g)'), description: getDesc(), price: 30, category: 'Norwegian Salmon Menu', image: 'https://images.unsplash.com/photo-1697122334427-833eaf1799b9' },

  // ONIGIRI MENU
  { id: 85, name: getName('Onigiri Set'), description: getDesc(), price: 50, category: 'Onigiri Menu', image: 'https://images.unsplash.com/photo-1535333184447-47c6e2319336' },
  { id: 86, name: getName('Onigiri Shrimp'), description: getDesc(), price: 10, category: 'Onigiri Menu', image: 'https://images.unsplash.com/photo-1636425730695-febe95eda12e' },
  { id: 87, name: getName('Onigiri Salmon'), description: getDesc(), price: 10, category: 'Onigiri Menu', image: 'https://images.unsplash.com/photo-1679279727888-7f39dd520b8b' },
  { id: 88, name: getName('Onigiri Unagi'), description: getDesc(), price: 11, category: 'Onigiri Menu', image: 'https://images.unsplash.com/photo-1691851684721-add6c86bc69d' },
  { id: 89, name: getName('Onigiri Crab'), description: getDesc(), price: 8, category: 'Onigiri Menu', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },

  // PHILADELPHIA MENU
  { id: 90, name: getName('Philadelphia Luxury Roll'), description: getDesc(), price: 42, category: 'Philadelphia Menu', image: 'https://images.unsplash.com/photo-1699790717628-64b5c6aa607a' },
  { id: 91, name: getName('Philadelphia Shrimp'), description: getDesc(), price: 34, category: 'Philadelphia Menu', image: 'https://images.unsplash.com/photo-1558540718-bef14732c6d7' },
  { id: 92, name: getName('Philadelphia with Fried Salmon'), description: getDesc(), price: 35, category: 'Philadelphia Menu', image: 'https://images.unsplash.com/photo-1632850071873-118663d31165' },
  { id: 93, name: getName('Roll Philadelphia'), description: getDesc(), price: 34, category: 'Philadelphia Menu', image: 'https://images.unsplash.com/photo-1664739531822-03f1f38f96e7' },

  // POKE BOWL MENU
  { id: 94, name: getName('Poke Bowl with Chicken'), description: getDesc(), price: 25, category: 'Poke Bowl Menu', image: 'https://images.unsplash.com/photo-1699790717628-64b5c6aa607a' },
  { id: 95, name: getName('Poke Bowl with Salmon'), description: getDesc(), price: 31, category: 'Poke Bowl Menu', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 96, name: getName('Poke Bowl with Shrimp'), description: getDesc(), price: 35, category: 'Poke Bowl Menu', image: 'https://images.unsplash.com/photo-1679279727888-7f39dd520b8b' },

  // ROLL MENU (FULL LIST)
  { id: 97, name: getName('Roll "Snow Crab"'), description: getDesc(), price: 20, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1691851684721-add6c86bc69d' },
  { id: 98, name: getName('Roll "Hot Dog" with Crab'), description: getDesc(), price: 30, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1625938145312-c18f06f53be0' },
  { id: 99, name: getName('Roll "Hot Dog Mix" with Fried Salmon and Crab'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1693524638956-67befec01e45' },
  { id: 100, name: getName('Roll "Hot Dog" with Fried Salmon'), description: getDesc(), price: 35, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1667510294170-1ec3df48862d' },
  { id: 101, name: getName('Roll with Fried Salmon "Bonito"'), description: getDesc(), price: 26, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1693370366525-79a8d274d243' },
  { id: 102, name: getName('Cheesy Fried Salmon'), description: getDesc(), price: 26, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1541376434184-e019677c8aee' },
  { id: 103, name: getName('Philadelphia with Fried Salmon'), description: getDesc(), price: 35, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1670417404304-5b8794aedda7' },
  { id: 104, name: getName('Philadelphia Shrimp'), description: getDesc(), price: 34, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1559981350-e61f63d42530' },
  { id: 105, name: getName('Baked Chicken Roll'), description: getDesc(), price: 25, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1699790717628-64b5c6aa607a' },
  { id: 106, name: getName('Baked Shrimp Roll'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 107, name: getName('Baked Roll with Eel'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1608731002187-d3448d224d18' },
  { id: 108, name: getName('Baked Salmon Roll'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1697122334427-833eaf1799b9' },
  { id: 109, name: getName('Rainbow Roll'), description: getDesc(), price: 36, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1535333184447-47c6e2319336' },
  { id: 110, name: getName('Roll Canada'), description: getDesc(), price: 38, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1636425730695-febe95eda12e' },
  { id: 111, name: getName('Hot Set – 4 Tempura Rolls'), description: getDesc(), price: 132, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1679279727888-7f39dd520b8b' },
  { id: 112, name: getName('Roll "Sandwich" with Salmon and Unagi'), description: getDesc(), price: 40, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1691851684721-add6c86bc69d' },
  { id: 113, name: getName('Hot Roll "California" with Crab'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 114, name: getName('Hot Roll with Unagi'), description: getDesc(), price: 35, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1699790717628-64b5c6aa607a' },
  { id: 115, name: getName('Hot Roll with Shrimp'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1558540718-bef14732c6d7' },
  { id: 116, name: getName('Philadelphia Luxury Roll'), description: getDesc(), price: 42, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1632850071873-118663d31165' },
  { id: 117, name: getName('Roll Philadelphia'), description: getDesc(), price: 34, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1664739531822-03f1f38f96e7' },
  { id: 118, name: getName('California Roll with Crab'), description: getDesc(), price: 26, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1699790717628-64b5c6aa607a' },
  { id: 119, name: getName('California Roll with Salmon'), description: getDesc(), price: 30, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1621530805257-6e8a16a9f848' },
  { id: 120, name: getName('Salmon Roll'), description: getDesc(), price: 36, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1679279727888-7f39dd520b8b' },
  { id: 121, name: getName('Chicken Roll'), description: getDesc(), price: 23, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1691851684721-add6c86bc69d' },
  { id: 122, name: getName('Alaska Shrimp Roll'), description: getDesc(), price: 38, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1625938145312-c18f06f53be0' },
  { id: 123, name: getName('Vegetarian Roll'), description: getDesc(), price: 18, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1693524638956-67befec01e45' },
  { id: 124, name: getName('Hot Roll Salmon'), description: getDesc(), price: 33, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1667510294170-1ec3df48862d' },
  { id: 125, name: getName('Shrimp Tempura Roll'), description: getDesc(), price: 25, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1693370366525-79a8d274d243' },
  { id: 126, name: getName('Unagi Roll'), description: getDesc(), price: 40, category: 'Roll Menu (Full List)', image: 'https://images.unsplash.com/photo-1541376434184-e019677c8aee' },

  // SALAD MENU
  { id: 127, name: getName('Wakame Salad'), description: getDesc(), price: 13, category: 'Salad Menu', image: 'https://images.unsplash.com/photo-1670417404304-5b8794aedda7' },
  { id: 128, name: getName('Spicy Kimchi Salad'), description: getDesc(), price: 13, category: 'Salad Menu', image: 'https://images.unsplash.com/photo-1559981350-e61f63d42530' },

  // SAUCE MENU
  { id: 129, name: getName('Spicy Sauce'), description: getDesc(), price: 1, category: 'Sauce Menu', image: 'https://images.unsplash.com/photo-1675620065797-b10e52f9674e' },
  { id: 130, name: getName('Teriyaki Sauce'), description: getDesc(), price: 1, category: 'Sauce Menu', image: 'https://images.unsplash.com/photo-1652878530803-5a2ce767d27b' },
  { id: 131, name: getName('Unagi Sauce'), description: getDesc(), price: 1, category: 'Sauce Menu', image: 'https://images.unsplash.com/photo-1693082147611-2c8cd3765c71' }
];