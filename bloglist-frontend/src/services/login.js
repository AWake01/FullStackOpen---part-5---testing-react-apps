import axios from "axios";
const baseUrl = "/api/login";

const login = async (credidentials) => {
  const response = await axios.post(baseUrl, credidentials);
  console.log(response.data);
  return response.data;
};

export default { login };
