import { createContext, useContext, useState ,useEffect} from 'react';
import { useQuery, useMutation, useSubscription } from "@apollo/client";

const MonopolyContext = createContext({
    isStarted : false
});
const MonopolyProvider = (props) => {
    const [isStarted,setIsStarted] = useState(false)

    return (
        <MonopolyContext.Provider
            value={{isStarted,setIsStarted}}
            {...props}
        />
    );
};

const useMonopoly = (isStarted,setIsStarted) => useContext(MonopolyContext);
export { MonopolyProvider, useMonopoly };