import { useMonopoly } from "../containers/hooks/useMonopoly";
import styled from "styled-components";
import Dice_number from "./text/dice";
import {coordinate} from "./text/map";
import Place from "./Place";
import { mapName } from "./text/map";

const DiceBox = styled.div`
    position:absolute;
    bottom:4vh;
    left:3vw;
`

const DiceFrame_img = styled.img`
    position:relative;
    width:20vh;
    height:20vh;
`
const Dice_img = styled.img`
    position:relative;
    width:6vh;
    height:6vh;
    cursor:pointer;
    left:-5.9vw;
`
const PhotoWrapper = styled.div`
    position:absolute;
    top:4vh;
    left:0.6vw;
`
const PlacePhoto = styled.img`
    position:relative;
    width:30vh;
    height:20vh;
`
const PlaceContent = styled.p`
    color: black;
    font-family: "Microsoft JhengHei";
    -webkit-text-stroke: 0.6px black;
    font-size: 2.5vh;
    position: relative;
    top:2vh;
    left:1vw;
    cursor: default;
`

const Dice = ({moving})=>{
    const diceFrame_img = require("../picture/dice/dice_background.png")
    const dice0 = require("../picture/dice/0.png")
    const dice1 = require("../picture/dice/1.png")
    const dice2 = require("../picture/dice/2.png")
    const dice3 = require("../picture/dice/3.png")
    const dice4 = require("../picture/dice/4.png")
    const dice5 = require("../picture/dice/5.png")
    const dice6 = require("../picture/dice/6.png")
    const dice7 = require("../picture/dice/7.png")
    const dice8 = require("../picture/dice/8.png")
    const dice9 = require("../picture/dice/9.png")
    const dice10 = require("../picture/dice/10.png")
    const dice_ani = require("../picture/dice/dice_ani.gif")
    const dice_imgs = [dice0,dice1,dice2,dice3,dice4,dice5,dice6,dice7,dice8,dice9,dice10]
    const {Players,myPlayerPos,upDatePlayers,roomId,setPlayers,roomState,setRoomState,isMe,setIsMe} = useMonopoly()
    const dice = document.getElementById("dice")
    const Photo = document.getElementById("photo")
    const placeContent = document.getElementById("placeContent")
    let isGoing = false;

    async function sleep(ms) {
        return new Promise(r => setTimeout(r, ms));
    }

    const gernerateDice = (type)=>{
        const random = Math.floor(Math.random()*6)
        return Dice_number[type][random]
    }

    const display_ani = async()=>{
        if(!dice)return
        dice.src = dice_ani;
    }

    const rolling = async()=>{
        if(isGoing)return
        isGoing = true;
        display_ani()
        await sleep(500);
        const move = gernerateDice(Players[myPlayerPos].character)
        if(dice)dice.src = dice_imgs[move]
        let temp = Players
        for(let i=0; i<move; i++){
            if(Players[myPlayerPos].character === 2){
                if(Math.floor(Math.random()*6)===0) break;
            }
            let pos = temp[myPlayerPos].position
            let [orit,oril] = [coordinate[pos][0],coordinate[pos][1]]
            temp[myPlayerPos].position += 1;
            if(temp[myPlayerPos].position>27)temp[myPlayerPos].position -= 28
            pos = temp[myPlayerPos].position
            const [newt,newl] = [coordinate[pos][0],coordinate[pos][1]]
            const [movet,movel] = [(newt-orit)/20,(newl-oril)/20]
            for(let j=0; j<20; j++){
                orit += movet;
                oril += movel;
                moving(orit,oril);
                await sleep(25)
            }
            moving(newt,newl);
            Photo.src = Place[pos];
            placeContent.innerHTML = mapName[pos];
        }
        
        // await upDatePlayers(temp,roomId);

        /** debug*/
        setPlayers(temp)

        let tempR = roomState
        tempR.currentDice = move
        setRoomState(tempR)
        isGoing = false
    }



    return <>
        <PhotoWrapper>
            <PlacePhoto src={Place[Players[roomState.currentPlayer].position]} alt={Place[Players[roomState.currentPlayer].position]} id="photo"/>
            <PlaceContent id="placeContent">{mapName[Players[roomState.currentPlayer].position]}</PlaceContent>
        </PhotoWrapper>
        <DiceBox>
            <DiceFrame_img src={diceFrame_img}/>
            <Dice_img src={dice_imgs[roomState.currentDice]} onClick={isMe?rolling:()=>{}} id="dice"/>
        </DiceBox>
    </>
}

export default Dice