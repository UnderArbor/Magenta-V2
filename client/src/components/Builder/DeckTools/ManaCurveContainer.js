import React from "react";
import { Bar } from "@reactchartjs/react-chart.js";

const ManaCurveContainer = ({ manaCurveData, manaCurveLabels }) => {
  const data = {
    labels: manaCurveLabels,
    datasets: [
      {
        label: "Amount",
        data: manaCurveData,
        yAxisID: "amount",
        backgroundColor: "black",
        borderColor: "white",
        hoverBackgroundColor: "grey",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    // title: { display: true, text: "Mana Curve", fontSize: 20 },
    legend: { display: false },
    scales: {
      yAxes: [
        {
          id: "amount",
          ticks: { min: 0, suggestedMax: 6 },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Converted Mana Cost",
            color: "white",
          },
        },
      ],
    },
  };

  return (
    <div className="manaCurveContainer">
      <Bar data={data} options={options} height={500} width={500} />
    </div>
  );
};

export default ManaCurveContainer;
