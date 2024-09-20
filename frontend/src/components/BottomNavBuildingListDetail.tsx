import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import HomeIcon from '@mui/icons-material/Home';
import Paths from './Paths';
import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';

function getPathId(Paths: any[], path_key: string) {
    const path = Paths.find(p => p.path_key === path_key);
    return path ? path.path_id : null;
}

const CustomBottomNavigationAction = styled(BottomNavigationAction)((theme) => ({
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    '&.Mui-selected': {
        color: '#005e3c',
        backgroundColor: '#f0f0f0',
    }
}));

interface BottomNavBarTopProps {
    checkpointId?: string;
    startKey?: string;
    endKey?: string;
}

const BottomNavBarBuildingListDetail = ({ checkpointId, startKey, endKey }: BottomNavBarTopProps) => {
    const pathKey = startKey + "_" + endKey;
    const path_id = getPathId(Paths, pathKey);
    const { language } = useContext(LanguageContext);

    return (
        <BottomNavigation style={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            display: 'flex',
            justifyContent: 'space-around',
        }}>
            <Link to="/dininghours" style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label={language === 'en' ? 'Dining Hours' : '食堂・売店'}
                    icon={<RestaurantIcon />}
                    showLabel={true}
                />
            </Link>
            <Link to="/" style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label={language === 'en' ? 'Top page' : 'トップページ'}
                    icon={<HomeIcon />}
                    showLabel={true}
                />
            </Link>
            {/* <Link to={`/paths/${pathKey}`} style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label={language === 'ja' ? "経路を表示" : "Path"}
                    icon={<AssistantDirectionIcon />}
                    showLabel={true}
                />
            </Link> */}
            <Link to={`/bustimetable`} style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label={language === 'ja' ? "時刻表" : "Timetable"}
                    icon={<DepartureBoardIcon />}
                    showLabel={true}
                />
            </Link>
        </BottomNavigation >
    );
}

export default BottomNavBarBuildingListDetail;