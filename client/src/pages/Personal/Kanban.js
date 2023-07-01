import React, { useState, useEffect } from 'react'
import KanbanEle from '../../components/kanban/Kanban'
import { Input, Select, DatePicker, Button } from 'antd'
import { SearchOutlined, PlusCircleOutlined } from '@ant-design/icons'
import './index.css'
import { columnsFromBackend } from "../../components/kanban/KanbanData"

const Kanban = () => {
    return (
        <>
            <KanbanEle></KanbanEle>
        </>
    )
}

export default Kanban