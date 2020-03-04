export const randomNumber = (min, max) => {
    return Math.floor(Math.random() * max + min);
  };
  
export const randomNumbers = (min, max, count) => {
  const numbers = [];

  for (let i = 0; i < count; i++) {
    const number = Math.floor(randomNumber(min, max));
    if (numbers.indexOf(number) === -1) numbers.push(number);
    else i--;
  }

  return numbers.sort((a, b) => a > b);
};
  