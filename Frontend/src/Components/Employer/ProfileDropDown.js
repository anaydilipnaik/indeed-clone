import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Reviews from "@mui/icons-material/Reviews";
import ReviewsIcon from "@mui/icons-material/Reviews";
import LogoutIcon from "@mui/icons-material/Logout";
import { Menu, MenuItem, Typography } from "@mui/material";
import { ListItemIcon } from "@material-ui/core";
import { Link } from "react-router-dom";
import { commonLogoutFunc } from "../../redux/actions/loginActions";
import { connect } from "react-redux";
import { useSelector } from "react-redux";

const ProfileDropDown = (props) => {
  const name = useSelector((state) => state.login.user.ceoName);

  if (name == undefined) {
    console.log("Name is undefined");
  }
  const handleLogout = (e) => {
    e.preventDefault();
    props.commonLogoutFunc();
  };
  return (
    <React.Fragment>
      <Menu
        anchorEl={props.anchorEl}
        open={props.open}
        onClose={props.onClose}
        onClick={props.onClick}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            width: 250,

            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography
          sx={{ textAlign: "center", lineHeight: 4, fontWeight: 600 }}
        >
          company@email.com
        </Typography>
        <Link to="/employerProfile" style={{ textDecoration: "none" }}>
          <MenuItem>
            <ListItemIcon>
              <DescriptionIcon fontSize="small" />
            </ListItemIcon>
            Company Profile
          </MenuItem>
        </Link>
        <Link to="/employerReviews" style={{ textDecoration: "none" }}>
          <MenuItem>
            <ListItemIcon>
              <ReviewsIcon fontSize="small" />
            </ListItemIcon>
            Reviews
          </MenuItem>
        </Link>
        <Link to="#" onClick={handleLogout} style={{ textDecoration: "none" }}>
          <MenuItem>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Sign out
          </MenuItem>
        </Link>
      </Menu>
    </React.Fragment>
  );
};

export default connect(null, { commonLogoutFunc })(ProfileDropDown);
