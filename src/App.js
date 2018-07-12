import React, { Component } from 'react';
import PubNubReact from 'pubnub-react';
import { Button, Input, List } from 'antd';
import './App.css';

class App extends Component {

constructor(props) {
  super(props);
  this.pubnub = new PubNubReact({ 
    publishKey: 'pub-c-ffeebb52-9c76-4144-bc84-4afd08bca885', 
    subscribeKey: 'sub-c-2da706b8-7bc5-11e8-9537-8215663deda2' 
  });
  this.pubnub.init(this);
}

componentWillMount() {
  this.pubnub.subscribe({
    channels: ['Alexa']
  });

  this.pubnub.getMessage('notify', (msg) => {
    console.log(msg);
    this.notify(msg);
  });
}

publish(userMessage) {
  this.pubnub.publish(
    {
        message: {
            message:userMessage
        },
        channel: 'Alexa',
        storeInHistory: true
    },
    (status, response) => {
        // handle status, response
    }
);
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
    const messages = [
        'Ok I\'ll be there in 5 mins',
        'Call my number 415-xxx-6631',
        'Alright, the door is open'
      ];    
    return (
      <div className="App">
        <List
          header={<div>Choose a preselected response</div>}
          bordered
          dataSource={messages}
          renderItem={item => (<List.Item>
            <Button onClick={this.publish.bind(this, item)} type="primary">{item}</Button>
            </List.Item>)
            }
        />
      </div>
    );
  }
}

export default App;
