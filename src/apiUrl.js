const baseUrl = 'https://api.imgur.com/3';

export const userDetailsUrl = username => `${baseUrl}/account/${username}`;
export const favoriteUrl = albumId => `${baseUrl}/album/${albumId}/favorite`;
export const galleryVoatingUrl = (galleryHash, vote) => `${baseUrl}/gallery/${galleryHash}/vote/${vote}`;
export const createCommentUrl = () => `${baseUrl}/comment`;
export const createReplyUrl = commentId => `${baseUrl}/comment/${commentId}`;
export const voteForCommentAndReplyUrl = (id, voteTypeForApi) => `${baseUrl}/comment/${id}/vote/${voteTypeForApi}`;
export const reportCommentAndReplyUrl = commentId => `${baseUrl}/comment/${commentId}/report`;
export const albumDataUrl = galleryHash => `${baseUrl}/gallery/album/${galleryHash}`;
export const commentDataUrl = (galleryHash, sort = 'best') => `${baseUrl}/gallery/${galleryHash}/comments/${sort}`;
export const userSettingUrl = username => `${baseUrl}/account/${username}/settings`;
export const publicGalleryUrl = (section = 'hot', sort = 'viral', window = 'day', page = 0) => `${baseUrl}/gallery/${section}/${sort}/${window}/${page}`;
export const userFavoriteGalleryUrl = (username, page = 0, favoritesSort = 'newest') => `${baseUrl}/account/${username}/favorites/${page}/${favoritesSort}`;
export const userProfileCommentsUrl = (username, sort = 'newest', page = 0) => `${baseUrl}/account/${username}/comments/${sort}/${page}`;
