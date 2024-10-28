import React , { useState }from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Modal from '../components/utils/Modal';
import { useLogon } from '../components/utils/Logon';
import { useApi } from '../hooks/useApi';
import '../styles/Login.css'

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const { handleLogin } = useLogon();
    const { request, loading } = useApi();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await handleLogin(formData);
        
        if (result.success) {
            navigate('/');
        } else {
            setModalMessage(result.message);
            setIsModalOpen(true);
        }
    };

    const handleGoogleLogIn = () => {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const redirectUri = 'http://localhost:3000/login';
        const scope = 'email profile';
        
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
        
        // 팝업 창 열기
        const popup = window.open(
            googleAuthUrl,
            'GoogleLogin',
            'width=600,height=700,left=400,top=100'
        );

        // 팝업 창에서 토큰을 받아오는 리스너
        window.addEventListener('message', async (event) => {
            if (event.origin !== window.location.origin) return;

            try {
                const { access_token } = event.data;
                
                // Google API를 사용하여 사용자 정보 가져오기
                const userResponse = await request(
                    'GET',
                    'https://www.googleapis.com/oauth2/v2/userinfo',
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${access_token}`
                        }
                    }
                );
                console.log("google userResponse:", userResponse);
                const userData = userResponse.data;

                // 백엔드로 Google 사용자 정보 전송
                try {
                    console.log("google userData :",userData);
                    const response = await request(
                        'POST',
                        '/account/users/login/google',
                        {
                            id: userData.id,
                            email: userData.email,
                            name: userData.name,
                            picture: userData.picture,
                            // locale: userData.locale
                        }
                    );
                    console.log("googleSign from back :",response);
                    
                    

                    if (response.success) {
                        // 성공 시 토큰 저장 및 메인 페이지로 이동
                        localStorage.setItem('token', `Bearer ${response.token}`);

                        const loginResult = await handleLogin({ 
                            id: userData.id, 
                            googleLogin: true 
                        });
                        
                        // 약간의 지연을 주어 상태 업데이트를 보장
                        if (loginResult.success) {
                            console.log("loginResult : success");
                            navigate('/');
                        } else {
                            setModalMessage('로그인 처리 중 오류가 발생했습니다.');
                            setIsModalOpen(true);
                        }
                    }
                } catch (error) {
                    // 백엔드 에러 처리
                    console.log("backend response data: ",error);
                    const errorMessage = error.response?.data?.message || '로그인 중 오류가 발생했습니다.';
                    setModalMessage(errorMessage);
                    setIsModalOpen(true);
                }

                // 팝업 창 닫기
                popup.close();
            } catch (error) {
                console.error('Google OAuth 처리 중 에러:', error);
                setModalMessage('Google 로그인 처리 중 오류가 발생했습니다.');
                setIsModalOpen(true);
                popup.close();
            }
        });
    };

    // Google OAuth redirect를 처리하는 함수
    const handleGoogleRedirect = () => {
        const hash = window.location.hash;
        if (hash) {
            const accessToken = new URLSearchParams(hash.substring(1)).get('access_token');
            if (accessToken) {
                // 부모 창으로 토큰 전달
                window.opener.postMessage({ access_token: accessToken }, window.location.origin);
                window.close();
            }
        }
    };

    // 현재 페이지가 리다이렉트된 경우 처리
    React.useEffect(() => {
        if (window.opener) {
            handleGoogleRedirect();
        }
    }, []);

    return (
        <div>
            <Header />
            <form className="login-wrapper" onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="id"
                    placeholder="ID"
                    className="login-input"
                    value={formData.id}
                    onChange={handleInputChange}
                    disabled={loading}
                />
                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="PW"
                        className="login-input"
                        value={formData.password}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    <span
                        className="eye-icon"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "👁️" : "👁️‍🗨️"}
                    </span>
                </div>

                <button type="submit" className="submit-button" disabled={loading}>
                    {loading ? '로그인 중...' : '로그인'}
                </button>

                <p className="login-text">
                    계정이 없으신가요? <Link to="/sign">회원가입</Link>
                </p>

                 <div className="social-login-wrapper">
                    <button type="button" className="social-button naver">N</button>
                    <button type="button" className="social-button kakao">K</button>
                    <button 
                        type="button"
                        className="social-button google"
                        onClick={handleGoogleLogIn}
                        disabled={loading}
                    >G</button>
                </div>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="modal-header">알림</div>
                <div className="modal-body">{modalMessage}</div>
                <div className="modal-footer">
                    <button 
                        className="modal-button"
                        onClick={() => setIsModalOpen(false)}
                    >
                        확인
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Login;