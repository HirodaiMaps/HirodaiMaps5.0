
import React, { useContext } from 'react';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { LanguageContext } from './LanguageProvider';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Hamburger from "../images/hamburger.png";

type Anchor = 'right';

const Item = ({ text, to, external, icon, onClick }: { text: string, to?: string, external?: boolean, icon?: React.ReactNode, onClick?: () => void }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (to) {
      if (external) {
        window.location.href = to;
      } else {
        navigate(to);
      }
    }
  }
  return (
    <ListItem disablePadding >
      <ListItemButton onClick={onClick || handleNavigate}>
        {icon && <ListItemIcon>
          {icon}
        </ListItemIcon>}
        <ListItemText primary={text} />
      </ListItemButton>
    </ListItem>
  );
}

export const TemporaryDrawer = () => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const [state, setState] = React.useState({ right: false });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState({ ...state, [anchor]: open });
      };

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        sx={{ height: 33, boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: 10 }}
        startIcon={<img src={Hamburger} alt="Hamburger Icon" style={{ width: '15px', height: '11px' }} />}
        onClick={toggleDrawer("right", !state.right)}
      >
        <Typography style={{ fontSize: '0.9rem', color: '#fff', marginTop: '2.6px' }}>menu</Typography>
      </Button>

      <Drawer
        anchor={"right"}
        open={state["right"]}
        onClose={toggleDrawer("right", false)}
        sx={{ zIndex: 2000 }}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List sx={{ paddingTop: '30px' }}>
            <Item text={'言語 / Language'} icon={<LanguageOutlinedIcon />} onClick={toggleLanguage} />
            <Item text={language === 'en' ? 'Working Toward an Inclusive Society Where Every Diverse Member Can Prosper' : '広島大学ダイバーシティ＆インクルージョン推進機構'} to={language === 'en' ? "https://d-and-i.hiroshima-u.ac.jp/en/" : "https://d-and-i.hiroshima-u.ac.jp/"} icon={<WysiwygOutlinedIcon />} external />
          </List>
        </Box>
      </Drawer>
    </>
  );
}
