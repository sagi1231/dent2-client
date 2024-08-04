import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";
import Card from "../../common/Card";
import CardTitle from "../../common/CardTitle";

const LastMonthVisits: React.FC = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue("--text-color");
    const textColorSecondary = documentStyle.getPropertyValue(
      "--text-color-secondary"
    );
    const surfaceBorder = documentStyle.getPropertyValue("--surface-border");
    const data = {
      labels: ["5", "10", "15", "20", "25", "30"],
      datasets: [
        {
          label: "This Month",
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          tension: 0.4,
          backgroundColor: "#fff",
          pointStrokeColor: "red",

          borderColor: documentStyle.getPropertyValue("--blue-500"),
        },
        {
          label: "Last Month",
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderDash: [5, 5],
          tension: 0.4,
          backgroundColor: "#fff",
          borderColor: documentStyle.getPropertyValue("--teal-500"),
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 1,
      plugins: {
        legend: {
          position: "top", // Change the legend position here
          align: "center",
          labels: {
            padding: 10,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
        y: {
          ticks: {
            color: textColorSecondary,
          },
          grid: {
            color: surfaceBorder,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <>
      <Card className="">
        <CardTitle title={"This Month Visits"}></CardTitle>
        <Chart type="line" data={chartData} options={chartOptions} />
      </Card>
    </>
  );
};

export default LastMonthVisits;
