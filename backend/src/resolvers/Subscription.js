const Subscription = {
  eventHappened: {
    subscribe: (parent, args, {pubSub}) => {
    return pubSub.subscribe('EVENTHAPPENED');
    },
  },
  playerUpdate: {
    subscribe: (parent, args, {pubSub}) => {
      return pubSub.subscribe('PLAYER_UPDATE');
    },
  },
  playerReaction: {
    subscribe: (parent, args, {pubSub}) => {
      return pubSub.subscribe('PLAYER_REACTION');
    },
  },
};

export default Subscription;
