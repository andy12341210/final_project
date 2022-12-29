import { Button,Modal} from 'antd'
import { useState,useRef,useEffect} from 'react'
import styled from "styled-components"
import { useMonopoly } from './hooks/useMonopoly'
import "./CSS/Preparing.css"

const Background_img = styled.img`
    position:absolute;
    top:0;
    left:17vw;
    height:100vh;
    cursor:default;
`
const ButtonWrapper = styled.div`
    position:absolute;
    top:85vh;
    left:45.5vw;
`
const PlayerWrapper = styled.div`
    position:absolute;
    width:25vw;
    height:30vh;
    background-color: #D3D3D3;
    border-radius:5vh;
`
const PlayerName = styled.p`
    color: black;
    font-family: "Papyrus";
    -webkit-text-stroke: 1px black;
    font-size: 4vh;
    position: relative;
    top:2vh;
    left:2vw;
    cursor: default;
`
const Charcter_img = styled.img`
    position : relative;
    left:12vw;
    top:-3vh;
    height:15vh;
    width:5vw;
    z-index:2;
`
const BtnStyle0 = { position:"relative" ,left:"-4vw"};
const BtnStyle1 = { width:"10vw" ,borderColor: "black",height: "10vh",fontSize:"1.5vw"};
const BtnStyle2 = { background: "#00FF00", borderColor: "green",width:"10vw" ,height: "10vh" ,fontSize:"1.5vw"}

const Preparing = ()=>{

    const {Mode,setMode,isPrepared,setIsPrepared,isPrepareds,setIsPrepareds,playerNames,playerCharacters,setPlayerCharacters,
        myPlayerPos,setIsCharacterChoosed} = useMonopoly()
    const background_img = require("../picture/choose_character/background.png");
    const id_list = [0,1,2,3];
    const c0 = require("../picture/character/c0.png")
    const c1 = require("../picture/character/c1.png")
    const c2 = require("../picture/character/c2.png")
    const c3 = require("../picture/character/c3.png")
    const c4 = require("../picture/character/c4.png")
    const c5 = require("../picture/character/c5.png")
    const c6 = require("../picture/character/c6.png")
    const c7 = require("../picture/character/c7.png")
    const Charcter_img_list = [c0,c1,c2,c3,c4,c5,c6,c7]

    const prepareTrigger = ()=>{
        setIsPrepared(!isPrepared);
        let temp = isPrepareds;
        temp[0] = !isPrepared;
        setIsPrepareds(temp);
    }

    const selectChar = ()=>{
        setIsCharacterChoosed(false);
    }
    
    return (
        <div>
            <Background_img src={background_img} alt="background" id="home_img"/>
            {id_list.map((id)=>{
                return <PlayerWrapper id={"p"+id} className={isPrepareds[id]?"IsPrepared":"NotPrepared"} alt="" key={id}>
                    <PlayerName>{playerNames[id]}</PlayerName>
                    <Charcter_img src={Charcter_img_list[playerCharacters[id]]}/>
                    <Button type='primary' style={BtnStyle0} onClick={selectChar} className={id===myPlayerPos?"":"disable"}>選擇角色</Button>
                </PlayerWrapper>
            })}
            <ButtonWrapper>
                {!isPrepared? <Button type='primary' size='large' onClick={prepareTrigger} style={BtnStyle1}>準備中...</Button>:
                    <Button  size='large' onClick={prepareTrigger} style={BtnStyle2}>已準備</Button>
                }
            </ButtonWrapper>
        </div>
    );
}

export default Preparing