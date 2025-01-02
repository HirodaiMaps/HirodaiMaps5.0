import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Bar } from 'react-chartjs-2';
import {
    Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper
} from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, BarElement, PointElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { ChartOptions } from 'chart.js';
import { NavBar } from './Header';

ChartJS.register(CategoryScale, LinearScale, LineElement, BarElement, PointElement, Title, Tooltip, Legend, TimeScale);

const BuildingCallTrackerPage: React.FC = () => {
    const [cumulativeData, setCumulativeData] = useState<{ dates: string[], cumulativeCounts: number[] }>({ dates: [], cumulativeCounts: [] });
    const [busStopData, setBusStopData] = useState<{ labels: string[], counts: number[] }>({ labels: [], counts: [] });
    const [searchQueries, setSearchQueries] = useState<string[]>([]);

    const fetchData = async () => {
        try {
            const buildingResponse = await axios.get('https://hirodaimaps.ikeda042api.net/api/building_call_tracker');
            const busStopResponse = await axios.get('https://hirodaimaps.ikeda042api.net/api/user_actions/?action_name=bus_time_table');
            const searchQueryResponse = await axios.get('https://hirodaimaps.ikeda042api.net/api/user_actions/?action_name=search_keywords');

            processCumulativeData(buildingResponse.data);
            processBusStopData(busStopResponse.data);
            processSearchQueryData(searchQueryResponse.data);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    const processCumulativeData = (data: Array<{ created_at: string }>) => {
        const dateCounts: { [date: string]: number } = {};

        data.forEach(item => {
            const date = item.created_at.split(' ')[0];
            if (!dateCounts[date]) {
                dateCounts[date] = 0;
            }
            dateCounts[date]++;
        });

        const dates = Object.keys(dateCounts).sort();
        let cumulativeCount = 0;
        const cumulativeCounts = dates.map(date => {
            cumulativeCount += dateCounts[date];
            return cumulativeCount;
        });

        setCumulativeData({ dates, cumulativeCounts });
    };

    type BusStopKey = 'chuo_to_saijo' | 'kitaguchi_to_saijo' | 'hutakami_to_saijo' | 'nishiguchi_to_saijo' | 'kaikanmae_to_saijo' | 'kagaraguchi_to_saijo' | 'higashiguchi_to_saijo' | 'yamanakaike_to_saijo';

    const bus_stops: Record<BusStopKey, string> = {
        "chuo_to_saijo": "広大中央口",
        "kitaguchi_to_saijo": "広大北口",
        "hutakami_to_saijo": "広大二神口",
        "nishiguchi_to_saijo": "広大西口",
        "kaikanmae_to_saijo": "大学会館前",
        "kagaraguchi_to_saijo": "広大ががら口",
        "higashiguchi_to_saijo": "広大東口",
        "yamanakaike_to_saijo": "山中池",
    };

    const processBusStopData = (data: Array<{ value: string }>) => {
        const stopCounts: { [key: string]: number } = {};
        Object.keys(bus_stops).forEach(stop => {
            stopCounts[bus_stops[stop as BusStopKey]] = 0;
        });

        data.forEach(item => {
            if (bus_stops[item.value as BusStopKey]) {
                stopCounts[bus_stops[item.value as BusStopKey]]++;
            }
        });

        const labels = Object.keys(stopCounts);
        const counts = labels.map(label => stopCounts[label]);

        setBusStopData({ labels, counts });
    };

    const processSearchQueryData = (data: Array<{ value: string }>) => {
        const uniqueQueries = Array.from(new Set(data.map(item => item.value).filter(query => query !== '')));
        setSearchQueries(uniqueQueries);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const cumulativeChartData = {
        labels: cumulativeData.dates,
        datasets: [
            {
                label: '累積アクセス数',
                data: cumulativeData.cumulativeCounts,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
        ],
    };

    const cumulativeChartOptions: ChartOptions<'line'> = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day',
                },
                title: {
                    display: true,
                    text: '日付',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '累積アクセス数',
                },
            },
        },
    };

    const busStopChartData = {
        labels: busStopData.labels,
        datasets: [
            {
                label: 'Cumulative Bus Stop Calls',
                data: busStopData.counts,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const busStopChartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'バス停',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: '呼び出された回数',
                },
            },
        },
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="auto">
            <NavBar checkpointId={""} />
            <Typography variant="h4" marginBottom={4} marginTop={10}>
                Cummulative Building Call Tracker
            </Typography>
            <Box sx={{ width: '80%' }}>
                <Line data={cumulativeChartData} options={cumulativeChartOptions} />
            </Box>
            <Typography variant="h4" marginTop={6} marginBottom={4}>
                Bus Stop Call Tracker
            </Typography>
            <Box sx={{ width: '80%' }}>
                <Bar data={busStopChartData} options={busStopChartOptions} />
            </Box>
            <Typography variant="h4" marginTop={6} marginBottom={4}>
                Search Query Table
            </Typography>
            <Box sx={{ width: '80%' }}>
                <TableContainer component={Paper}>
                    <Table aria-label="search query table">
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Search Queries</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {searchQueries.map((query, index) => (
                                <TableRow key={index}>
                                    <TableCell>{query}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default BuildingCallTrackerPage;
