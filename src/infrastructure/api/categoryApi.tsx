import axios from 'axios';
import { LoginRequest, SignupRequest } from '~/application/model/modelRequest/AuthModelRequest';

const API_URL = process.env.REACT_APP_API_URL;

//push{user}
const apiCategory = {
    getAll: async () => {
        try {
            const res = await axios.get(`${API_URL}/Categories`);
            // if (res.status === 200) {
            //     const data: LoginResponse = res.data;
            //     return data;
            // }
            // return null;
            // console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    // sigup: async (model: SignupRequest) => {
    //     try {
    //         const res = await axios.put(`${API_URL}/Auth`, model);

    //         if (res.status === 200) {
    //             return true;
    //         }
    //         return null;
    //     } catch (error) {
    //         console.log(error);
    //         return null;
    //     }
    // },
};

export { apiCategory };
