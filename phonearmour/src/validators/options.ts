// bg-stone-900 border-stone-900
// bg-blue-950 border-blue-950
// bg-red-950 border-red-950

import { PRODUCTS_PRICES } from "@/config/products";

export const COLOURS = [
  {label: "Black", value: "black", tw: "stone-900"},
  {label: "Blue", value: "blue", tw: "blue-950"},
  {label: "Red", value: "red", tw: "red-950"}
] as const;

export const MODELS = {
  name: "models",
  options: [
    {
      label: "iPhone X",
      value: "iphoneX"
    },
    {
      label: "iPhone 11",
      value: "iphone11"
    },
    {
      label: "iPhone 12",
      value: "iphone12"
    },
    {
      label: "iPhone 13",
      value: "iphone13"
    },
    {
      label: "iPhone 14",
      value: "iphone14"
    },
  ]
} as const;

export const MATERIALS = {
  name: "material",
  options: [
    {
      label: "Silicone",
      value: "silicone",
      description: undefined,
      price: PRODUCTS_PRICES.material.silicone
    },
    {
      label: "Soft Polycarbonate",
      value: "polycarbonate",
      description: "Scratch-resistant coating",
      price: PRODUCTS_PRICES.material.polycarbonate
    }
  ]
} as const;

export const FINISHES = {
  name: "finish",
  options: [
    {
      label: "Smooth Finish",
      value: "smooth",
      description: undefined,
      price: PRODUCTS_PRICES.finish.smooth
    },
    {
      label: "Textured Finish",
      value: "textured",
      description: "Soft grippy texture",
      price: PRODUCTS_PRICES.finish.textured
    }
  ]
} as const;