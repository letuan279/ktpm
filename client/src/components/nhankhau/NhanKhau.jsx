import React, { useEffect, useState } from 'react'
import { useData } from '../../context/NewAppContext'
import { Card, Table, Row, Col, Button, Input, Modal, Descriptions, Tag, Space } from 'antd';
import moment from 'moment';
import AddNhanKhauModal from './AddNhanKhauModal';
import ThayDoiNhanKhauModal from './ThayDoiNhanKhauModal';


const NhanKhau = () => {
  const {hokhau, setHokhau, nhankhau, setNhanKhau, fetchDataNhanKhau} = useData()


  // Search
  const [search, setSearch] = useState("")
  const searchedData = nhankhau ? nhankhau.filter(item => item.hoTen.toLowerCase().includes(search.toLowerCase()) || item.soCMND.toLowerCase().includes(search.toLowerCase())): []

  // Colums
  const columns = [
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
      width: '30%',
      render: item => {
        if(!item) return "Không có"
        return item
      }
    },
    {
      title: 'Số hộ khẩu',
      dataIndex: 'idHoKhau',
      key: 'idHoKhau',
      render: item => {
        return hokhau.filter(i => i.id === item)[0].soHoKhau
      }
    },
    // {
    //   title: 'Biệt danh',
    //   dataIndex: 'bietDanh',
    //   key: 'bietDanh',
    //   render: item => {
    //     if(!item) return "Không có"
    //     return item
    //   }
    // },
    {
      title: 'Giới tính',
      dataIndex: 'gioiTinh',
      key: 'gioiTinh',
      render: item => {
        if(item === 1) return <Tag color='blue' >Nam</Tag>
        if(item === 0) return <Tag color='purple' >Nữ</Tag>
      }
    },
    {
      title: 'Thường trú',
      dataIndex: 'thuongTru',
      key: 'thuongTru',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaySinh',
      key: 'ngaySinh',
      render: item => moment(item).format('DD-MM-YYYY')
    },
    {
      title: 'Nghề nghiệp',
      dataIndex: 'ngheNghiep',
      key: 'ngheNghiep',
      render: item => {
        if(!item) return "Không có"
        return item
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
      render: item => {
        if(item === "Đang ở") return <Tag color='green' >{item}</Tag>
        if(item === "Tạm vắng") return <Tag color='blue' >{item}</Tag>
        if(item === "Đã qua đời") return <Tag color='red' >{item}</Tag>
        return <Tag color='orange' >{item}</Tag>
      }
    },
    {
      title: 'Thao tác',
      render: (text, record) => (
        <div onClick={e => e.stopPropagation()}>
            <Button type='primary' onClick={() => handleChuyen(record)} >Chuyển đi</Button>
        </div>
    ),
    },
  ];

  // Add new nhaukhau
  const [addModalVisible, setAddModalVisible] = useState(false);
  const handleAdd = () => {
    setAddModalVisible(true);
  };

  // Chuyen nhankhau
  const [chuyenSelectedRow, setChuyenSelectedRow] = useState(null);
  const [chuyenModalVisible, setChuyenModalVisible] = useState(false);
  const handleChuyen = (record) => {
    setChuyenSelectedRow(record);
    setChuyenModalVisible(true);
  };

  // Load data nhankhau
  useEffect(() => {
    fetchDataNhanKhau()
  }, [])

  return <div className="tabled">
  <Row gutter={[24, 0]}>
    <Col xs="24" xl={24}>
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title="Danh sách"
        extra={
          <Space>
            <Button onClick={() => handleAdd()} type='primary' >Thêm nhân khẩu</Button>
            <Input 
              placeholder='Nhập tên nk/CMND'
              onChange={(e) => setSearch(e.target.value)}
              width={600}
              />
          </Space>
        }>
          <Table 
            pagination={false} 
            columns={columns} 
            dataSource={hokhau ? searchedData.map(item => {
              return {
                ...item,
                key: item.soHoKhau
              }
            }) : []}
            className="ant-border-space"
          />
        </Card>
      </Col>
      { addModalVisible && <AddNhanKhauModal 
        editModalVisible={addModalVisible}
        setEditModalVisible={setAddModalVisible}
      />}

      { chuyenModalVisible && 
        <ThayDoiNhanKhauModal 
          selectedRecord={chuyenSelectedRow} 
          setSelectedRecord={setChuyenSelectedRow}
          editModalVisible={chuyenModalVisible}
          setEditModalVisible={setChuyenModalVisible}
      />}
    </Row>
</div>
}

export default NhanKhau