import { useQuery } from 'react-query';
import { fetchCoinChart } from '../api';
import ApexChart from "react-apexcharts";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface IChartProps {
    coinId: string;
}

const Chart = ({coinId}:IChartProps) => {

    const isDark = useRecoilValue(isDarkAtom);
    const { isLoading, data } = useQuery(["chart", coinId], () => fetchCoinChart(coinId!), {refetchInterval: 10000});

    return (
        <div>
            {isLoading ? (
                "Loading Chart..."
            ) : (
                <ApexChart
                    type='candlestick'
                    series={[
                        {
                            data: data?.map((price) => {
                                return {
                                    x: new Date(price.time_open).toLocaleString(),
                                    y: [parseFloat(price.open), parseFloat(price.high), parseFloat(price.low), parseFloat(price.close)]
                                }
                            }) ?? []
                        }
                    ]}
                    options={{
                        chart: {
                            height: 300,
                            width: 300,
                            toolbar: {
                                show: false
                            },
                            background: "transparent"
                        },
                        title: {
                            text: `${coinId}`,
                            align: 'left'
                        },
                        theme: {
                            mode: "dark"
                        },
                        xaxis: {
                            labels: {
                                show: false
                            },
                            axisTicks: {
                                show: false
                            },
                        },
                        yaxis: {
                            show: false
                        },
                        plotOptions: {
                            candlestick: {
                                colors: {
                                    upward: '#0097e6'
                                }
                            }
                        }
                    }}
                />
            // <ApexChart
            //     type="line"
            //     series={[
            //         {
            //             name: "Price",
            //             data: data?.map((price) => parseFloat(price.close)) ?? []
            //         }
            //     ]}
            //     options={{
            //         chart: {
            //             height: 300,
            //             width: 500,
            //             toolbar: {
            //                 show: false
            //             },
            //             background: "transparent"
            //         },
            //         grid: {show: false},
            //         theme: {
            //             mode: "dark"
            //         },
            //         stroke: {
            //             curve: 'smooth',
            //             width: 3,
            //         },
            //         yaxis: {show: false},
            //         xaxis: {
            //             labels: {
            //                 show: false
            //             },
            //             axisTicks: {
            //                 show: false
            //             },
            //             axisBorder: {
            //                 show: false
            //             },
            //             categories: data?.map((time) => time.time_close),
            //             type: "datetime"
            //         },
            //         fill: {
            //             type: "gradient", gradient: {gradientToColors: ["#4cd137"], stops: [0, 100]}
            //         },
            //         colors: ["#00a8ff"],
            //         tooltip: {
            //             y: {
            //                 formatter: (value) => `${value.toFixed(2)}`
            //             },
            //         }
            //     }}
            // />
            )}
        </div>
    );
}

export default Chart;