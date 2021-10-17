import Axios from "axios";

class GoodsService {
  getGoods = async (type, offset = 1) => {
    return await Axios.get(
      `http://localhost:3002/api/get${type}/?page=${offset}`
    );
  };
}

export default GoodsService;
