import React from "react";
//https://reactchartjs.github.io/react-chartjs-2/#/
import { Bar } from "@reactchartjs/react-chart.js";

const ManaCurveContainer = ({
  manaCurveData,
  ghostCurveData,
  manaCurveLabels,
}) => {
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
      {
        data: ghostCurveData,
        borderColor: "rgba(255, 255, 255, .2)",
        backgroundColor: "rgba(150, 150, 150, .2)",
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
          stacked: true,
          id: "amount",
          ticks: { min: 0, suggestedMax: 6 },
        },
      ],
      xAxes: [
        {
          stacked: true,
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
