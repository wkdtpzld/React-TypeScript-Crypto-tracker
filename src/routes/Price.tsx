import styled from "styled-components";

interface IPrice {
    tickersData: {
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
        }
    }
}

const Price = ({ tickersData }: IPrice) => {

    return (
        <PriceWrapper>
            <NowPrice> Now Price : {tickersData.quotes.USD.price.toFixed(2)}</NowPrice>
            <MaxPrice UpOrDown={tickersData.quotes.USD.price < tickersData.quotes.USD.ath_price}>
                Maximum Price : &nbsp; <p>{tickersData.quotes.USD.ath_price.toFixed(2)}</p>
            </MaxPrice>
            <CompareDay UpOrDown={tickersData.quotes.USD.percent_change_24h > 0}>
                24-hour Percentage Comparison: &nbsp; <p>{tickersData.quotes.USD.percent_change_24h}%</p>
            </CompareDay>
            <CompareDay UpOrDown={tickersData.quotes.USD.volume_24h_change_24h > 0}>
                24-hour Change Volume: &nbsp; <p>{tickersData.quotes.USD.volume_24h_change_24h}</p>
            </CompareDay>
            <CompareDay UpOrDown={tickersData.quotes.USD.market_cap_change_24h > 0}>
                24-hour market_cap: &nbsp; <p>{tickersData.quotes.USD.market_cap_change_24h}</p>
            </CompareDay>
            <CompareDay UpOrDown={tickersData.quotes.USD.market_cap_change_24h > 0}>
                market_cap: &nbsp; <p>{String(tickersData.quotes.USD.market_cap).replace(/(.{3})/g,"$1.")}</p>
            </CompareDay>
        </PriceWrapper>
    )
};

export default Price;

const PriceWrapper = styled.div`
    display: flex;
    flex-direction: column;
    background-color: rgba(0,0,0,0.5);
    border-radius: 15px;
    padding: 10px 20px;
`;

const NowPrice = styled.h1`
    font-size: 20px;
    margin: 10px 0;
`

const MaxPrice = styled.span<{ UpOrDown: boolean }>`
    display: flex;
    flex-direction: row;
    margin: 10px 0;
    p {
        color: ${(props) => props.UpOrDown ? "#e84118" : "#487eb0" };
    }
`;

const CompareDay = styled.span<{ UpOrDown: boolean }>`

    display: flex;
    flex-direction: row;
    margin: 10px 0;
    p {
        color: ${(props) => props.UpOrDown ? "#e84118" : "#487eb0"};
    }
`;