import React, { useEffect, useState } from "react"
import { AppstoreOutlined, BarChartOutlined, CloudOutlined, ShopOutlined, TeamOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Layout, Menu, theme } from "antd"
const { Header, Content, Footer, Sider } = Layout

import { Outlet } from "react-router-dom"

import { fetchMenus } from "../api/menus"

import styles from "./main.module.scss"


const App: React.FC = () => {
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const [items, setItems] = useState<MenuProps["items"]>([])
  const icons = [UserOutlined, VideoCameraOutlined, UploadOutlined, BarChartOutlined, CloudOutlined, AppstoreOutlined, TeamOutlined, ShopOutlined]
  useEffect(() => {
    fetchMenus().then((result) => {
      const items: MenuProps["items"] = result.map((_, index) => {
        return {
          key: _.id,
          icon: React.createElement(icons[index % 8]),
          label: _.title,
          children: _?.children?.map(($) => ({ key: `${index}-${$.id}`, label: $.title }))??[]
        }
      })
      setItems(items)
    })
  }, [])


  const [openKeys, setOpenKeys] = useState([])

  const onOpenChange:MenuProps['onOpenChange'] = (keys:string[])=>{
    const lasetOpenKeys = keys.filter((key:string)=> !openKeys.includes(key))
    setOpenKeys(lasetOpenKeys)
  }

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0
        }}
      >
        <div className={styles["logo"]} />
        <Menu theme="dark" mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange} items={items} />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "24px 16px 0", minHeight: "calc(100vh - 170px)", overflow: "initial" }}>
          <div style={{ background: "#FFF", padding: "24px" }}>
            <Outlet/>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default App
