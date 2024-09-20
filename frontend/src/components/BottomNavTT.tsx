import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
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

const BottomNavBarTT = ({ checkpointId }: BottomNavBarTopProps) => {
    return (
        <BottomNavigation style={{
            width: '100%',
            position: 'fixed',
            bottom: 0,
            borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            display: 'flex',
            justifyContent: 'space-around',
        }}>
            <Link to={`/${checkpointId}`} style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label="建物リスト"
                    icon={<ApartmentIcon />}
                    showLabel={true}
                />
            </Link>
            <Link to="" style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label="現在地を表示"
                    icon={<MyLocationIcon />}
                    showLabel={true}
                />
            </Link>
            <Link to="" style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label="近日公開予定"
                    icon={<AccessibleIcon />}
                    showLabel={true}
                />
            </Link>
        </BottomNavigation >
    );
}

export default BottomNavBarTT;
