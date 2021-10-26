import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  LinearProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CSVReader } from "react-papaparse";
import axios from "axios";

const useStyles = makeStyles({});

export const UploadDialog = ({ open, handleClose }) => {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [checkBoxes, setCheckBoxes] = useState({
    yonohikari: true,
    ikiiki: true,
    lifeline: true,
  });
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState("fileSelect");
  const handleAllCheck = (e) => {
    setCheckBoxes({
      yonohikari: e.target.checked,
      ikiiki: e.target.checked,
      lifeline: e.target.checked,
    });
  };

  const [total, setTotal] = useState(0);
  const [count, setCount] = useState(0);
  const handleCheck = (e) => {
    setCheckBoxes({ ...checkBoxes, [e.target.name]: e.target.checked });
  };

  const handleConfirm = () => {
    setStage("upload");
    let getData;
    axios
      .get("/api/get-all-content")
      .then((r) => {
        getData = r.data.response;
        console.log(getData);
        data.forEach((d, i) => {
          setCount(i);
          setProgress((i / total) * 100);
          console.log(d.data);
          if (getData.find((g) => g.topicId === d.data[1])) {
            console.log("exists");
          }
        });
      })
      .catch((e) => {});
  };

  const handleOnDrop = (data) => {
    console.log("---------------------------");
    console.log(data);
    data.shift();
    setData(data);
    setTotal(data.length - 1);
    console.log("---------------------------");
  };

  const handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOnRemoveFile = () => {
    setData([]);
  };

  const handleCancel = () => {
    setData([]);
    handleClose();
  };

  return (
    <Dialog
      keepMounted={false}
      disableBackdropClick
      disableEscapeKeyDown
      open={open}
      onClose={handleCancel}
    >
      <DialogTitle>世の光コンテンツアップロード</DialogTitle>
      {stage === "fileSelect" && (
        <DialogContent>
          <Typography>アップロードされるコンテンツ</Typography>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={
                    checkBoxes.yonohikari &&
                    checkBoxes.ikiiki &&
                    checkBoxes.lifeline
                  }
                  onChange={handleAllCheck}
                />
              }
              label={"すべて"}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkBoxes.yonohikari}
                  name="yonohikari"
                  onChange={handleCheck}
                />
              }
              label={"世の光"}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkBoxes.ikiiki}
                  name="ikiiki"
                  onChange={handleCheck}
                />
              }
              label={"世の光いききタイム"}
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="lifeline"
                  checked={checkBoxes.lifeline}
                  onChange={handleCheck}
                />
              }
              label={"ライフライン"}
            />
          </FormGroup>

          <CSVReader
            isReset
            onDrop={handleOnDrop}
            onError={handleOnError}
            addRemoveButton
            onRemoveFile={handleOnRemoveFile}
          >
            <span>CSVファイルをドラッグまたはクリック</span>
          </CSVReader>
        </DialogContent>
      )}
      {stage === "upload" && (
        <DialogContent>
          <span>
            {count}/{total}
          </span>
          <LinearProgress variant="determinate" value={progress} />
        </DialogContent>
      )}
      {stage === "fileSelect" && (
        <DialogActions>
          <Button disabled={stage === "upload"} onClick={handleCancel}>
            キャンセル
          </Button>

          <Button
            disabled={
              data.length < 1 ||
              (!checkBoxes.ikiiki &&
                !checkBoxes.yonohikari &&
                !checkBoxes.lifeline)
            }
            onClick={handleConfirm}
          >
            アップロード
          </Button>
        </DialogActions>
      )}
      {stage === "upload" && (
        <DialogActions>
          <Button onClick={handleCancel}>OK</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};
