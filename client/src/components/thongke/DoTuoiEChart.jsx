import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { BACK_END_URL } from "../../context/const";

function EChart() {

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
        "0-6",
        "6-12",
        "12-18",
        "18-22",
        "22-30",
        "30-45",
        "45-60",
        "60-70",
        "70+",
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

  const [dataAge, setDataAge] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0])
  useEffect(() => {
    const fetchAll = async () => {
      const fetchData = async (tuoiMin, tuoiMax) => {
        try {
          const res = await fetch(`${BACK_END_URL}/nhankhau/thongke/dotuoi`, {
            method: "GET",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tuoiMin,
              tuoiMax
            })
        });
          const data = await res.json();
          return data.data.length
        } catch (error) {
          console.error(error);
        }
      }
  
      const dotuoi0_6 = await fetchData(0, 6);
      const dotuoi6_12 = await fetchData(6, 12);
      const dotuoi12_18 = await fetchData(12, 18);
      const dotuoi18_22 = await fetchData(18, 22);
      const dotuoi22_30 = await fetchData(22, 30);
      const dotuoi30_45 = await fetchData(30, 45);
      const dotuoi45_60 = await fetchData(45, 60);
      const dotuoi60_70 = await fetchData(60, 70);
      const dotuoi70 = await fetchData(70, 100);
  
      const data = dotuoi0_6.concat(
        dotuoi6_12,
        dotuoi12_18,
        dotuoi18_22,
        dotuoi22_30,
        dotuoi30_45,
        dotuoi45_60,
        dotuoi60_70,
        dotuoi70
      );
      
      setDataAge(data);
    }
    // fetchAll()
  }, [])

  const series = [
    {
      name: "Số người",
      data: dataAge,
      color: "#fff",
    },
  ]

  return (
    <>
      <div id="chart" style={{marginTop: 40}}>
        <ReactApexChart
          className="bar-chart"
          options={options}
          series={series}
          type="bar"
          height={220}
        />
      </div>
    </>
  );
}

export default EChart;
