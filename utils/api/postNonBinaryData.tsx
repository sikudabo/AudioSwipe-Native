import axios from 'axios';
import { baseUrl } from '../constants';

type PostBinaryDataProps = {
    data: any;
    url: string;
};

export const postNonBinaryData = async ({ data, url }: PostBinaryDataProps) => {
    return await axios({
        data: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        url: `${process.env.REACT_APP_BASE_URI}${url}`,
    }).then(response => {
        return response.data;
    }).catch(e => {
        const { success, message } = e.response.data;
        return { success, message };
    });
}