export const fetchApi = async (url, state, setState) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const { meals, drinks } = data;
    if (!meals && !drinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setState({ meals, drinks });
  } catch (error) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};

export const getCategories = async (url, setState) => {
  const response = await fetch(url);
  const data = await response.json();
  const categories = (data.drinks) ? data.drinks : data.meals;
  const five = 5;
  setState([...categories.slice(0, five)]);
};

// Chamada com id
export const fetchApiMeals = async (id, setState) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const resultMeals = await response.json();
  const { meals } = resultMeals;
  setState({ meals });
};

export const fetchApiDrinks = async (id, setState) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const resultDrinks = await response.json();
  const { drinks } = resultDrinks;
  setState({ drinks });
};

// Chamada para retornar apenas os seis primeiros
export const fetchApiMealsForRecommendation = async (setState, setLoading) => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const { meals } = await response.json();
  const MAX = 6;
  const firstSix = meals.slice(0, MAX);
  setState(firstSix);
  setLoading(false);
};

export const fetchApiDrinksForRecommendation = async (setState, setLoading) => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const { drinks } = await response.json();
  const MAX = 6;
  const firstSix = drinks.slice(0, MAX);
  setState(firstSix);
  setLoading(false);
};
