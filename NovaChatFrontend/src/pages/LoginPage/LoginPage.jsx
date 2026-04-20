import Header from '../../components/Header'
import './LoginPage.css'
export function LoginPage() {

    return (
        <>
            <Header />

            <div className="login-container">
                <form className='login-form'>
                    <h1>Login</h1>

                    <div className="img-container">
                        <img src='/novachatIcon.svg' className='login-novaIcon'></img>
                    </div>

                    <div className="input-containers">

                        <div className="input-container">
                            <label for="account">Account</label>
                            <input type='text' id='account' name='account' placeholder='account'></input>
                        </div>

                        <div className="input-container">
                            <label for="password">Passowrd</label>
                            <input type='passowrd' id='passowrd' name='password' placeholder='passowrd'></input>
                        </div>
                    </div>

                    <input type='submit' className='login-submit-btn'></input>
                </form>
            </div>

        </>
    )
}