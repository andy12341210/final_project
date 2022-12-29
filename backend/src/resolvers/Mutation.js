import { PlayerModel, RoomModel } from "../models/models.js";

const findEmptyRoom = async()=>{
  let Room = await RoomModel.findOne({isFull:false});
  if(!Room){
    Room = await new RoomModel({ isFull:false,playerAmount:0, }).save();
  }
  return Room;
}

const Mutation = {
  joinRoom: async(parent, { _id, name }, { pubsub }) => {
    let Room = await findEmptyRoom();
    const newPlayer = {_id,name,isPrepared:false,money:0,position:0}
    Room.players.push(newPlayer);
    Room.playerAmount += 1;
    if(Room.playerAmount === 4)Room.isFull=true;
    await Room.save();
    // pubsub.publish(`PLAYER_UPDATE`
    //   ,{
    //     newplayer:newPlayer,
    // });
    return Room;
  },

  createPlayer: async (parent, { name } ) => {
    const newPlayer = await new PlayerModel({ name }).save();
    return newPlayer;
  },

};

export { Mutation as default };
