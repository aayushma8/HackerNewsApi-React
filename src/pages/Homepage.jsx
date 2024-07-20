import React, { useEffect, useState } from 'react'
import '../index.css'
import PostWrapper from '../components/PostWrapper'

const Homepage = () => {
  let [allPosts, setAllPosts] = useState([])
  let [postsInAPage, setPostsInAPage] = useState([])
  let [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 20
  const [totalPages, setTotalPage] = useState(25)

  useEffect(() => {
    fetchPosts()
  }, [currentPage])

  async function fetchPosts() {
    try {
      const response = await fetch(
        'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&limit=500'
      )
      const postIds = await response.json()
      allPosts = postIds.slice(0, 500)

      displayPage(currentPage)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }
  async function displayPage(page) {
    setAllPosts([])
    const start = (page - 1) * postsPerPage
    const end = start + postsPerPage
    const pagePosts = allPosts.slice(start, end)
    setTotalPage(Math.ceil(allPosts.length / postsPerPage))

    const postsDataPromises = pagePosts.map((id) =>
      fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
        (response) => response.json()
      )
    )

    Promise.all(postsDataPromises)
      .then((postsData) => {
        setPostsInAPage(postsData) // Update state with all fetched post details
      })
      .catch((error) => console.error('Error fetching post details:', error))
  }
  function prevPage() {
    if (currentPage <= 1) return
    setCurrentPage((prev) => prev - 1)
  }
  function nextPage() {
    setCurrentPage((prev) => prev + 1)
    if (currentPage * postsPerPage < allPosts.length) return
  }
  useEffect(() => {
    if (allPosts.length) {
      displayPage(currentPage)
    }
  }, [currentPage, allPosts])
  return (
    <div id="mainCont">
      <div className="pagination">
        <div id="page-info">
          {currentPage} / {totalPages}
        </div>
        <div>
          <button onClick={prevPage} id="prev-page">
            ← Prev
          </button>
          <button onClick={nextPage} id="next-page">
            Next →
          </button>
        </div>
      </div>
      <div id="posts-container">
        {postsInAPage.map((post) => {
          return (
            <React.Fragment key={post.id}>
              <PostWrapper id={post.id}>
                <div className="eachPost" key={post.id}>
                  <div id="postTitle">{post.title}</div>
                  <div id="postDetails">
                    <div className="stars pd">
                      <i className="ri-star-smile-line pdd"></i>
                      {post.score ? post.score : 0}
                    </div>
                    <div className="comments pd">
                      <i className="ri-message-3-line pdd"></i>
                      {post.descendants ? post.descendants : 0}
                    </div>
                    <div className="author pd">
                      <i className="ri-user-3-line pdd"></i>
                      {post.by}
                    </div>
                  </div>
                </div>
              </PostWrapper>
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default Homepage
