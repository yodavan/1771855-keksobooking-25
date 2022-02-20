const getRandomNumber = (min, max) => {
  if (max > min && min >= 0 && max > 0) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }
  throw new RangeError('Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль');
};


const getRandomNumberAfterTheComma = (min, max, numberAfterTheComma) => {
  if (max > min && min >= 0 && max > 0 && numberAfterTheComma >= 0 && numberAfterTheComma <= 5) {
    const number = Math.random()*(max-min) + min;
    return parseFloat(number.toFixed(numberAfterTheComma));
  }
  throw new RangeError('Ошибочные значения диапазона: первое значение должно быть меньше второго, а также диапазон может быть только положительный, включая ноль. Третье заначение не может быть больше 5, а также диапазон может быть только положительный, включая ноль');
};
