import { useMonopoly } from "./hooks/useMonopoly"
import coordinate from "../components/text/map"
import styled from "styled-components"
import Dice from "../components/Dice"

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
    top:-37vh;
    left:-20vw;
`

const Testp = styled.p`
    position:absolute;
    z-index:3;
    left:35vw;
    top:50vh;
`

const Map = ()=>{

    const map_img = require("../picture/map/map.png")

    return<>
        <Dice/>
        <Camera>
            <Map_Img src={map_img}/>
            <Testp>中</Testp>
        </Camera>
    </>
}

export default Map