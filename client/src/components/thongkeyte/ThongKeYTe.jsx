import React, { useEffect, useState } from 'react'
import {
    Row,
    Col,
    Card,
    Typography,
    Space,
    Image,
    Avatar,
    Tag
} from "antd";
import { useData } from '../../context/NewAppContext';
import { BACK_END_URL } from '../../context/const';
import YteEChart from './YteEChart'
import ThongKeLineChart from './ThongKeLineChart';

const ThongKeYTe = () => {
    const {hokhau, nhankhau, khaiBaoYTe, cachLy} = useData();

    const {Title} = Typography


    const [macCovid, setMacCovid] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${BACK_END_URL}/yte/thongke/${"2023-07-02"}`);
                const data = await res.json();
                setMacCovid(data.data[0].count)
              } catch (error) {
                console.error(error);
              }
        }
        fetchData();
    }, [])

  return (
    <>
        <Row gutter={[24, 0]}>
            <Col span={24} md={6} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Khai báo y tế</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                extra={<Avatar shape="square" size={48} src='./hokhau.png'></Avatar>}
            >
                <Space>
                    <Title style={{marginLeft: 20}}>{khaiBaoYTe.length}</Title>
                    <Title level={5} >{"(lần)"}</Title>
                </Space>
            </Card>
            </Col>
            <Col span={24} md={6} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Khai báo cách ly</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                extra={<Avatar shape="square" size={48} src='./people.png'></Avatar>}
            >
                <Space>
                    <Title style={{marginLeft: 20}}>{cachLy.length}</Title>
                    <Title level={5} >{"(lần)"}</Title>
                </Space>
            </Card>
            </Col>
            <Col span={24} md={6} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Số người mắc covid</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                extra={<Avatar shape="square" size={48} src='./men.png'></Avatar>}
            >
                <Space>
                    <Title style={{marginLeft: 20}}>{macCovid}</Title>
                    <Title level={5} >{"(người)"}</Title>
                </Space>
            </Card>
            </Col>
            <Col span={24} md={6} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Số người khỏe mạnh</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                extra={<Avatar shape="square" size={48} src='./woman.png'></Avatar>}
            >
                <Space>
                    <Title style={{marginLeft: 20}}>{nhankhau.filter(item => item.trangThai !== 'Đã qua đời').length - macCovid}</Title>
                    <Title level={5} >{"(người)"}</Title>
                </Space>
            </Card>
            </Col>
        </Row>
        <Row gutter={[24, 0]}>
            <Col span={24} md={12} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Thống kê số lượng mắc covid</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                extra={<div className="sales">
                <ul style={{display: 'flex', gap: 10}}>
                  <li><Tag color='blue' >{" "}</Tag> Số người khỏe </li>
                  <li><Tag color='green' >{" "}</Tag> Số người mắc </li>
                </ul>
              </div>}
            >
                <ThongKeLineChart/>
            </Card>
            </Col>
            <Col span={24} md={12} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Thống kê mức độ Covid</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            >
                <YteEChart/>
            </Card>
            </Col>
        </Row>
    </>

  )
}

export default ThongKeYTe