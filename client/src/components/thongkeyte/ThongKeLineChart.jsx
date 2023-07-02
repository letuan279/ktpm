import React, { useEffect, useState } from 'react'
import {Tag} from 'antd'
import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { BACK_END_URL } from '../../context/const';
import { useData } from '../../context/NewAppContext';

function ThongKeLineChart() {
  const { Title, Paragraph } = Typography;
  const {nhankhau} = useData()

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

  const [dataAge, setDataAge] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [data, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  useEffect(() => {
    const fetchAll = async () => {
      const fetchData = async (date) => {
        try {
          const res = await fetch(`${BACK_END_URL}/yte/thongke/${date}`);
          const data = await res.json();
          return data.data[0].count
        } catch (error) {
          console.error(error);
        }
      }
  
      const dotuoi0_6 = await fetchData("2022-02-28");
      const dotuoi6_12 = await fetchData("2022-03-30");
      const dotuoi12_18 = await fetchData("2022-03-30");
      const dotuoi18_22 = await fetchData("2022-04-30");
      const dotuoi22_30 = await fetchData("2022-05-30");
      const dotuoi30_45 = await fetchData("2022-06-30");
      const dotuoi45_60 = await fetchData("2022-07-30");
      const dotuoi60_70 = await fetchData("2022-08-30");
      const dotuoi70 = await fetchData("2022-09-30");
      const dotuoi80 = await fetchData("2022-10-30");


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
      
      setDataAge(data);
      const soNgKhoe = nhankhau.filter(item => item.trangThai !== "Đã qua đời").length
      console.log(soNgKhoe);
      setData(data.map(i => soNgKhoe - i))
    }
    fetchAll()
  }, [])

  const series = [
    {
      name: "Người khỏe mạnh",
      data: data,
      offsetY: 0,
    },
    {
      name: "Người mắc Covid",
      data: dataAge,
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

export default ThongKeLineChart;
