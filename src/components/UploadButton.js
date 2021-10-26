import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const useStyles = makeStyles({});

export const UploadButton = ({ onClick }) => {
  const classes = useStyles();
  return (
    <Button onClick={onClick}>
      <CloudUploadIcon />
      アップロード
    </Button>
  );
};
