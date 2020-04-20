import React from 'react'
import * as ycore from 'ycore'
import * as antd from 'antd'
import * as Icons from '@ant-design/icons'
import jwt from 'jsonwebtoken'

import styles from './style.less'
import MainFeed from '../../components/MainFeed'

const UserData = ycore.userData()

export default class __m extends React.Component {
  constructor(props) {
    super(props),
      (this.state = {
        s_id: '',
        coninfo: 'Getting info...',
        s_token: '',
        s_ses: '',
      })
  }

  componentDidMount() {
    this.handleSID()
    this.handleToken()
  }

  handleSID() {
    ycore.comty_get.session_id((err, response) => {
      if (err) {
        return ycore.notify.error(err)
      }
      this.setState({ s_id: response })
    })
  }
  handleToken() {
    const a = ycore.token_data.getRaw()
    const b = jwt.decode(a)
    this.setState({ s_token: b })
    {
      ycore.validate.session(res => {
        this.setState({ s_ses: res })
      })
    }
  }
  handleDesktop() {
    const a = localStorage.getItem('desktop_src')
    let to
    if ( a == 'false') {
      to = true
    } else {
      to = false
    }
    ycore.notify.proccess('Switching to ', to ? 'Desktop Mode' : 'Normal Mode')
    localStorage.setItem('desktop_src', to)
    setTimeout(() => ycore.RefreshONCE(), 2000)
  }
  DescompileSDCP() {
    let result = {}
    for (var i = 0; i < UserData.length; i++) {
      result[UserData[i].key] = UserData[i].value
    }
    console.log([result])
  }

  render() {
    const arrayOfSDCP = Object.entries(UserData).map(e => ({ [e[0]]: e[1] }))
    const { UserID, UserToken, expiresIn } = this.state.s_token
    const { ValidSDCP, ValidCookiesToken, final } = this.state.s_ses

    const AddDummy = {
      id: '3',
      publisher: { id: '1' },
      post_id: '1',
      user_id: '48',
      recipient_id: '0',
      postText: 'New by ID Dummy Payload',
    }

    return (
      <div className={styles.Wrapper}>
        <div className={styles.titleHeader}>
          <h1>
            <Icons.DeploymentUnitOutlined /> yCore™ Server
          </h1>
        </div>
        <div className={styles.sectionWrapper}>
          <antd.Card>
            <h2>
              <Icons.CloudServerOutlined /> Server UID
            </h2>
            <span> {ycore.__server.getKey()} </span>
          </antd.Card>
          <antd.Card>
            <h2>
              <Icons.UserOutlined /> Your SID
            </h2>
            <span> {this.state.s_id} </span>
          </antd.Card>
          <antd.Card>
            <h2>
              <Icons.UserOutlined /> Current Session
            </h2>
            <p> Raw => {JSON.stringify(this.state.s_token)} </p>
            <p> UID => {UserID} </p>
            <p> Session Token => {UserToken} </p>
            <p> expiresIn => {expiresIn} </p>
            <hr />
            <p> ValidSDCP => {JSON.stringify(ValidSDCP)} </p>
            <p> ValidCookiesToken => {JSON.stringify(ValidCookiesToken)} </p>
            <p> Valid? => {JSON.stringify(final)} </p>
          </antd.Card>
          <antd.Card>
            <span>
              {' '}
              Using v{ycore.AppInfo.version} | User @{UserData.username}#
              {UserData.id} |{' '}
            </span>
          </antd.Card>
        </div>

        <div className={styles.titleHeader}>
          <h1>
            <Icons.DeploymentUnitOutlined /> Test yCore™{' '}
          </h1>
        </div>
        <div className={styles.sectionWrapper}>
          <antd.Button
            onClick={() => ycore.notify.error('Yep, its not empty, jeje funny')}
          >
            {' '}
            Send empty notify.error(){' '}
          </antd.Button>
          <antd.Button
            onClick={() =>
              ycore.notify.error(`
            ycore.GetPosts(uid, get, '0', (err, result) => {
              const parsed = JSON.parse(result)['data']
              const isEnd = parsed.length < ycore.AppSettings.limit_post_catch? true : false
              this.setState({ isEnd: isEnd, data: parsed, loading: false })
            })`)
            }
          >
            {' '}
            Send mock notify.error(){' '}
          </antd.Button>

          <antd.Button onClick={() => ycore.notify.error('Error Mock 1')}>
            {' '}
            notify.error{' '}
          </antd.Button>
          <antd.Button onClick={() => ycore.notify.proccess('Proccess Mock 1')}>
            {' '}
            notify.proccess{' '}
          </antd.Button>
          <antd.Button onClick={() => this.handleDesktop()}>
            {' '}
            Switch to Desktop_mode{' '}
          </antd.Button>

          <antd.Button onClick={() => ycore.app_modals.report_post()}>
            Open report_post modal
          </antd.Button>
            
          <antd.Button onClick={() => ycore.sync.emmitPost()}>
            Emmit Post feed
          </antd.Button>
        </div>

        <div className={styles.titleHeader}>
          <h1>
            <Icons.DatabaseOutlined /> SDCP™
          </h1>
        </div>
        <div className={styles.sectionWrapper}>
          <antd.Card>
            <h2>
              <Icons.CloudServerOutlined /> UserData
            </h2>
            <antd.Collapse>
              <antd.Collapse.Panel
                header="WARNING: High Heap when descompile data! "
                key="1"
              >
                {JSON.stringify(arrayOfSDCP)}
              </antd.Collapse.Panel>
            </antd.Collapse>
          </antd.Card>
        </div>

        <div className={styles.titleHeader}>
          <h1>
            <Icons.BugOutlined /> MainFeed | ENV Test
          </h1>
        </div>
        <div className={styles.sectionWrapper}>
          <antd.Card>
            <antd.Button onClick={() => ycore.FeedHandler.addToRend(AddDummy)}>
              {' '}
              ADD DUMMY{' '}
            </antd.Button>
            <antd.Button onClick={() => ycore.FeedHandler.killByID(3)}>
              {' '}
              KillByID (3){' '}
            </antd.Button>
            <hr />
            <MainFeed
              custompayload={[
                {
                  id: '1',
                  publisher: { id: '1' },
                  post_id: '1',
                  user_id: '48',
                  recipient_id: '0',
                  postText: 'Dummy Payload',
                },
                {
                  id: '2',
                  post_id: '2',
                  publisher: { id: '1' },
                  user_id: '48',
                  recipient_id: '0',
                  postText: 'Dummy Payload',
                },
              ]}
            />
          </antd.Card>
        </div>
      </div>
    )
  }
}