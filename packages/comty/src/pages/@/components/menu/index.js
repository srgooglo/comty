import React from 'react'
import * as antd from 'antd'
import { MoreOutlined } from 'components/Icons'

const moreMenu = (
    <antd.Menu>
      <antd.Menu.Item>__</antd.Menu.Item>
      <antd.Menu.Item>__set2</antd.Menu.Item>
    </antd.Menu>
)
  
const Menu = (props) => {
  return (
    <antd.Dropdown overlay={moreMenu}>
        <MoreOutlined />
    </antd.Dropdown> 
  )
}

export default Menu
