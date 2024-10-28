// src/components/util/Logon.js
import { useState, useEffect, useCallback  } from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useApi } from '../../hooks/useApi'; 

export const useLogon = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [writerName, setWriterName] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { request } = useApi();

    // 공개 페이지 목록
    const publicPages = ['/', '/login', '/sign'];

    // 현재 페이지가 공개 페이지인지 확인
    const isPublicPage = useCallback(() => {
        return publicPages.includes(location.pathname);
    }, [location.pathname]);

    // 토큰에서 사용자 정보 추출
    const extractUserInfo = useCallback((token) => {
        try {
            const decodedToken = jwtDecode(token.replace('Bearer ', ''));
            return {
                writerName: decodedToken.sub,
                role: decodedToken.role
            };
        } catch (error) {
            console.error('Token decode error:', error);
            return null;
        }
    }, []);

    // 토큰 유효성 검사
    const validateToken = useCallback(async () => {
        // 공개 페이지이면서 로그인되지 않은 경우 검증 스킵
        if (isPublicPage() && !isLoggedIn) {
            return true;
        }
        
        const token = localStorage.getItem('token');
        if (!token) {
            setIsLoggedIn(false);
            setWriterName('');
            return false;
        }

        try {
            await request('GET', '/account/users/validateToken');
            const userInfo = extractUserInfo(token);
            if (userInfo) {
                setWriterName(userInfo.writerName);
                setIsLoggedIn(true);
                return true;
            }
            return false;
        } catch (error) {
            setIsLoggedIn(false);
            setWriterName('');
            return false;
        }
    }, [request, extractUserInfo, isPublicPage, isLoggedIn]);

    // 토큰 만료 시간 체크 (만료 5분 전)
    // const isTokenExpiringSoon = (token) => {
    //     try {
    //         const decodedToken = jwtDecode(token.replace('Bearer ', ''));
    //         const expirationTime = decodedToken.exp * 1000; // 초를 밀리초로 변환
    //         const currentTime = Date.now();
    //         const timeUntilExpiry = expirationTime - currentTime;
            
    //         return timeUntilExpiry < 300000; // 5분(300000ms) 이내로 남았는지 체크
    //     } catch (error) {
    //         console.error('Token decode error:', error);
    //         return false;
    //     }
    // };

    // 토큰 갱신
    const refreshToken = useCallback(async () => {
        // 공개 페이지이면서 로그인되지 않은 경우 검증 스킵
        if (isPublicPage() && !isLoggedIn) {
            return true;
        }
        const currentToken = localStorage.getItem('token');
        if (!currentToken) return false;

        try {
            const response = await request(
                'POST',
                '/account/users/refreshToken',
                {},
                {
                    headers: {
                        Authorization: currentToken
                    }
                }
            );

            if (response.valid) {
                const newToken = response.token;
                localStorage.setItem('token', `Bearer ${newToken}`);
                
                const userInfo = extractUserInfo(`Bearer ${newToken}`);
                if (userInfo) {
                    setWriterName(userInfo.writerName);
                    setIsLoggedIn(true);
                }
                return true;
            }
            return false;
        } catch (error) {
            console.error('Token refresh failed:', error);
            handleLogout();
            return false;
        }
    }, [request, extractUserInfo, isPublicPage, isLoggedIn]);

    // 로그인 상태 체크 함수
    const checkLoginStatus = useCallback(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const userInfo = extractUserInfo(token);
            if (userInfo) {
                setIsLoggedIn(true);
                setWriterName(userInfo.writerName);
                return true;
            }
        }
        setIsLoggedIn(false);
        setWriterName('');
        return false;
    }, [extractUserInfo]);

        // 초기 마운트와 토큰 변경 시 상태 확인
    useEffect(() => {
        checkLoginStatus();
    }, [checkLoginStatus]);

    // 주기적 토큰 체크 (로그인 상태일 때만)
    useEffect(() => {
        let checkTokenInterval;

        if (isLoggedIn && !isPublicPage()) {
            checkTokenInterval = setInterval(() => {
                if (validateToken()) {
                    refreshToken();
                }
            }, 60000);
        }

        return () => {
            if (checkTokenInterval) {
                clearInterval(checkTokenInterval);
            }
        };
    }, [isLoggedIn, isPublicPage, validateToken]);

    // 로그인 처리
    const handleLogin = useCallback(async (credentials) => {
        try {
            // Google 로그인인 경우 토큰만 검증
            if (credentials.googleLogin) {
                const token = localStorage.getItem('token');
                if (token) {
                    const userInfo = extractUserInfo(token);
                    if (userInfo) {
                        setWriterName(userInfo.writerName);
                        setIsLoggedIn(true);
                        return { success: true };
                    }
                }
                return { success: false };
            }
            const response = await request('POST', '/account/users/login', credentials);
            
            if (response.success) {
                const token = response.token;
                localStorage.setItem('token', `Bearer ${token}`);
                
                const userInfo = extractUserInfo(`Bearer ${token}`);
                if (userInfo) {
                    setWriterName(userInfo.writerName);
                    setIsLoggedIn(true);
                }
                return { success: true };
            }
        } catch (error) {
            return {
                success: false,
                message: error.response?.data?.message || '로그인에 실패했습니다.'
            };
        }
    }, [request, extractUserInfo]);

    // 로그아웃 처리
    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        setWriterName('');
        navigate('/login');
    }, [navigate]);

    // 초기 마운트 시 토큰 검증
    useEffect(() => {
        if (!isPublicPage() || isLoggedIn) {
            validateToken();
        }
    }, [validateToken, isPublicPage, isLoggedIn]);

    //  // useEffect 의존성 배열 수정
    //  useEffect(() => {
    //     const checkTokenStatus = async () => {
    //         await validateToken();
    //     };
    //     checkTokenStatus();
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps


    return {
        isLoggedIn,
        writerName,
        validateToken,
        handleLogin,
        handleLogout,
        checkLoginStatus 
    };
};