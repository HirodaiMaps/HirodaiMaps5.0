import { Box } from '@mui/system';
import { NavBar } from '../components/Header';
import { useState, useEffect, useContext } from 'react';
import { Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Divider } from '@mui/material';
import BottomNavBar from '../components/BottomNavTop';
import { LanguageContext } from '../components/LanguageProvider';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

type BusTimetable = {
    bus_stop: string;
    dpt_time: string; // 出発時刻 (hh:mm)
    riding_time: string; // 所要時間 ("19分" のような形式)
    tag: string; // バス会社名
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

const fareDict: Record<'ja' | 'en', string> = {
    ja: "運賃：",
    en: "Fare: "
};

const departDict: Record<'ja' | 'en', string> = {
    ja: "あと",
    en: "Depart in"
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
                const filteredData = data.filter(bus => {
                    const busTime = new Date(`${currentDate.toISOString().split('T')[0]}T${bus.dpt_time}`);
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
            <Box sx={{ marginTop: 9, marginBottom: 8, marginLeft: 2, marginRight: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="departure-point-label">{language === 'en' ? 'Select Departure Point' : '出発地点を選択'}</InputLabel>
                        <Select
                            size='medium'
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
                    <ArrowRightIcon sx={{ marginLeft: 0.5, marginRight: 0.5, color:'#BABABA' }} fontSize="large" />
                    <Typography sx={{ fontSize: 15 }}>{language === 'en' ? 'Saijo Station Bus Stop' : '西条駅バス停'}</Typography>
                </Box>
                <div style={{ height: 8 }} />
                {/* 運賃の表示 */}
                <Box sx={{ marginBottom: 1 }}>
                    <Typography sx={{ fontSize: 13 }}>
                        {fareDict[language]}<span style={{ fontWeight: 'bold', fontSize: 20 }}>290</span> {language === 'en' ? 'yen' : '円'}
                    </Typography>
                </Box>
                <Divider />
                {busTimetable.length > 0 ? (
                    <>
                        {busTimetable.map((bus, i) => {
                            const currentTime = new Date();
                            const busTime = new Date(`${currentTime.toISOString().split('T')[0]}T${bus.dpt_time}`);
                            const minutesToDeparture = Math.ceil((busTime.getTime() - currentTime.getTime()) / 60000);
                            const ridingTime = parseInt(bus.riding_time.match(/\d+/)?.[0] || "0", 10);
                            const arrivalTime = new Date(busTime.getTime() + ridingTime * 60000);
                            const arrivalTimeString = arrivalTime.toTimeString().slice(0, 5);

                            return (
                                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #ccc' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'left' }}>
                                        <Typography sx={{ fontSize: 13 }}>{bus.tag}</Typography>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: 20 }}>
                                            {bus.dpt_time} - {arrivalTimeString} {/* 出発時刻と到着時刻 */}
                                        </Typography>
                                    </Box>

                                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end', textAlign: 'right' }}>
                                        <Typography sx={{ fontSize: 15 }}>
                                            {language === 'en' ? `${departDict[language]} ${minutesToDeparture} minutes` : `${departDict[language]} ${minutesToDeparture} 分で出発`}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })}
                    </>
                ) : (
                    <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>
                        {language === 'ja' ? '現在、利用可能なバス情報がありません。' : 'Currently, there is no available bus information.'}
                    </Typography>
                )}
            </Box>
            <BottomNavBar checkpointId={"バス時刻表"} />
        </Box>
    );
};
