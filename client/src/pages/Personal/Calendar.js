import * as React from 'react';
import { useState } from 'react';
import { Select, Space } from 'antd';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
    Scheduler,
    DayView,
    Appointments,
    MonthView,
    WeekView,
    Toolbar,
    ViewSwitcher
} from '@devexpress/dx-react-scheduler-material-ui';

const currentDate = '2018-11-01';
const schedulerData = [
    { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
    { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
];

const Calendar = () => {
    const [data, setData] = useState(schedulerData);
    const [currentViewName, setCurrentViewName] = useState('work-week');

    return (
        <Paper>
            <Scheduler
                data={data}
                height={660}
            >
                <ViewState
                    defaultCurrentDate="2018-11-01"
                    currentViewName={currentViewName}
                    onCurrentViewNameChange={(e) => {
                        setCurrentViewName(e)
                    }}
                />

                <WeekView
                    startDayHour={10}
                    endDayHour={19}
                    name="work-week"
                    displayName="Tuần"
                />
                <MonthView displayName="Tháng" />
                <DayView displayName="Ngày" />

                <Toolbar />
                <ViewSwitcher />
                <Appointments />
            </Scheduler>
        </Paper>)
}

export default Calendar;
