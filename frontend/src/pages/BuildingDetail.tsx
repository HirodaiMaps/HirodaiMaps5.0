import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { NavBar } from '../components/Header';
import Box from '@mui/material/Box';
import Map from '../components/Map';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { LanguageContext } from '../components/LanguageProvider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Path from '../components/Path';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

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
            <div style={{ maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
                <Box sx={{ marginLeft: 5, marginRight: 5, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                    <NavBar checkpointId={""} />
                    <Card sx={{ margin: 'auto' }}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="200"
                                image={`https://hirodaimaps.ikeda042api.net/api/files/${building?.image_id}`}
                                alt={building?.name || 'Building Image'}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {language === 'ja' ? building?.name : building?.name_en}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {language === 'ja' ? building?.description : building?.description_en}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Box>
                <div style={{ display: 'flex', marginTop:-50 }}>
                    <FormControl sx={{ marginLeft: 5, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">出発地</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={currentLocation}
                            label="出発地"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em></em>
                            </MenuItem>
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
                    <ArrowRightIcon sx={{ marginLeft: 2, marginRight: 2 }} fontSize='large' />
                    <Typography sx={{ marginTop: 1, marginBottom:3 }}>{building?.name}</Typography>
                </div>


                <Box sx={{ marginLeft: 5, marginRight: 5, height: 400, marginBottom: 20 }}>
                    {currentLocation === '' ? <Map lat={building?.latitude || ''} lon={building?.longitude || ''} title={language === 'ja' ? (building?.name ?? '') : (building?.name_en ?? '')} />
                        : <Path defaultStartBuildingId={currentLocation} defaultEndBuildingId={buildingId} />}
                </Box>
            </div>
        </>
    );
};

export default BuildingDetail;
