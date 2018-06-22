import React, { Component } from 'react';
import PubNubReact from 'pubnub-react';

class App extends Component {

constructor(props) {
  super(props);
  this.pubnub = new PubNubReact({ 
    publishKey: 'pub-c-00eff6d9-ef6a-459c-9452-7e34aba11cba', 
    subscribeKey: 'sub-c-6af8440e-4890-11e8-a3a7-d29c801c92ae' 
  });
  this.pubnub.init(this);
}

componentWillMount() {
  this.pubnub.subscribe({
    channels: ['PWA']
  });
   
  this.pubnub.getMessage('PWA', (msg) => {
    this.notify(msg.message.text);
  });
}
notify(message) {

  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }
  else if (Notification.permission === "granted") {
    if(typeof message === 'string' || message instanceof String){
      var notification = new Notification(message);
    }else{
      var notification = new Notification("Hello World");
    }
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification("Hello World");
      }
    });
  }

}

  render() {
    return (
      <div className="App">
        <button onClick={this.notify}>Send Notification
        </button>
      </div>
    );
  }
}

export default App;
