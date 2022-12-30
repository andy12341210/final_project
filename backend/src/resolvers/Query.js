const Query = {
    Room: async (parent, { _id }, { RoomModel }) => {
      let room = await RoomModel.findOne({ _id });

      if (!room){
        room = await new RoomModel({}).save();
      }

      return room;
    },  
  };

export default Query;