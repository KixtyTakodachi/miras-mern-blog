import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
	const { data } = await axios.get('/posts')
	return data
})

export const fetchTags = createAsyncThunk('posts/fetchTags', async() => {
	const { data } = await axios.get('/tags')
	return data
})

export const fetchRemovePost = createAsyncThunk('/posts/fetchRemovePost', async(id) =>
	axios.delete(`/posts/${id}`
))

export const fetchPopularPosts = createAsyncThunk('/posts/fetchPopularPosts', async() => {
	const { data } = await axios.get('/posts/popular')
	return data
})

export const fetchPostsByTag = createAsyncThunk('/posts/fetchPostsByTag', async(tag) => {
	const { data } = await axios.get(`/tags/${tag}`)
	return data
})

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
	tags: {
		items: [],
		status: 'loading'
	},
}

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {

		// Getting posts
		[fetchPosts.pending]: (state) => {
			state.posts.status = 'loading'
			state.posts.items = []
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'loaded'
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.item = []
			state.posts.status = 'error'
		},

		//Getting tags
		[fetchTags.pending]: (state) => {
			state.tags.status = 'loading'
		},
		[fetchTags.fulfilled]: (state, action) => {
			state.tags.items = action.payload
			state.tags.status = 'loaded'
		},
		[fetchTags.rejected]: (state) => {
			state.tags.item = []
			state.tags.status = 'error'
		},

		// Removing post
		[fetchRemovePost.pending]: (state, action) => {
			state.posts.items = state.posts.items.filter(item => item._id !== action.meta.arg)
		},

		// Getting popular posts
		[fetchPopularPosts.pending]: (state) => {
			state.posts.status = 'loading'
			state.posts.items = []
		},
		[fetchPopularPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'loaded'
		},
		[fetchPopularPosts.rejected]: (state) => {
			state.posts.item = []
			state.posts.status = 'error'
		},

		// Getting posts by tag
		[fetchPostsByTag.pending]: (state) => {
			state.posts.status = 'loading'
			state.posts.items = []
		},
		[fetchPostsByTag.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'loaded'
		},
		[fetchPostsByTag.rejected]: (state) => {
			state.posts.item = []
			state.posts.status = 'error'
		},
	}
})

export const postsReducer = postSlice.reducer
