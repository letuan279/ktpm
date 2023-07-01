import React, { useEffect, useState } from 'react'
import { useData } from '../../context/NewAppContext'
import { Card, Table, Row, Col, Button, Input, Modal, Descriptions, Tag } from 'antd';
import moment from 'moment';
import { BACK_END_URL } from '../../context/const';
import EditHoKhauModal from './EditHoKhauModal';
import TachHoKhauModal from './TachHoKhauModal';

const HoKhau = () => {
  const {hokhau, setHokhau, nhankhau, setNhanKhau, fetchDataHoKhau} = useData()
  const returnChuHo = (soHoKhau) => {
    const hk = hokhau.find(item => item.soHoKhau === soHoKhau)
    const ch = nhankhau.find(item => item.id === hk.idChuHo)
    return ch;
}
  
  // Search
  const [search, setSearch] = useState("")
  const searchedData = hokhau ? hokhau.filter(item => item.soHoKhau.toLowerCase().includes(search.toLowerCase())): []
  
  
  // View detail
  const [selectedRow, setSelectedRow] = useState(null);
  const [hoKhauDetail, setHoKhauDetail] = useState(null);
  const handleRowClick = async (record, rowIndex) => {
    const fetchData = async () => {
        try {
            const res = await fetch(`${BACK_END_URL}/hokhau/${record.id}`);
            const data = await res.json();
            setHoKhauDetail(data.data);
          } catch (error) {
            console.error(error);
          }
    }

    await fetchData()
    setSelectedRow(record);
  };

  // Edit HoKhau
  const [editSelectedRow, setEditSelectedRow] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const handleEdit = (record) => {
    setEditSelectedRow(record);
    setEditModalVisible(true);
  };

  // Tach HoKhau
  const [tachSelectedRow, setTachSelectedRow] = useState(null);
  const [tachModalVisible, setTachModalVisible] = useState(false);
  const handleTach = (record) => {
    setTachSelectedRow(record);
    setTachModalVisible(true);
  };


  // Colums
  const columns = [
    {
      title: 'Số hộ khẩu',
      dataIndex: 'soHoKhau',
      key: 'soHoKhau',
      width: '15%'
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'diaChi',
      key: 'diaChi',
      width: '30%'
    },
    {
      title: 'Khu vực',
      dataIndex: 'khuVuc',
      key: 'khuVuc',
    },
    {
      title: 'Ngày lập',
      dataIndex: 'ngayLap',
      key: 'ngayLap',
      render: item => moment(item).format('DD-MM-YYYY')
    },
    {
      title: 'Thao tác',
      render: (text, record) => (
        <div onClick={e => e.stopPropagation()}>
            <Button type='primary' onClick={() => handleEdit(record)} >Sửa</Button>
            <Button type='danger' onClick={() => handleTach(record)} style={{marginLeft: 10}}>Tách hộ</Button>
        </div>
    ),
    },
  ];

  // Load data hokhau
  useEffect(() => {
    fetchDataHoKhau()
  }, [])

  return (
    <div className="tabled">
      <Row gutter={[24, 0]}>
        <Col xs="24" xl={24}>
          <Card
            bordered={false}
            className="criclebox tablespace mb-24"
            title="Danh sách"
            extra={
                <>
                    <Input 
                      placeholder='Nhập số hộ khẩu'
                      onChange={(e) => setSearch(e.target.value)}
                    />
                </>
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
                onRow={(record, rowIndex) => {
                  return {
                      onClick: () => {
                          handleRowClick(record, rowIndex);
                      },
                  };
              }}
              />
            </Card>
          </Col>
          {/* Modal Hokhau Detail */}
          <Modal
              visible={selectedRow !== null}
              title={<span style={{ fontWeight: 600 }}>Thông tin chi tiết</span>}
              onCancel={() => setSelectedRow(null)}
              footer={null}
          >
            {selectedRow !== null && (
                <div>
                <p>Số Hộ Khẩu: {selectedRow.soHoKhau}</p>
                <p>Địa Chỉ: {selectedRow.diaChi}</p>
                <p>Khu Vực: {selectedRow.khuVuc}</p>
                <p>Ngày Lập: {moment(selectedRow.ngayLap).format('DD-MM-YYYY')}</p>

                <p>Chủ hộ: {<Tag color='orange'>{returnChuHo(selectedRow.soHoKhau).hoTen}</Tag>}</p>
                <p>Danh sách thành viên: {hoKhauDetail.map(item => <Tag key={item.soCMND} color='purple'>{item.hoTen}</Tag>)}</p>
              </div>
            )}
        </Modal>

        {/* Modal Edit HoKhau */}
              {editSelectedRow && 
                <EditHoKhauModal 
                  selectedRecord={editSelectedRow} 
                  setSelectedRecord={setEditSelectedRow}
                  editModalVisible={editModalVisible}
                  setEditModalVisible={setEditModalVisible}
                />}

        {/* Modal Tach HoKhau */}
        {tachSelectedRow && 
                <TachHoKhauModal 
                  selectedRecord={tachSelectedRow} 
                  setSelectedRecord={setTachSelectedRow}
                  editModalVisible={tachModalVisible}
                  setEditModalVisible={setTachModalVisible}
                />}
        </Row>
    </div>
  )
}

export default HoKhau