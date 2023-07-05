
import {Tag} from 'antd'
import React, { useEffect, useState } from 'react'
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { BACK_END_URL } from '../../context/const';

function ThongKeTTTV() {
  const { Title, Paragraph } = Typography;

  
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
            "#8c8c8c",
            "#8c8c8c",
            "#8c8c8c",
          ],
        },
      },
      categories: [
        "T1",
        "T2",
        "T3",
        "T4",
        "T5",
        "T6",
        "T7",
        "T8",
        "T9",
        "T10",
        "T11",
        "T12",
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

  const [dataAge, setDataAge] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  useEffect(() => {
    const fetchAll = async () => {
      const fetchDataTamTru = async (date) => {
        try {
          const res = await fetch(`${BACK_END_URL}/nhankhau/thongke/tamtru/${date}`);
          const data = await res.json();
          return data.data[0].count
        } catch (error) {
          console.error(error);
        }
      }

      const fetchDataTamVang = async (date) => {
        try {
          const res = await fetch(`${BACK_END_URL}/nhankhau/thongke/tamvang/${date}`);
          const data = await res.json();
          return data.data[0].count
        } catch (error) {
          console.error(error);
        }
      }
  
      const dotuoi0_6 = await fetchDataTamTru("2022-01-30");
      const dotuoi6_12 = await fetchDataTamTru("2022-02-28");
      const dotuoi12_18 = await fetchDataTamTru("2022-03-30");
      const dotuoi18_22 = await fetchDataTamTru("2022-04-30");
      const dotuoi22_30 = await fetchDataTamTru("2022-05-30");
      const dotuoi30_45 = await fetchDataTamTru("2022-06-30");
      const dotuoi45_60 = await fetchDataTamTru("2022-07-30");
      const dotuoi60_70 = await fetchDataTamTru("2022-08-30");
      const dotuoi70 = await fetchDataTamTru("2022-09-30");
      const dotuoi80 = await fetchDataTamTru("2022-10-30");
      const dotuoi81 = await fetchDataTamTru("2022-11-30");
      const dotuoi82 = await fetchDataTamTru("2022-12-30");

      const dotuoi0_6_ = await fetchDataTamVang("2022-01-30");
      const dotuoi6_12_ = await fetchDataTamVang("2022-02-28");
      const dotuoi12_18_ = await fetchDataTamVang("2022-03-30");
      const dotuoi18_22_ = await fetchDataTamVang("2022-04-30");
      const dotuoi22_30_ = await fetchDataTamVang("2022-05-30");
      const dotuoi30_45_ = await fetchDataTamVang("2022-06-30");
      const dotuoi45_60_ = await fetchDataTamVang("2022-07-30");
      const dotuoi60_70_ = await fetchDataTamVang("2022-08-30");
      const dotuoi70_ = await fetchDataTamVang("2022-09-30");
      const dotuoi80_ = await fetchDataTamVang("2022-10-30");
      const dotuoi81_ = await fetchDataTamVang("2022-11-30");
      const dotuoi82_ = await fetchDataTamVang("2022-12-30");


      const data = []
      data.push(dotuoi0_6)
      data.push(dotuoi6_12)
      data.push(dotuoi12_18)
      data.push(dotuoi18_22)
      data.push(dotuoi22_30)
      data.push(dotuoi30_45)
      data.push(dotuoi45_60)
      data.push(dotuoi60_70)
      data.push(dotuoi70)
      data.push(dotuoi80)
      data.push(dotuoi81)
      data.push(dotuoi82)
      
      const data2 = []
      data2.push(dotuoi0_6_)
      data2.push(dotuoi6_12_)
      data2.push(dotuoi12_18_)
      data2.push(dotuoi18_22_)
      data2.push(dotuoi22_30_)
      data2.push(dotuoi30_45_)
      data2.push(dotuoi45_60_)
      data2.push(dotuoi60_70_)
      data2.push(dotuoi70_)
      data2.push(dotuoi80_)
      data2.push(dotuoi81_)
      data2.push(dotuoi82_)

      
      setDataAge(data);
      setData(data2)
    }
    fetchAll()
  }, [])

  const series = [
    {
      name: "Tạm trú",
      data: dataAge,
      offsetY: 0,
    },
    {
      name: "Tạm vắng",
      data: data,
      offsetY: 0,
    },
  ]

  return (
    <>
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
