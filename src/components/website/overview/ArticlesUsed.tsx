import React from "react";
import { Chart } from "primereact/chart";
import Card from "../../common/Card";
import CardTitle from "../../common/CardTitle";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";

const ArticlsUsed: React.FC = () => {
  const { websiteId } = useParams();

  const documentStyle = getComputedStyle(document.documentElement);

  return (
    <>
      <Card className="h-full">
        <CardTitle title={"Users by Gender"}></CardTitle>
        <Chart
          type="doughnut"
          data={{
            labels: [60 + "% Male", 40 + "% Female"],
            datasets: [
              {
                data: [60, 40],
                backgroundColor: ["#A259FF", "#E6E6E6"],
                hoverBackgroundColor: [
                  documentStyle.getPropertyValue("--blue-400"),
                  "#E6E6E6",
                ],
              },
            ],
          }}
          options={{
            cutout: "60%",
            rotation: -90,
            responsive: true,
            maintainAspectRatio: false, // Set to false to allow custom aspect ratio
            aspectRatio: 2.4,
            circumference: 180,
            plugins: {
              legend: {
                position: "bottom", // Change the legend position here
                align: "center",
                labels: {
                  usePointStyle: true,
                  padding: 10,
                },
              },
            },
          }}
          className="w-full"
        />
      </Card>
    </>
  );
};

export default ArticlsUsed;
