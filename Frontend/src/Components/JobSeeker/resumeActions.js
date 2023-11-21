import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import { Menu, MenuItem, Typography, Button } from "@mui/material";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import { NODE_HOST, NODE_PORT } from "../../envConfig";
import { ListItemIcon } from "@material-ui/core";
import { updateResume } from "../../redux/actions/loginActions";
import { connect } from "react-redux";

const ResumeActions = (props) => {
  const deleteResume = async () => {
    console.log("here");
    const response = await fetch(
      `http://${NODE_HOST}:${NODE_PORT}/deleteResume`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeURI: props.resumeURI,
          id: props.userId,
        }),
      }
    );

    const data = await response.json();

    if (data) {
      props.getJobSeekerDetails();
      let user = props.userObject;
      console.log(user);
      user.resumeFilename = data.resumeFilename ? data.resumeFilename : null;
      user.resumeURI = data.resumeURI ? data.resumeURI : null;
      let dataJson = {};
      dataJson.user = user;
      dataJson.token = props.token;
      props.updateResume(dataJson);
    }
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
        <MenuItem>
          <a href={props.resumeURI} download style={{ textDecoration: "none" }}>
            <ListItemIcon>
              <DownloadIcon fontSize="small" style={{ marginRight: 14 }} />
              Download
            </ListItemIcon>
          </a>
        </MenuItem>

        <MenuItem>
          <ListItemIcon onClick={() => deleteResume()}>
            <DeleteIcon fontSize="small" style={{ marginRight: 14 }} />
            Delete
          </ListItemIcon>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default connect(null, { updateResume })(ResumeActions);
