import axios from "axios";
import { hashPassword } from "./hash";

const api = {
  url: "http://127.0.0.1:3001",
};

const submit_login = async function (username, password) {
  const hashedpassword = await hashPassword(password);
  const hash_str = hashedpassword.toString();
  console.log("username: "+username+"\npassword: "+hash_str);
  await axios.post(`${api.url}/login`, {
    username: username,
    password: password
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error: ', error);
  });
};

export {submit_login};
