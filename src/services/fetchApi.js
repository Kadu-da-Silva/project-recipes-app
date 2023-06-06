export const fetchApi = async (url, state, setState) => {
  try {
    setState({ ...state });
    const response = await fetch(url);
    const data = await response.json();
    const { meals, drinks } = data;
    if (!meals && !drinks) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    setState({ ...state, meals, drinks, data });
  } catch (error) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};

export const getCategories = async (url, state, setState) => {
  const response = await fetch(url);
  const data = await response.json();
  await setState({ ...state, categories: data });
};
