import React , { useState }from 'react';
import Header from '../components/Header';
import '../styles/Login.css'

function Login(){
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div>
          <Header />
            <div className="login-wrapper">
            <input type="text" placeholder="ID" className="login-input" />
            <div className="password-wrapper">
                <input 
                type={showPassword ? "text" : "password"} 
                placeholder="PW" 
                className="login-input"
                />
                <span 
                className="eye-icon" 
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? "👁️" : "👁️‍🗨️"}
                </span>
            </div>
            <p className="login-text">계정이 없으신가요? 회원가입</p>
            <div className="social-login-wrapper">
                <button className="social-button naver">N</button>
                <button className="social-button kakao">K</button>
                <button className="social-button google">G</button>
            </div>
            </div>
        </div>
      );
}
export default Login;