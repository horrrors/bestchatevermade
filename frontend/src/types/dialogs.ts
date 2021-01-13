export type Message = {
  ts: number,
  message_id: number,
  read: boolean,
  user_id: number,
  text: string
}

export type Dialog = {
  name: string,
  dialog_id: number,
  last_message: Message,
  last_messages: Message[]
}

export type dialogState = {
  dialogList: Dialog[],
  active_dialog_id: number,
  getActiveDialog: Dialog,
  getActiveDialogId: number
}