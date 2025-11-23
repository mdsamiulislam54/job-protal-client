import axios from "axios";
// http://localhost:5000/
//  baseURL: "https://job-protal-psi.vercel.app/api", 
const api = axios.create({
  baseURL: "http://localhost:5000/api", 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});





export default api;
