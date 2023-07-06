import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BACK_END_URL } from "../../context/const";
import { useData } from "../../context/NewAppContext";

function EChart() {
  const {cachLy} = useData()

  const options = {
    chart: {
      type: "bar",
      width: "100%",
      height: "auto",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ["transparent"],
    },
    grid: {
      show: true,
      borderColor: "#ccc",
      strokeDashArray: 2,
    },
    xaxis: {
      categories: [
        "F0",
        "F1",
        "F2",
        "F3"
      ],
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },
    yaxis: {
      labels: {
        show: true,
        align: "right",
        minWidth: 0,
        maxWidth: 160,
        style: {
          colors: [
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
            "#fff",
          ],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  }

  const returnF = () => {
    const f0 = cachLy.filter(item => item.mucDoCovid === 'F0').length
    const f1 = cachLy.filter(item => item.mucDoCovid === 'F1').length
    const f2 = cachLy.filter(item => item.mucDoCovid === 'F2').length
    const f3 = cachLy.filter(item => item.mucDoCovid === 'F3').length
    return [f0, f1, f2, f3]
  }

  const series = [
    {
      name: "Số người",
      data: returnF(),
      color: "#fff",
    },
  ]

  return (
    <div id="chart" style={{marginTop: 40}}>
        <ReactApexChart
            className="bar-chart"
            options={options}
            series={series}
            type="bar"
            height={220}
        />
    </div>
  );
}

export default EChart;
