import React, {useState} from 'react';
import { Card } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {getAuthData, getAuthStatus} from "../redux/slices/authSlice.ts";
import {closeTable, fetchTableNames, fetchTableRecords, getTablesNames, ITableData} from "../redux/slices/dbSlice.ts";
import {AppDispatch} from "../redux/store.ts";
import MyTable from "./MyTable.tsx";
import { Modal } from 'antd';

const gridStyle: React.CSSProperties = {
    width: '20%',
    textAlign: 'center',
};

const Welcome:React.FC = () => {
    const [isVisible, setIsVisible] = useState(false)
    const [modalTitle, setModalTitle] = useState('')
    const dispatch: AppDispatch = useDispatch()
    const tablesNames = useSelector(getTablesNames)
    console.log(tablesNames)

    const handleOk = () => {
        dispatch(closeTable())
        setIsVisible(false);
    };

    const handleCancel = () => {
        dispatch(closeTable())
        setIsVisible(false);
    };

    const fetchTable = (tableName) => {
        dispatch(fetchTableRecords(tableName))
        setIsVisible(prevState => !prevState)
        setModalTitle(tableName)
    }



    const authData = useSelector(getAuthData)
    return (
        <Card title={'Добро пожаловать, ' + authData.username}>
            {/*<Card.Grid style={gridStyle} onClick={fetchTables}>Список таблиц</Card.Grid>*/}

            {
                tablesNames.map((tableName, i) =>
                <Card.Grid onClick={() => fetchTable(tableName.title)} style={gridStyle} key={tableName.title}>{tableName.title} : {tableName.recordsCount}</Card.Grid>
            )}
            {isVisible &&
                <Modal width={800} title={modalTitle} open={isVisible} onOk={handleOk} onCancel={handleCancel}>
                    <MyTable/>
                </Modal>}
        </Card>
    );
};

export default Welcome;