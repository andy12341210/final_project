import { createContext, useContext, useState ,useEffect} from 'react';
import { useQuery, useMutation, useSubscription } from "@apollo/client";

const MonopolyContext = createContext({
    isStarted : false,
    isSelected: false,
    myCharacter: 0,
    Mode: 0
});
const MonopolyProvider = (props) => {
    const [isStarted,setIsStarted] = useState(false)
    const [isSelected,setIsSelected] = useState(false)
    const [Mode,setMode] = useState(0)
    const [myCharacter,setMycharacter] = useState(0)

    return (
        <MonopolyContext.Provider
            value={{isStarted,setIsStarted,Mode,setMode,isSelected,setIsSelected,myCharacter,setMycharacter}}
            {...props}
        />
    );
};

const useMonopoly = () => useContext(MonopolyContext);
export { MonopolyProvider, useMonopoly };