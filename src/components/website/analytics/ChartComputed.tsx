import React, { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  ChartOptions,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from "chart.js";
import { isEqual } from "lodash";
import ArticleCard from "../articles/ArticleCard";
import { useRecoilValue } from "recoil";
import { articleState, articleSummaryState } from "../../../state/articleState";
import { ArticlesSummarySelector } from "../../../state/articlesState";
import { useNavigate, useParams } from "react-router";
import ArticlePreviewTooltip from "../articles/articlePreviewTooltip";
import styled from "styled-components";
import useNavigator from "../../../hooks/useNavigator";

const TooltipStyled = styled.div`
  transform: translate(-50%, 0);
  transition: all 0.3s ease;
  pointer-events: none;
  position: absolute;
`;

let latestId: string = "";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const ChartComponent: React.FC<{ data: ChartData<"bar"> | null }> = ({
  data,
}) => {
  const navigate = useNavigator();
  const chartRef = useRef(null); //create reference hook
  const [tooltip, setTooltip] = useState({
    opacity: 0,
    top: 0,
    left: 0,
    date: "",
    value: "",
  }); //initial tooltip state

  const options: ChartOptions<"bar"> = {
    indexAxis: "x",
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    maintainAspectRatio: true,
    elements: {
      bar: {
        borderWidth: 3,
      },
    },
    responsive: true,

    interaction: {
      mode: "index",
      intersect: false,
    },

    onHover: (e: any) => {},

    onClick: (e: any) => {
      latestId && navigate(`/articles/${latestId}`);
    },

    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Unique Views",
      },

      tooltip: {
        enabled: false,
        external: (context) => {
          const tooltipModel = context.tooltip as any;
          if (!chartRef || !chartRef.current) return;
          const position = context.chart.canvas.getBoundingClientRect();
          context.chart.canvas.style.cursor = "pointer";

          if (!tooltipModel.opacity && tooltip.opacity) {
            setTooltip((prev) => ({ ...prev, opacity: 0 }));
            return;
          }

          const id =
            tooltipModel.chart.data.datasets[0].data[
              tooltipModel.dataPoints[0].dataIndex
            ].id;

          latestId = id;

          const newTooltipData = {
            opacity: 1,
            left: position.left + tooltipModel.caretX + 30,
            top: position.top + tooltipModel.caretY,
            date: tooltipModel.dataPoints[0].label,
            value: id,
          };
          if (!isEqual(tooltip, newTooltipData)) setTooltip(newTooltipData);
        },
      },
    },
  };

  return (
    <div>
      {data && <Bar ref={chartRef} options={options} data={data} />}

      <TooltipStyled
        className="tooltip"
        style={{
          top: tooltip.top,
          left: tooltip.left,
          opacity: tooltip.opacity,
        }}
      >
        <TooltipComponent id={tooltip.value} />
      </TooltipStyled>
    </div>
  );
};

const TooltipComponent: React.FC<{ id: string }> = ({ id }) => {
  return <>{id && <ArticlePreviewTooltip id={id} />}</>;
};

export default ChartComponent;
