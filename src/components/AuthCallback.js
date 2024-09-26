import {gql, useMutation} from "@apollo/client";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const COMPLETE_MUTATION = gql`
    mutation KakaoAuthLogin($code: String!) {
        kakaoAuthLogin(input: { code: $code }) {
            accessToken
            refreshToken
        }
    }
`

export function AuthCallback() {
    const [completeAuth, { loading, error }] = useMutation(COMPLETE_MUTATION);
    const location = useLocation();
    const [message, setMessage] = useState("Completing authentication");

    useEffect(() => {
        const searchParam = new URLSearchParams(location.search);
        const code = searchParam.get('code');
        if (code) {
            completeAuth({ variables: { code } })
                .then(({ data }) => {
                    console.log(data);
                    // 토큰을 로컬 스토리지나 상태 관리 라이브러리에 저장
                    localStorage.setItem('accessToken', data.kakaoAuthLogin.accessToken);
                    localStorage.setItem('refreshToken', data.kakaoAuthLogin.refreshToken);
                    setMessage("Authentication successful. Redirecting...");
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 2000);
                })
                .catch((err) => {
                    console.error("Authentication error:", err);
                    setMessage("Authentication failed. Please try again.");
                });
        } else {
            setMessage("No authentication code found.");
        }
    }, [completeAuth, location]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return <div>{message}</div>;
}
