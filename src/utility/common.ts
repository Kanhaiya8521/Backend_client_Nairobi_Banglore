export const generateRandomCode = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;

  const firstCharIndex = Math.floor(Math.random() * (charactersLength - 10));

  result += characters.charAt(firstCharIndex);
  counter += 1;

  while (counter < length) {
    const randomIndex = Math.floor(Math.random() * charactersLength);
    result += characters.charAt(randomIndex);
    counter += 1;
  }
  return result;
};

export const randomNumber = (digit: number): string => {
  return ("" + Math.random()).substring(2, digit + 2);
};
