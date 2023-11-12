import axios from "axios";

export const postOrder = async (body = {}) => {
  await axios.post("http://localhost:8080/orders", body);
};
