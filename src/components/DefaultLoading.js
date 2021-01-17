import React from 'react';
import { Spin } from 'antd';

export function DefaultLoading() {
    return (
        <Spin tip="Loading...">
        </Spin>
    )
}