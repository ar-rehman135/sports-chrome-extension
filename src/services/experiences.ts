// import axios from "axios";
import { EXPERIENCES } from "../mock/mock";

const api = {
    getExperiences: async (): Promise<Array<any>> => {
        // return axios
        //   .get(`/experiences`)
        //   .then((response) => response.data);
        return new Promise(function (resolve) {
            return setTimeout(() => resolve(EXPERIENCES.other), 100);
            // return setTimeout(() => reject(), 1500);
        });
    },

    searchExperience: async (): Promise<Array<any>> => {
        // return axios
        //   .get(`/experiences`)
        //   .then((response) => response.data);
        return new Promise(function (resolve) {
            return setTimeout(() => resolve(EXPERIENCES.other), 100);
            // return setTimeout(() => reject(), 1500);
        });
    }
};

export default api;
