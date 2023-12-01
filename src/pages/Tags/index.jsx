import React from 'react';
import {useParams} from "react-router-dom";
import {fetchPostsByTag} from "../../redux/slices/posts";
import {useDispatch, useSelector} from "react-redux";
import {Post} from "../../components";
import Grid from "@mui/material/Grid";

function Tags(props) {
	const { tag } = useParams()
	const dispatch = useDispatch()
	const { posts } = useSelector(state => state.posts)
	const userData = useSelector(state => state.auth.data)

	const isPostsLoading = posts.status === 'loading'

	React.useEffect(() => {
		if(tag){
			dispatch(fetchPostsByTag(tag))
		}
	}, [tag])
	return (
		<>
			<h1>#{tag}</h1>
			<Grid container spacing={4}>
				<Grid xs={12} item>
					{(isPostsLoading ? [...Array(5)] : posts.items).map((item, index) => isPostsLoading ?
						(<Post key={index} isLoading={true}/>)
						: (
							(
								<Post
									id={item._id}
									title={item.title}
									imageUrl={item.imageUrl ? `${process.env.REACT_APP_API_URL}${item.imageUrl}` : ''}
									user={item.user}
									createdAt={item.createdAt}
									viewsCount={item.viewsCount}
									commentsCount={3}
									tags={item.tags}
									isEditable={userData?._id === item.user._id}
								/>
							)
						)
					)}
				</Grid>
			</Grid>
		</>
	);
}

export default Tags;
