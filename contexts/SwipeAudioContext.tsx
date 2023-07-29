import React, {
    createContext,
    useContext,
    useRef,
    useState,
} from 'react';
import { Audio } from 'expo-av';
import { baseUrl } from '../utils/constants';


const AudioPlayerStateContext = createContext<any>({});
const AudioPlayerUpdateContext = createContext<any>({});

function AudioPlayerContextProvider({ children }: { children: React.ReactNode }) {
    const swipeAudioPlayerRef = useRef();
    const [currentPlayingSongId, setCurrentPlayingSongId] = useState('');
    const [audioSource, setAudioSource] = useState('');
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);

    function changeAudioSource(source: string) {
        (swipeAudioPlayerRef.current as any).src = source;
    }

    async function handlePlayOrPause() {
        if (isAudioPlaying) {
            setIsAudioPlaying(false);
            await (swipeAudioPlayerRef as any).current?.pauseAsync();
            return;
        }

        setIsAudioPlaying(true);
        await (swipeAudioPlayerRef as any).current?.playAsync();
        return;
    }

    async function destroySound() {
        await (swipeAudioPlayerRef as any).current.unloadAsync();
        swipeAudioPlayerRef.current = undefined;
    }

    async function createNewAudioSource(uri: string) {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            staysActiveInBackground: true,
            shouldDuckAndroid: false,
        });

        const { sound } = await Audio.Sound.createAsync({
                uri: `${baseUrl}get-audio/${uri}`,
            }, 
            {
                isLooping: true,
                shouldPlay: true,
            },
        );

        (swipeAudioPlayerRef as any).current = sound;
        (swipeAudioPlayerRef as any).current.playAsync();
    }

    function playAudio() {
        (swipeAudioPlayerRef as any).current.playAsync();
    }

    function stopAudio() {
        (swipeAudioPlayerRef as any).current.stopAsync();
    }

    return (
        <AudioPlayerStateContext.Provider 
            value={{
                swipeAudioPlayerRef,
                audioSource,
                currentPlayingSongId,
            }}
        >
            <AudioPlayerUpdateContext.Provider 
                value={{
                    changeAudioSource,
                    createNewAudioSource,
                    destroySound,
                    playAudio,
                    setAudioSource,
                    setCurrentPlayingSongId,
                    stopAudio,
                }}
            >
                {children}
            </AudioPlayerUpdateContext.Provider>
        </AudioPlayerStateContext.Provider>
    );
}

function useAudioPlayerRef() {
    const context = useContext(AudioPlayerStateContext);
    return context;
}

function useUpdateAudioPlayer() {
    const context = useContext(AudioPlayerUpdateContext);
    return context;
}

export { AudioPlayerContextProvider, useAudioPlayerRef, useUpdateAudioPlayer };