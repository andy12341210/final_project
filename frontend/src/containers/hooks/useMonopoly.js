import { createContext, useContext, useState ,useEffect} from 'react';
import { useQuery, useMutation, useSubscription } from "@apollo/client";

const MonopolyContext = createContext({
    isStarted : false,
    isSelected: false,
    isCharacterChoosed: false,
    isPrepared: false,
    isPrepareds:[],
    playerNames:[],
    playerCharacters:[],
    Mode: 0
});
const MonopolyProvider = (props) => {
    const [isStarted,setIsStarted] = useState(false)
    const [isSelected,setIsSelected] = useState(false)
    const [isCharacterChoosed,setIsCharacterChoosed] = useState(false)
    const [isPrepared,setIsPrepared] = useState(false)
    const [isPrepareds,setIsPrepareds] = useState([false,false,false,false])
    const [playerNames,setPlayerNames] = useState(["等待新玩家...","等待新玩家...","等待新玩家...","等待新玩家..."])
    const [playerCharacters,setPlayerCharacters] = useState([7,7,7,7])
    const [Mode,setMode] = useState(0)
    return (
        <MonopolyContext.Provider
            value={{isStarted,setIsStarted,Mode,setMode,isSelected,setIsSelected,playerCharacters,setPlayerCharacters,
                isCharacterChoosed,setIsCharacterChoosed,isPrepared,setIsPrepared,isPrepareds,setIsPrepareds,
                playerNames,setPlayerNames,
            }}
            {...props}
        />
    );
};

const useMonopoly = () => useContext(MonopolyContext);
export { MonopolyProvider, useMonopoly };