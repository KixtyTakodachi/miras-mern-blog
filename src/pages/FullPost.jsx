import React, {useEffect, useState} from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import axios from "../axios";
import ReactMarkdown from "react-markdown";
import {fetchCommentsByPost} from "../redux/slices/comments";
export const FullPost = () => {
  const dispatch = useDispatch()
  const [data, setData] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { comments } = useSelector(state => state.comments)
  const {id} = useParams()

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then(res => {
        setData(res.data)
        setIsLoading(false)
      })
      .catch(err => {
        console.warn(err)
        alert('Ошибка при получении статьи')
      })

    dispatch(fetchCommentsByPost(id))
  },[])

  if(isLoading){
    return <Post isLoading={isLoading} isFullPost/>
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.commentCount}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text}/>
      </Post>
      <CommentsBlock
        items={comments.items}
        isLoading={false}
      >
        <Index imageUrl={data.user.avatarUrl || '/noavatar.png'}/>
      </CommentsBlock>
    </>
  );
};
