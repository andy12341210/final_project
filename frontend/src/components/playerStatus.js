import { useMonopoly } from "../containers/hooks/useMonopoly";
import styled from "styled-components";
import "./CSS/playerStatus.css"
import { useEffect } from "react";
import { Charcter_img_list } from "./PictureIndex";

const PlayerStatusWrapper = styled.div`
    position:absolute;
    width:14vw;
    height:22vh;
    right:0.5vw;
    background-color: #D3D3D3;
    border-radius:5vh;
    z-index:3;
`

const PlayerName = styled.p`
    color: black;
    font-family: "Papyrus";
    -webkit-text-stroke: 0.6px black;
    font-size: 2.5vh;
    position: relative;
    top:2vh;
    left:1vw;
    cursor: default;
`

const Playerstatus = styled.p`
    color: black;
    font-family: "Papyrus";
    -webkit-text-stroke: 0.2px black;
    font-size: 2.5vh;
    position: relative;
    top:3vh;
    left:1vw;
    cursor: default;
`

const Charcter_img = styled.img`
    position : relative;
    left:8vw;
    top:-11vh;
    height:15vh;
    width:5vw;
    z-index:2;
`

const PlayerStatus = ()=>{

    const {Players,roomState} = useMonopoly();

    return <>
        {
        Players.map((e,index)=>{
            return <PlayerStatusWrapper id={"b"+index} className={roomState.currentPlayer === index?"isPlaying":"notPlaying"}>
                <PlayerName>{e.name}</PlayerName>
                <Playerstatus>{"Money:"}<br/>{""+e.money}</Playerstatus>
                <Charcter_img src={Charcter_img_list[e.character]}/>
            </PlayerStatusWrapper>
        })
    }</>
}

export default PlayerStatus