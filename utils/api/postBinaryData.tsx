import axios from 'axios';
import { baseUrl } from '../constants';

type PostBinaryDataProps = {
    data: any;
    url: string;
};

export const postBinaryData = async ({ data, url }: PostBinaryDataProps) => {
    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    return await axios({
        data: data,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        method: 'POST',
        url: `${baseUrl}${url}`,
    }).then(response => {
        return response.data;
    }).catch(e => {
        const { success, message } = e.response.data;
        return { success, message };
    });
}