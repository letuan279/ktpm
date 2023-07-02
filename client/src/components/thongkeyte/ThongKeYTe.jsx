import React from 'react'
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

const ThongKeYTe = () => {
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
                extra={<div className="sales">
                <ul style={{display: 'flex', gap: 10}}>
                  <li><Tag color='green' >{" "}</Tag> Tạm trú </li>
                  <li><Tag color='blue' >{" "}</Tag> Tạm vắng </li>
                </ul>
              </div>}
            >
            </Card>
            </Col>
            <Col span={24} md={12} className="mb-24">
            <Card
                bordered={false}
                title={<h6 className="font-semibold m-0">Thống kê độ tuổi</h6>}
                className="header-solid h-full"
                bodyStyle={{ paddingTop: 0, paddingBottom: 16 }}
            >
            </Card>
            </Col>
        </Row>
    </>

  )
}

export default ThongKeYTe