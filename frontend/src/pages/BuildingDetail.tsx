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
    const buildingIdFrom = params.buildingIdFrom ?? 'ud';
    const [building, setBuilding] = useState<BuildingResponse | null>(null);
    const { language } = useContext(LanguageContext);
    const [currentLocation, setCurrentLocation] = useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setCurrentLocation(event.target.value);
    };

    useEffect(() => {
        if (buildingId) {
            fetch(`https://hirodaimaps.ikeda042api.net/api/buildings/${buildingId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data: BuildingResponse) => {
                    setBuilding(data);
                })
                .catch(error => {
                    console.error('Error fetching building data:', error);
                });
        }
    }, [buildingId]);

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#FFFFFF', margin: 0, padding: 0 }}>
                <NavBar checkpointId={"detail_page"} />

                <Box sx={{ marginTop: 9, marginBottom: 8, marginLeft: 2, marginRight: 2 }}>
                    {/* 建物名 */}
                    <Typography sx={{ fontSize: 24, fontWeight: 'bold', color: "#005e3c", marginBottom: 1 }}>
                        {language === 'ja' ? building?.name : building?.name_en}
                    </Typography>

                    {/* 写真 */}
                    <Box
                        component="img"
                        sx={{
                            display: 'block',
                            maxWidth: '100%',
                            aspectRatio: '3 / 2', // 縦横比 3:2 を設定
                            objectFit: 'cover', // はみ出た部分を切り抜く
                            overflow: 'hidden',



                            margin: '0 auto',
                            height: 'auto',
                        }}
                        src={`https://hirodaimaps.ikeda042api.net/api/files/${building?.image_id}`}
                        alt={building?.name || 'Building Image'}
                    />

                    {/* 備考 */}
                    <Typography variant="body1" sx={{ marginTop: 1, textAlign: 'justify' }}>
                        {language === 'ja' ? building?.description : building?.description_en}
                    </Typography>

                    {/* 出発地点選択 */}
                    <Box sx={{ display: 'flex', marginTop: 4, alignItems: 'center' }}>
                        <FormControl sx={{ minWidth: 160 }}>
                            <InputLabel id="departure-point-label">出発地点を選択</InputLabel>
                            <Select
                                labelId="departure-point-label"
                                id="departure-point"
                                value={currentLocation}
                                label="出発地"
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                </MenuItem>
                                {/* メニューアイテムリスト */}
                                <MenuItem value={1}>ひろぎんATM</MenuItem>
                                <MenuItem value={2}>ゆうちょATM</MenuItem>
                                <MenuItem value={3}>大学会館</MenuItem>
                                <MenuItem value={4}>東福利会館</MenuItem>
                                <MenuItem value={5}>北第1福利会館</MenuItem>
                                <MenuItem value={6}>北第2福利会館</MenuItem>
                                <MenuItem value={7}>北第3福利会館</MenuItem>
                                <MenuItem value={8}>学士会館</MenuItem>
                                <MenuItem value={9}>西2福利会館</MenuItem>
                                <MenuItem value={10}>三河屋珈琲</MenuItem>
                                <MenuItem value={11}>広大中央口</MenuItem>
                                <MenuItem value={12}>広大北口</MenuItem>
                                <MenuItem value={13}>広大二神口</MenuItem>
                                <MenuItem value={14}>二神山</MenuItem>
                                <MenuItem value={15}>広大西口</MenuItem>
                                <MenuItem value={16}>大学会館前</MenuItem>
                                <MenuItem value={17}>かがら口</MenuItem>
                                <MenuItem value={18}>広大東口</MenuItem>
                                <MenuItem value={19}>山中池</MenuItem>
                                <MenuItem value={20}>大学院国際協力研究科（IDEC）礼拝所</MenuItem>
                                <MenuItem value={21}>大学院社会科学研究科・経済学部 礼拝所</MenuItem>
                                <MenuItem value={22}>大学院教育研究科・教育学部 礼拝所</MenuItem>
                                <MenuItem value={23}>大学院生物圏科学研究科 礼拝所</MenuItem>
                                <MenuItem value={24}>ミライクリエ</MenuItem>
                                <MenuItem value={25}>学生プラザ</MenuItem>
                            </Select>
                        </FormControl>
                        <ArrowRightIcon sx={{ marginLeft: 0.5, marginRight: 0.5 }} fontSize="large" />
                        <Typography sx={{fontSize:15 }}>{building?.name}</Typography>
                    </Box>
                    <Box sx={{height:20}}/>

                    {/* 地図またはルート */}
                    <Box sx={{height: 400, border:1 }}>
                        {currentLocation === '' ? (
                            <Map
                                lat={building?.latitude || ''}
                                lon={building?.longitude || ''}
                                title={language === 'ja' ? building?.name || '' : building?.name_en || ''}
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
        </>
    );
};

export default BuildingDetail;
