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
  // TODO 6.2 Define the itemDeleted subscription resolver
  playerReaction: {
    subscribe: (parent, args, {pubSub}) => {
      return pubSub.subscribe('PLAYER_REACTION');
    },
  },
  // TODO 6.2 End
};

export default Subscription;
