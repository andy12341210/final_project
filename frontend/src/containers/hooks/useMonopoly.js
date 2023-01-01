import { createContext, useContext, useState ,useEffect} from 'react';
import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { CREATE_PLAYER_MUTATION,JOIN_ROOM_MUTATION,UPDATE_PLAYERS_MUTATION,LEAVE_ROOM_MUTATION } from '../../graphql/mutations';
import { ROOM_QUERIES } from '../../graphql/queries';
import {PLAYER_UPDATE_SUBSCRIPTION,ROOM_UPDATE_SUBSCRIPTION} from "../../graphql/subscriptions"

const MonopolyContext = createContext({
    isStarted : false,
    isSelected: false,
    isCharacterChoosed: false,
    roomState: {},
    isMe:false,
    isPrepared: false,
    playState:[],
    Players:[],
    currentPlayers:[],
    myPlayerPos: 0,
    myPlayerId:"",
    myName:"",
    roomId:"",
    Mode: 0
});
const template = {_id:"",name:"等待新玩家...",isPrepared:false,character:2,money:2000,position:0}
const RoomTemplate = { isFull:false,playerAmount:0,isStarted:true,currentPlayer:0,currentDice:1}

const MonopolyProvider = (props) => {

    const [isStarted,setIsStarted] = useState(true)
    const [isSelected,setIsSelected] = useState(true)
    const [isCharacterChoosed,setIsCharacterChoosed] = useState(true)
    const [roomState,setRoomState] = useState(RoomTemplate)
    const [isMe,setIsMe] = useState(true)
    const [isPrepared,setIsPrepared] = useState(false)
    const [playState,setPlayState] = useState({onGoing:false,Onend:false})
    const [Players,setPlayers] = useState([template,template,template,template])
    const [currentPlayers,setCurrentPlayers] = useState([])
    const [myPlayerPos,setMyPlayerPos] = useState(0)
    const [myPlayerId,setMyPlayerId] = useState("")
    const [myName,setMyName] = useState("")
    const [roomId,setRoomId] = useState("63ae6a00462aad7ddca66d80")
    const [Mode,setMode] = useState(0)

    const [createPlayer] = useMutation(CREATE_PLAYER_MUTATION)
    const [joinRoom] = useMutation(JOIN_ROOM_MUTATION)
    const [leaveRoom] = useMutation(LEAVE_ROOM_MUTATION)
    const [upDatePlayersToDB] = useMutation(UPDATE_PLAYERS_MUTATION)
    const { loading, error, subscribeToMore} = useQuery(ROOM_QUERIES,{variables:{_id:roomId}});

    const upDatePlayers = async(Ps,id)=>{
        await upDatePlayersToDB({variables:{players:Ps,_id:id}})
        setCurrentPlayers(Ps)
        const temp = Players
        for(let i=0; i<4; i++){
            if(i<Ps.length){
                temp[i] = Ps[i];
                if(Ps[i].name === myName){
                    setMyPlayerPos(i);
                }
            }
            else{
                temp[i] = template;
            }
        }
        setPlayers(temp)
    }

    const upDatePlayersfromDB = async(Ps)=>{
        console.log(Ps)
        setCurrentPlayers(Ps)
        const temp = Players
        for(let i=0; i<4; i++){
            if(i<Ps.length){
                temp[i] = Ps[i];
                if(Ps[i].name === myName){
                    setMyPlayerPos(i);
                }
            }
            else{
                temp[i] = template;
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
                console.log(data)
                setRoomState(data)
                if(data.currentPlayer === myPlayerPos)setIsMe(true)
                else setIsMe(false)
            },
            });
        },
        [subscribeToMore,roomId],
    );

    return (
        <MonopolyContext.Provider
            value={{isStarted,setIsStarted,Mode,setMode,isSelected,setIsSelected,isCharacterChoosed,setIsCharacterChoosed,
                isPrepared,setIsPrepared,createPlayer,myPlayerPos,setMyPlayerPos,joinRoom,myPlayerId,setMyPlayerId,
                myName,setMyName,roomId,setRoomId,Players,setPlayers,upDatePlayers,upDatePlayersToDB,currentPlayers,setCurrentPlayers,
                upDatePlayersfromDB,leaveRoom,roomState,setRoomState,isMe,setIsMe,playState,setPlayState,
            }}
            {...props}
        />
    );
};

const useMonopoly = () => useContext(MonopolyContext);
export { MonopolyProvider, useMonopoly };