import React from 'react';
import { AudioPlayerContextProvider } from "./contexts/SwipeAudioContext";

type GlobalContextProvidersProps = {
    children: React.ReactNode;
};

export default function GlobalContextProciders({ children }: GlobalContextProvidersProps) {
    return (
        <AudioPlayerContextProvider>
            {children}
        </AudioPlayerContextProvider>
    );
}