const Query = {
    Room: async (parent, { name }, { RoomModel }) => {
      let room = await RoomModel.findOne({ name });
      
      if (!room){
        room = await new RoomModel({ name }).save();
      }

      return room;
    },
  };

export default Query;