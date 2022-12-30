import { useMonopoly } from "../containers/hooks/useMonopoly";
import styled from "styled-components";

const DiceBox = styled.div`
    position:absolute;
    bottom:2vh;
    left:1vw;
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


const Dice = ()=>{
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
    const dice_imgs = [dice0,dice1,dice2,dice3,dice4,dice5,dice6,dice7,dice8,dice9,dice10]

    const gernerateNumber = (type)=>{
        
    }



    return <>
        <DiceBox>
            <DiceFrame_img src={diceFrame_img}/>
            <Dice_img src={dice0}/>
        </DiceBox>
    </>
}

export default Dice