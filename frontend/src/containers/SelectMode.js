import { Button,Modal} from 'antd'
import { useState,useRef,useEffect} from 'react'
import styled from "styled-components"
import { useMonopoly } from './hooks/useMonopoly'

const Background_img = styled.img`
    position:absolute;
    top:0;
    left:17vw;
    height:100vh;
    cursor:default;
`
const ButtonsWrapper = styled.div`
    position:absolute;
    display:flex;
    top:40vh;
    left:47vw;
    width:10vw;
    height:60vh;
    flex-wrap: wrap
`
const SelectWord = styled.p`
    color: yellow;
    font-family: "Open Sans";
    -webkit-text-stroke: 1px black;
    font-size: 8vh;
    position: absolute;
    top: 10vh;
    left: 41.5vw;
    cursor: default;
`

const SelectMode = ()=>{

    const {Mode,setMode,isSelected,setIsSelected} = useMonopoly()
    const home_screen_img = require("../picture/home_screen/204.png");

    const selecting = ()=>{
        setIsSelected(true);
    }

    return (
        <div>
            <Background_img src={home_screen_img} alt="background" id="home_img"/>
            <SelectWord>請選擇模式</SelectWord>
            <ButtonsWrapper>
                <Button type='primary' size='large' onClick={selecting}>多人模式</Button>
                <Button type='primary' size='large'>人機對戰</Button>
                <Button type='primary' size='large'>創建房間</Button>
            </ButtonsWrapper>
        </div>
    );
}

export default SelectMode
