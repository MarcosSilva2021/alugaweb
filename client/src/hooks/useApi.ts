import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API  // raiz da api - recebe a url
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        //criou para testes
        /*return {
            user: { id: 3, name: 'José', email: 'jose@gmail.com' }
        };*/
        //comunicação com o back-end
        const response = await api.post('/fazerlogin', { token });
       return response.data;
       
    },
    signin: async (email: string, password: string) => {
        //criou para testes
       /*  return {
            user: { id: 3, name: 'José', email: 'jose@gmail.com' },
            token: '123456789'
        };*/
        //comunicação com o back-end
        const response = await api.post('/fazerlogin', { email, password });
        return response.data;
    },
    logout: async () => {
        //criou para testes
       // return { status: true };
        //comunicação com o back-end
        const response = await api.post('/logout');
        return response.data;
    }
});