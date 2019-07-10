import axios from 'axios';
import {
  favoriteUrl,
  galleryVoatingUrl,
  reportCommentAndReplyUrl,
  createCommentUrl,
  createReplyUrl,
  voteForCommentAndReplyUrl,
  albumDataUrl,
  commentDataUrl,
  userDetailsUrl,
  userSettingUrl,
} from './apiUrl';

const accessToken = localStorage.getItem('access_token');

const sendPost = (url, data = null) =>
  axios.post(url, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

const sendGetPublic = url =>
  axios(url, {
    headers: {
      Authorization: `Client-ID ${process.env.CLIENT_ID}`,
    },
  });

const sendGetPrivate = url =>
  axios(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
const sendPut = (url, data = null) =>
  axios.put(url, data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

// the get request who uses access token as header goes under sendGetPrivate
const galleryVoting = (galleryHash, vote) =>
  sendGetPrivate(galleryVoatingUrl(galleryHash, vote));

const addToFavorite = albumId => sendPost(favoriteUrl(albumId));

const reportUser = (commentId, reason) =>
  sendPost(reportCommentAndReplyUrl(commentId), { reason });

// here data is an object {comment:----,image_id:----,commnetId:----}
const createCommentOrReply = (data) => {
  const url = data.commentId
    ? createReplyUrl(data.commentId)
    : createCommentUrl();
  return sendPost(url, data);
};

const voteForCommentAndReply = (id, voteTypeForApi) =>
  sendPost(voteForCommentAndReplyUrl(id, voteTypeForApi));

// the get request who uses client-id as header goes under sendGetPrivate
const fetchAlbumData = galleryHash =>
  sendGetPublic(albumDataUrl(galleryHash));

const fetchCommentData = (galleryHash, sort = 'best') =>
  sendGetPublic(commentDataUrl(galleryHash, sort));

const fetchUserDetails = username => sendGetPublic(userDetailsUrl(username));

// here the data is an object EX- {bio:----,username:---}
const updateAccountSetting = (username, data) =>
  sendPut(userSettingUrl(username), data);

export {
  addToFavorite,
  galleryVoting,
  reportUser,
  createCommentOrReply,
  voteForCommentAndReply,
  fetchAlbumData,
  fetchCommentData,
  fetchUserDetails,
  updateAccountSetting,
};
