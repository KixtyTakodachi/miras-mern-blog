import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios'
import {fetchPopularPosts, fetchPosts, fetchPostsByTag, fetchTags} from "../redux/slices/posts";
import {useParams} from "react-router-dom";
import {fetchComments, fetchNewestComments} from "../redux/slices/comments";
export const Home = () => {
  const dispatch = useDispatch()
  const { posts, tags } = useSelector(state => state.posts)
  const userData = useSelector(state => state.auth.data)
  const { comments } = useSelector(state => state.comments)

  const isPostsLoading = posts.status === 'loading'
  const isTagsLoading = tags.status === 'loading'

  React.useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
    dispatch(fetchNewestComments())
  }, [])

  const [activeTab, setActiveTab] = React.useState(0)
  const changeTab = (event, newValue) => {
    setActiveTab(newValue)
  }

  React.useEffect(() => {
    if(activeTab === 0){
      dispatch(fetchPosts())
    } else {
      dispatch(fetchPopularPosts())
    }
  }, [activeTab])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={activeTab} onChange={changeTab} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((item, index) => isPostsLoading ?
            (<Post key={index} isLoading={true}/>)
        : (
        (
          <Post
            id={item._id}
            title={item.title}
            imageUrl={item.imageUrl ? `http://localhost:4444${item.imageUrl}` : ''}
            user={item.user}
            createdAt={item.createdAt}
            viewsCount={item.viewsCount}
            commentsCount={item.commentCount || 0}
            tags={item.tags}
            isEditable={userData?._id === item.user._id}
          />
          )
        )
        )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={isTagsLoading ? ['react', 'typescript', 'заметки'] : tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={comments.items}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};
