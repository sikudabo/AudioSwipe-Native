import axios from 'axios';
import { baseUrl } from '../constants';

type PostBinaryDataProps = {
    data: any;
    url: string;
};

export const putBinaryData = async ({ data, url }: PostBinaryDataProps) => {
    return await axios({
        data,
        headers: {
            'Content-Type': 'multipart/form-data',
            'Content-Encoding': 'mutipart/form-data',
        },
        method: 'PUT',
        url: `${baseUrl}${url}`,
    }).then(response => {
        return response.data;
    }).catch(e => {
        const { success, message } = e.response.data;
        return { success, message };
    });
}