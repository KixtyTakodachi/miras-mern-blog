import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'
import {fetchTags} from "./posts";

export const fetchCommentsByPost = createAsyncThunk('/comments/fetchCommentsByPost', async(postId) => {
	const { data } = await axios.get(`/comments/${postId}`)
	return data
})

export const fetchAddCommentToPost = createAsyncThunk('/comments/fetchAddCommentToPost', async(args) =>{
	const { data } = await axios.post(`/comments/${args.id}`, {text: args.text})
	return data
})

export const fetchNewestComments = createAsyncThunk('/comments/fetchComments', async() => {
	const { data } = await axios.get('/comments')
	return data
})

const initialState = {
	comments: {
		items: [],
		status: 'loading'
	}
}

const commentsSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {},
	extraReducers: {
		// Get comments by post
		[fetchCommentsByPost.pending]: (state) => {
			state.comments.status = 'loading'
		},
		[fetchCommentsByPost.fulfilled]: (state, action) => {
			state.comments.items = action.payload
			state.comments.status = 'loaded'
		},
		[fetchCommentsByPost.rejected]: (state) => {
			state.comments.item = []
			state.comments.status = 'error'
		},

		// Add comment to post
		[fetchAddCommentToPost.pending]: (state) => {
			state.comments.status = 'loading'
		},
		[fetchAddCommentToPost.fulfilled]: (state, action) => {
			state.comments.items = action.payload
			state.comments.status = 'loaded'
		},
		[fetchAddCommentToPost.rejected]: (state) => {
			state.comments.item = []
			state.comments.status = 'error'
		},

		// Get all comments
		[fetchNewestComments.pending]: (state) => {
			state.comments.status = 'loading'
		},
		[fetchNewestComments.fulfilled]: (state, action) => {
			state.comments.items = action.payload
			state.comments.status = 'loaded'
		},
		[fetchNewestComments.rejected]: (state) => {
			state.comments.item = []
			state.comments.status = 'error'
		},
	}
})

export const commentsReducer = commentsSlice.reducer