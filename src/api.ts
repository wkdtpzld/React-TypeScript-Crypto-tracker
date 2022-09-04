import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com/v1"

interface CoinInterface {
    id: string,
    name: string,
    symbol: string,
    rank: number,
    is_new: boolean,
    is_active: boolean,
    type: string,
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
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}


export async function fetchCoins() {
    const response = await axios.get<CoinInterface[]>(`${BASE_URL}/coins`)
        .then(res => res.data)
        .catch((error) => {
            console.log(error.message);
        });
    
    return response;
}

export async function fetchCoinInfo(coinId:string) {
    const response = await axios.get<IInfoData>(`${BASE_URL}/coins/${coinId}`)
            .then((infoData) => infoData.data)
            .catch((error) => {
                console.log(error.message);
            });
    
    return response;
};

export async function fetchCoinTickers(coinId:string) {
    const response = await axios.get<IPriceData>(`${BASE_URL}/tickers/${coinId}`)
            .then((infoData) => infoData.data)
            .catch((error) => {
                console.log(error.message);
            });
    
    return response;
};