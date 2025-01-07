import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';
import ApartmentIcon from '@mui/icons-material/Apartment';

const CustomBottomNavigationAction = styled(BottomNavigationAction)(({ theme }) => ({
    '&.Mui-selected': {
        color: '#005E3C',
    },
    '& .MuiBottomNavigationAction-label': {
        fontSize: 13,
        fontWeight: "normal",
    },
    '&.Mui-selected .MuiBottomNavigationAction-label': {
        fontWeight: "bold",
    },
    color: '#888888',
}));

interface BottomNavBarTopProps {
    checkpointId: string;
}

const BottomNavBarTop = ({ checkpointId }: BottomNavBarTopProps) => {
    const { language } = useContext(LanguageContext);

    return (
        <BottomNavigation
            style={{
                width: '100%',
                position: 'fixed',
                bottom: 10,
                borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            }}
        >
            <Link to={`/`} style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    sx={{
                        color: checkpointId === '建物リスト' ? '#005E3C' : '#888888',
                    }}
                    label={language === 'en' ? 'Building List' : '建物リスト'}
                    icon={<ApartmentIcon sx={{ color: checkpointId === '建物リスト' ? '#005E3C' : '#888888' }} />}
                    showLabel={true}
                />
            </Link>
            <Link to="/dininghours" style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    sx={{
                        color: checkpointId === '飲食店・売店' ? '#005E3C' : '#888888',
                    }}
                    label={language === 'en' ? 'Dining Hours' : '飲食店・売店'}
                    icon={<RestaurantIcon sx={{ color: checkpointId === '飲食店・売店' ? '#005E3C' : '#888888' }} />}
                    showLabel={true}
                />
            </Link>
            <Link to={`/bustimetable`} style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    sx={{
                        color: checkpointId === 'バス時刻表' ? '#005E3C' : '#888888',
                    }}
                    label={language === 'en' ? 'Timetable' : 'バス時刻表'}
                    icon={<DepartureBoardIcon sx={{ color: checkpointId === 'バス時刻表' ? '#005E3C' : '#888888' }} />}
                    showLabel={true}
                />
            </Link>
        </BottomNavigation>
    );
};

export default BottomNavBarTop;
