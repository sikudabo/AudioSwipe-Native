import { putBinaryData } from "../../../utils/api";


export default async function saveNewFan({
    data,
}: { data: any }) {
    const newArtist = await putBinaryData({
        data,
        url: 'api/saveFan',
    }).then((data: any) => {
        return data;
    }).catch(e => {
    });

    return newArtist;
}