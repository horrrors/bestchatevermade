import { AsyncAction, Action } from 'overmind'


export const setDialogs: AsyncAction = async () => { }

export const setActiveDialog: Action<number> = ({ state }, value) => {
  state.dialogs.active_dialog_id = value
}

export const sentMessage: Action<string> = ({ state }, value) => {
  const activeDialogId = state.dialogs.getActiveDialogId
  for (const dialog of state.dialogs.dialogList) {
    if (activeDialogId === dialog.dialog_id) {
      dialog.last_messages.push({
        text: value,
        message_id: Math.ceil((Date.now() + Date.now()) / dialog.dialog_id),
        read: false,
        user_id: state.auth.user_id,
        ts: Date.now()
      })
    }
  }
  localStorage.setItem('dialogList', JSON.stringify(state.dialogs.dialogList))
}

