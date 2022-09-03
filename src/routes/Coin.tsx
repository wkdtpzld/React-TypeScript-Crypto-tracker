import styled from "styled-components";
import { useParams, useLocation } from "react-router";
import { useState, useEffect } from 'react';
import axios from "axios";
import { Routes, Route } from 'react-router-dom';
import Chart from './Chart';
import Price from "./Price";
import { Link } from "react-router-dom";
import { useMatch } from "react-router-dom";

interface RouterState {
    state: string;
}

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string
            ath_price: number
            market_cap: number
            market_cap_change_24h: number
            percent_change_1h: number
            percent_change_1y: number
            percent_change_6h: number
            percent_change_7d: number
            percent_change_12h: number
            percent_change_15m: number
            percent_change_24h: number
            percent_change_30d: number
            percent_change_30m: number
            percent_from_price_ath: number
            price: number
            volume_24h: number
            volume_24h_change_24h: number
        }
    };
}

const Coin = () => {
    
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams();
    const { state } = useLocation() as RouterState;
    const [info, setInfo] = useState<IInfoData>();
    const [priceInfo, setPriceInfo] = useState<IPriceData>();
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    useEffect(() => {
        (async () => {
            await axios.get<IInfoData>(`https://api.coinpaprika.com/v1/coins/${coinId}`)
                .then((infoData) => {
                    setInfo(infoData.data)
                })
                .catch((error) => {
                    console.log(error.message);
                });
            
            await axios.get<IPriceData>(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
                .then((response) => {
                    setPriceInfo(response.data);
                })
                .catch((error) => {
                    console.log(error.message);
                });
            
            setLoading(false);
        })();
    }, [coinId])

    return (
        <Container>
            <Header>
                <Title>{ state ? info?.id : loading ? "Loading..." : info?.name }</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                <Overview>
                    <OverviewItem>
                        <span>Rank: </span>
                        <span>{info?.rank}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Symbol:</span>
                        <span>${info?.symbol}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Open Source:</span>
                        <span>{info?.open_source ? "Yes" : "No"}</span>
                    </OverviewItem>
                </Overview>
                <Description>{info?.description}</Description>
                <Overview>
                    <OverviewItem>
                        <span>Total Suply: </span>
                        <span>{priceInfo?.total_supply}</span>
                    </OverviewItem>
                    <OverviewItem>
                        <span>Max Supply: </span>
                        <span>{priceInfo?.max_supply}</span>
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