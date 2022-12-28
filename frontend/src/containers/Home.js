import {useMonopoly} from "./hooks/useMonopoly";

const Home = () => {
    const {isStarted,setIsStarted} = useMonopoly();

    return (
        <>
            <image src="../../../picture/home_screen/home_screen.png"/>
        </>
    );
}

export default Home