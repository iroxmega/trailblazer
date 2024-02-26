import React from 'react';
import { Card } from 'antd';
import {useSelector} from "react-redux";
import {getAuthData, getAuthStatus} from "../redux/slices/authSlice.ts";

const gridStyle: React.CSSProperties = {
    width: '20%',
    textAlign: 'center',
};

const Welcome:React.FC = () => {

    const authData = useSelector(getAuthData)
    return (
        <Card title={'Добро пожаловать, ' + authData.username}>
            <Card.Grid style={gridStyle}>Действие 1</Card.Grid>
            <Card.Grid style={gridStyle}>Действие 2</Card.Grid>
            <Card.Grid style={gridStyle}>Действие 3</Card.Grid>
            <Card.Grid style={gridStyle}>Действие 4</Card.Grid>
            <Card.Grid style={gridStyle}>Действие 5</Card.Grid>
            <Card.Grid style={gridStyle}>Действие 6</Card.Grid>
        </Card>
    );
};

export default Welcome;