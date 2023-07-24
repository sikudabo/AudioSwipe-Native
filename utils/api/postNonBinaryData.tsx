import axios from 'axios';
import { baseUrl } from '../constants';

type PostBinaryDataProps = {
    data: any;
    url: string;
};

export const postNonBinaryData = async ({ data, url }: PostBinaryDataProps) => {
    console.log('The base uri is:', baseUrl);
    return await axios({
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
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