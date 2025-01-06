import { Box } from '@mui/system';
import { NavBar } from '../components/Header';
import SearchBar from '../components/SearchBar';
import { useState, useEffect, useRef, useContext } from 'react';
import { Typography, Divider, Grid } from '@mui/material';
import BottomNavBar from '../components/BottomNavTop';
import { LanguageContext } from '../components/LanguageProvider';

type DiningHallInfo = {
    name: string;
    time: string; // e.g., "9:00-17:00"
};

const translation: { [key: string]: string } = {
    // ... (省略) ...
};

export const DiningHallHours = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [diningHalls, setDiningHalls] = useState<DiningHallInfo[]>([]);
    const [filteredDiningHalls, setFilteredDiningHalls] = useState<DiningHallInfo[]>([]);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { language } = useContext(LanguageContext);

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        searchTimeoutRef.current = setTimeout(() => {
            fetch(`https://hirodaimaps.ikeda042api.net/api/user_actions/?action_name=search_keywords&value=${query}`, {
                method: 'POST'
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('Search keyword tracked successfully:', data);
                })
                .catch(error => {
                    console.error('Error tracking search keyword:', error);
                });
        }, 300);
    };

    const isOpen = (timeRange: string): boolean => {
        const now = new Date();
        const currentTime = now.getHours() * 60 + now.getMinutes();

        const [start, end] = timeRange.split('-').map(time => {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + (minutes || 0);
        });

        return currentTime >= start && currentTime <= end;
    };

    useEffect(() => {
        fetch('https://hirodaimaps.ikeda042api.net/api/dininghalls/info')
            .then(response => response.json())
            .then((data: DiningHallInfo[]) => {
                setDiningHalls(data);
                setFilteredDiningHalls(data);
            })
            .catch(error => {
                console.error('Error fetching dining hall information:', error);
            });
    }, []);

    useEffect(() => {
        let filtered = diningHalls;

        if (searchQuery) {
            filtered = filtered.filter(hall =>
                hall.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (language === 'en') {
            filtered = filtered.map(hall => ({
                ...hall,
                name: translation[hall.name] || hall.name
            }));
        }

        setFilteredDiningHalls(filtered);
    }, [searchQuery, diningHalls, language]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF', margin: 0, padding: 0 }}>
            <NavBar checkpointId={""} />
            <Box sx={{ marginTop: 8.5, marginBottom: 8, marginLeft: 2, marginRight: 2 }}>
                <SearchBar onSearch={handleSearch} />
                <div style={{ height: 14 }} />
                <Box
                    sx={{
                        overflowY: 'auto',
                        maxHeight: 'calc(100vh - 200px)',
                        marginTop: -0.6,
                        marginLeft: 0.3,
                        marginRight: 0.3,
                    }}
                >
                    <Grid>
                        {filteredDiningHalls.length > 0 ? (
                            filteredDiningHalls.map((hall, i) => (
                                <Box key={i}>
                                    <Divider sx={{ marginTop: 0.5, marginBottom: 0.5 }} />
                                    <Box sx={{height:5}}/>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box>
                                            <Typography style={{ fontSize: 17 }}>{hall.name}</Typography>
                                            <Typography style={{ fontSize: 15 }}>
                                                {language === 'ja' ? '営業時間:' : 'Open hours:'} {hall.time}
                                            </Typography>
                                        </Box>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                marginLeft: 1,
                                                color: isOpen(hall.time) ? 'green' : 'red',
                                                fontWeight: 'bold',
                                                fontSize: 20
                                            }}
                                        >
                                            {isOpen(hall.time)
                                                ? language === 'ja'
                                                    ? '営業中'
                                                    : 'Open'
                                                : language === 'ja'
                                                    ? '閉店中'
                                                    : 'Closed'}
                                        </Typography>
                                    </Box>
                                    <Box sx={{height:5}}/>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>
                                {language === 'ja' ? '現在、利用可能な食堂・売店情報がありません。' : 'No dining hall or store found.'}
                            </Typography>
                        )}
                    </Grid>
                </Box>
            </Box>
            <BottomNavBar checkpointId={"飲食店・売店"} />
        </Box>
    );
};
