import React from 'react'
import {
    Row,
    Col,
    Card,
    Typography,
    Space,
    Image,
    Avatar
} from "antd";
import EChart from '../chart/EChart';
import LineChart from '../chart/LineChart';
import { useData } from '../../context/NewAppContext';
import DoTuoiEChart from './DoTuoiEChart'
import ThongKeTTTV from './ThongkeTTTV'

const ThongKe = () => {
    const {hokhau, nhankhau} = useData();

    const {Title} = Typography

  return (
    <>
        <Row gutter={[24, 0]}>
            <Col span={24} md={6} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Hộ khẩu</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                extra={<Avatar shape="square" size={48} src='./hokhau.png'></Avatar>}
            >
                <Space>
                    <Title style={{marginLeft: 20}}>{hokhau.length}</Title>
                    <Title level={5} >{"(hộ)"}</Title>
                </Space>
            </Card>
            </Col>
            <Col span={24} md={6} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Nhân khẩu</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                extra={<Avatar shape="square" size={48} src='./people.png'></Avatar>}
            >
                <Space>
                    <Title style={{marginLeft: 20}}>{nhankhau.length}</Title>
                    <Title level={5} >{"(người)"}</Title>
                </Space>
            </Card>
            </Col>
            <Col span={24} md={6} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Số lượng nam</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                extra={<Avatar shape="square" size={48} src='./men.png'></Avatar>}
            >
                <Space>
                    <Title style={{marginLeft: 20}}>{nhankhau.filter(item => item.gioiTinh === 1).length}</Title>
                    <Title level={5} >{"(người)"}</Title>
                </Space>
            </Card>
            </Col>
            <Col span={24} md={6} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Số lượng nữ</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
                extra={<Avatar shape="square" size={48} src='./woman.png'></Avatar>}
            >
                <Space>
                    <Title style={{marginLeft: 20}}>{nhankhau.filter(item => item.gioiTinh === 0).length}</Title>
                    <Title level={5} >{"(người)"}</Title>
                </Space>
            </Card>
            </Col>
        </Row>
        <Row gutter={[24, 0]}>
            <Col span={24} md={12} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Thống kê tạm trú tạm vắng</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            >
                <ThongKeTTTV/>
            </Card>
            </Col>
            <Col span={24} md={12} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Thống kê độ tuổi</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            >
                <DoTuoiEChart></DoTuoiEChart>
            </Card>
            </Col>
        </Row>
    </>

  )
}

export default ThongKe