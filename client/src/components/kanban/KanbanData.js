import dataJson from '../../pages/data.json'

export const columnsFromBackend = {
    "1": {
        title: 'To-do',
        items: dataJson.dataPersonal.filter(item => item.State === "Todo"),
    },
    "2": {
        title: 'In Progress',
        items: dataJson.dataPersonal.filter(item => item.State === "In progress"),
    },
    "3": {
        title: 'Done',
        items: dataJson.dataPersonal.filter(item => item.State === "Done"),
    }
};
