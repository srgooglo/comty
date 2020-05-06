import React from 'react'
import styles from './__secComments.less'
import { SearchCard, Feather } from 'components'

import * as antd from 'antd'
import * as app from 'app'
import * as Icons from '@ant-design/icons'
import Icon from '@ant-design/icons'

const VerifiedBadge = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#55acee"
    width="15"
    height="15"
    viewBox="0 0 24 24"
  >
    <path d="M23 12l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18L12 3 8.6 1.54 6.71 4.72l-3.61.81.34 3.68L1 12l2.44 2.78-.34 3.69 3.61.82 1.89 3.18L12 21l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68L23 12m-13 5l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"></path>
  </svg>
)

export default class __secComments extends React.Component {
    state = {
      comment_data: this.props.payload,
      raw_comment: '',
      loading: false,
    }
    handleDeleteComment(id) {
      app.yconsole.log(`Removing Comment with id => ${id}`)
      app.comty_post_comment.delete(
        (err, res) => {
          if (err) {
            return false
          }
          return this.reloadComments()
        },
        { comment_id: id }
      )
    }
    handleNewComment() {
      const { raw_comment } = this.state
      const { post_id } = this.props
      if (raw_comment) {
        const payload = { post_id: post_id, raw_text: raw_comment }
        app.comty_post_comment.new((err, res) => {
          if (err) {
            app.notify.error('This action could not be performed.', err)
          }
          this.setState({ raw_comment: '' })
          return this.reloadComments()
        }, payload)
      }
      return false
    }
  
    renderComment = a => {
      const { id, time, Orginaltext, publisher } = a
      const CommentMenu = (
        <antd.Menu>
          <antd.Menu.Item
            key="remove_comment"
            onClick={() => this.handleDeleteComment(id)}
          >
            <Icons.DeleteOutlined /> Delete
          </antd.Menu.Item>
        </antd.Menu>
      )
      return (
        <div className={styles.comment_card}>
          <div className={styles.comment_title}>
            <img src={publisher.avatar} />
            <p className={styles.comment_user_username}>
              @{publisher.username}{' '}
              {app.booleanFix(publisher.verified) ? (
                <Icon style={{ color: 'black' }} component={VerifiedBadge} />
              ) : null}
            </p>
            <antd.Dropdown
              disabled={app.IsThisPost.owner(publisher.id) ? false : true}
              overlay={CommentMenu}
              trigger={['click']}
            >
              <p
                onClick={e => e.preventDefault()}
                className={styles.comment_user_ago}
              >
                {app.time.stmToAgo(time)}
              </p>
            </antd.Dropdown>
          </div>
          <div className={styles.comment_text}>
            <p>{Orginaltext}</p>
          </div>
        </div>
      )
    }
    HandleCommentInput = e => {
      const { value } = e.target
      this.setState({ raw_comment: value })
    }
    reloadComments() {
      try {
        this.setState({ loading: true })
        const payload = { post_id: this.props.post_id }
        app.comty_post.get((err, res) => {
          const post_comments = JSON.parse(res)['post_comments']
          this.setState({ comment_data: post_comments, loading: false })
        }, payload)
      } catch (error) {
        return false
      }
    }
  
    render() {
      const { comment_data, loading } = this.state
  
      return (
        <div className={styles.comments_body}>
          <div className={styles.comments_body_title}>
             <h1>Comments ({comment_data.length})</h1>
          </div>
          <div className={styles.comments_cards_wrapper}>
            {loading ? (
              <antd.Skeleton active />
            ) : (
              <antd.List
                itemLayout="horizontal"
                dataSource={comment_data}
                renderItem={item => this.renderComment(item)}
              />
            )}
          </div>
          <div className={styles.comment_box}>
            <div className={styles.comment_box_body}>
              <antd.Input
                value={this.state.raw_comment}
                onPressEnter={() => this.handleNewComment()}
                placeholder="Write a comment..."
                allowClear
                onChange={this.HandleCommentInput}
              />
            </div>
          </div>
        </div>
      )
    }
  }