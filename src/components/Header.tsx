import React, {useContext, useEffect} from 'react';
import {HomeOutlined, ManOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Menu} from 'antd';
import styles from './Header.module.scss'

import {SelectedPageContext} from './MainPage.tsx'
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {fetchTableNames, getTablesNames} from "../redux/slices/dbSlice.ts";
import { AppDispatch, RootState } from './store';
import axios from "axios";

const items: MenuProps['items'] = [

    {
        label: 'Главная',
        key: 'welcome',
        icon: <HomeOutlined/>,
    },
    {
        label: 'Таблицы',
        key: 'SubMenu',
        icon: <ManOutlined/>,
        children: [
            {
                type: 'group',
                label: 'Как же ты заебал',
            },
        ],
    },
];

const Header: React.FC = () => {
    // const tablesNames = useSelector(getTablesNames)
    const {selectedPage, setSelectedPage} = useContext(SelectedPageContext)
    const navigate = useNavigate()
    const dispatch:AppDispatch = useDispatch()

    useEffect(() => {
        let response = {}
        async function lmao() {
             response = await axios.get('http://localhost:5000/api/tables');
        =
        lmao()
        console.log(response.data)
    }, [])
    const onClick: MenuProps['onClick'] = (e) => {
        setSelectedPage(e.key);
        navigate('/' + selectedPage)
        console.log(selectedPage)
    };

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.logo}>TrailBlazer</h1>
                <Menu className={styles.elements}


                      onClick={onClick}
                      selectedKeys={[selectedPage]}
                      mode="horizontal"
                      items={items}
                      inlineCollapsed={false}/>


            </div>
        </>
    )

};

export default Header;

