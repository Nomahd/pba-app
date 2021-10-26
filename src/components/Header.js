import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Link as MuiLink,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { UploadButton } from "./UploadButton";
import { UploadDialog } from "./UploadDialog";
const useStyles = makeStyles({
  image: {
    maxHeight: "100%",
    cursor: "pointer",
    marginRight: "5rem",
  },
  icon: {
    marginRight: ".5rem",
  },
  links: {
    margin: "0 3rem",
    cursor: "pointer",
  },
});

export const Header = () => {
  const classes = useStyles();
  const [session] = useSession();
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    signOut();
  };

  const [dialogOpen, setDialogOpen] = useState(false);
  const openUploadDialog = () => {
    setDialogOpen(true);
  };

  const closeUploadDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <AppBar position="relative">
        <Toolbar variant="dense">
          <Box height="4rem" flexGrow={1} display="flex" alignItems="center">
            <Link href="/">
              <img src="/pba_logo.png" className={classes.image} />
            </Link>

            <Link href="/yonohikari">
              <MuiLink className={classes.links} variant="button">
                RADIO世の光
              </MuiLink>
            </Link>

            <Link href="/lifeline">
              <MuiLink className={classes.links} variant="button">
                TVライフライン
              </MuiLink>
            </Link>
          </Box>

          <Box>
            <Button onClick={openMenu}>
              <AccountCircleIcon className={classes.icon} />{" "}
              {session && session.user.name}
            </Button>
          </Box>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            onClose={closeMenu}
          >
            <MenuItem onClick={logout}>ログアウト</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box>
        <UploadButton onClick={openUploadDialog} />
        <UploadDialog open={dialogOpen} handleClose={closeUploadDialog} />
      </Box>
    </>
  );
};
