// Licensed to the Apache Software Foundation (ASF) under one
// or more contributor license agreements.  See the NOTICE file
// distributed with this work for additional information
// regarding copyright ownership.  The ASF licenses this file
// to you under the Apache License, Version 2.0 (the
// "License"); you may not use this file except in compliance
// with the License.  You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import { Menu } from 'antd';
import Sider from 'antd/lib/layout/Sider';
import {
    ClusterOutlined,
    ConsoleSqlOutlined,
    DatabaseOutlined,
    SettingOutlined,
    TableOutlined,
    AppstoreOutlined,
} from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

import { useTranslation } from 'react-i18next';
import styles from './sidebar.less';
import { UserInfoContext } from '@src/common/common.context';

const GLOBAL_PATHS = ['/settings', '/space'];

export function Sidebar(props: any) {
    const { t } = useTranslation();
    const [selectedKeys, setSelectedKeys] = useState('/dashboard/overview');
    const [collapsed, setCollapsed] = useState(true);
    const { mode } = props;
    const user = useContext(UserInfoContext);

    const history = useHistory();
    const isSuperAdmin = user?.is_super_admin;
    const isSpaceAdmin = user?.is_admin;
    const isInSpace = !GLOBAL_PATHS.includes(selectedKeys);
    useEffect(() => {
        if (history.location.pathname.includes('configuration')) {
            setSelectedKeys('/configuration');
        } else if (history.location.pathname.startsWith('/cluster')) {
            setSelectedKeys('/cluster');
        } else if (history.location.pathname.startsWith('/space')) {
            setSelectedKeys('/space');
        } else if (history.location.pathname.startsWith('/settings')) {
            setSelectedKeys('/settings');
        } else if (history.location.pathname.startsWith('/admin')) {
            setSelectedKeys('/admin');
        } else {
            setSelectedKeys(history.location.pathname);
        }
    }, [history.location.pathname]);

    function onCollapse() {
        setCollapsed(!collapsed);
    }

    const handleMenuChange = (e: any) => {
        setSelectedKeys(e.key);
    };

    if (mode === 'initialize') {
        return (
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                width={200}
                className={styles[`doris-manager-side`]}
            >
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={['/dashboard/overview']}
                    selectedKeys={[selectedKeys]}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    <Menu.Item
                        style={{
                            height: 60,
                            backgroundColor: '#00284D',
                            marginTop: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            className={collapsed ? styles['logo-collapsed'] : styles['logo']}
                            onClick={() => history.push(`/meta/index`)}
                        />
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    } else {
        return (
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={onCollapse}
                width={200}
                className={styles[`doris-manager-side`]}
            >
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultSelectedKeys={['/dashboard/overview']}
                    selectedKeys={[selectedKeys]}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={handleMenuChange}
                >
                    <Menu.Item
                        style={{
                            height: 60,
                            backgroundColor: '#00284D',
                            marginTop: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        key="/logo"
                    >
                        <div
                            className={collapsed ? styles['logo-collapsed'] : styles['logo']}
                        />
                    </Menu.Item>
                    {isInSpace && (
                        <>
                            <Menu.Item key="/cluster" title={t`Cluster`} icon={<ClusterOutlined />}>
                                <Link to={`/cluster`}>{t`Cluster`}</Link>
                            </Menu.Item>
                            <Menu.Item key="/meta" icon={<TableOutlined />}>
                                <Link to={`/meta`}>{t`data`}</Link>
                            </Menu.Item>
                            <Menu.Item key="/query" icon={<ConsoleSqlOutlined />}>
                                <Link to={`/query`}>{t`Query`}</Link>
                            </Menu.Item>
                            {(isSuperAdmin || isSpaceAdmin) && (
                                <Menu.Item key="/admin" icon={<AppstoreOutlined />}>
                                    <Link to={`/admin`}>{t`Space Manager`}</Link>
                                </Menu.Item>
                            )}
                            <div className={styles.line}></div>
                        </>
                    )}
                    <Menu.Item key="/space" icon={<DatabaseOutlined />}>
                        <Link to={`/space/list`}>{t`Space List`}</Link>
                    </Menu.Item>
                    {isSuperAdmin && (
                        <Menu.Item id="aaaa" key="/settings" icon={<SettingOutlined />}>
                            <Link to={`/settings`}>{t`Platform Settings`}</Link>
                        </Menu.Item>
                    )}
                </Menu>
            </Sider>
        );
    }
}
