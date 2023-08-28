import axios from 'axios';
import { baseUrl } from '../constants';

type DeleteNonBinaryDataProps = {
    data: any;
    url: string;
};

export const deleteNonBinaryData = async ({ data, url }: DeleteNonBinaryDataProps) => {
    return await axios({
        data: data,
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'DELETE',
        url: `${baseUrl}${url}`,
    }).then(response => {
        return response.data;
    }).catch(e => {
        const { success, message } = e.response.data;
        return { success, message };
    });
}