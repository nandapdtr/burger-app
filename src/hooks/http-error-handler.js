import { useEffect, useState } from 'react';

export default httpClient => {
    const [error, setError] = useState(null);
    const reqInterceptor = httpClient.interceptors.request.use(req => {
        setError(null);
        return req;
    });

    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
        setError(err);
        throw err;
    });

    useEffect(() => {
        return () => {
            console.log('clearing in error handler');
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        }
    }, [httpClient, reqInterceptor, resInterceptor]);

    const clearError = () => {
        setError(null);
    }

    return [error, clearError];
};