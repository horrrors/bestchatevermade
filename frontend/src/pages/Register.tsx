import * as React from "react"
import { useOvermind } from '../store/index'
// import SentedMessage from '../components/sented-message'
// import ReceivedMessage from '../components/received-message'
// // import { getDialogList } from '../models/chat-model'
// import { useOvermind } from '../store/index'
// import { Dialog } from '../types/dialogs'




const Register = () => {

  // const { state: { dialogs, auth }, actions: { dialogs: { setActiveDialog, sentMessage } } } = useOvermind()
  const [login, setLogin] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { actions: { auth: { registration } } } = useOvermind()

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value)
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const registerUser = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    await registration({ login, password, email })
  }




  return <>
    <div className="wrapper fadeInDown">
      <div id="formContent">

        <div className="fadeIn first">
          <img src={process.env.PUBLIC_URL + '/images/apricot.png'} id="icon" alt="Icon" />
        </div>

        <form>
          <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" value={login} onChange={handleLoginChange}></input>
          <input type="text" id="email" className="fadeIn second" name="email" placeholder="email" value={email} onChange={handleEmailChange}></input>
          <input type="text" id="password" className="fadeIn third" name="password" placeholder="password" value={password} onChange={handlePasswordChange}></input>
          {/* <input type="text" id="confirm_password" className="fadeIn third" name="confirm_password" placeholder="confirm password"></input> */}
          <input type="submit" className="fadeIn fourth" value="Register" onClick={registerUser}></input>
        </form>

        <div id="formFooter">
          <a className="underlineHover" href="login.html">Already registered ?</a>
        </div>

      </div>
    </div>


  </>

}

export default Register