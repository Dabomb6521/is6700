const express = require('express');
const router = express.Router();
const spotifyController = require('../../controllers/api/spotify-controller');

router.use(spotifyController.getSpotifyApiToken);

// GET requests
router.get('/', spotifyController.getExternalApi);

// POST requests
router.post('/search', spotifyController.postSearch);
router.post('/request', spotifyController.postAddRequest);
router.post('/request/remove/:requestId', spotifyController.postRemoveRequest);

module.exports = router;