import React from "react";
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
        backgroundColor: "#872f8e",
        borderColor: "transparent",
        hoverBackgroundColor: "#b740bf",
      },
      {
        data: ghostCurveData,
        yAxisId: "amount",
        borderColor: "transparent",
        backgroundColor: "rgba(20, 20, 20, .4)",
        hoverBackgroundColor: "rgba(100, 100, 100, .4)",
      },
    ],
  };

  const options = {
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
          },
          gridLines: { display: false, borderWidth: 100 },
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
