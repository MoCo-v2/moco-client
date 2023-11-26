export const getRandomColor = () => {
  const random = () => Math.floor(Math.random() * 256);

  const red = random();
  const green = random();
  const blue = random();

  const hexColor = `#${red.toString(16)}${green.toString(16)}${blue.toString(
    16,
  )}`;

  return hexColor;
};
