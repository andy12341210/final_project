import { PlayerModel, RoomModel } from "../models/models.js";
const mapOwner = [
  [-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],
  [-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],[-1,0],
]

const findEmptyRoom = async()=>{
  let Room = await RoomModel.findOne({isFull:false});
  if(!Room){
    Room = await new RoomModel({ isFull:false,playerAmount:0,isStarted:false,currentPlayer:0,currentDice:1,mapStatus:mapOwner }).save();
  }
  return Room;
}

const checkPrepared = (Room)=>{
  if(Room.isFull){
    let isPreparedAmount = 0;
    for(let i = 0; i<4; i++){
      if(Room.players[i].isPrepared)isPreparedAmount+=1
    }
    if(isPreparedAmount === 4){
      return true
    }
  }
  return false;
}

const Mutation = {
  joinRoom: async(parent, { _id, name }, { pubsub }) => {
    let Room = await findEmptyRoom();
    const newPlayer = {_id,name,isPrepared:false,character:0,money:2000,position:0,isStop:0}
    Room.players.push(newPlayer);
    Room.playerAmount += 1;
    if(Room.playerAmount === 4)Room.isFull=true;
    await Room.save();
    return Room;
  },

  leaveRoom: async(parent, { _id, pos }, { pubSub }) => {
    let Room = await RoomModel.findOne({_id});
    Room.players.splice(pos,1);
    Room.playerAmount -= 1;
    if(Room.playerAmount !== 4)Room.isFull=false;
    if(Room.playerAmount === 0)
      await RoomModel.deleteMany({_id})
    else{
      await Room.save();
      pubSub.publish(`PLAYER_UPDATE ${_id}`
        ,{
          playerUpdate:Room.players,
      });
    }
    return Room;
  },

  createPlayer: async (parent, { name } ) => {
    const newPlayer = await new PlayerModel({ name }).save();
    return newPlayer;
  },

  upDatePlayers:async(parent, { players, _id }, { pubSub }) => {
    await RoomModel.updateOne({_id:_id},{$set:{players:players}})
    let Room = await RoomModel.findById(_id);
    const player = players[0];
    pubSub.publish(`PLAYER_UPDATE ${_id}`
      ,{
        playerUpdate:players,
    });
    if(!Room.isStarted){
      if(checkPrepared(Room)){
        Room.isStarted = true;
        await Room.save();
        pubSub.publish(`ROOM_UPDATE ${_id}`
          ,{
            roomStateUpdate:Room,
        });
      }
    }
    return Room;
  },
  upDateRoomState:async(parent, { mapStatus,currentPlayer,_id }, { pubSub }) => {
    await RoomModel.updateOne({_id:_id},{$set:{currentPlayer:currentPlayer,mapStatus:mapStatus}})
    const Room = await RoomModel.findById(_id)
    pubSub.publish(`ROOM_UPDATE ${_id}`
      ,{
        roomStateUpdate:Room,
    });
    return Room;
  },
};



export { Mutation as default };
