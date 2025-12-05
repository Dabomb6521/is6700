# Implement Custom External API

**External API:** Spotify Web API
**Developer URL:** [https://developer.spotify.com/]

For this question I decided to tackle a practicle problem. For me, as part of a app I plan on building in the future I wanted to give the Spotify API a try and have it return songs or artists that I can then request and add to a request list. I also included random 20 songs from a personal playlist just to have something default on the page that could be added. In order to request the song you have to be a logged in user. Once there is a song added to the request list only the user that added it or a admin of the site can delete that song from the list. As a side note, a condition with using the spotify api, if you display the cover art from spotify you have to include a link back to the applicable content with it clearly showing the location being spotify (so using their logo would be sufficiant). Since I wanted to have the art shown I decided to include this button.

To use the api you can search any artist or song and Spotify will return a list of songs that it deems matches. In that returned search results you can click the request button and that will add it to the requested songs list. You can also scroll down and this 20 tracks list are all songs from my playlist which change on every refresh of the page. You can click the request there and it will add that song to the requested songs list as well.

This project ended up being way more difficult than I originally thought it would be. I spent a lot of time trying to figure out how the spotify api worked and what information I could return or not. This was mostly due to me wanting to return a top 50 list from spotify only to find out they limited that functionality and most spotify playlists made by spotify are not allowed of the normal client api, which made me use my own playlist.

In this process I had to grab a token from Spotify before I could do anything with the api. This token was set up by signing into the spotify development website and generating one. I had to set up a new router, controller, model, and view. In the controller specifically I had the hardest time with getting the right configuration options for the getPlaylistTracksData function. This is where I spent too much time getting a public playlist to work. Most everything else was pretty standard and just took time in reasearching what I needed.

Doing this part of the final will be very helpful when I pursue building my song request app for my parents business.
