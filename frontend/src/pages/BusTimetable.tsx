import { Box } from '@mui/system';
import { NavBar } from '../components/Header';
import { useState, useEffect, useContext } from 'react';
import { Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent,Divider } from '@mui/material';
import BottomNavBar from '../components/BottomNavTop';
import { LanguageContext } from '../components/LanguageProvider';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

type BusTimetable = {
    bus_stop: string;
    dpt_time: string;
    riding_time: string;
    tag: string;
    date: string;
};

const busStops = [
    "chuo_to_saijo",
    "kitaguchi_to_saijo",
    "hutakami_to_saijo",
    "nishiguchi_to_saijo",
    "kaikanmae_to_saijo",
    "kagaraguchi_to_saijo",
    "higashiguchi_to_saijo",
    "yamanakaike_to_saijo",
] as const;

type BusStop = typeof busStops[number];

const busStopsDict: Record<'ja' | 'en', Record<BusStop, string>> = {
    ja: {
        "chuo_to_saijo": "広大中央口",
        "kitaguchi_to_saijo": "広大北口",
        "hutakami_to_saijo": "広大二神口",
        "nishiguchi_to_saijo": "広大西口",
        "kaikanmae_to_saijo": "大学会館前",
        "kagaraguchi_to_saijo": "広大ががら口",
        "higashiguchi_to_saijo": "広大東口",
        "yamanakaike_to_saijo": "山中池",
    },
    en: {
        "chuo_to_saijo": "Chuo",
        "kitaguchi_to_saijo": "Kitaguchi",
        "hutakami_to_saijo": "Futagamiyama",
        "nishiguchi_to_saijo": "Nishiguchi",
        "kaikanmae_to_saijo": "Kaikanmae",
        "kagaraguchi_to_saijo": "Gagaraguchi",
        "higashiguchi_to_saijo": "Higashiguchi",
        "yamanakaike_to_saijo": "Yamanakaike",
    }
};

type Language = keyof typeof busStopsDict;

export const BusTimetableComponent = () => {
    const [selectedBusStop, setSelectedBusStop] = useState<BusStop>(busStops[0]);
    const [busTimetable, setBusTimetable] = useState<BusTimetable[]>([]);
    const { language } = useContext(LanguageContext) as { language: Language };

    const handleBusStopChange = (event: SelectChangeEvent<string>) => {
        const selectedStop = event.target.value as BusStop;
        setSelectedBusStop(selectedStop);

        // Send the selected bus stop to the tracking API immediately
        fetch(`https://hirodaimaps.ikeda042api.net/api/user_actions/?action_name=bus_time_table&value=${selectedStop}`, {
            method: 'POST'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Bus stop tracked successfully:', data);
            })
            .catch(error => {
                console.error('Error tracking bus stop:', error);
            });
    };

    useEffect(() => {
        // Fetch bus timetable data
        fetch(`https://hirodaimaps.ikeda042api.net/api/bus_timetables/${selectedBusStop}`)
            .then(response => response.json())
            .then((data: BusTimetable[]) => {
                // 現在の時刻を取得
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // 月は0から始まるので+1
                const currentDay = currentDate.getDate().toString().padStart(2, '0');

                // 現在の年月日を使って時刻を比較
                const filteredData = data.filter(bus => {
                    const busTime = new Date(`${currentYear}-${currentMonth}-${currentDay}T${bus.dpt_time}`);
                    return busTime > currentDate;
                });

                setBusTimetable(filteredData);
            })
            .catch(error => {
                console.error('Error fetching bus timetable:', error);
            });
    }, [selectedBusStop]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF', margin: 0, padding: 0 }}>
            <NavBar checkpointId={""} />
            <Box sx={{ marginTop: '70px', marginBottom: '64px', padding: '0 20px' }}>
                <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                    <Select
                        size='small'
                        labelId="bus-stop-select-label"
                        value={selectedBusStop}
                        onChange={handleBusStopChange}
                    >
                        {busStops.map((stop, index) => (
                            <MenuItem key={index} value={stop}>
                                {busStopsDict[language][stop]}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Divider />
                {busTimetable.length > 0 ? (
                    busTimetable.map((bus, i) => (
                        <Box key={i} sx={{ borderBottom: '1px solid #ccc', padding: '5px 0' }}>
                            <Typography>{bus.dpt_time} - {bus.tag}</Typography>
                            <Typography variant="body2">{
                                language === 'ja' ? '所要時間' : 'Riding Time'
                            } {bus.riding_time}</Typography>
                        </Box>
                    ))
                ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>
                        {
                            language === 'ja' ? '現在、利用可能なバス情報がありません。' : 'Currently, there is no available bus information.'
                        }
                    </Typography>
                )}
            </Box>
            <BottomNavBar checkpointId={"バス時刻表"} />
        </Box>
    );
};
