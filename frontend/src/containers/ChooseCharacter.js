import { Button,Modal} from 'antd'
import { useState,useRef,useEffect} from 'react'
import styled from "styled-components"
import { useMonopoly } from './hooks/useMonopoly'
import "./CSS/ChooseCharacter.css"

const Background_img = styled.img`
    position:absolute;
    top:0;
    left:17vw;
    height:100vh;
    cursor:default;
`
const FrameWrapper = styled.div`
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
    left:-12vw;
    height:30vh;
    width:10vw;
    cursor:pointer;
    z-index:2;
`

const ChooseCharacter = ()=>{

    const {Mode,setMode,isSelected,setIsSelected,setMycharacter} = useMonopoly()
    const background_img = require("../picture/choose_character/background.png");
    const frame_img = require("../picture/choose_character/frame.png")
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
    const selecting = (no)=>{
        setIsSelected(true);
        setMycharacter(no);
    }

    return (
        <div>
            <Background_img src={background_img} alt="background" id="home_img"/>\
            {id_list.map((e)=>{
                return <FrameWrapper id={frame_list[e]}>
                    <Frame_img src={frame_img} alt="frame" />
                    <Charcter_img src={Charcter_img_list[e]} alt={e} key={e} onClick={selecting(e)}/>
                </FrameWrapper>
            })}
        </div>
    );
}

export default ChooseCharacter