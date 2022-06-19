import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import { HistoricalChart } from '../config/api';
import CryptoContext from '../context/CryptoContext';
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'react-chartjs-2'
import SelectButton from './SelectButton';

const darkTheme = createTheme({
    palette: {
        primary: {
            main: "#fff",
        },
        type: "dark",
    },
})
const useStyles = makeStyles((theme) => ({
    container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        },
    },
}))
const CoinInfo = ({ coin }) => {
    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1)
    const { currency } = useContext(CryptoContext)
    const fetchHistoricData = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        setHistoricData(data.prices);
        console.log(data.prices);
    }
    useEffect(() => {
        fetchHistoricData()
    }, [currency, days])
    const classes = useStyles()
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {
                    !historicData ? (
                        <CircularProgress
                            style={{ color: "gold" }}
                            size={250}
                            thicknes={1} />
                    ) : (
                        <>
                            <Line
                                data={{
                                    labels: historicData.map((coin) => {
                                        let date = new Date(coin[0]);
                                        let time = date.getHours() > 12
                                            ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                            : `${date.getHours()}:${date.getMinutes()} AM`

                                        return days === 1 ? time : date.toLocaleDateString()
                                    }),
                                    datasets: [
                                        {
                                            data: historicData.map((coin) => coin[1]),
                                            label: `Price (Past ${days} Days) in ${currency}`,
                                            borderColor: "#EEBC1D",
                                        },
                                    ],
                                }}
                                options={{
                                    elements: {
                                        point: {
                                            radius: 1,
                                        }
                                    }
                                }}
                            />
                            <div style={{
                                display: "flex",
                                marginTop: 20,
                                justifyContent: "space-around",
                                width: "100%"
                            }}>
                                <SelectButton key={1} onClick={() => setDays(1)} selectd={days === 1}>
                                    24 Hours
                                </SelectButton>
                                <SelectButton key={30} onClick={() => setDays(30)} selectd={days === 30}>
                                    30 Days
                                </SelectButton>
                                <SelectButton key={90} onClick={() => setDays(90)} selectd={days === 90}>
                                    3 Months
                                </SelectButton>
                                <SelectButton key={365} onClick={() => setDays(365)} selectd={days === 365}>
                                    1 Year
                                </SelectButton>
                            </div>
                        </>
                    )
                }

                {/* Buttons */}
            </div>
        </ThemeProvider>
    )
}

export default CoinInfo