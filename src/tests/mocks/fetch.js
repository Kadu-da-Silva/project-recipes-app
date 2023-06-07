const mealsByIngredient = require('./mealsByIngredient');

const fetch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/filter.php?i=Chicken') {
      return Promise.resolve(mealsByIngredient);
    }
    return Promise.reject(new Error('Invalid url'));
  },
});

module.exports = fetch;
