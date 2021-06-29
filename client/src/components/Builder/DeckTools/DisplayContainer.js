import React from "react";
import Switch from "react-switch";
import Slider from "@material-ui/core/Slider";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const DisplayContainer = ({
  displaySettings,
  toggleDisplaySetting,
  handleSliderChange,
}) => {
  const SizeSlider = createMuiTheme({
    overrides: {
      MuiSlider: {
        root: {
          color: "#ab85ad",
          height: 8,
        },
        thumb: {
          height: 24,
          width: 24,
          backgroundColor: "#691070",
          marginTop: -10,
          marginLeft: -12,
          boxShadow: "0 0 0 0 #000",
          "&:hover": {
            boxShadow: "0 0 2px 7px rgba(219, 213, 153, 0.2)",
            // Reset on touch devices, it doesn't add specificity
            "@media (hover: none)": {
              boxShadow: "0 0 0 0 #000",
            },
          },
          "&:active": {
            boxShadow: "0 0 3px 10px rgba(219, 213, 153, 0.35)",
          },
        },
        valueLabel: {
          left: -4,
          "& *": {
            background: "#601466",
            color: "#f1e6f2",
          },
        },
        track: {
          height: 4,
          borderRadius: 2,
        },
        rail: {
          height: 4,
          borderRadius: 2,
        },
      },
    },
  });

  return (
    <div className="displayToggleContainer">
      <div className="displaySetting">
        <p className="displaySettingName">Display Mana</p>
        <Switch
          id="displayMana"
          onChange={(checked, e, id) => toggleDisplaySetting(checked, id)}
          checked={displaySettings.displayMana}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor={"#ab85ad"}
          onHandleColor={"#691070"}
          offColor={"#c4c4c4"}
          offHandleColor={"#3f3f3f"}
          handleDiameter={36}
        />
      </div>
      <div className="displaySetting">
        <p className="displaySettingName">Display Quantity</p>
        <Switch
          id="displayQuantity"
          onChange={(checked, e, id) => toggleDisplaySetting(checked, id)}
          checked={displaySettings.displayQuantity}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor={"#ab85ad"}
          onHandleColor={"#691070"}
          offColor={"#c4c4c4"}
          offHandleColor={"#3f3f3f"}
          handleDiameter={36}
        />
      </div>
      <div className="displaySetting">
        <p className="displaySettingName">Card Legalities</p>
        <Switch
          id="displayLegalities"
          onChange={(checked, e, id) => toggleDisplaySetting(checked, id)}
          checked={displaySettings.displayLegalities}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor={"#ab85ad"}
          onHandleColor={"#691070"}
          offColor={"#c4c4c4"}
          offHandleColor={"#3f3f3f"}
          handleDiameter={36}
        />
      </div>
      <div className="displaySetting">
        <p className="displaySettingName">Display Name</p>
        <Switch
          id="displayName"
          onChange={(checked, e, id) => toggleDisplaySetting(checked, id)}
          checked={displaySettings.displayName}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor={"#ab85ad"}
          onHandleColor={"#691070"}
          offColor={"#c4c4c4"}
          offHandleColor={"#3f3f3f"}
          handleDiameter={36}
        />
      </div>
      <div className="displaySetting">
        <p className="displaySettingName">Display Ghosts</p>
        <Switch
          id="displayGhosts"
          onChange={(checked, e, id) => toggleDisplaySetting(checked, id)}
          checked={displaySettings.displayGhosts}
          checkedIcon={false}
          uncheckedIcon={false}
          onColor={"#ab85ad"}
          onHandleColor={"#691070"}
          offColor={"#c4c4c4"}
          offHandleColor={"#3f3f3f"}
          handleDiameter={36}
        />
      </div>
      <div className="displaySetting">
        <p className="displaySettingName">Card Size %</p>
        <div className="displaySlider">
          <ThemeProvider theme={SizeSlider}>
            <Slider
              value={displaySettings.cardSize}
              min={60}
              max={120}
              onChange={handleSliderChange}
              valueLabelDisplay="auto"
            />
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
};

export default DisplayContainer;
