export const RandomDocID = () => {
  const rn = Math.floor(Math.random() * 1000000);
  const randomNumber = rn.toString();

  return (
    Math.random().toString(36).substring(2, 25).concat(randomNumber) +
    Math.random().toString(36).substring(2, 25)
  );
};

export const getRandomID = () => {
  const symbols =
    "-_?.!@#$%^&*()+$-_--_??.!@#$%^&*(&*()+$)&*()+$)))000><<<__!!!+$";
  let randomSymbols = "";
  for (let x = 0; x < 5; x++) {
    randomSymbols =
      randomSymbols +
      symbols.charAt(Math.floor(Math.random() * symbols.length));
  }

  const i = Math.floor(Math.random() * new Date().getTime() * 100000);
  const randomNumber = `${randomSymbols}-${i.toString()}`;

  return randomNumber;
};
