import React, {useContext, useEffect, useRef, useState} from 'react'
import API, { endpoints } from '../Config/Api'
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import loginUser from '../../ActionCreators/UserCreators';
import cookie from 'react-cookies';
import { useGoogleAuth } from '../../provider/GoogleAuthProvider';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import '../../css/Login.css'

const clientId=process.env.REACT_APP_GOOGLE_CLIENT_ID


function Login() {
    const [username, setUserName] = useState(null)
    const [password, setPassword] = useState(null)
    const [isLogged, setLogged] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { signIn } = useGoogleAuth();

    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        setShowloginButton(false);
        setShowlogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };

    const login = async (event) => {
      event.preventDefault()
      try {
        let res = await API.post(endpoints["auth-login"], {
          "username": username,
          "password": password
        })

        console.log(res.data.access)

        cookie.save("access_token", res.data.access)

        let user = await API.get(endpoints["current-user"], {
          headers: {
            "Authorization": `Bearer ${cookie.load("access_token")}`
          }
        })
        cookie.save("user", JSON.stringify(user.data))
        dispatch(loginUser(user.data))
        navigate("/")

      } catch(err) {
        console.error(err)
      }
    }

    return (
      <div className="login-background">
        <div id="loginform">
          <h2 id="headerTitle">Đăng nhập</h2>
          <div>
              <div class="rowLogin">
                  <label>Username</label>
                  <input type="text" placeholder="Enter your username"
                      onChange={e => setUserName(e.target.value)} value={username}
                  />
              </div>  
              <div class="rowLogin">
                  <label>Password</label>
                  <input type="password" placeholder="Enter your password"
                      onChange={e => setPassword(e.target.value)} value={password}
                  />
              </div>  
              <div id="button" class="rowLogin">
                  <button onClick={login}>Login</button>
              </div>
          </div>

        </div>
      </div>
    )
}

export default Login


                  //   {/* <a className="btn btn-block py-2 btn-google" onClick={signIn}><span className="icon-google mr-3"></span> Login with Google</a> */}
                  //   { showloginButton ?
                  //     <GoogleLogin
                  //         clientId={clientId}
                  //         buttonText="Sign In"
                  //         onSuccess={onLoginSuccess}
                  //         onFailure={onLoginFailure}
                  //         cookiePolicy={'single_host_origin'}
                  //         isSignedIn={true}
                  //     /> : null}

                  // { showlogoutButton ?
                  //     <GoogleLogout
                  //         clientId={clientId}
                  //         buttonText="Sign Out"
                  //         onLogoutSuccess={onSignoutSuccess}
                  //     >
                  //     </GoogleLogout> : null
                  // }

                            {/* <div id="alternativeLogin">
              <label>Or sign in with:</label>
              <div id="iconGroup">

                  <GoogleLogin
                          clientId={clientId}
                          // buttonText=""
                          onSuccess={onLoginSuccess}
                          onFailure={onLoginFailure}
                          cookiePolicy={'single_host_origin'}
                          isSignedIn={true}
                      />
              </div>
          </div> */}