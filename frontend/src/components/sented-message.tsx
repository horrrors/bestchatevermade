import * as React from 'react'
import { Message } from '../types/dialogs'


const sentedMessage = (message: Message) => {
  return <div className="media">
    <div className="media-body ml-3 d-flex align-items-end flex-column">
      <div className="rounded p-2 wrap-text">
        <p className="bg-ligth mb-0 text-grey text-right rounded">{message.text}</p>
      </div>
      <p className="small text-muted">{new Date(message.ts).toDateString()}</p>
    </div>
  </div>
}

export default sentedMessage