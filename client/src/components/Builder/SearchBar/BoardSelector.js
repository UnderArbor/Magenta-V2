import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    background: "transparent",
    borderRadius: 3,
    border: 0,
    color: "#f1e6f2",
    height: 48,
    fontFamily: "Montserrat-Light",
    fontSize: 20,
    textTransform: "none",
  },
});

const BoardSelector = ({ boards, setBoardState, currentBoard, boardCount }) => {
  const classes = useStyles();

  const handleChange = (e, index) => {
    setBoardState(boards[index].name);
  };

  return (
    <div className="boardSelector">
      <Tabs
        TabIndicatorProps={{
          style: { backgroundColor: "#d9d68c" },
          margin: -16,
        }}
        value={boards.findIndex((board) => {
          return board.name === currentBoard;
        })}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab
          label={`${boards[0].name}: ${boardCount[0]}`}
          classes={{
            root: classes.root,
          }}
          style={{
            opacity: boards[0].name === currentBoard ? 1 : 0.5,
            color: "#f1e6f2",
            fontFamily: "Montserrat",
          }}
        />
        <Tab
          label={`${boards[1].name}: ${boardCount[1]}`}
          classes={{
            root: classes.root,
          }}
          style={{
            opacity: boards[1].name === currentBoard ? 1 : 0.5,
            color: "#f1e6f2",
            fontFamily: "Montserrat",
          }}
        />
        <Tab
          label={`${boards[2].name}: ${boardCount[2]}`}
          classes={{
            root: classes.root,
          }}
          style={{
            opacity: boards[2].name === currentBoard ? 1 : 0.5,
            color: "#f1e6f2",
            fontFamily: "Montserrat",
          }}
        />
      </Tabs>
    </div>
  );
};

export default BoardSelector;
