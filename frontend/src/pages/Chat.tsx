import * as React from "react";
import SentedMessage from '../components/sented-message'
import ReceivedMessage from '../components/received-message'
import { useOvermind } from '../store/index'
import { Dialog } from '../types/dialogs'


const Chat = () => {

  const { state: { dialogs, auth }, actions: { dialogs: { setActiveDialog, sentMessage } } } = useOvermind()
  const [message, setMessage] = React.useState('')


  return <>
    <header>

      <title>Apri</title>

    </header>
    <div className="container py-5 px-4">
      <header className="text-center">

        <h1 className="display-4 text-grey"><span role='img' aria-label='flag'>🏳️‍🌈</span></h1>
      </header>
      <div className="row rounded-lg overflow-hidden shadow">

        <div className="bg-white col-4 px-0">
          <div className="bg-gray px-4 py-2 bg-light">
            <p className="h5 mb-0 py-1">Recent</p>
          </div>
          <div className="chats-box">
            {dialogs.dialogList.map((dialog: Dialog, index: number) =>
              <a href='/' key={index} data-chat-id={dialog.dialog_id} onClick={(e) => {
                e.preventDefault()
                setActiveDialog(dialog.dialog_id)
              }}
                className={`list-group-item list-group-item-action rounded-0 
                ${dialogs.getActiveDialogId === dialog.dialog_id ? 'active-chat' : ''}`}>
                <div className="media">
                  <div className="avatar mt-2">
                    AVA
                    </div>
                  <div className="media-body ml-4">
                    <div className="d-flex align-items-center justify-content-between">
                      <h6 className="mb-0">{dialog.name}</h6>
                      <small className="small font-weight-bold">
                        time
                        </small>
                    </div>
                    <p className="font-italic mb-0 small">
                      {dialog.last_message.text}
                    </p>
                  </div>
                </div>
              </a>)}

          </div>
        </div>

        <div className="col-8 px-0">
          {/* <!-- Messges --> */}
          <div className="px-3 pt-4 messages-box bg-white">
            <div className="list-group rounded-0">
              {dialogs.getActiveDialog?.last_messages.map(message => {
                return auth.user_id === message.user_id ? SentedMessage(message) : ReceivedMessage(dialogs.getActiveDialog, message)
              })}
            </div>
          </div>

          {/* <!-- Typing area --> */}
          <form id='send-message' className="input-group bg-light">
            <input id='send-input' type="text" placeholder="Type a message"
              className="form-control rounded-0 border-0 py-4 bg-light" onChange={(e) => setMessage(e.target.value)}></input>
            <div className="input-group-append">
              <button type="submit" className="btn btn-link" onClick={(e) => {
                e.preventDefault();
                sentMessage(message)
              }}>
                <i className="fa fa-paper-plane"></i>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>

    <footer className="footer">

    </footer>

  </>

}

export default Chat