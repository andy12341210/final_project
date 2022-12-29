import {useMonopoly} from "./hooks/useMonopoly";
import styled from 'styled-components'
import { useEffect,useState } from "react";
import "./CSS/Home.css"
import { NameModal } from "../components/Modals";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`

const HomeImg = styled.img`
    height:100vh;
    cursor:pointer;
`

const Home = () => {
    const {isStarted,setIsStarted,playerNames,setPlayerNames,playerIds,setPlayerIds,createPlayer} = useMonopoly();
    const [isModalOpen,setIsModalOpen] = useState(false);
    const home_screen_img = require("../picture/home_screen/home_screen.png")
    let animateWord = document.getElementById("animateWord")
    let animationInterval

    

    const animation = ()=>{
        animateWord = document.getElementById("animateWord")
        if(!animateWord)return
        animateWord.className = animateWord.className === "display"? "hide":"display"
    }

    useEffect(()=>{
        const animationInterval = setInterval(animation,500)
        return ()=>clearInterval(animationInterval)
    })
    
    const startGame = async(name)=>{
        let temp = playerNames;
        temp[0] = name;
        setPlayerNames(temp);
        let temp2 = playerIds;
        const {data} = await createPlayer({variables:{name:name}});
        let _id = data.createPlayer._id
        temp2[0] = _id;
        setPlayerIds(temp2);
        setIsStarted(true);
        clearInterval(animationInterval);
    }

    const openModal = ()=>{
        setIsModalOpen(true)
    }
    const closeModal = ()=>{
        setIsModalOpen(false)
    }

    return (
        <div>
            <p id="animateWord" className="display" onClick={startGame}>Click to Start</p>
            <HomeImg src={home_screen_img} alt="background" id="home_img" onClick={openModal}/>
            <NameModal
                open={isModalOpen}
                onCreate={startGame}
                onCancel={closeModal}
            />
        </div>
    );
}

export default Home