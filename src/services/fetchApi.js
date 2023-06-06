export const fetchApi = async (url, state, setState) => {
  try {
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();

    const { meals } = data;
    const { drinks } = data;

    setState({ ...state, meals, drinks, data });
  } catch (error) {
    console.log(error.message);
  }
};
