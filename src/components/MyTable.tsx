import React, {useCallback} from 'react';
import {Table} from 'antd';
import {useSelector} from "react-redux";
import {getCurrentTableName, getTableColumns, getTableRecords} from "../redux/slices/dbSlice.ts";


const MyTable: React.FC = () => {
    const columns = useSelector(getTableColumns).map(col => {return {
        title: col,
        dataIndex: col,
        key: col
    }})
    const tableName = useSelector(getCurrentTableName)

    const data = useSelector(getTableRecords(tableName))
    const records = data? data.map((row: object, i) => {
        return {
            key: i,
            ...row
        }
    }) : []
    console.log(data)
    // const dataSource = [
    //     {
    //         key: '1',
    //         name: 'Mike',
    //         age: 32,
    //         address: '10 Downing Street',
    //     },
    //     {
    //         key: '2',
    //         name: 'John',
    //         age: 42,
    //         address: '10 Downing Street',
    //     },
    // ];
    // const columnsSource = [
    //     {
    //         title: 'Name',
    //         dataIndex: 'name',
    //         key: 'name',
    //     },
    //     {
    //         title: 'Age',
    //         dataIndex: 'age',
    //         key: 'age',
    //     },
    //     {
    //         title: 'Address',
    //         dataIndex: 'address',
    //         key: 'address',
    //     },
    // ];


    return <Table columns={columns} dataSource={records}/>
}


export default MyTable;