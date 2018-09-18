
import { Component } from 'react';
const DUMMY_DATA = [
    {
      senderId: "perborgen",
      text: "who'll win?"
    },
    {
      senderId: "janedoe",
      text: "who'll win?"
    }
  ]

  const instanceLocator = "v1:us1:73639953-078f-42d4-b1dd-2f06d3612de4"
  const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/73639953-078f-42d4-b1dd-2f06d3612de4/token"
  const username = "perborgen"
  const roomId = 10141208

class App extends React.Component{
    
constructor(){
    super()
    this.state={
        messages:DUMMY_DATA
    }
}

componentDidMount(){
    const chatManager = new Chatkit.chatManager(
        {
            instanceLocator:instanceLocator,
            userId:username,
            tokenProvider: new Chatkit.TokenProvider({
                url:testToken
            })
        })
        chatManager.connect().then(currentUser =>{
            currentUser.subscribeToRooom({
                roomId: roomId,
                hooks: {
                    onNewMessage: message => {
                        this.setState(
                            {
                                messages: [...this.state.messages, message]
                            }
                        )
                    }
                }
            })
        })
};


    render(){
        return(
            <div className="app">
            <Title/>
            <MessageList messages={this.state.messages}/>
            <Messages/>
            </div>
        )
    }
}

class MessageList extends React.Component{
    render(){
        return(
            <ul className="message-list">
            {this.props.messages.map(message=>{return(<li key={message.id}>
            <div>{message.senderId}
            </div>
            <div>
                {message.text}
            </div>
            </li>
            )
        })}
        </ul>
        )
    }
}