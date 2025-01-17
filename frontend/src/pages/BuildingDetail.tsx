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
    const [buildings, setBuildings] = useState<BuildingResponse[]>([]);
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

    useEffect(() => {
        // ビルディングデータをフェッチ
        fetch('https://hirodaimaps.ikeda042api.net/api/buildings/')
            .then(response => response.json())
            .then((data: BuildingResponse[]) => {
                setBuildings(data);
            });
    }, []);

    // Building's name and description based on selected language
    const buildingName = language === 'ja' ? building?.name : building?.name_en;
    const buildingDescription = language === 'ja' ? building?.description : building?.description_en;
    const departureOptionsListJa: string[] = buildings.map((building) => building.name);
    const departureOptionsListEn: string[] = buildings.map((building) => building.name_en);


    // List of departure locations for both languages
    const departureOptions = language === 'ja'
        ? departureOptionsListJa
        : departureOptionsListEn;

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
                            maxWidth: '560px', // 中央寄せしたときの横幅を固定
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
                                    height: 600,
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
