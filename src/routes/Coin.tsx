import styled from "styled-components";
import { useParams, useLocation } from "react-router";
import { Routes, Route } from 'react-router-dom';
import Chart from './Chart';
import Price from "./Price";
import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from "../api";

interface RouterState {
    state: string;
}

const Coin = () => {
    
    const { coinId } = useParams();
    const { state } = useLocation() as RouterState;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    const { isLoading: infoLoading, data: infoData } = useQuery(
        ["info", coinId], () => fetchCoinInfo(coinId!)
    );
    const { isLoading: tickersLoading, data: tickersData } = useQuery(
        ["tickers", coinId], () => fetchCoinTickers(coinId!)
    );

    const loading = infoLoading || tickersLoading

    return (
        <Container>
            <Header>
                <Title>{ state ? infoData?.id : loading ? "Loading..." : infoData?.name }</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                <Overview>
                    <OverviewItem>
                        <span>Rank: </span>
                        <span>{infoData?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Symbol:</span>
                        <span>${infoData?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Open Source:</span>
                        <span>{infoData?.open_source ? "Yes" : "No"}</span>
                    </OverviewItem>
                </Overview>
                <Description>{infoData?.description}</Description>
                <Overview>
                    <OverviewItem>
                        <span>Total Suply: </span>
                        <span>{tickersData?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Max Supply: </span>
                        <span>{tickersData?.max_supply}</span>
                    </OverviewItem>
                </Overview>
                <Tabs>
                    <Tab isActive={chartMatch !== null}>
                        <Link to={`/${coinId}/chart`}>
                            Chart
                        </Link>
                    </Tab>
                    <Tab isActive={priceMatch !== null}>
                        <Link to={`/${coinId}/price`}>
                            Price
                        </Link>
                    </Tab>
                </Tabs>
                

                <Routes>
                    <Route path="chart" element={<Chart />} />
                    <Route path="price" element={<Price />} />
                </Routes>
                </>
                
            )}
        </Container>
    )
}

export default Coin;

//styled

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

const Loader = styled.span`
    text-align: center;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0,0,0,0.5);
    padding: 10px 15px;
    border-radius: 15px;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    span {
        text-transform: uppercase;
        font-size: 12px;
        font-weight: 400;
        margin-bottom: 5px;
    }
`;

const Description = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
    margin: 25px 0;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    background-color: rgba(0,0,0,0.5);
    border-radius: 15px;
    padding: 7px 0px;

    color: ${(props) => props.isActive ? props.theme.accentColor : props.theme.textColor};

    a {
        display: block;
    }
`;