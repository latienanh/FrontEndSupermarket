import axios from 'axios';
import { LoginRequest, SignupRequest } from '~/Model/ModelRequest/AuthModelRequest';
import { LoginResponse } from '~/Model/ModelResponse/AuthModelResponse';

const API_URL = process.env.REACT_APP_API_URL;

//push{user}
const apiAuth = {
    login: async (model: LoginRequest) => {
        try {
            const jsonData = JSON.stringify(model);
            const res = await axios.post(`${API_URL}/Auth/Login`, jsonData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                const data: LoginResponse = res.data;
                return data;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    sigup: async (model: SignupRequest) => {
        try {
            const res = await axios.put(`${API_URL}/Auth`, model);

            if (res.status === 200) {
                return true;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
};

export { apiAuth };
