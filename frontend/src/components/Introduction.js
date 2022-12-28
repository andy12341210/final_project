import {intro1,intro2,intro3,intro4,intro5,intro6,intro7} from "./text/introduction.js"
import styled from "styled-components"

const Introword = styled.p`
    color: black;
    font-family: "Open Sans";
    -webkit-text-stroke: 1px black;
    font-size: 4vh;
    position: absolute;
    cursor: default;
    z-index:6;
    top:5vh;
    left:5vh;
`

const Introduction = ({n})=>{
    const text_list = [intro1,intro2,intro3,intro4,intro5,intro6,intro7]

    return <Introword>{text_list[n]}</Introword>
}

export default Introduction