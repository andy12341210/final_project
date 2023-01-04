import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    isFull: { type: Boolean },
    isStarted: {type: Boolean},
    playerAmount: { type: Number },
    currentDice: { type: Number },
    currentPlayer: { type: Number },
    players: [{
        _id: { type: String , required:[true, '_id field is required.']},
        name: { type: String , required:[true, 'name field is required.']},
        isPrepared: { type: Boolean},
        character: {type: Number},
        money : { type: Number , required:[true, 'money field is required.']},
        position: { type: Number , required:[true, 'position field is required.']},
        isStop: {type: Number}
    }],
  }
);
const RoomModel = mongoose.model("Room", RoomSchema);

const PlayerSchema = new mongoose.Schema(
  {
    name: { type: String , required:[true, 'name field is required.']},
  }
);
const PlayerModel = mongoose.model("Player", PlayerSchema);

export {RoomModel,PlayerModel}
