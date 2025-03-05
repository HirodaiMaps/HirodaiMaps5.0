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
                display: 'flex',
                justifyContent: 'space-around', // 子要素を均等に配置
            }}
        >
            <Link to={`/`} style={{ flexGrow: 1, textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
                <CustomBottomNavigationAction
                    sx={{
                        color: checkpointId === '施設リスト' ? '#005E3C' : '#888888',
                    }}
                    label={language === 'en' ? 'Facility List' : '施設一覧'}
                    icon={<ApartmentIcon sx={{ color: checkpointId === '施設リスト' ? '#005E3C' : '#888888' }} />}
                    showLabel={true}
                />
            </Link>
            <Link to="/dininghours" style={{ flexGrow: 1, textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
                <CustomBottomNavigationAction
                    sx={{
                        color: checkpointId === '飲食店・売店' ? '#005E3C' : '#888888',
                    }}
                    label={language === 'en' ? 'Cafe. & Shop' : '飲食店・売店'}
                    icon={<RestaurantIcon sx={{ color: checkpointId === '飲食店・売店' ? '#005E3C' : '#888888' }} />}
                    showLabel={true}
                />
            </Link>
            <Link to={`/bustimetable`} style={{ flexGrow: 1, textDecoration: 'none', display: 'flex', justifyContent: 'center' }}>
                <CustomBottomNavigationAction
                    sx={{
                        color: checkpointId === 'バス時刻表' ? '#005E3C' : '#888888',
                    }}
                    label={language === 'en' ? 'Bus Timetable' : 'バス時刻表'}
                    icon={<DepartureBoardIcon sx={{ color: checkpointId === 'バス時刻表' ? '#005E3C' : '#888888' }} />}
                    showLabel={true}
                />
            </Link>
        </BottomNavigation>
    );
};

export default BottomNavBarTop;
