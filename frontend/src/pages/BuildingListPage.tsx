import { Box } from '@mui/system';
import { BuildingCard } from '../components/BuildingCard';
import { NavBar } from '../components/Header';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import { useState, useEffect, useRef } from 'react';
import { Typography, Divider, Grid } from '@mui/material';
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageProvider';
import BottomNavBar from '../components/BottomNavTop';

type BuildingResponse = {
    id: number;
    name: string;
    name_en: string;
    description: string;
    description_en: string;
    is_active: boolean;
    tags: string;
    tags_en: string;
    categories: string;
    categories_en: string;
    image_id: string;
    latitude: string;
    longitude: string;
    num_called: number;
    created_at: string;
    updated_at: string;
};

export const BuildingListPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [buildings, setBuildings] = useState<BuildingResponse[]>([]);
    const [filteredBuildings, setFilteredBuildings] = useState<BuildingResponse[]>([]);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { language } = useContext(LanguageContext);

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        // 既存のタイムアウトをクリア
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // 300ms後に検索ワードを送信
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
        // ビルディングデータをフェッチ
        fetch('https://hirodaimaps.ikeda042api.net/api/buildings/')
            .then(response => response.json())
            .then((data: BuildingResponse[]) => {
                setBuildings(data);
                setFilteredBuildings(data);  // 初期状態で全てのビルディングを表示
            });
    }, []);

    useEffect(() => {
        let filtered;
        if (searchQuery) {
            filtered = buildings.filter(building =>
                building.tags.split(',').some(tag =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                ) ||
                building.tags_en.split(',').some(tag =>
                    tag.toLowerCase().includes(searchQuery.toLowerCase())
                ) ||
                building.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                building.name_en.toLowerCase().includes(searchQuery.toLowerCase())
            );
        } else {
            filtered = buildings;  // 検索クエリが空の場合に全てのビルディングを表示
        }
        setFilteredBuildings(filtered);
    }, [searchQuery, buildings]);

    return (
        <>
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
                            {filteredBuildings.map((building, i) => (
                                <Link to={`/building/${building.id}/list`} style={{ textDecoration: 'none', color: 'black', }} key={i}>
                                    <Divider sx={{ marginTop: 0.5, marginBottom: 0.5 }} />
                                    <BuildingCard imageUrl={`https://hirodaimaps.ikeda042api.net/api/files/${building.image_id}`} title={
                                        language === "ja" ? building.name : building.name_en
                                    } />
                                </Link>
                            ))}
                        </Grid>
                    </Box>
                </Box>

                <BottomNavBar checkpointId={"建物リスト"} />
            </Box>
        </>
    );
};
