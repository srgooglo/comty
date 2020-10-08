import React from 'react'
import * as Icons from 'components/Icons'
import { ListedMenu } from 'components'

import ApiDebug from './debuggers/api'
import AntdDebug from './debuggers/antd'
import CoreDebug from './debuggers/core'
import ThemeDebug from './debuggers/theme'
import SocketDebug from './debuggers/socket'
import VerbosityDebug from './debuggers/verbosity'

const Debuggers = {
  api: <ApiDebug />,
  antd: <AntdDebug />,
  core: <CoreDebug />,
  theme: <ThemeDebug />,
  socket: <SocketDebug />,
  verbosity: <VerbosityDebug />
}

const menuList = [
  {
    key: "api",
    title: "API V3 Requester",
    icon: <Icons.Globe />,
  },
  {
    key: "antd",
    title: "Antd",
    icon: <Icons.AntDesignOutlined />,
    require: "embedded"
  },
  {
    key: "core",
    title: "Core",
    icon: <Icons.Box />
  },
  {
    key: "theme",
    title: "Theme",
    icon: <Icons.Image />
  },
  {
    key: "socket",
    title: "Socket",
    icon: <Icons.Box />
  },
  {
    key: "verbosity",
    title: "Verbosity",
    icon: <Icons.Edit3 />
  }
]

export default class Debug extends React.Component {
  render() {
    return <ListedMenu wrapperStyle={{ padding: "4px" }} mode="horizontal" renderOptionTitle={false} icon={<Icons.Activity />} title="Debug" childrens={Debuggers} menuArray={menuList} />
  }
}