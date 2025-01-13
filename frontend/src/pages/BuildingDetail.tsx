import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { NavBar } from '../components/Header';

import Typography from '@mui/material/Typography';
import { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../components/LanguageProvider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Path from '../components/Path';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Map from '../components/Map';

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

const BuildingDetail = () => {
    const params = useParams<Record<string, string | undefined>>();
    const buildingId = params.buildingId ?? 'ud';
    const [building, setBuilding] = useState<BuildingResponse | null>(null);
    const { language } = useContext(LanguageContext);
    const [currentLocation, setCurrentLocation] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCurrentLocation(event.target.value);
    };

    useEffect(() => {
        if (buildingId) {
            fetch(`https://hirodaimaps.ikeda042api.net/api/buildings/${buildingId}`)
                .then(response => response.json())
                .then((data: BuildingResponse) => {
                    setBuilding(data);
                })
                .catch(error => {
                    console.error('Error fetching building data:', error);
                });
        }
    }, [buildingId]);

    // Building's name and description based on selected language
    const buildingName = language === 'ja' ? building?.name : building?.name_en;
    const buildingDescription = language === 'ja' ? building?.description : building?.description_en;

    // List of departure locations for both languages
    const departureOptions = language === 'ja'
        ? [
            'ひろぎんATM', 'ゆうちょATM', '大学会館', '東福利会館', '北第1福利会館',
            '北第2福利会館', '北第3福利会館', '学士会館', '西2福利会館', '三河屋珈琲',
            '広大中央口', '広大北口', '広大二神口', '二神山', '広大西口',
            '大学会館前', 'かがら口', '広大東口', '山中池', '大学院国際協力研究科（IDEC）礼拝所',
            '大学院社会科学研究科・経済学部 礼拝所', '大学院教育研究科・教育学部 礼拝所',
            '大学院生物圏科学研究科 礼拝所', 'ミライクリエ', '学生プラザ'
        ]
        : [
            'Hirogin ATM', 'Japan Post Bank ATM', 'University Hall', 'East Welfare Hall', 'North Welfare Hall #1',
            'North Welfare Hall #2', 'North Welfare Hall #3', 'Faculty Club', 'West Welfare Center #2', 'Mikawa Coffee',
            'Hiroshima University Central Entrance', 'Hiroshima University North Entrance', 'Hiroshima University Nikami Entrance',
            'Nikami Mountain', 'Hiroshima University West Entrance', 'University Hall Front', 'Kagara Entrance',
            'Hiroshima University East Entrance', 'Yamanaka Pond', 'Graduate School of International Cooperation Studies Chapel',
            'Graduate School of Social Sciences & Economics Chapel', 'Graduate School of Education & Faculty of Education Chapel',
            'Graduate School of Biosphere Science Chapel', 'Mirai Creat', 'Student Plaza'
        ];

        return (
            <>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                        backgroundColor: '#FFFFFF',
                        margin: 0,
                        padding: 0,
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            maxWidth: '800px', // 中央寄せしたときの横幅を固定
                            padding: 3,
                        }}
                    >
                        <NavBar checkpointId={"detail_page"} />
        
                        <Box sx={{ marginTop: 6, marginBottom: 4 }}>
                            {/* Building Name */}
                            <Typography
                                sx={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    color: "#005e3c",
                                    marginBottom: 1,
                                }}
                            >
                                {buildingName}
                            </Typography>
        
                            {/* Building Image */}
                            <Box
                                component="img"
                                sx={{
                                    display: 'block',
                                    maxWidth: '100%',
                                    aspectRatio: '3 / 2',
                                    objectFit: 'cover',
                                    overflow: 'hidden',
                                    margin: '0 auto',
                                    height: 'auto',
                                }}
                                src={`https://hirodaimaps.ikeda042api.net/api/files/${building?.image_id}`}
                                alt={buildingName || 'Building Image'}
                            />
        
                            {/* Building Description */}
                            <Typography
                                sx={{
                                    fontSize: 15,
                                    marginTop: 1,
                                    textAlign: 'justify',
                                    marginX: 'auto',
                                }}
                            >
                                {buildingDescription}
                            </Typography>
        
                            {/* Departure Selection */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    marginTop: 4,
                                    alignItems: 'center',
                                }}
                            >
                                <FormControl sx={{ minWidth: 160 }}>
                                    <Select
                                        id="departure-point"
                                        value={currentLocation}
                                        onChange={handleChange}
                                        displayEmpty
                                        renderValue={(selected) => {
                                            if (selected === "") {
                                                return (
                                                    <span style={{ color: '#aaa' }}>
                                                        {language === 'ja' ? '出発地点を選択' : 'Select Departure Point'}
                                                    </span>
                                                );
                                            }
                                            return departureOptions[parseInt(selected, 10) - 1];
                                        }}
                                        sx={{
                                            '& .MuiSelect-select': {
                                                padding: '14px 14px',
                                            },
                                        }}
                                    >
                                        <MenuItem value="">
                                            -
                                        </MenuItem>
                                        {departureOptions.map((option, index) => (
                                            <MenuItem value={index + 1} key={index}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
        
                                <ArrowRightIcon
                                    sx={{ marginLeft: 0.5, marginRight: 0.5, color: '#BABABA' }}
                                    fontSize="large"
                                />
                                <Typography sx={{ fontSize: 15 }}>{buildingName}</Typography>
                            </Box>
        
                            <Box sx={{ height: 20 }} />
        
                            {/* Map or Path */}
                            <Box
                                sx={{
                                    height: 400,
                                    border: 1,
                                    marginX: 'auto', // 横方向の中央寄せ
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                {currentLocation === '' ? (
                                    <Map
                                        lat={building?.latitude || ''}
                                        lon={building?.longitude || ''}
                                        title={buildingName || ''}
                                    />
                                ) : (
                                    <Path
                                        defaultStartBuildingId={currentLocation}
                                        defaultEndBuildingId={buildingId}
                                    />
                                )}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </>
        );
        
};

export default BuildingDetail;
