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
