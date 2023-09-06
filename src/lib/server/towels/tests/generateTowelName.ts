const sizes = ["small", null, "small", null, "large", null, null];

const colors = [
  "gray",
  "blue",
  "orange",
  "purple",
  "green",
  "red",
  "pink",
  "black",
  "white",
];

const details = [
  "with bands",
  null,
  null,
  "with flowers",
  null,
  null,
  "with palms",
  null,
  null,
  "with text",
  null,
];

const traits = [sizes, colors, details];

let i = 0;

const capitalize = (str: string) =>
  str.length ? `${str.charAt(0).toUpperCase()}${str.slice(1)}` : str;

export const generateTowelName = () =>
  capitalize(
    traits
      .map((arr) => arr[i++ % arr.length])
      .filter((a) => a)
      .join(" ")
  );
