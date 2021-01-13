import { dialogState } from '../../types/dialogs'


export const state: dialogState = {
  dialogList: JSON.parse(localStorage.getItem('dialogList') || '[]'),
  active_dialog_id: -1,
  get getActiveDialog() {
    return this.dialogList.filter(dialog => dialog.dialog_id === this.getActiveDialogId)[0]
  },
  get getActiveDialogId() {
    if (this.dialogList.length) {
      if (this.active_dialog_id === -1)
        return this.dialogList[0].dialog_id
      else {
        return this.active_dialog_id
      }
    } else {
      return 0
    }
  }

}

