import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccessibleIcon from '@mui/icons-material/Accessible';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';

const CustomBottomNavigationAction = styled(BottomNavigationAction)((theme) => ({
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    '&.Mui-selected': {
        color: '#005e3c',
        backgroundColor: '#f0f0f0',
    }
}));

interface BottomNavPathProps {
    checkpointId?: string;
}

const BottomNavPath = ({ checkpointId }: BottomNavPathProps) => {
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
            <Link to={`/timetable/1/${checkpointId}`} style={{ display: 'flex', flexGrow: 1, textDecoration: 'none' }}>
                <CustomBottomNavigationAction
                    label="時刻表"
                    icon={<DepartureBoardIcon />}
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

export default BottomNavPath;
