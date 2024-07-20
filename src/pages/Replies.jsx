import React, { useState } from 'react'

const Replies = ({ replies }) => {
  const [comments, setComments] = useState([])
  async function fetchComments(commentIds) {
    const commentsData = await Promise.all(
      commentIds.map(async (id) => {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`
        )
        return response.json()
      })
    )
    setComments(commentsData)
  }
  fetchComments(replies)

  return (
    <>
      {comments?.map((comment, index) => {
        return (
          <div key={index} className="comment">
            <p className="themeText">
              <i className="ri-user-3-line pdd"></i>
              {comment?.by}
            </p>
            <p>{comment?.text}</p>
            <div className="replies">
              {comment.kids ? <Replies replies={comment.kids} /> : ''}
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Replies
