export const fetchApi = async (url, state, setState) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    setState({ ...state, data });
  } catch (error) {
    console.log(error.message);
  }
};
