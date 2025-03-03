import { paramCase } from "change-case";

// ----------------------------------------------------------------------

export const FOUNDATION_LIST = [
  "Colors",
  "Typography",
  "Shadows",
  "Grid",
  "Icons"
].map((item) => ({
  name: item,
  href: `/components/foundation/${paramCase(item)}`,
  icon: `/images/components/${paramCase(item)}.png`,
  icon: `/assets/images/components/${paramCase(item)}.png`
}));

export const MUI_LIST = [
  "Alert",
  "Autocomplete",
  "Avatar",
  "Badge",
  "Breadcrumbs",
  "Buttons",
  "Checkbox",
  "Chip",
  "Dialog",
  "List",
  "Menu",
  "Pagination",
  "Pickers",
  "Popover",
  "Progress",
  "Radio Button",
  "Rating",
  "Slider",
  "Stepper",
  "Switch",
  "Table",
  "Tabs",
  "Textfield",
  "Timeline",
  "Tooltip",
  "Transfer List",
  "TreeView",
  "Data Grid"
].map((item) => ({
  name: item,
  href: `/components/mui/${paramCase(item)}`,
  icon: `/assets/images/components/${paramCase(item)}.png`
}));

export const EXTRA_LIST = [
  "Upload",
  "Multi language",
  "Animate",
  "Mega Menu",
  "Form Validation",
  "Image",
  "Label",
  "Scroll",
  "Snackbar",
  "Text Max Line",
  "Navigation Bar"
].map((item) => ({
  name: item,
  href: `/components/extra/${paramCase(item)}`,
  icon: `/assets/images/components/${paramCase(item)}.png`
}));
