import axios from "axios";

export const api = axios.create({
  baseURL: "https://thegarage-back.onrender.com"
  //baseURL: "http://localhost:5000"
});



export const postRegistroUsuario = async (nome,email,senha,icone) => {
  return api.post("/cadastro",{nome,email,senha,icone});
}
export const postLoginUsuario = async (nome,senha) => {
  return api.post("/login",{nome,senha});
}