import React from 'react'

const PostWrapper = ({ children, id }) => {
  return (
    <a className="wrapper" href={`/comments/${id}`}>
      {children}
    </a>
  )
}

export default PostWrapper
