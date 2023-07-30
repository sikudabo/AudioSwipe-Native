import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useShowDialog, useShowLoader, useUserData } from '../../../../hooks';
import { baseUrl } from '../../../../utils/constants';

type QueryProps = {
    genre: string;
};

export default function useFetchGenre({ genre }: QueryProps) {
    const { fan } = useUserData();
    const { _id } = fan;
    const { setIsLoading } = useShowLoader();
    const { handleDialogMessageChange, setDialogMessage } = useShowDialog();

    return useQuery(['fetchGenre'], async () => {
        setIsLoading(true);
        const songs = await axios({
            method: 'GET',
            url: `${baseUrl}api/fetch-genre/${genre}/${_id}`,
        }).then(response => {
            const { audioClips, isSuccess, message } = response.data;

            if (!isSuccess) {
                setDialogMessage(`There was an error finding ${genre} audio clips. Please try again!`);
                handleDialogMessageChange(true);
                setIsLoading(false);
                return [];
            }

            setIsLoading(false);
            return audioClips;
        }).catch(e => {
            const { message } = e.data.message;
            setDialogMessage(message);
            handleDialogMessageChange(true);
            setIsLoading(false);
            return [];
        });
        setIsLoading(false);
        return songs;
    }, {
        refetchInterval: 1000,
        staleTime: 1,
    });
}