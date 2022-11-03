import axios from "axios";
const API_KEY = "c7d46a4ba50b";
// const SECRET_KEY=d6cea7c1a239793bef3c02e4ebe0238d

const instance = axios.create({
  baseURL: "https://api.betaseries.com",
  headers: { "X-BetaSeries-Key": API_KEY, "X-BetaSeries-Version": 3.0 },
});

export default instance;
