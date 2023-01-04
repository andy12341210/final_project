import styled from "styled-components";
import { useMonopoly } from "./hooks/useMonopoly";
import { Charcter_img_list } from "../components/PictureIndex";

const Background_img = styled.img`
    position:absolute;
    top:0;
    left:17vw;
    height:100vh;
    cursor:default;
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
    top:4vh;
    left:2vw;
    cursor: default;
`
const Charcter_img = styled.img`
    position : relative;
    left:15vw;
    top:-3vh;
    height:21vh;
    width:7vw;
    z-index:2;
`
const Playerstatus = styled.p`
    color: black;
    font-family: "Papyrus";
    -webkit-text-stroke: 0.2px black;
    font-size: 4vh;
    position: relative;
    top:-15vh;
    left:2vw;
    cursor: default;
`
const End = ()=>{

    const background_img = require("../picture/graduation/graduation.png")
    const {Players} = useMonopoly()

    return<>
        <Background_img src={background_img}/>
        {Players.map((e,id)=>{
            return <PlayerWrapper id={"p"+id} alt="" key={id}>
                <PlayerName>{e.name}</PlayerName>
                <Charcter_img src={Charcter_img_list[e.character]}/>
                <Playerstatus>{"Money:"}<br/>{""+e.money}</Playerstatus>
            </PlayerWrapper>
        })}
    </>
}

export default End