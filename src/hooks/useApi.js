// src/hooks/useApi.js
import { useState, useCallback } from 'react';
import axios from '../components/utils/axios';
import { googleApiInstance } from '../components/utils/axios';

export const useApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (method, url, data = null, options = {}) => {
        setLoading(true);
        setError(null);

        try {
             // Google API 요청인지 확인
             const isGoogleApi = url.includes('googleapis.com');
             const axiosInstance = isGoogleApi ? googleApiInstance : axios;

            const response = await axiosInstance({
                method,
                url,
                data,
                ...options
            });
            return isGoogleApi ? response : response.data;
        } catch (err) {
            setError(err.response?.data?.message || '요청 처리 중 오류가 발생했습니다.');
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        loading,
        error,
        request
    };
};