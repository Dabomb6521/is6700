const axios = require("axios");
const SongRequest = require('../../models/song-request-model-mongoose');

let accessToken = null;
let tokenExpiry = null;

const spotifyAPI = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

const isExpired = () => {
  if (!accessToken || !tokenExpiry) {
    return true;
  }
  return Date.now() >= tokenExpiry;
};

const getPlaylistTracksData = async () => {
  // Personal Playlist Data
  const playlistId = '1gytSX5Pmdd6yurOQrtNiP';
  
  const playlistInfo = await spotifyAPI.get(`/playlists/${playlistId}`, {
    params: { fields: 'tracks.total' }
  });
  
  const totalTracks = playlistInfo.data.tracks.total;
  
  // Generate random offset (ensure 20 tracks)
  const maxOffset = Math.max(0, totalTracks - 20);
  const randomOffset = Math.floor(Math.random() * (maxOffset + 1));
  
  // Get 20 tracks starting from random offset
  const response = await spotifyAPI.get(`/playlists/${playlistId}/tracks`, {
    params: { 
      limit: 20,
      offset: randomOffset
    }
  });

  return response.data.items.map(item => ({
    id: item.track.id,
    name: item.track.name,
    artist: item.track.artists[0].name,
    album: item.track.album.name,
    image: item.track.album.images[1]?.url || item.track.album.images[0]?.url,
    spotifyUrl: item.track.external_urls.spotify
  }));
};

const getSongRequestsData = async () => {
  return await SongRequest
    .find({ status: "pending" })
    .populate("requestedBy", "firstName lastName")
    .sort({ requestedAt: -1 });
};

exports.getSpotifyApiToken = async (req, res, next) => {
  if (!accessToken || isExpired()) {
    try {
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        "grant_type=client_credentials",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          auth: {
            username: process.env.SPOTIFY_CLIENT_ID,
            password: process.env.SPOTIFY_CLIENT_SECRET,
          },
        }
      );

      accessToken = response.data.access_token;
      tokenExpiry = Date.now() + response.data.expires_in * 1000;

      spotifyAPI.defaults.headers.Authorization = `Bearer ${accessToken}`;
      console.log("Spotify access token obtained");
    } catch (error) {
      console.error(
        "Error getting Spotify token:",
        error.response?.data || error.message
      );
      return next(new Error("Failed to authenticate with Spotify"));
    }
  }
  next();
};

exports.getExternalApi = async (req, res, next) => {
  try {
    const topTracks = await getPlaylistTracksData();
    const songRequests = await getSongRequestsData();

    res.render("external-api", {
      title: "Spotify Integration",
      topTracks: topTracks,
      songRequests: songRequests,
      searchResults: [],
    });
  } catch (error) {
    console.error(error);
    const customError = new Error("Failed to load Spotify data");
    next(customError);
  }
};

exports.postSearch = async (req, res, next) => {
  try {
    const { query } = req.body;

    if (!query) {
      req.flash("error", "Please enter a search term");
      return res.redirect("/externalapi");
    }

    const searchResponse = await spotifyAPI.get("/search", {
      params: {
        q: query,
        type: "track",
        limit: 10,
      },
    });

    const searchResults = searchResponse.data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      image: track.album.images[1]?.url || track.album.images[0]?.url,
      spotifyUrl: track.external_urls.spotify,
    }));

    const topTracks = await getTopTracksData();
    const songRequests = await getSongRequestsData();

    res.render("external-api", {
      title: "Spotify Integration",
      topTracks: topTracks,
      songRequests: songRequests,
      searchResults: searchResults,
    });
  } catch (error) {
    console.error(error);
    const customError = new Error("Failed to load Spotify data");
    next(customError);
  }
};

exports.postAddRequest = async (req, res, next) => {
  try {

    const {spotifyId, songName, artistName, albumName, imageUrl, spotifyUrl } = req.body;
    
    if (!req.session.isAuthenticated) {
      req.flash('error', 'Please log in to request Songs');
      return res.redirect('/user/login');
    }
    
    const existingRequest = await SongRequest.findOne({
      spotifyId: spotifyId,
      status: 'pending'
    });
    
    if (existingRequest) {
      req.flash('warning', 'This song has already been requested');
      return res.redirect('/externalapi');
    }
    
    const songRequest = new SongRequest({
      spotifyId,
      songName,
      artistName,
      albumName,
      imageUrl,
      spotifyUrl,
      requestedBy: req.session.user._id
    });
    
    await songRequest.save();
    req.flash('success', `${songName} has been added to the request list!`);
    res.redirect('/externalapi');
  } catch (error) {
    console.error(error);
    const customError = new Error('Failed to add song request');
    next(customError);
  }
};

exports.postRemoveRequest = async (req, res, next) => {
  try {
    await SongRequest.findByIdAndDelete(req.params.requestId);
    req.flash('success', 'Song request removed');
    res.redirect('/externalapi');
  } catch (error) {
    console.error(error);
    const customError = new Error('Failed to remove song request');
    next(customError);
  }
}
