import { Button,Modal} from 'antd'
import { useState,useRef,useEffect} from 'react'
import styled from "styled-components"
import { useMonopoly } from './hooks/useMonopoly'
import "./CSS/ChooseCharacter.css"
import Introduction from '../components/Introduction'

const Background_img = styled.img`
    position:absolute;
    top:0;
    left:17vw;
    height:100vh;
    cursor:default;
`
const FrameWrapper = styled.div`
    height:0vh;
    width:14vw;
    position:absolute;
    cursor:pointer;
`
const Frame_img = styled.img`
    height:40vh;
    width:14vw;
    z-index:1;
`
const Charcter_img = styled.img`
    position : relative;
    left:2vw;
    top:-85vh;
    height:30vh;
    width:10vw;
    cursor:pointer;
    z-index:2;
`
const IntroWrapper = styled.div`
    position: absolute;
    width:30vw
`
const IntroBackground = styled.img`
    position : absolute;
    height:40vh;
    width:30vw;
    z-index:3;
`
const Fire_img = styled.img`
    position:relative;
    top:-49vh;
    left:-5.5vh;
    height:50vh;
    width:20vw;
    z-index:4;
`
const Chain_img = styled.img`
    position : absolute;
    height:40vh;
    width:16vw;
    z-index:4;
    top:32Vh;
    left:67vw;
`


const ChooseCharacter = ()=>{

    const {Mode,setMode,setIsSelected,setIsCharacterChoosed,Players,setPlayers,myPlayerPos,currentPlayers,
        upDatePlayers,roomId} = useMonopoly()
    const background_img = require("../picture/choose_character/background.png");
    const frame_img = require("../picture/choose_character/frame.png")
    const intro_img = require("../picture/choose_character/white.png")
    const fire_img = require("../picture/choose_character/fire/fire.gif")
    const chain_img = require("../picture/choose_character/chain.png")
    const id_list = [0,1,2,3,4,5,6]
    const frame_list = ["c0","c1","c2","c3","c4","c5","c6"]
    const c0 = require("../picture/character/c0.png")
    const c1 = require("../picture/character/c1.png")
    const c2 = require("../picture/character/c2.png")
    const c3 = require("../picture/character/c3.png")
    const c4 = require("../picture/character/c4.png")
    const c5 = require("../picture/character/c5.png")
    const c6 = require("../picture/character/c6.png")
    const Charcter_img_list = [c0,c1,c2,c3,c4,c5,c6]
    const selecting = (key)=>{
        let temp = currentPlayers;
        temp[myPlayerPos].character = key
        upDatePlayers(temp,roomId);
        setIsCharacterChoosed(true);
    }
    

    return (
        <div>
            <Background_img src={background_img} alt="background" id="home_img"/>
            {id_list.map((id)=>{
                return <>
                    <FrameWrapper id={frame_list[id]}>
                        <Frame_img src={frame_img} alt="frame" />
                        <Fire_img src={fire_img} alt="fire" id={"f"+id} onClick={e=>selecting(id)} className={Mode!==1?id===6?"disable":"":""}/>
                        <Charcter_img src={Charcter_img_list[id]} alt={id} key={id} className={Mode!==1?id===6?"disable":"":""}/>
                        <IntroWrapper id={"i"+id} >
                            <IntroBackground src={intro_img} alt="intro" className={Mode!==1?id===6?"disable":"":""}/>
                            <Introduction n={id} Mode={Mode}/>
                        </IntroWrapper>
                    </FrameWrapper>
                </>
            })}
            <Chain_img src={chain_img} alt="chain" className={Mode===1?"disable":""}/>
            
        </div>
    );
}

export default ChooseCharacter