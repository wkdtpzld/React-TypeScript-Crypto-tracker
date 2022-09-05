import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import { fetchCoins } from "../api";
import { useQuery } from "react-query"
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from '../atoms';

const Coins = () => {

    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    const { isLoading, data } = useQuery(["allCoins"], fetchCoins);

    return (
        <Container>
            <Helmet>
                <title>Coins</title>
            </Helmet>
            <Header>
                <Title>Coins</Title>
                <button onClick={toggleDarkAtom}>Toggle Dark Mode</button>
            </Header>
            {isLoading ? (
            <Loader>"Loading..."</Loader>
            ) : (
                <CoinList>
                    {data?.slice(0,100).map((coin) => (
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
    background-color: ${(props) => props.theme.cardBgColor};
    color: ${props => props.theme.textColor};
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