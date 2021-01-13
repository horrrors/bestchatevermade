import * as React from 'react'
import { Message, Dialog } from '../types/dialogs'


const receivedMessage = (dialog: Dialog, message: Message) => {
  return <div className="media">
    <div className="avatar py-2">{dialog.name.split(' ')[0]}</div>
    <div className="media-body ml-3 d-flex align-items-start flex-column">
      <div className="bg-main rounded p-2 ">
        <p className="mb-0 text-muted rounded">{message.text}</p>
      </div>
      <p className="small text-muted">{new Date(message.ts).toDateString()}</p>
    </div>
  </div>
}

export default receivedMessage