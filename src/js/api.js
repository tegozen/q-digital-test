import data from "./data";


export const api = {
  dataByid: id => data.find((_data) => id === _data.id)
}

export default api;