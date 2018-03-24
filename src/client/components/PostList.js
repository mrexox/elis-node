import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

// Every Post has all attributes given in props
const PostList = ({ posts, onClick, likePost }) => (
	<div className="post-list">
	{posts.data.map((post, index) => (
		<Post
		key={index}
		{...post}
		onClick={() => onClick(post.id)}
		likePost={() => likePost(post.id)} />
	))}
	</div>
)

PostList.propTypes = {
	posts: PropTypes.shape({
		isFetching: PropTypes.bool.isRequired,
		data: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				likes: PropTypes.string.isRequired
			})
		).isRequired
	}),
	onClick: PropTypes.func,
	likePost: PropTypes.func.isRequired
}

export default PostList;