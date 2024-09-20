import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import HomeIcon from '@mui/icons-material/Home';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { LanguageContext } from './LanguageProvider';
import RestaurantIcon from '@mui/icons-material/Restaurant';

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

const BottomNavDestinationSelectingPage = ({ checkpointId }: BottomNavBarDiningHallProps) => {
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
            <Link to="/" style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label={language === 'en' ? 'Top page' : 'トップページ'}
                    icon={<HomeIcon />}
                    showLabel={true}
                />
            </Link>
            <Link to="/dininghours" style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label={language === 'en' ? 'Dining Hours' : '食堂・売店'}
                    icon={<RestaurantIcon />}
                    showLabel={true}
                />
            </Link>

        </BottomNavigation >
    );
}

export default BottomNavDestinationSelectingPage;