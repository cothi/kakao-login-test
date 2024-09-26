
import { gql, useQuery } from "@apollo/client";

const GET_KAKAO_AUTH_URL = gql`
    query GetKakaoAuthUrl {
        getKakaoAuthUrl {
            url
        }
    }
`;

export function Home() {
    const { loading, error, data } = useQuery(GET_KAKAO_AUTH_URL);

    const handleKakaoLogin = () => {
        if (data && data.getKakaoAuthUrl) {
            window.location.href = data.getKakaoAuthUrl.url;
        }
    };

    if (loading) return <p>Loading...</p>;
    console.log(error);
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>Welcome</h1>
            <button onClick={handleKakaoLogin}>카카오 로그인</button>
        </div>
    );
}
