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
            borderTop: '1px solid rgba(0, 0, 0, 0.12)'
        }}>
            <Link to={`/`} style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    sx={{ color: checkpointId === '建物リスト' ? '#005e3c' : '', fontWeight: checkpointId === '建物リスト' ? 'bold' : '' }}
                    label={language === 'en' ? 'Building List' : '建物リスト'}
                    icon={checkpointId === '建物リスト' ? <ApartmentIcon sx={{ color: '#005e3c' }} /> : <ApartmentIcon />}
                    showLabel={true}
                />
            </Link>
            <Link to="/dininghours" style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    sx={{ color: checkpointId === '飲食店・売店' ? '#005e3c' : '', fontWeight: checkpointId === '飲食店・売店' ? 'bold' : '' }}
                    label={language === 'en' ? 'Dining Hours' : '飲食店・売店'}
                    icon={<RestaurantIcon />}
                    showLabel={true}
                />
            </Link>
            <Link to={`/bustimetable`} style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    sx={{ color: checkpointId === 'バス時刻表' ? '#005e3c' : '', fontWeight: checkpointId === 'バス時刻表' ? 'bold' : '' }}
                    label={language === 'en' ? 'Timetable' : 'バス時刻表'}
                    icon={<DepartureBoardIcon />}
                    showLabel={true}
                />
            </Link>

        </BottomNavigation >
    );
}

export default BottomNavBarTop;
