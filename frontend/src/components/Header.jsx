import { useState, useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import userContext from "../features/auth/userContext";

const pages = ["Login", "Register"];
const settings = ["Dashboard", "Profile", "Logout"];

function Header() {
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { user, setUser } = useContext(userContext);
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const lsUser = JSON.parse(localStorage.getItem("user"));
        console.log(lsUser);
        if (!lsUser) {
            setAuth(false);
        } else {
            // if user context already has this ignore.
            if (user) {
                const current = {
                    name: lsUser.name,
                    email: lsUser.email,
                    avatar: lsUser.avatar,
                };
                setUser(current);
            }
            setAuth(true);
        }
    }, [navigate]);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        handleCloseUserMenu();
        navigate("/login");
    };

    const handleNavigate = (page) => {
        handleCloseUserMenu();
        navigate(`/${page.toLowerCase()}`);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar
            position="static"
            color="transparent"
            className="glass"
            id="appbar"
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        className=" text-gray-700"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            textDecoration: "none",
                        }}
                    >
                        Guitar Perfect
                    </Typography>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            className=" text-gray-700"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {!auth
                                ? pages.map((page) => (
                                        <MenuItem
                                            key={page}
                                            onClick={handleCloseNavMenu}
                                        >
                                            <Link to={`/${page.toLowerCase()}`}>
                                                <Typography textAlign="center">
                                                    {page}
                                                </Typography>
                                            </Link>
                                        </MenuItem>
                                    ))
                                : settings.map((setting) =>
                                        setting === "Logout" ? (
                                            <MenuItem
                                                key={setting}
                                                onClick={handleLogout}
                                            >
                                                <Typography textAlign="center">
                                                    {setting}
                                                </Typography>
                                            </MenuItem>
                                        ) : (
                                            <MenuItem
                                                key={setting}
                                                onClick={handleCloseNavMenu}
                                            >
                                                <Link
                                                    to={`/${setting.toLowerCase()}`}
                                                >
                                                    <Typography textAlign="center">
                                                        {setting}
                                                    </Typography>
                                                </Link>
                                            </MenuItem>
                                        )
                                    )}
                        </Menu>
                    </Box>
                    <AdbIcon
                        sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
                    />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "white",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>
                    {!auth ? (
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: {
                                    xs: "none",
                                    md: "flex",
                                    justifyContent: "end",
                                },
                            }}
                        >
                            {pages.map((page) => (
                                <Link to={`/${page.toLowerCase()}`}>
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{
                                            mr: 2,
                                            display: { xs: "none", md: "flex" },
                                            fontWeight: 700,
                                            letterSpacing: ".3rem",
                                            textDecoration: "none",
                                            color:"white"
                                        }}
                                    >
                                        {page}
                                    </Button>
                                </Link>
                            ))}
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: {
                                    xs: "none",
                                    md: "flex",
                                    justifyContent: "end",
                                },
                            }}
                        >
                            <Tooltip title="Open settings">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    sx={{ p: 0 }}
                                >
                                    <Avatar
                                        alt="Remy Sharp"
                                        src={user.avatar}
                                        sx={{ width: 42, height: 42 }}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right",
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) =>
                                    setting === "Logout" ? (
                                        <MenuItem
                                            key={setting}
                                            onClick={handleLogout}
                                        >
                                            <Typography textAlign="center">
                                                {setting}
                                            </Typography>
                                        </MenuItem>
                                    ) : (
                                        <MenuItem
                                            key={setting}
                                            onClick={() =>
                                                handleNavigate(setting)
                                            }
                                        >
                                            <Typography textAlign="center">
                                                {setting}
                                            </Typography>
                                        </MenuItem>
                                    )
                                )}
                            </Menu>
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
