import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import HomeIcon from '@mui/icons-material/Home';
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

interface BottomNavBarDiningHallProps {
    checkpointId?: string;
}

const BottomNavBarDiningHall = ({ checkpointId }: BottomNavBarDiningHallProps) => {
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
            <Link to="/" style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label={language === 'en' ? 'Top page' : 'トップページ'}
                    icon={<HomeIcon />}
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

export default BottomNavBarDiningHall;