import React, { useEffect, useState } from 'react'
import { Card, Table, Row, Col, Button, Input, Modal, Descriptions, Tag, Space } from 'antd';
import { useData } from '../../context/NewAppContext';
import moment from 'moment';
import AddTamTruModal from './AddTamTruModal';
import AddTamVangModal from './AddTamVangModal';

const TamTruTamVang = () => {

    const {tamTru, tamVang, fetchDataTamTru, fetchDataTamVang, setTamTru, setTamVang } = useData()

    const columnsTamTru = [
        {
            title: 'Họ và tên',
            dataIndex: 'HoTen',
            key: 'HoTen',
            width: '15%'
        },
        {
            title: 'Số CMND',
            dataIndex: 'soCMND',
            key: 'soCMND',
            width: '15%'
        },
        {
            title: 'Số giấy tạm trú',
            dataIndex: 'soGiayTamTru',
            key: 'soGiayTamTru',
            width: '15%'
        },
        {
            title: 'Lý do',
            dataIndex: 'lyDo',
            key: 'lyDo',
            width: '15%'
        },
        {
            title: 'Thời gian tạm trú',
            dataIndex: 'thoiGianTamTru',
            key: 'thoiGianTamTru',
            render: item => moment(item).format('DD-MM-YYYY'),
            width: '15%'
        },
       
    ]

    const columnsTamVang = [
        {
            title: 'Họ và tên',
            dataIndex: 'hoTen',
            key: 'hoTen',
            width: '15%'
        },
        {
            title: 'Số CMND',
            dataIndex: 'soCMND',
            key: 'soCMND',
            width: '15%'
        },
        {
            title: 'Số giấy tạm vắng',
            dataIndex: 'soGiayTamVang',
            key: 'soGiayTamVang',
            width: '15%'
        },
        {
            title: 'Nơi tạm trú',
            dataIndex: 'noiTamTru',
            key: 'noiTamTru',
            width: '15%'
        },
        {
            title: 'Từ ngày',
            dataIndex: 'tuNgay',
            key: 'tuNgay',
            width: '15%',
            render: item => moment(item).format('DD-MM-YYYY')
        },
        {
            title: 'Đến ngày',
            dataIndex: 'denNgay',
            key: 'denNgay',
            width: '15%',
            render: item => moment(item).format('DD-MM-YYYY')
        },
    
    ]

    useEffect(() => {
        fetchDataTamTru()
        fetchDataTamTru()
    }, [])

    const [searchTamTru, SetSearchTamTru] = useState("")
    const searchedDataTamTru = tamTru.filter(item => item.soGiayTamTru.toLowerCase().includes(searchTamTru.toLowerCase()));

    const [searchTamVang, SetSearchTamVang] = useState("")
    const searchedDataTamVang = tamVang.filter(item => item.soGiayTamVang.toLowerCase().includes(searchTamVang.toLowerCase()));

    // Add modal TamTru
    const [addTamTruModalVisible, setAddTamTruModalVisible] = useState(false);
    const handleAddTamTru = () => {
        setAddTamTruModalVisible(true);
    };

    // Add modal TamVang
    const [addTamVangModalVisible, setAddTamVangModalVisible] = useState(false);
    const handleAddTamVang = () => {
        setAddTamVangModalVisible(true);
    };

    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Tạm trú"
                        extra={
                            <Space>
                                <Button type="primary" onClick={handleAddTamTru}>Xin giấy tạm trú</Button>
                                <Input 
                                placeholder='Số giấy tạm trú'
                                onChange={(e) => SetSearchTamTru(e.target.value)}
                                width={600}
                                />
                            </Space>
                        }>
                        <Table 
                            pagination={false} 
                            columns={columnsTamTru} 
                            dataSource={searchedDataTamTru}
                            className="ant-border-space"
                            scroll={{ y: 200 }}
                        />
                        </Card>
                    </Col>
                </Row>
                {addTamTruModalVisible && <AddTamTruModal 
                    editModalVisible={addTamTruModalVisible}
                    setEditModalVisible={setAddTamTruModalVisible}
                />}
            </div>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Tạm vắng"
                        extra={
                            <Space>
                                <Button type="primary" onClick={handleAddTamVang}>Xin giấy tạm vắng</Button>
                                <Input 
                                placeholder='Số giấy tạm vắng'
                                onChange={(e) => SetSearchTamVang(e.target.value)}
                                width={600}
                                />
                            </Space>
                        }>
                        <Table 
                            pagination={false} 
                            columns={columnsTamVang} 
                            dataSource={searchedDataTamVang}
                            className="ant-border-space"
                            scroll={{ y: 200 }}
                        />
                        </Card>
                    </Col>
                </Row>
                {addTamVangModalVisible && <AddTamVangModal 
                    editModalVisible={addTamVangModalVisible}
                    setEditModalVisible={setAddTamVangModalVisible}
                />}
            </div>
        </>

    )
}

export default TamTruTamVang