import React, { useCallback, useEffect, useState } from 'react'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from "react-icons/ai"
import CommetItem from "../components/CommetItem"
import { useSelector, useDispatch } from "react-redux"
import { createComment, getPostComments } from "../redux/features/comment/commentSlice"
import { toast } from "react-toastify"
import dayjs from "dayjs"
import axios from '../utils/axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { removePost } from '../redux/features/post/postSlice'

export const PostPage = () => {
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState("")

  const { user } = useSelector((state) => state.auth)
  const { comments } = useSelector((state) => state.comment)
  
  

  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const removePostHandler = () => {
    try {

      dispatch(removePost(id))
      toast("Пост был удалён")
      navigate("/posts")
    } catch (error) {
      console.log(error);

    }
  }

  const handleSubmit = () => {
    try {
      const postId = id
      dispatch(createComment({ postId, comment }))
      setComment("")
    } catch (error) {
      console.log(error);

    }
  }

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(id))
    } catch (error) {
      console.log(error);

    }
  }, [id, dispatch])

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${id}`)
    setPost(data)
  }, [id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost])

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  
  if (!post) {
    return (
      <div className="text-xl text-center text-white py-10">
        Загрузка...
      </div>
    );
  }

  
  
  return (
    <div className='p-15'>
      <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
        <Link className='flex' to={"/"}>Назад</Link>
      </button>

      <div className='flex gap-10 py-8'>
        <div className='w-2/3'>
          <div className="flex flex-col basis-1/4 grow">
            <div className={post.imgUrl ? "flex rounded-sm h-80" : "flex rounded-sm"}>
              {post?.imgUrl && (
                <img src={`http://localhost:3002/${post?.imgUrl}`} alt="img" className="object-cover w-full" />
              )}
            </div>
            <div className='flex justify-between items-center pt-2'>
              <div className='text-xs text-white opacity-50'>
                {post.username}
              </div>
              <div className='text-xs text-white opacity-50'>
                {post?.createdAt && (
                  <p>{dayjs(post.createdAt).locale('ru').format('DD MMM YYYY')}</p>
                )}


              </div>
            </div>

            <div className='text-white text-xl'>{post.title}</div>
            <p className='text-white opacity-60 text-xs pt-4'>{post.text}</p>

            <div className='flex gap-3 items-center mt-2 justify-between'>
              <div className='flex gap-3 mt-4'>
                <button className='flex items-center gap-2 text-xs text-white opacity-50'>
                  <AiFillEye /> <span>{post.views}</span>
                </button>
                <button className='flex items-center gap-2 text-xs text-white opacity-50'>
                  <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                </button>
              </div>

              {
                user?._id === post?.author && (
                  <div className='flex gap-3 mt-4'>
                    <button className='flex items-center gap-2  text-white opacity-50'>
                      <Link to={`/${id}/edit`}>
                        <AiTwotoneEdit />
                      </Link>
                    </button>
                    <button
                      onClick={removePostHandler}
                      className='flex items-center gap-2  text-white opacity-50'>
                      <AiFillDelete />
                    </button>
                  </div>
                )
              }
            </div>
          </div>
        </div>
        <div className='w-1/3 p-8 bg-gray-700 flex flex-col gap-2 rounded-sm'>
          <form className='flex gap-2' onSubmit={e => e.preventDefault()}>
            <input
              type="text"
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder='Comment'
              className='text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700' />
            <button
              type='submit'
              onClick={handleSubmit}
              className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'
            >
              Отправить
            </button>
          </form>

          {
            comments?.map((cmt, index) => (
              <CommetItem key={cmt._id || index} cmt={cmt} user={user} />
            ))
            
          }
          
        </div>
      </div>
    </div>
  )
}


