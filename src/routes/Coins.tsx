import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from "axios";

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
}

interface AxiosResponse<T = any>  {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request?: any;
    slice?: any;
}


const Coins = () => {

    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await axios.get<AxiosResponse>("https://api.coinpaprika.com/v1/coins")
                .then((response) => {
                    setCoins(response.data.slice(0, 100));
                    setLoading(false);
                })
                .catch((error) => {
                    console.log(error.message);
                });
        })();
    }, []);

    return (
        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {loading ? (
            <Loader>"Loading..."</Loader>
            ) : (
                <CoinList>
                    {coins.map((coin) => (
                    <Coin key={coin.id}>
                        <Link to={`/${coin.id}`} state={coin.name}>
                            <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} alt={coin.id} />
                            {coin.name} &rarr;
                        </Link>
                    </Coin>
                    ))}
                </CoinList>
            )}
        </Container>
    );
}

export default Coins;

// styled-component

const Title = styled.h1`
    color: ${props => props.theme.accentColor};
    font-size: 48px;
`;

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

const CoinList = styled.ul`

`;

const Coin = styled.li`
    background-color: white;
    color: ${props => props.theme.bgColor};
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 10px;

    a {
        display: flex;
        align-items: center;
        transition: color 0.2s ease-in;
    }

    &:hover {
        a {
            color: ${props => props.theme.accentColor}
        }
    }
`;

const Loader = styled.span`
    text-align: center;
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;