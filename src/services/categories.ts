// import axios from "axios";
import { CATEGORIES } from "../mock/mock";

interface Category {
    name: string;
    icon: string;
    backgroundColor: string;
}

const api = {
    getAllCategories: async (): Promise<Array<Category>> => {
        // return axios
        //   .get(`/accounts`)
        //   .then((response) => response.data);
        return new Promise(function (resolve) {
            return setTimeout(() => resolve(CATEGORIES), 100);
            // return setTimeout(() => reject(), 1500);
        });
    },
};

export default api;
