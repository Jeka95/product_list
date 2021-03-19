import axios from "axios";

const instance = axios.create({
  baseURL: "https://productlist-b19bd-default-rtdb.firebaseio.com/",
});

export default instance;
