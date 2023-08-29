import './Login.css'

function Login(onLoggedIn: React.Dispatch<React.SetStateAction<boolean>>) {
    
    return (
        <>
            <div id="login">
                <div id='loginUserName'>
                    username
                    <input></input>
                </div>
                <div>
                    password
                    <input></input>
                </div>
                <button id='loginButton' onClick={() => {onLoggedIn(true)}}>log in</button>
            </div>
        </>
    )
}

export default Login
