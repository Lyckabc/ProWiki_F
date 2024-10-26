import React, { useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/util/Modal';
import '../styles/Login.css';
import '../styles/Modal.css';

function Sign() {
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id: '',
        password: '',
        name: '',
        email: '',
        phone_num: ''
    });
    const [errors, setErrors] = useState({});

    const handleGoogleSignIn = () => {
        const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
        const redirectUri = 'http://localhost:8080/account/users/login/oauth2/code/google';
        const scope = 'email profile';
        
        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;
        
        // 팝업 창 열기
        const popup = window.open(
            googleAuthUrl,
            'GoogleLogin',
            'width=600,height=700,left=400,top=100'
        );

        // 메시지 리스너 설정
        const messageListener = (event) => {
            // localhost:8080에서 오는 메시지만 처리
            if (event.origin !== 'http://localhost:8080') return;

            try {
                const response = event.data;

                if (response.success) {
                    // 성공적인 응답 처리
                    const token = response.token;
                    localStorage.setItem('token', `Bearer ${token}`);
                    navigate('/');
                } else {
                    // 에러 응답 처리
                    console.log("java response? ", response.message);
                    setModalMessage(response.message || '로그인에 실패했습니다.');
                    setIsModalOpen(true);
                }
            } catch (error) {
                console.error('OAuth 처리 중 에러:', error);
                setModalMessage('로그인 처리 중 오류가 발생했습니다.');
                setIsModalOpen(true);
            }

            // 리스너 제거
            window.removeEventListener('message', messageListener);
        };

        // 메시지 리스너 등록
        window.addEventListener('message', messageListener);
    };

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', formData);
        }
    };

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
                />

                <button type="submit" className="submit-button">회원가입</button>

                <p className="login-text">Sign in with SNS</p>
                <div className="social-login-wrapper">
                    <button type="button" className="social-button naver">N</button>
                    <button type="button" className="social-button kakao">K</button>
                    <button 
                        type="button" 
                        className="social-button google"
                        onClick={handleGoogleSignIn}
                    >G</button>
                </div>
            </form>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="modal-header">
                    알림
                </div>
                <div className="modal-body">
                    {modalMessage}
                </div>
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