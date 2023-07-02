
import {Tag} from 'antd'
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";

function ThongKeTTTV() {
  const { Title, Paragraph } = Typography;

  const series = [
    {
      name: "Mobile apps",
      data: [350, 40, 300, 220, 500, 250, 400, 230, 500],
      offsetY: 0,
    },
    {
      name: "Websites",
      data: [30, 90, 40, 140, 290, 290, 340, 230, 400],
      offsetY: 0,
    },
  ]

  const options = {
    chart: {
      width: "100%",
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },

    yaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: ["#8c8c8c"],
        },
      },
    },

    xaxis: {
      labels: {
        style: {
          fontSize: "14px",
          fontWeight: 600,
          colors: [
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  }

  return (
    <>
      <div className="sales">
          <ul style={{display: 'flex', gap: 10}}>
            <li><Tag color='green' >{" "}</Tag> Traffic</li>
            <li><Tag color='blue' >{" "}</Tag> Sales</li>
          </ul>
        </div>

      <ReactApexChart
        className="full-width"
        options={options}
        series={series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default ThongKeTTTV;
