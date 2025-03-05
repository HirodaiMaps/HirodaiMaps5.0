import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"; // React Router の useNavigate をインポート
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { LanguageContext } from "./LanguageProvider";
import { TemporaryDrawer } from "./HamburgerIcon";
import Back from "../images/back.svg";
interface BottomNavBarTopProps {
  checkpointId?: string;
}

export const NavBar: React.FC<BottomNavBarTopProps> = ({ checkpointId }) => {
  const { language, toggleLanguage } = useContext(LanguageContext);
  const navigate = useNavigate(); // useNavigate フックを取得


  return (
    <Box>
      <AppBar
        sx={{
          backgroundColor: "#005e3c",
          position: "fixed",
          boxShadow: "0px 0px 0px 0px",
        }}
      >
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
            {checkpointId === "detail_page" ? (
              <Button
                variant="outlined"
                color="inherit"
                sx={{ height: 33, boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", borderRadius: 10 }}
                startIcon={
                  <img
                    src={Back}
                    alt="Hamburger Icon"
                    style={{ width: 17 }}
                  />
                }
                onClick={() => navigate("/")} // 前のページに戻る
              >
                <Typography
                  style={{
                    fontSize: "0.9rem",
                    color: "#fff",
                  }}
                >
                  back
                </Typography>
              </Button>
            ) : (
              <Link
                to={`/`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography
                  component="div"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    fontSize: 20,
                    fontWeight: 'bold'
                  }}
                >
                  HirodaiMaps
                </Typography>
              </Link>
            )}
          </Box>
          <TemporaryDrawer />
        </Toolbar>
      </AppBar>
    </Box>
  );
};
