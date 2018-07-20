const pubsub = new ( require('../utils/pubSub') );

class NotFound {
  constructor( data ) {
    this.container = data.container;
    this.disabled();
    this.enabled = this.enabled.bind( this );
    this.disabled = this.disabled.bind( this );
    pubsub.subscribe(`disabled-${data.eventName}`, this.disabled);
    pubsub.subscribe(`enabled-${data.eventName}`, this.enabled);
  }

  disabled() {
    this.container.hidden = true;
  }

  enabled() {
    this.container.hidden = false;
  }
};

module.exports = NotFound;