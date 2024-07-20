import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Replies from './Replies'

const Commentpage = () => {
  const { postId } = useParams()
  let [postData, setPostData] = useState()
  const [comments, setComments] = useState([])
  useEffect(() => {
    fetchPostDetails()

    async function fetchPostDetails() {
      try {
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${postId}.json`
        )
        const data = await response.json()
        setPostData(data)

        if (data?.kids) {
          fetchComments(data.kids)
        }
      } catch (error) {
        console.error('Error fetching post details:', error)
      }
    }
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
  }, [postId])

  return (
    <div id="mainCont">
      <div id="post-detail-container">
        <div>
          <h1>{postData?.title}</h1>
          <div className="flexBox">
            <p className="pd">
              <i className="ri-user-3-line pdd"></i> {postData?.by}
            </p>
            <p className="pd">
              <i className="ri-star-smile-line pdd"></i>
              {postData?.score}
            </p>
            <p className="pd">
              <i className="ri-calendar-line pdd"></i>
              {new Date(postData?.time * 1000).toLocaleString()}
            </p>
            <a className="pd pa" href={`${postData?.url}`} target="_blank">
              <i className="ri-links-line pdd"></i>Read full story
            </a>
          </div>
          <p className="postText">{postData?.text ? postData?.text : ''}</p>
          <h3>Comments:</h3>
        </div>
        <div id="comments-container">
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
        </div>
      </div>
    </div>
  )
}

export default Commentpage
