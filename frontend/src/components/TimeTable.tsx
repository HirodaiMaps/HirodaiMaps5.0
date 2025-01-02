import * as React from 'react';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import { NavBar } from './Header';
import { useState } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';

const TimeTable = () => {

    const { stopId: initialStopId, checkpointId } = useParams<{ stopId: string, checkpointId: string }>();
    const [stopId, setStopId] = useState<string>(initialStopId ?? '1');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setStopId(event.target.value);
    };


    if (!stopId) {
        return <div>Invalid stop ID</div>;
    }

    interface TimeTableData {
        [key: string]: string[];
    }

    const timeTableData: TimeTableData = {
        "1": ['06:23', '06:55', '07:07', '07:32', '08:00', '08:17', '09:07', '09:27', '10:15', '11:00', '11:45', '12:00', '12:30', '12:45', '13:30', '13:45', '14:30', '15:00', '15:15', '15:30', '15:45', '16:20', '16:30', '16:45', '17:00', '17:27', '17:27', '18:10', '18:17', '18:30', '18:55', '19:10', '19:52', '20:12', '21:00', '21:52'],
        "2": ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
    };


    const timeTableElements = timeTableData[stopId];


    const now = new Date();

    const futureTimes = timeTableElements.filter(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const timeDate = new Date();
        timeDate.setHours(hours, minutes);
        return timeDate > now;
    });

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF', margin: 0, padding: 0 }}>
                <NavBar checkpointId={checkpointId} />
                <Typography variant="h6" sx={{ marginTop: '64px', textAlign: 'center' }}>西条駅までのバス時刻表</Typography>
                <Select
                    value={stopId}
                    onChange={handleChange}
                    sx={{ marginTop: '10px', marginBottom: '30px', marginLeft: '16px', marginRight: '16px' }}
                >
                    <MenuItem value="1">広大中央口から西条駅</MenuItem>
                    <MenuItem value="2">大学会館前から西条駅</MenuItem>
                </Select>
                <Box sx={{ marginTop: '1px', marginBottom: '64px' }}>
                    <Timeline sx={{ alignItems: 'flex-start' }}>
                        {futureTimes.map((time, index) => (
                            <TimelineItem key={index}>
                                <TimelineSeparator>
                                    <TimelineDot color={index === 0 ? "success" : "grey"} sx={{ width: '15px', height: '15px' }} />
                                    {index !== futureTimes.length - 1 && <TimelineConnector />}
                                </TimelineSeparator>
                                <TimelineContent sx={{ fontSize: '20px' }}>{time}</TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </Box>
            </Box >
        </>
    )
}

export default TimeTable;
