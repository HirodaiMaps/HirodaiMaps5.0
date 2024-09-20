import { useEffect, useState } from "react";
import { NavBar } from "./Navbar";
import { Box } from "@mui/system";
import BottomNavBarBuildingListDetail from "./BottomNavBuildingListDetail";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
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

const Path = () => {
    const { pathId } = useParams();
    const startBuildingId = pathId?.split("_")[1];
    const endBuildingId = pathId?.split("_")[0];
    const [startBuilding, setStartBuilding] = useState<BuildingResponse | null>(null);
    const [endBuilding, setEndBuilding] = useState<BuildingResponse | null>(null);
    const height = window.innerHeight - 140;
    const width = window.innerWidth * 0.89;
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        if (startBuildingId) {
            fetch(`https://hirodaimaps.ikeda042api.net/api/buildings/${startBuildingId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data: BuildingResponse) => {
                    setStartBuilding(data);
                })
                .catch(error => {
                    console.error('Error fetching start building data:', error);
                });
        }

        if (endBuildingId) {
            fetch(`https://hirodaimaps.ikeda042api.net/api/buildings/${endBuildingId}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data: BuildingResponse) => {
                    setEndBuilding(data);
                })
                .catch(error => {
                    console.error('Error fetching end building data:', error);
                });
        }
    }, [startBuildingId, endBuildingId]);

    if (!startBuilding || !endBuilding) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Stack spacing={9} alignItems="center" sx={{ width: '100%', maxWidth: '90%', margin: 'auto', mt: "10px" }}>
                    <NavBar />
                    <Box sx={{ width: '100%', maxWidth: '98%', }}>
                        <iframe
                            id="mapIframe"
                            src={`/path/path_test.html?pathId=${pathId}&lat1=${startBuilding.latitude}&lon1=${startBuilding.longitude}&title1=${language === "en" ? startBuilding.name_en : startBuilding.name}&lat2=${endBuilding.latitude}&lon2=${endBuilding.longitude}&title2=${language === 'en' ? endBuilding.name_en : endBuilding.name}`}
                            title="Map"
                            style={{ width: width, height: height, padding: '0', margin: '0' }}
                        ></iframe>
                    </Box>
                    <BottomNavBarBuildingListDetail checkpointId={""} startKey={startBuilding.name} endKey={endBuilding.name} />
                </Stack>
            </Box>
        </>
    );
}

export default Path;
