import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/utils/Modal';
import Header from '../components/Header';
import { useLogon } from '../components/utils/Logon';
import { useApi } from '../hooks/useApi';
import '../styles/Login.css';
import '../styles/Modal.css';

function Sign() {
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const { handleLogin } = useLogon();
    const { request, loading } = useApi();
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        name: '',
        email: '',
        phone_num: ''
    });


    const handleGoogleSignIn = () => {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const redirectUri = 'http://localhost:3000/sign';
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
                        '/account/users/sign/google',
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
                        // const userInfo = extractUserInfo(response.token);
                        await handleLogin({ 
                            token: response.token, 
                            googleLogin: true 
                        });
                        
                        // 약간의 지연을 주어 상태 업데이트를 보장
                        setTimeout(() => {
                            navigate('/');
                        }, 100);
                    }
                } catch (error) {
                    // 백엔드 에러 처리
                    console.log("backend response data: ",error);
                    const errorMessage = error.response?.data?.message || '회원가입 처리 중 오류가 발생했습니다.';
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.id) newErrors.id = '아이디는 필수입니다';
        if (!formData.password) newErrors.password = '비밀번호는 필수입니다';
        if (!formData.name) newErrors.name = '이름은 필수입니다';
        if (!formData.email) newErrors.email = '이메일은 필수입니다';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // 회원가입 API 호출
                const signupResponse = await request(
                    'POST',
                    '/account/users/sign',
                    formData
                );
                
                if (signupResponse.data.success) {
                    // 회원가입 성공 후 바로 로그인 시도
                    const loginResult = await handleLogin({
                        id: formData.id,
                        password: formData.password
                    });
                    
                    if (loginResult.success) {
                        navigate('/');
                    } else {
                        setModalMessage('회원가입은 완료되었으나 로그인에 실패했습니다.');
                        setIsModalOpen(true);
                    }
                }
            } catch (error) {
                setModalMessage(error.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
                setIsModalOpen(true);
            }
        }
    };

    // 팝업 창인 경우 다른 UI를 렌더링하지 않음
    if (window.opener) {
        return null;
    }

    return (
        <div>
            <Header />
            <form className="login-wrapper" onSubmit={handleSubmit}>
                <div className="input-group">
                    <input
                        type="text"
                        name="id"
                        placeholder="ID *"
                        className={`login-input ${errors.id ? 'error' : ''}`}
                        value={formData.id}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    {errors.id && <span className="error-message">{errors.id}</span>}
                </div>

                <div className="password-wrapper">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="PW *"
                        className={`login-input ${errors.password ? 'error' : ''}`}
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
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name *"
                        className={`login-input ${errors.name ? 'error' : ''}`}
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email *"
                        className={`login-input ${errors.email ? 'error' : ''}`}
                        value={formData.email}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <input
                    type="tel"
                    name="phone_num"
                    placeholder="Phone Number (선택사항)"
                    className="login-input"
                    value={formData.phone_num}
                    onChange={handleInputChange}
                    disabled={loading}
                />

                <button type="submit" className="submit-button" >회원가입</button>

                <p className="login-text">Sign in with SNS</p>
                <div className="social-login-wrapper">
                    <button type="button" className="social-button naver">N</button>
                    <button type="button" className="social-button kakao">K</button>
                    <button 
                        type="button" 
                        className="social-button google"
                        onClick={handleGoogleSignIn}
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

export default Sign;