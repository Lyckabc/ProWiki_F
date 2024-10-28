import axios from 'axios';


const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Google API용 별도 인스턴스
export const googleApiInstance = axios.create({
    baseURL: 'https://www.googleapis.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;
        
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            
            try {
                const currentToken = localStorage.getItem('token');
                const refreshResponse = await instance.post(
                    '/account/users/refreshToken',
                    {}, 
                    {
                        headers: {
                            Authorization: currentToken
                        }
                    }
                );
                
                if (refreshResponse.data.valid) {
                    const newToken = `Bearer ${refreshResponse.data.token}`;
                    localStorage.setItem('token', newToken);

                        // 원래 요청의 헤더에 새 토큰 설정
                    originalRequest.headers.Authorization = newToken;

                    // 원래 요청 재시도
                    return instance(originalRequest);
                }
            } catch (refreshError) {
                // 토큰 갱신 실패 시 로그아웃
                localStorage.removeItem('token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);

export default instance;