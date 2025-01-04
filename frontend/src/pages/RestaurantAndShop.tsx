import { Box } from '@mui/system';
import { NavBar } from '../components/Header';
import SearchBar from '../components/SearchBar';
import { useState, useEffect, useRef, useContext } from 'react';
import { Typography, Divider,Grid } from '@mui/material';
import BottomNavBar from '../components/BottomNavTop';
import { LanguageContext } from '../components/LanguageProvider';

type DiningHallInfo = {
    name: string;
    time: string;
};

const translation: { [key: string]: string } = {
    "北1食堂(理食)": "North 1 Cafeteria (Science Cafe)",
    "北1レストラン": "North 1 Restaurant",
    "東食堂(工食)": "East Cafeteria (Engineering Cafe)",
    "大学会館食堂": "University Hall Cafeteria",
    "西2食堂(総食)": "West 2 Cafeteria (Arts Cafe)",
    "北2食堂(教食)": "North 2 Cafeteria (Edu Cafe)",
    "BBB": "BBB",
    "lalala cafe": "lalala cafe",
    "北1コープショップ": "North 1 Co-op Shop",
    "北1サービスカウンター": "North 1 Service Counter",
    "北1トラベルカウンター": "North 1 Travel Counter",
    "講座サポートルーム": "Lecture Support Room",
    "会館コープショップ": "University Hall Co-op Shop",
    "西2コープショップ": "West 2 Co-op Shop",
    "西2PCサポートデスク": "West 2 PC Support",
    "教科書センター": "Textbook Center",
    "北2コープショップ": "North 2 Co-op Shop",
    "住まい東広島店": "Housing Support Service Higshi-Hiroshima",
    "住まい管理店": "Housing Support Service",
    "生協事務所": "Co-op Office",
    "ヴィオラダイニング": "Viola Dining",
    "ヴィオラショップ": "Viola Shop",
    "ヴィオラPCヘルプデスク": "Viola PC Support",
    "ヴィオラ　トラベルカウンター": "Viola Travel Counter",
    "ヴィオラ　サービスカウンター": "Viola Service Counter",
    "住まい広島店": "Housing Support Service Hiroshima",
    "プナナショップ": "Punana Shop",
    "プナナダイニング": "Punana Dining"
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

                    <Divider sx={{ marginTop: 0.5, marginBottom: 0.5 }} />
                    <Grid>
                        {filteredDiningHalls.length > 0 ? (
                            filteredDiningHalls.map((hall, i) => (
                                <Box key={i} sx={{ borderBottom: '1px solid #ccc', padding: '5px 0' }}>
                                    <Typography>{hall.name}</Typography>
                                    <Typography variant="body2">{language === 'ja' ? '営業時間:' : 'Open hours:'}{hall.time}</Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body1" sx={{ textAlign: 'center', marginTop: '20px' }}>
                                {language === 'ja' ? '現在、利用可能な食堂情報がありません。' : 'No dining hall or store found.'}
                            </Typography>
                        )}
                    </Grid>
                </Box>
            </Box>
            <BottomNavBar checkpointId={"飲食店・売店"} />
        </Box>
    );
};
