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

    const moving_ani = async(move,temp,isEvent)=>{
        let isBack = (Players[myPlayerPos].character === 1 && !isEvent)&&(gernRandom(3)===0)
        let temparr = temp;
        if(isBack) AbilityModal(1);
        for(let i=0; i<move; i++){
            if(Players[myPlayerPos].character === 2 && !isEvent){
                if(gernRandom(5)===0) {
                    AbilityModal(2)
                    break;
                }
            }
            let pos = temparr[myPlayerPos].position
            let [orit,oril] = [coordinate[pos][0],coordinate[pos][1]]
            temparr[roomState.currentPlayer].position += 1;
            if(isBack)temparr[myPlayerPos].position -= 2;
            if(temparr[myPlayerPos].position>27)temparr[myPlayerPos].position -= 28
            if(temparr[myPlayerPos].position<0)temparr[myPlayerPos].position += 28
            if(temparr[myPlayerPos].position === 0)temparr[myPlayerPos].money += 1000
            pos = temparr[myPlayerPos].position
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
        return temparr
    }

    const modifyMoney = (pos,amount)=>{
        let temp = Players.slice();
        temp[pos].money += amount
        setPlayers(temp)
    }
    
    const Buying =(pos)=>{
        modifyMoney(roomState.currentPlayer,-200)
        if(Players[roomState.currentPlayer].character === 6)modifyMoney(roomState.currentPlayer,100)
        mapStatus[pos][0] = roomState.currentPlayer;
    }
    
    const upgrading =(pos)=>{
        modifyMoney(roomState.currentPlayer,-200)
        if(Players[roomState.currentPlayer].character === 6)modifyMoney(roomState.currentPlayer,100)
        mapStatus[pos][1] += 1;
    }

    const playEvent =async(event,pos)=>{
        let tempE = Players.slice();
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
            const random = gernRandom(8)
            EventModal(random)
            if(random === 0)modifyMoney(roomState.currentPlayer,500)
            else if(random === 1){
                modifyMoney(roomState.currentPlayer,600)
                for(let i = 0; i < 4; i++)modifyMoney(i,-200)
            }
            else if(random === 2)modifyMoney(roomState.currentPlayer,800)
            else if(random === 3)modifyMoney(roomState.currentPlayer,-500)
            else if(random === 4)modifyMoney(roomState.currentPlayer,-300)
            else if(random === 5){
                console.log(tempE[roomState.currentPlayer].isStop)
                tempE[roomState.currentPlayer].isStop += 1
                console.log(tempE[roomState.currentPlayer].isStop)
                setPlayers(tempE)
                if(tempE[roomState.currentPlayer].isStop>0)moving(coordinate[29][0],coordinate[29][1])
            }
            else if(random === 6){
                console.log(tempE[roomState.currentPlayer].isStop)
                tempE[roomState.currentPlayer].isStop -= 1
                console.log(tempE[roomState.currentPlayer].isStop)
                setPlayers(tempE)
            }
            else if(random === 7){
                tempE = await moving_ani(5,tempE,true);
                setPlayers(tempE)
            }
            else if(random === 8)modifyMoney(roomState.currentPlayer,-300)
        }
    }

    const rolling = async()=>{
        if(isGoing)return
        isGoing = true;
        let temp = Players.slice()
        if(Players[roomState.currentPlayer].isStop > 0){
            temp[roomState.currentPlayer].isStop -= 1;
            setPlayers(temp)
            return
        }
        display_ani()
        await sleep(500);
        const move = Dice_number[Players[myPlayerPos].character][gernRandom(6)]
        if(dice)dice.src = dice_imgs[move]
        temp = await moving_ani(move,temp,false)

        for(let i=0; i<4; i++){
            if(Players[roomState.currentPlayer].character === 3){
                if(i !== roomState.currentPlayer && Players[i].position === temp[roomState.currentPlayer].position){
                    AbilityModal(3);
            }} 
        }
        
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
        console.log(Players[roomState.currentPlayer].isStop)
        if(Players[roomState.currentPlayer].character === 5){
            playEvent(2,pos)
        }
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