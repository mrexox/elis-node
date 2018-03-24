import React from 'react';
import PropTypes from 'prop-types';
import ImageList from './ImageList';

const Post = ({ id, likes, imageList, htmlText, tags, onClick, likePost }) => (
	<div className="post" onClick={onClick}>
	<ImageList images={imageList} />
	<div className="post__text" dangerouslySetInnerHTML={{__html:htmlText}}></div>
	<span className="post__likes" onClick={likePost}>{likes} Loved it!</span>
	<div className="post__tags">
	{tags.map((name, index) => (
		<span key={index} className="post__tag">{name}</span>
	))}
	</div>
	</div>
);

// See reducers/initialStates
Post.propTypes = {
	id: PropTypes.string,
	likes: PropTypes.string.isRequired,
	htmlText: PropTypes.string.isRequired,
	tags: PropTypes.arrayOf(
		PropTypes.string
	).isRequired,
	imageList: PropTypes.arrayOf(
		PropTypes.shape({
			url: PropTypes.string.isRequired
		}).isRequired
	),
	onClick: PropTypes.func.isRequired,
	likePost: PropTypes.func.isRequired
};

export default Post;
