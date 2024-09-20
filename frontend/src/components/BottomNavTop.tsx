import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
// import MyLocationIcon from '@mui/icons-material/MyLocation';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';
import ApartmentIcon from '@mui/icons-material/Apartment';

const CustomBottomNavigationAction = styled(BottomNavigationAction)((theme) => ({
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    '&.Mui-selected': {
        color: '#005e3c',
        backgroundColor: '#f0f0f0',
    }
}));

interface BottomNavBarTopProps {
    checkpointId?: string;
}

const BottomNavBarTop = ({ checkpointId }: BottomNavBarTopProps) => {
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
            <Link to={`/bustimetable`} style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label={language === 'en' ? 'Timetable' : '時刻表'}
                    icon={<DepartureBoardIcon />}
                    showLabel={true}
                />
            </Link>
            {/* <Link to={`/building/${checkpointId}/${checkpointId}`} style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}> */}
            <Link to="/dininghours" style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label={language === 'en' ? 'Dining Hours' : '食堂・売店'}
                    icon={<RestaurantIcon />}
                    showLabel={true}
                />
            </Link>
            {/* <Link to={`/checkpoint/${checkpointId}`} style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label={language === 'en' ? 'Map' : '地図'}
                    icon={<MyLocationIcon />}
                    showLabel={true}
                />
            </Link> */}
            <Link to={`/buildinglist`} style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label={language === 'en' ? 'Building List' : '建物リスト'}
                    icon={<ApartmentIcon />}
                    showLabel={true}
                />
            </Link>

        </BottomNavigation >
    );
}

export default BottomNavBarTop;
