import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { NavBar } from './Navbar';
import Box from '@mui/material/Box';
import Map from './Map';
import BottomNavBarBuildingDetail from './BottomNavBuildingDetail';
import BottomNavBarBuildingListDetail from './BottomNavBuildingListDetail';
import { useState, useEffect } from 'react';
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

const BuildingDetail = () => {
    const params = useParams<Record<string, string | undefined>>();
    const buildingId = params.buildingId ?? 'ud';
    const buildingIdFrom = params.buildingIdFrom ?? 'ud';
    const [building, setBuilding] = useState<BuildingResponse | null>(null);
    const { language } = useContext(LanguageContext);

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
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
                <NavBar checkpointId={""} />
                <Card sx={{ maxWidth: '90%', width: '100%', maxHeight: 400, margin: 'auto' }}>
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
            <Box sx={{ width: '100%', maxWidth: '90%', aspectRatio: '1', margin: 'auto', mb: "100px" }}>
                <Map lat={building?.latitude || ''} lon={building?.longitude || ''} title={language === 'ja' ? (building?.name ?? '') : (building?.name_en ?? '')} />
            </Box>
            {buildingIdFrom === 'list' ? <BottomNavBarBuildingListDetail checkpointId={""} startKey={buildingIdFrom} endKey={buildingId} /> : <BottomNavBarBuildingDetail checkpointId={""} startKey={buildingIdFrom} endKey={buildingId} />}

        </>
    );
};

export default BuildingDetail;
