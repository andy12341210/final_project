import { useMonopoly } from "../containers/hooks/useMonopoly";
import styled from "styled-components";
import Dice_number from "./text/dice";
import {coordinate, mapType} from "./text/map";
import {Place,dice_imgs} from "./PictureIndex";
import { mapName } from "./text/map";
import { gernRandom,sleep } from "./Functions";
import { BuyModal,EventModal,upGradeModal,AbilityModal } from "./Modals";

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
    const dice_ani = require("../picture/dice/dice_ani.gif")
    const {Players,myPlayerPos,upDatePlayers,roomId,setPlayers,roomState,setRoomState,isMe,setIsMe,
        mapStatus} = useMonopoly()
    const dice = document.getElementById("dice")
    const Photo = document.getElementById("photo")
    const placeContent = document.getElementById("placeContent")
    let isGoing = false;
    let money_to_modify

    const display_ani = async()=>{
        if(!dice)return
        dice.src = dice_ani;
    }

    const moving_ani = async(move,temp)=>{
        for(let i=0; i<move; i++){
            if(Players[myPlayerPos].character === 2){
                if(gernRandom(6)===0) {
                    let a = AbilityModal(2)
                    console.log(a)
                    break;
                }
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
            const context = `${mapName[pos]}<br/>擁有者：${mapStatus[pos][0]===-1?"":Players[mapStatus[pos][0]].name}<br/>等級：${mapStatus[pos][0]===-1?"":mapStatus[pos][1]}`
            placeContent.innerHTML = context;
        }
        return temp
    }

    const modifyMoney = (pos,amount)=>{
        let temp = Players;
        console.log(temp[pos])
        console.log(Players[pos])
        temp[pos].money += amount
        setPlayers(temp)
    }
    
    const Buying =(pos)=>{
        modifyMoney(roomState.currentPlayer,-100)
        mapStatus[pos][0] = roomState.currentPlayer;
    }
    
    const upgrading =(pos)=>{
        modifyMoney(roomState.currentPlayer,-100)
        mapStatus[pos][1] += 1;
    }

    const playEvent =(event,pos)=>{
        if(event === 1){
            let isOwn;
            if(mapStatus[pos][0] === -1)isOwn = 0;
            else if(mapStatus[pos][0] === myPlayerPos)isOwn = 1;
            else isOwn = 2;
            if(isOwn === 0){
                BuyModal(()=>Buying(pos))
            }
            if(isOwn === 1){
                upGradeModal(()=>upgrading(pos))
            }
        }
        else if(event === 2){
            EventModal(gernRandom(8))
        }
    }

    const rolling = async()=>{
        if(isGoing)return
        isGoing = true;
        display_ani()
        await sleep(500);
        const move = Dice_number[Players[myPlayerPos].character][gernRandom(6)]
        if(dice)dice.src = dice_imgs[move]
        let temp = Players
        temp = await moving_ani(move,temp)
        
        // await upDatePlayers(temp,roomId);

        /** debug*/
        setPlayers(temp)

        let tempR = roomState
        tempR.currentDice = move
        setRoomState(tempR)
        isGoing = false

        const pos = temp[roomState.currentPlayer].position
        const event = mapType[pos];
        let tempm = mapStatus[pos]
        console.log(event)
        playEvent(event,pos)
        
    }



    return <>
        <PhotoWrapper>
            <PlacePhoto src={Place[Players[roomState.currentPlayer].position]} alt={Place[Players[roomState.currentPlayer].position]} id="photo"/>
            <PlaceContent id="placeContent">{mapName[Players[roomState.currentPlayer].position]}<br/>{"擁有者："}<br/>{"等級："}</PlaceContent>
        </PhotoWrapper>
        <DiceBox>
            <DiceFrame_img src={diceFrame_img}/>
            <Dice_img src={dice_imgs[roomState.currentDice]} onClick={isMe?rolling:()=>{}} id="dice"/>
        </DiceBox>
    </>
}

export default Dice