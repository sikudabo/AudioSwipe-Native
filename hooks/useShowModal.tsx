import { create} from 'zustand';

type ShowModalStateType = {
    isModalOpen: boolean;
};

type ShowModalActionsType = {
    setModalVisible: (isOpen: boolean) => void;
};

export const useShowModal = create<ShowModalStateType & ShowModalActionsType>()((set) => ({
    setModalVisible: (isOpen: boolean) => set(() => ({ isModalOpen: isOpen })),
    isModalOpen: false,
}));