const Subscription = {
  playerUpdate: {
    subscribe: (parent, {_id}, {pubSub}) => {
      return pubSub.subscribe(`PLAYER_UPDATE ${_id}`);
    },
  },
  roomStateUpdate:{
    subscribe: (parent, {_id}, {pubSub}) => {
      return pubSub.subscribe(`ROOM_UPDATE ${_id}`);
    },
  },
  endGame:{
    subscribe: (parent, {_id}, {pubSub}) => {
      return pubSub.subscribe(`END_GAME ${_id}`);
    },
  }
};

export default Subscription;
