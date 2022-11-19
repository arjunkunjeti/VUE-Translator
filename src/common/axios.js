import axios from "axios";

const language = axios.create({
  baseURL: "https://libretranslate.de",
});

export { language };
