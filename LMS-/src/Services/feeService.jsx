export const feeStructure = [
    { class: 1, monthly: 1000, annual: 12000 },
    { class: 2, monthly: 1100, annual: 13200 },
    { class: 3, monthly: 1200, annual: 14400 },
    { class: 4, monthly: 1300, annual: 15600 },
    { class: 5, monthly: 1400, annual: 16800 },
    { class: 6, monthly: 1500, annual: 18000 },
    { class: 7, monthly: 1600, annual: 19200 },
    { class: 8, monthly: 1700, annual: 20400 },
    { class: 9, monthly: 1800, annual: 21600 },
    { class: 10, monthly: 1900, annual: 22800 },
  ];
  
  export const getFeeByClass = (className) => 
    feeStructure.find(fee => fee.class === parseInt(className)
);