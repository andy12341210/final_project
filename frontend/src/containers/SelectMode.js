import { Input,Tabs,Button} from 'antd'
import { useState,useRef,useEffect} from 'react'
import styled from "styled-components"
import { useMonopoly } from './hooks/useMonopoly'

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
`
const ChatBoxWrapper = styled.div`
    height:204px;
    display:flex;
    flex-direction:column;
    overflow-y: scroll;
`

const FootRef = styled.div`
 height: 40px;
`

const SelectMode = ()=>{

    return(
    <></>
    )
}

export default SelectMode
