import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import QrCodeIcon from '@mui/icons-material/QrCode';
import { Link } from 'react-router-dom';
import { LanguageContext } from './LanguageProvider';
import LanguageIcon from '@mui/icons-material/Language';
interface BottomNavBarTopProps {
    checkpointId?: string;
}

export const NavBar: React.FC<BottomNavBarTopProps> = ({ checkpointId }) => {
    const { language, toggleLanguage } = useContext(LanguageContext);

    return (
        <Box>
            <AppBar sx={{ backgroundColor: '#005e3c', position: "fixed" }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Link to={`/${checkpointId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography variant="h6" component="div" sx={{ display: 'flex', alignItems: 'center', fontFamily: "Helvetica", fontSize: '1.7rem' }}>
                                HirodaiMaps
                                <QrCodeIcon />
                            </Typography>
                        </Link>
                    </Box>
                    <Button color="inherit" onClick={toggleLanguage} startIcon={<LanguageIcon />}>
                        {language === 'en' ? '日本語' : 'English'}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
