import { useQuery } from 'react-query';
import { fetchCoinChart } from '../api';
import ApexChart from "react-apexcharts";

interface IChartProps {
    coinId: string;
}

const Chart = ({coinId}:IChartProps) => {

    const { isLoading, data } = useQuery(["chart", coinId], () => fetchCoinChart(coinId!), {refetchInterval: 10000});

    return (
        <div>
            {isLoading ? (
                "Loading Chart..."
            ) : (
            <ApexChart
                type="line"
                series={[
                    {
                        name: "Price",
                        data: data?.map((price) => parseFloat(price.close)) ?? []
                    }
                ]}
                options={{
                    chart: {
                        height: 300,
                        width: 500,
                        toolbar: {
                            show: false
                        },
                        background: "transparent"
                    },
                    grid: {show: false},
                    theme: {
                        mode: "dark"
                    },
                    stroke: {
                        curve: 'smooth',
                        width: 3,
                    },
                    yaxis: {show: false},
                    xaxis: {
                        labels: {
                            show: false
                        },
                        axisTicks: {
                            show: false
                        },
                        axisBorder: {
                            show: false
                        },
                        categories: data?.map((time) => time.time_close),
                        type: "datetime"
                    },
                    fill: {
                        type: "gradient", gradient: {gradientToColors: ["#4cd137"], stops: [0, 100]}
                    },
                    colors: ["#00a8ff"],
                    tooltip: {
                        y: {
                            formatter: (value) => `${value.toFixed(2)}`
                        },
                    }
                }}
            />
            )}
        </div>
    );
}

export default Chart;