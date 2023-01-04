import { createContext, useContext, useState ,useEffect} from 'react';
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { CREATE_PLAYER_MUTATION,JOIN_ROOM_MUTATION,UPDATE_PLAYERS_MUTATION,LEAVE_ROOM_MUTATION,UPDATE_ROOM_MUTATION,DELETE_ROOM_MUTATION } from '../../graphql/mutations';
import { ROOM_QUERIES } from '../../graphql/queries';
import {PLAYER_UPDATE_SUBSCRIPTION,ROOM_UPDATE_SUBSCRIPTION,END_GAME_SUBSCRIPTION} from "../../graphql/subscriptions"
import { mapOwner } from '../../components/text/map';

const MonopolyContext = createContext({
    isStarted : false,
    isSelected: false,
    isCharacterChoosed: false,
    isGameEnd: false,
    roomState: {},
    isMe:false,
    isPrepared: false,
    Players:[],
    currentPlayers:[],
    myPlayerPos: 0,
    myPlayerId:"",
    myName:"",
    roomId:"",
    Mode: 0,
    isEnd: false,
    round: 0,
});
const template0 = {_id:"",name:"等待新玩家...",isPrepared:false,character:7,money:2000,position:0,isStop:0}
const template1 = {_id:"",name:"等待新玩家...",isPrepared:false,character:7,money:2000,position:0,isStop:0}
const template2 = {_id:"",name:"等待新玩家...",isPrepared:false,character:7,money:2000,position:0,isStop:0}
const template3 = {_id:"",name:"等待新玩家...",isPrepared:false,character:7,money:2000,position:0,isStop:0}
const template = [template0,template1,template2,template3];
const RoomTemplate = { isFull:false,playerAmount:0,isStarted:false,currentPlayer:0,currentDice:1,mapStatus:mapOwner}

const MonopolyProvider = (props) => {

    const [isStarted,setIsStarted] = useState(false)
    const [isSelected,setIsSelected] = useState(false)
    const [isCharacterChoosed,setIsCharacterChoosed] = useState(true)
    const [isGameEnd,setIsGameEnd] = useState(false)
    const [roomState,setRoomState] = useState(RoomTemplate)
    const [isMe,setIsMe] = useState(true)
    const [isPrepared,setIsPrepared] = useState(false)
    const [Players,setPlayers] = useState(template)
    const [currentPlayers,setCurrentPlayers] = useState([])
    const [myPlayerPos,setMyPlayerPos] = useState(0)
    const [myPlayerId,setMyPlayerId] = useState("")
    const [myName,setMyName] = useState("")
    const [roomId,setRoomId] = useState("63ae6a00462aad7ddca66d80")
    const [Mode,setMode] = useState(0)
    const [isEnd,setIsEnd] = useState(false)
    const [round,setRound] = useState(0)

    const [createPlayer] = useMutation(CREATE_PLAYER_MUTATION)
    const [joinRoom] = useMutation(JOIN_ROOM_MUTATION)
    const [leaveRoom] = useMutation(LEAVE_ROOM_MUTATION)
    const [upDatePlayersToDB] = useMutation(UPDATE_PLAYERS_MUTATION)
    const [upDateRoom] = useMutation(UPDATE_ROOM_MUTATION)
    const [deleteRoom] = useMutation(DELETE_ROOM_MUTATION);
    const { loading, error, subscribeToMore} = useQuery(ROOM_QUERIES,{variables:{_id:roomId}});

    const upDatePlayers = async(Ps,id)=>{
        await upDatePlayersToDB({variables:{players:Ps,_id:id}})
        setCurrentPlayers(Ps)
        const temp = Players
        for(let i=0; i<4; i++){
            if(i<Ps.length){
                temp[i] = Ps[i];
                if(Ps[i]._id === myPlayerId){
                    setMyPlayerPos(i);
                }
            }
            else{
                temp[i] = template[i]
            }
        }
        setPlayers(temp)
    }

    const upDatePlayersfromDB = async(Ps)=>{
        setCurrentPlayers(Ps)
        const temp = Players
        for(let i=0; i<4; i++){
            if(i<Ps.length){
                temp[i] = Ps[i];
                if(Ps[i]._id === myPlayerId){
                    setMyPlayerPos(i);
                }
            }
            else{
                temp[i] = template[i];
            }
        }
        setPlayers(temp)
    }
    

    useEffect(
        () => {
            subscribeToMore({
            document: PLAYER_UPDATE_SUBSCRIPTION,
            variables:{_id:roomId},
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return;
                const data = subscriptionData.data.playerUpdate;
                if(!data)return
                setCurrentPlayers(data);
                upDatePlayersfromDB(data);
            },
            });
        },
        [subscribeToMore,roomId],
    );

    useEffect(
        () => {
            subscribeToMore({
            document: ROOM_UPDATE_SUBSCRIPTION,
            variables:{_id:roomId},
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return;
                const data = subscriptionData.data.roomStateUpdate;
                if(!data)return
                let myplayerpos
                for(let i = 0; i<4; i++){
                    if(Players[i]._id === myPlayerId) myplayerpos = i
                }
                if(data.currentPlayer === myplayerpos){
                    setIsMe(true)
                    setIsEnd(false)
                }
                else setIsMe(false)
                setRoomState(data)
            },
            });
        },
        [subscribeToMore,roomId],
    );

    useEffect(
        () => {
            subscribeToMore({
            document: END_GAME_SUBSCRIPTION,
            variables:{_id:roomId},
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return;
                const data = subscriptionData.data.endGame;
                console.log(data)
                if(data){
                    setIsGameEnd(true);
                }
            },
            });
        },
        [subscribeToMore,roomId],
    );

    useEffect(()=>{
        if(isEnd){
            let nextPlayer = roomState.currentPlayer+1
            if(nextPlayer>3)nextPlayer-=4
            upDateRoom({variables:{mapStatus:roomState.mapStatus,currentPlayer:(nextPlayer),_id:roomId}})
            setRound(round+1)
            console.log(round)
            if(myPlayerPos === 3 && round+1 === 15){
                deleteRoom({variables:{_id:roomId}})
            }
        }
    },[isEnd])

    return (
        <MonopolyContext.Provider
            value={{isStarted,setIsStarted,Mode,setMode,isSelected,setIsSelected,isCharacterChoosed,setIsCharacterChoosed,
                isPrepared,setIsPrepared,createPlayer,myPlayerPos,setMyPlayerPos,joinRoom,myPlayerId,setMyPlayerId,
                myName,setMyName,roomId,setRoomId,Players,setPlayers,upDatePlayers,upDatePlayersToDB,currentPlayers,setCurrentPlayers,
                upDatePlayersfromDB,leaveRoom,roomState,setRoomState,isMe,setIsMe,upDateRoom,
                isEnd,setIsEnd,isGameEnd,setIsGameEnd,deleteRoom,round
            }}
            {...props}
        />
    );
};

const useMonopoly = () => useContext(MonopolyContext);
export { MonopolyProvider, useMonopoly };