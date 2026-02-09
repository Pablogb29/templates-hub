/* ──────────────────────────────────────────────────────────
   data/menu.ts
   Full menu for Tsuki Izakaya — categories, items, dietary
   tags, and allergen declarations.
   ────────────────────────────────────────────────────────── */

export interface DietaryTags {
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  lactoseFree: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  /** Price in cents (USD) for safe arithmetic; display with formatPrice() */
  price: number;
  tags: DietaryTags;
  /** Free-text allergen list (Top-8 + sesame) */
  allergens: string[];
  /** Optional badge ("New", "Chef's Pick", "Seasonal") */
  badge?: string;
  /** If true, item is temporarily unavailable */
  soldOut?: boolean;
}

export interface MenuCategory {
  key: string;
  label: string;
  icon: string;
  description?: string;
  items: MenuItem[];
}

/* ── Helper ── */

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/* shorthand for tags */
const NO_TAG: DietaryTags = { vegetarian: false, vegan: false, glutenFree: false, lactoseFree: false };
const V:      DietaryTags = { vegetarian: true,  vegan: false, glutenFree: false, lactoseFree: false };
const VG:     DietaryTags = { vegetarian: true,  vegan: true,  glutenFree: false, lactoseFree: false };
const GF:     DietaryTags = { vegetarian: false, vegan: false, glutenFree: true,  lactoseFree: false };
const VGF:    DietaryTags = { vegetarian: true,  vegan: false, glutenFree: true,  lactoseFree: false };
const VGGF:   DietaryTags = { vegetarian: true,  vegan: true,  glutenFree: true,  lactoseFree: true  };

/* ================================================================
   Categories & Items
   ================================================================ */

export const menu: MenuCategory[] = [
  /* ─── Starters ─── */
  {
    key: "starters",
    label: "Starters",
    icon: "🥢",
    description: "Small plates to whet the appetite.",
    items: [
      {
        id: "st-01",
        name: "Truffle Edamame",
        description: "Steamed soybeans, white truffle oil, Maldon sea salt.",
        price: 1200,
        tags: { ...VG, glutenFree: true, lactoseFree: true },
        allergens: ["soy"],
        badge: "Popular",
      },
      {
        id: "st-02",
        name: "Wagyu Beef Tataki",
        description: "Flash-seared A5 Miyazaki wagyu, ponzu gelée, micro shiso, crispy garlic chips.",
        price: 3200,
        tags: GF,
        allergens: ["soy"],
        badge: "Chef's Pick",
      },
      {
        id: "st-03",
        name: "Spicy Tuna Crispy Rice",
        description: "Sushi-rice crisps topped with spicy tuna tartare, jalapeño, togarashi aioli.",
        price: 1800,
        tags: NO_TAG,
        allergens: ["fish", "soy", "egg", "sesame"],
      },
      {
        id: "st-04",
        name: "Pork Gyoza",
        description: "Pan-fried dumplings (6 pc), spicy ponzu dipping sauce, chili oil.",
        price: 1200,
        tags: NO_TAG,
        allergens: ["wheat", "soy", "sesame"],
      },
      {
        id: "st-05",
        name: "Agedashi Tofu",
        description: "Silken tofu, dashi broth, grated daikon, bonito flakes, scallion.",
        price: 1100,
        tags: V,
        allergens: ["soy", "wheat", "fish"],
      },
      {
        id: "st-06",
        name: "Karaage Chicken",
        description: "Double-fried Japanese chicken thigh, yuzu koshō mayo, lemon wedge.",
        price: 1400,
        tags: NO_TAG,
        allergens: ["wheat", "egg", "soy"],
      },
      {
        id: "st-07",
        name: "Shishito Peppers",
        description: "Blistered shishitos, bonito flakes, ponzu butter.",
        price: 1000,
        tags: VGF,
        allergens: ["soy", "milk"],
      },
      {
        id: "st-08",
        name: "Miso Black Cod",
        description: "Sustainably sourced cod fillet, 72-hour saikyo miso marinade, hajikami ginger.",
        price: 2800,
        tags: GF,
        allergens: ["fish", "soy"],
        badge: "Seasonal",
      },
    ],
  },

  /* ─── Sushi & Sashimi ─── */
  {
    key: "sushi",
    label: "Sushi & Sashimi",
    icon: "🍣",
    description: "Fresh from Toyosu Market, prepared with precision.",
    items: [
      {
        id: "su-01",
        name: "Omakase Sashimi Deluxe",
        description: "15-piece chef's selection — Otoro, Chūtoro, Uni, Botan-ebi, Hirame, Hotate.",
        price: 8500,
        tags: { ...GF, lactoseFree: true },
        allergens: ["fish", "shellfish", "soy"],
        badge: "Chef's Pick",
      },
      {
        id: "su-02",
        name: "Bluefin Tuna Flight",
        description: "Akami, Chūtoro, Otoro, Negitoro gunkan — 8 pieces total.",
        price: 4500,
        tags: { ...GF, lactoseFree: true },
        allergens: ["fish", "soy"],
      },
      {
        id: "su-03",
        name: "Hamachi Jalapeño",
        description: "Yellowtail sashimi (6 pc), yuzu soy, thinly sliced serrano, micro cilantro.",
        price: 2400,
        tags: { ...GF, lactoseFree: true },
        allergens: ["fish", "soy"],
      },
      {
        id: "su-04",
        name: "Truffle Salmon Roll",
        description: "Spicy salmon, cucumber, seared salmon top, black truffle oil, fried shallot.",
        price: 2200,
        tags: NO_TAG,
        allergens: ["fish", "soy", "sesame", "wheat"],
      },
      {
        id: "su-05",
        name: "A5 Wagyu Uni Nigiri",
        description: "Seared Miyazaki A5 wagyu, Hokkaido bafun uni, oscietra caviar (2 pc).",
        price: 3200,
        tags: GF,
        allergens: ["fish", "soy", "milk"],
        badge: "New",
      },
      {
        id: "su-06",
        name: "Dragon Roll",
        description: "Shrimp tempura, avocado, eel, unagi glaze, tobiko, sesame.",
        price: 2400,
        tags: NO_TAG,
        allergens: ["shellfish", "fish", "wheat", "soy", "sesame", "egg"],
      },
      {
        id: "su-07",
        name: "Veggie Temaki Hand Roll",
        description: "Avocado, cucumber, takuan, shiso leaf, crispy nori cone (2 pc).",
        price: 1200,
        tags: VGGF,
        allergens: ["soy", "sesame"],
      },
      {
        id: "su-08",
        name: "Salmon Aburi Nigiri",
        description: "Torched Atlantic salmon, garlic chip, yuzu mayo (4 pc).",
        price: 1800,
        tags: NO_TAG,
        allergens: ["fish", "soy", "egg"],
      },
    ],
  },

  /* ─── Robata Grill ─── */
  {
    key: "robata",
    label: "Robata Grill",
    icon: "🔥",
    description: "Charcoal-grilled over binchotan at 1,000 °C.",
    items: [
      {
        id: "rb-01",
        name: "Negima (Chicken Thigh & Scallion)",
        description: "Tare glaze, shichimi — 2 skewers.",
        price: 800,
        tags: GF,
        allergens: ["soy"],
      },
      {
        id: "rb-02",
        name: "Tsukune (Chicken Meatball)",
        description: "Egg yolk dip, sweet soy tare — 2 skewers.",
        price: 900,
        tags: NO_TAG,
        allergens: ["egg", "soy", "wheat"],
      },
      {
        id: "rb-03",
        name: "Wagyu Short Rib",
        description: "A4 wagyu kalbi, sea salt, wasabi, grated daikon.",
        price: 2800,
        tags: GF,
        allergens: [],
        badge: "Popular",
      },
      {
        id: "rb-04",
        name: "Lamb Chop",
        description: "Korean spice rub, kimchi cucumber, sesame leaf.",
        price: 1800,
        tags: GF,
        allergens: ["sesame", "soy"],
      },
      {
        id: "rb-05",
        name: "Miso-Glazed Eggplant",
        description: "Nasu dengaku, sweet white miso, toasted sesame.",
        price: 1200,
        tags: { ...VG, glutenFree: true, lactoseFree: true },
        allergens: ["soy", "sesame"],
      },
      {
        id: "rb-06",
        name: "King Trumpet Mushroom",
        description: "Soy butter, shichimi pepper, micro herbs.",
        price: 1200,
        tags: V,
        allergens: ["soy", "milk"],
      },
      {
        id: "rb-07",
        name: "Asparagus Bacon Wrap",
        description: "Smoked bacon, grilled asparagus — 2 skewers.",
        price: 700,
        tags: GF,
        allergens: [],
      },
      {
        id: "rb-08",
        name: "Whole Grilled Squid",
        description: "Scored Monterey squid, shiso chimichurri, lemon.",
        price: 1600,
        tags: { ...GF, lactoseFree: true },
        allergens: ["shellfish"],
        badge: "Seasonal",
      },
    ],
  },

  /* ─── Mains ─── */
  {
    key: "mains",
    label: "Mains",
    icon: "🍜",
    description: "Hearty plates for the main course.",
    items: [
      {
        id: "mn-01",
        name: "Tonkotsu Ramen",
        description: "18-hour pork bone broth, chashu belly, ajitama egg, bamboo shoots, nori.",
        price: 1900,
        tags: NO_TAG,
        allergens: ["wheat", "egg", "soy", "sesame"],
      },
      {
        id: "mn-02",
        name: "Spicy Miso Ramen",
        description: "Red miso broth, ground pork, bean sprouts, corn, chili oil, soft egg.",
        price: 1800,
        tags: NO_TAG,
        allergens: ["wheat", "egg", "soy", "sesame"],
      },
      {
        id: "mn-03",
        name: "Katsu Curry Don",
        description: "Panko-crusted pork loin, house curry, steamed rice, pickled daikon.",
        price: 2200,
        tags: NO_TAG,
        allergens: ["wheat", "egg", "soy", "milk"],
      },
      {
        id: "mn-04",
        name: "Chirashi Bowl",
        description: "Assorted sashimi over seasoned sushi rice, tamago, ikura, shiso.",
        price: 2800,
        tags: GF,
        allergens: ["fish", "shellfish", "soy", "egg"],
        badge: "Chef's Pick",
      },
      {
        id: "mn-05",
        name: "Grilled Unagi Don",
        description: "Charcoal-grilled freshwater eel, kabayaki glaze, sansho pepper, rice.",
        price: 3200,
        tags: NO_TAG,
        allergens: ["fish", "soy", "wheat"],
      },
      {
        id: "mn-06",
        name: "Vegetable Udon",
        description: "Thick wheat noodles, kombu dashi, seasonal vegetables, yuzu zest.",
        price: 1600,
        tags: VG,
        allergens: ["wheat", "soy"],
      },
    ],
  },

  /* ─── Sake & Spirits ─── */
  {
    key: "drinks",
    label: "Sake & Spirits",
    icon: "🍶",
    description: "Curated pours to complement every course.",
    items: [
      {
        id: "dk-01",
        name: "Dassai 45 Junmai Daiginjo",
        description: "Clean, soft, sweet melon notes — glass / bottle.",
        price: 1600,
        tags: VGGF,
        allergens: [],
      },
      {
        id: "dk-02",
        name: "Kubota Manju Junmai Daiginjo",
        description: "Complex, floral, ultra-refined — glass / bottle.",
        price: 2800,
        tags: VGGF,
        allergens: [],
      },
      {
        id: "dk-03",
        name: "Kikusui Perfect Snow Nigori",
        description: "Unfiltered, rich, sweet, creamy body — glass / bottle.",
        price: 1200,
        tags: VGGF,
        allergens: [],
      },
      {
        id: "dk-04",
        name: "Hakutsuru Sayuri Nigori",
        description: "Light, fruity, slightly sweet — glass / bottle.",
        price: 1100,
        tags: VGGF,
        allergens: [],
      },
      {
        id: "dk-05",
        name: "Hibiki Harmony Japanese Whisky",
        description: "Blended Suntory whisky, honey, orange peel, white chocolate — neat / rocks.",
        price: 2400,
        tags: VGGF,
        allergens: [],
      },
      {
        id: "dk-06",
        name: "Tokyo Mule",
        description: "Vodka, fresh yuzu juice, ginger beer, cucumber ribbon.",
        price: 1600,
        tags: VGGF,
        allergens: [],
      },
      {
        id: "dk-07",
        name: "Lychee Martini",
        description: "Roku gin, lychee liqueur, fresh lime, lychee pearl.",
        price: 1700,
        tags: VGGF,
        allergens: [],
      },
      {
        id: "dk-08",
        name: "Shiso Sour",
        description: "Shōchū, fresh shiso leaf, lemon, honey syrup, soda.",
        price: 1500,
        tags: VGGF,
        allergens: [],
      },
    ],
  },

  /* ─── Desserts ─── */
  {
    key: "desserts",
    label: "Desserts",
    icon: "🍡",
    description: "Sweet finales to close the night.",
    items: [
      {
        id: "ds-01",
        name: "Matcha Lava Cake",
        description: "Warm Uji matcha fondant, black sesame ice cream, azuki compote.",
        price: 1400,
        tags: V,
        allergens: ["wheat", "egg", "milk", "sesame"],
        badge: "Popular",
      },
      {
        id: "ds-02",
        name: "Yuzu Cheesecake",
        description: "Japanese-style soufflé cheesecake, yuzu curd, candied kumquat.",
        price: 1300,
        tags: V,
        allergens: ["wheat", "egg", "milk"],
      },
      {
        id: "ds-03",
        name: "Mochi Ice Cream Trio",
        description: "Black sesame, hojicha, and strawberry — handmade daily.",
        price: 1100,
        tags: V,
        allergens: ["milk", "soy", "sesame"],
      },
      {
        id: "ds-04",
        name: "Kakigōri",
        description: "Shaved ice, condensed milk, seasonal fruit syrup (ask server for today's flavor).",
        price: 1000,
        tags: VGF,
        allergens: ["milk"],
        badge: "Seasonal",
      },
      {
        id: "ds-05",
        name: "Dorayaki",
        description: "Fluffy honey pancakes, sweet azuki bean paste, whipped cream.",
        price: 900,
        tags: V,
        allergens: ["wheat", "egg", "milk"],
      },
    ],
  },
];

/* ── Quick look-ups ── */

export function getItemById(id: string): MenuItem | undefined {
  for (const cat of menu) {
    const found = cat.items.find((i) => i.id === id);
    if (found) return found;
  }
  return undefined;
}

export function getCategoryByKey(key: string): MenuCategory | undefined {
  return menu.find((c) => c.key === key);
}

export function filterByTag(tag: keyof DietaryTags): MenuItem[] {
  return menu.flatMap((c) => c.items.filter((i) => i.tags[tag]));
}
