import { Box } from '@mui/system';
import { BuildingCard } from './BuildingCard';
import { NavBar } from './Navbar';
import BottomNavBarDiningHall from './BottomNavDiningHours';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useState, useEffect, useRef } from 'react';
import { Typography } from '@mui/material';
import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';


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
                <Box sx={{ marginTop: '64px', marginBottom: '64px' }}>
                    {language === "ja" && <Box sx={{ border: '1px solid', padding: '10px', marginBottom: '20px', margin: "7px", color: "#696969" }}>
                        <Typography variant="body1">検索バーで建物名を入力して、建物を選択してください。<br></br>
                            (例：文学部、学生プラザ、工学部支援室 など)</Typography>
                    </Box>}
                    {language === "en" && <Box sx={{ border: '1px solid', padding: '10px', marginBottom: '20px', margin: "7px", color: "#696969" }}>
                        <Typography variant="body1">Please enter the name of a building in the search bar and select the building.<br></br>
                            (e.g. Faculty of Letters, Student Plaza, Engineering Support Room, etc.)</Typography>
                    </Box>}
                    <SearchBar onSearch={handleSearch} />
                    {filteredBuildings.map((building, i) => (
                        <Link to={`/building/${building.id}/list`} style={{ textDecoration: 'none' }} key={i}>
                            <BuildingCard imageUrl={`https://hirodaimaps.ikeda042api.net/api/files/${building.image_id}`} title={
                                language === "ja" ? building.name : building.name_en
                            } />
                        </Link>
                    ))}
                </Box>
                <BottomNavBarDiningHall checkpointId={""} />
            </Box>
        </>
    );
};
