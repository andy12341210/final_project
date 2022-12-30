const Subscription = {
  eventHappened: {
    subscribe: (parent, args, {pubSub}) => {
    return pubSub.subscribe('EVENTHAPPENED');
    },
  },
  playerUpdate: {
    subscribe: (parent, {_id}, {pubSub}) => {
      return pubSub.subscribe(`PLAYER_UPDATE ${_id}`);
    },
  },
  playerReaction: {
    subscribe: (parent, args, {pubSub}) => {
      return pubSub.subscribe('PLAYER_REACTION');
    },
  },
  roomStateUpdate:{
    subscribe: (parent, {_id}, {pubSub}) => {
      return pubSub.subscribe(`ROOM_UPDATE ${_id}`);
    },
  },
};

export default Subscription;
