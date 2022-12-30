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

    const {Mode,setMode,isSelected,setIsSelected,setIsCharacterChoosed,Players,setPlayers,
        myPlayerPos,joinRoom,myPlayerId,myName,roomId,setRoomId,upDatePlayers} = useMonopoly()
    const home_screen_img = require("../picture/home_screen/204.png");

    const selectingCommon = async()=>{
        setIsSelected(true);
        setIsCharacterChoosed(true);
        const {data} = await joinRoom({variables:{_id:myPlayerId,name:myName}})
        setRoomId(data.joinRoom._id);
        upDatePlayers(data.joinRoom.players,data.joinRoom._id);
    }

    const selecting0 = ()=>{
        selectingCommon();
        setMode(0);
    }
    const selecting1 = ()=>{
        selectingCommon();
        setMode(1);
    }
    const selecting2 = ()=>{
        selectingCommon();
        setMode(2);
    }

    return (
        <div>
            <Background_img src={home_screen_img} alt="background" id="home_img"/>
            <SelectWord>請選擇模式</SelectWord>
            <ButtonsWrapper>
                <Button type='primary' size='large' onClick={selecting0}>多人模式</Button>
                <Button type='primary' size='large' onClick={selecting1}>人機對戰</Button>
                <Button type='primary' size='large' onClick={selecting2}>創建房間</Button>
            </ButtonsWrapper>
        </div>
    );
}

export default SelectMode
