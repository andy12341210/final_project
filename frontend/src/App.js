import './App.css'
import { useState,useEffect,useRef} from 'react'
import {useMonopoly} from './containers/hooks/useMonopoly'
import Home from './containers/Home'
import SelectMode from './containers/SelectMode'
import ChooseCharacter from './containers/ChooseCharacter'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`

function App() {
  const { isStarted,isSelected} = useMonopoly()

  return (
    <Wrapper>
      {!isStarted ?<Home/>:
        !isSelected?<SelectMode/>:
          <ChooseCharacter/>}
    </Wrapper>
  )
}

export default App
