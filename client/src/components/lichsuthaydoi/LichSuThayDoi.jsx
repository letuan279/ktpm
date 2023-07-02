import React from 'react';
import { useData } from '../../context/NewAppContext';
import { Card, Table, Row, Col, Button, Input, Modal, Descriptions, Tag, Space } from 'antd';
import moment from 'moment';

const LichSuThayDoi = () => {

  const{lichSuHoKhau, fetchDataLichSuHoKhau,lichSuNhanKhau, fetchDataLichSuNhanKhau, nhankhau, hokhau} = useData();

  const columnsLichSuHoKhau = [
    {
      title: 'Số hộ khẩu',
      dataIndex: 'idHoKhau',
      key: 'idHoKhau',
      render: item => {
        return hokhau.find(e => e.id === item).soHoKhau
      }
    },
    {
      title: 'Thông tin thay đổi',
      dataIndex: 'thongTinThayDoi',
      key: 'thongTinThayDoi',
    },
    {
      title: 'Thay đổi từ',
      dataIndex: 'thayDoiTu',
      key: 'thayDoiTu',
    },
    {
      title: 'Thay đổi thành',
      dataIndex: 'thayDoiThanh',
      key: 'thayDoiThanh',
    },
    {
      title: 'Ngày thay đổi',
      dataIndex: 'ngayThayDoi',
      key: 'ngayThayDoi',
      render: item => moment(item).format('DD-MM-YYYY')
    },
 
  ]

  const columnsLichSuNhanKhau = [
    {
      title: 'Họ và tên',
      dataIndex: 'idNhanKhau',
      key: 'idNhanKhau',
      render: item => {
        return nhankhau.find(e => e.id === item).hoTen
      }
    },
    {
      title: 'Ngày chuyển',
      dataIndex: 'ngayChuyen',
      key: 'ngayChuyen',
      render: item => moment(item).format('DD-MM-YYYY')
    },
    {
      title: 'Nơi chuyển',
      dataIndex: 'noiChuyen',
      key: 'noiChuyen',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'ghiChu',
      key: 'ghiChu',
    },
  
  ]

  return (
    <>
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="Hộ khẩu"
                    extra={
                        <Space>
                            {/* <Input 
                            placeholder='Nhập tên nk/CMND'
                            onChange={(e) => setSearch(e.target.value)}
                            width={600}
                            /> */}
                        </Space>
                    }>
                    <Table 
                        pagination={false} 
                        columns={columnsLichSuHoKhau} 
                        dataSource={lichSuHoKhau}
                        className="ant-border-space"
                        scroll={{ y: 200 }}
                    />
                    </Card>
                </Col>
            </Row>
        </div>
        <div className="tabled">
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="Nhân khẩu"
                    extra={
                        <Space>
                            {/* <Input 
                            placeholder='Nhập tên nk/CMND'
                            onChange={(e) => setSearch(e.target.value)}
                            width={600}
                            /> */}
                        </Space>
                    }>
                    <Table 
                        pagination={false} 
                        columns={columnsLichSuNhanKhau} 
                        dataSource={lichSuNhanKhau}
                        className="ant-border-space"
                        scroll={{ y: 200 }}
                    />
                    </Card>
                </Col>
            </Row>
        </div>
    </>
  )
}

export default LichSuThayDoi