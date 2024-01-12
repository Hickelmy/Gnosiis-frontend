// Navbar.tsx
import React, { useState } from "react";
import {
  AppBar,
  Badge,
  Button,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RoomIcon from "@mui/icons-material/Room";
import LogoImage from "../../assets/Logo/logog.png";
import "./style.css";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TableChartIcon from "@mui/icons-material/TableChart";

export const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] =
    useState<null | HTMLElement>(null);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleAccountMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const handleAccountMenuClose = () => {
    setAccountMenuAnchor(null);
  };

  return (
    <div>
      <AppBar position="static" sx={{ bgcolor: "#0F1111" }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>

          <Link to="/">
            <Button color="inherit">
              <img
                src={LogoImage}
                alt="Logo"
                style={{
                  maxWidth: "120px",
                  maxHeight: "64px",
                  marginRight: "auto",
                }}
              />
            </Button>
          </Link>
          <div className="searchContainer">
            <InputBase
              placeholder="Pesquisar"
              className="searchInput"
              startAdornment={<SearchIcon className="searchIcon" />}
            />
          </div>

          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              color="inherit"
              onClick={() => console.log("GPS icon clicked")}
            >
              <RoomIcon />
            </IconButton>
            <Typography variant="body2" sx={{ marginRight: 1 }}>
              Manaus - 690000
            </Typography>

            <IconButton color="inherit" onClick={handleAccountMenuOpen}>
              <AccountCircleIcon />
            </IconButton>
            <Menu
              id="account-menu"
              anchorEl={accountMenuAnchor}
              open={Boolean(accountMenuAnchor)}
              onClose={handleAccountMenuClose}
            >
              <MenuItem onClick={handleAccountMenuClose}>Conta</MenuItem>
              <MenuItem onClick={handleAccountMenuClose}>Seus Pedidos</MenuItem>

              <MenuItem onClick={handleAccountMenuClose}>
                Configurações
              </MenuItem>
            </Menu>
            <IconButton
              color="inherit"
              onClick={() => console.log("Shopping cart icon clicked")}
            >
              <Badge badgeContent={3} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={toggleDrawer(false)}>
            <Typography variant="h6" component="div">
              Ginosiis
            </Typography>
          </ListItem>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <span>Pagina Inicial</span>
            </ListItem>
          </Link>


          <Link
            to="/users"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <span>Usuarios</span>
            </ListItem>
          </Link>

          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>

              <span>Login</span>
            </ListItem>
          </Link>

          <Link
            to="/registro"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>

              <span>Cadastrar usuário</span>
            </ListItem>
          </Link>
          <Link
            to="/***"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <ErrorOutlineIcon />
              </ListItemIcon>

              <span>Página indisponível</span>
            </ListItem>
          </Link>

          <Link
            to="/novolivro"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>

              <span>Cadastrar Produto</span>
            </ListItem>
          </Link>

          <Link
            to="/tabelalivros"
            style={{
              textDecoration: "none",
              color: "inherit",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ListItem button onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <TableChartIcon />
              </ListItemIcon>

              <span>Tabela de produtos</span>
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </div>
  );
};
