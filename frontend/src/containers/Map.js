import { useMonopoly } from "./hooks/useMonopoly"
import {coordinate} from "../components/text/map"
import styled from "styled-components"
import Dice from "../components/Dice"
import PlayerStatus from "../components/playerStatus"
import { useEffect } from "react"

const Camera = styled.div`
    position:absolute;
    height : 100vh;
    width : 70vw;
    overflow: hidden;
    border:1px solid black;
`
const Map_Img = styled.img`
    position:relative;
    height : 200vh;
    width : 135vw;
    top:-60vh;
    left:-68vh;
`
const Icon_img = styled.img`
    position:absolute;
    z-index:3;
    width:10vh;
    height:10vh;
    left:34vw;
    top:45vh;
`

const RoundDisplay = styled.p`
    position:absolute;
    font-size: 2.5vw;
    top:40vh;
    left:2.5vw;

`

const Map = ()=>{

    const map_img = require("../picture/map/map.png")
    const {Players,roomState,round} = useMonopoly();
    const playerIcon0 = require("../picture/character/i0.png")
    const playerIcon1 = require("../picture/character/i1.png")
    const playerIcon2 = require("../picture/character/i2.png")
    const playerIcon3 = require("../picture/character/i3.png")
    const icon_list = [playerIcon0,playerIcon1,playerIcon2,playerIcon3]

    const Map = document.getElementById("map")

    const moving = (t,l)=>{
        if(!Map)return
        Map.style.top = t+"vh"
        Map.style.left = l+"vw"
    }

    useEffect(()=>{
        moving(coordinate[0][0],coordinate[0][0])
    },[roomState.isStarted])

    useEffect(()=>{
        moving(coordinate[Players[roomState.currentPlayer].position][0],
            coordinate[Players[roomState.currentPlayer].position][1])
    },[roomState])

    return<>
        <Dice moving={moving}/>
        <RoundDisplay>第{round}輪</RoundDisplay>
        <Camera>
            <Map_Img src={map_img} id="map"/>
            <Icon_img src={icon_list[roomState.currentPlayer]}/>
        </Camera>
        <PlayerStatus/>
    </>
}

export default Map