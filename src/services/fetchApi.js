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
    console.log(error.message);
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
  }
};
