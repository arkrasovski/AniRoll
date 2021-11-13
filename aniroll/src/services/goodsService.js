import Axios from "axios";

class GoodsService {
  getGoods = async (type, offset = 1) => {
    return await Axios.get(
      `http://localhost:3002/api/get${type}/?page=${offset}`
    );
  };

  getGoodFromId = async (type, id) => {
    return await Axios.get(`http://localhost:3002/api/get${type}FromId/${id}`);
  };

  postGood = async (type, good) => {
    return await Axios.post(`http://localhost:3002/api/create${type}`, good);
  };

  changeGood = async (type, id, good) => {
    return await Axios.post(
      `http://localhost:3002/api/change${type}FromId/${id}`,
      good
    );
  };

  deleteGood = async (type, id) => {
    return await Axios.delete(`http://localhost:3002/api/delete${type}/${id}`);
  };
}

export default GoodsService;
