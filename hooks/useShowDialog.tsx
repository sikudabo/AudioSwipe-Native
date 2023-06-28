import { create} from 'zustand';

type ShowDialogStateType = {
    isDialogVisible: boolean;
    message: string;
};

type ShowDialogActionsType = {
    handleDialogMessageChange: (isOpen: boolean) => void;
    setDialogMessage: (message: string) => void;
}

export const useShowDialog = create<ShowDialogActionsType & ShowDialogStateType>()((set) => ({
    handleDialogMessageChange: (isOpen: boolean) => set(() => ({ isDialogVisible: isOpen })),
    isDialogVisible: false,
    message: '',
    setDialogMessage: (message: string) => set(() => ({ message })),
}));