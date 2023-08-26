import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useShowDialog, useShowLoader } from '../../../hooks';
import { baseUrl } from '../../../utils/constants';
import { useUserData } from '../../../hooks';

export default function useFetchFanLikedSongs() {
    const { fan } = useUserData();
    const { _id: fanId } = fan;
    const { handleDialogMessageChange, setDialogMessage } = useShowDialog();
    const { setIsLoading } = useShowLoader();

    return useQuery(['fetchFanLikedSongs'], async () => {
        setIsLoading(true);

        const likedSongs = await axios({
            method: 'GET',
            url: `${baseUrl}api/get-fan-liked-songs/${fanId}`,
        }).then(res => {
            const { fanLikedSongs, isSuccess } = res.data;
            if (!isSuccess) {
                setDialogMessage(`There was an error retrieving your liked songs!`);
                handleDialogMessageChange(true);
                setIsLoading(false);
                return [];
            }

            setIsLoading(false);
            console.log('The fan liked songs are:', fanLikedSongs.length);
            return fanLikedSongs;
        }).catch(e => {
            const { message } = e.data.message;
            setDialogMessage(message);
            handleDialogMessageChange(true);
            setIsLoading(false);
            return [];
        })

        setIsLoading(false);
        return likedSongs;
    }, {
        staleTime: 0,
        refetchInterval: 0,
    },
  );
}