import express from 'express';
import SpottyDL from 'spottydl';

const router = express.Router();

router.get('/', (req, res) => {
  res.redirect('/download-track');
})

router.get('/download-track', async (req, res) => {
  try {
    const trackUrl = req.query.url;

    if (!trackUrl) {
      return res.status(400).json({
        status: "Error, Bad Request",
        message: "Please provide a value for the 'url' parameter. Example: ?url=https://open.spotify.com/track/2dIBMHByUGcNPzmYBJ6OAj?si=eP699_2HQJ6zo_FkFu5L_Q%0A",
        code: 4001,
        author: "Dani Tech. - FullStack Engineer",
      });
    }

    const getTrackInformation = await SpottyDL.getTrack(trackUrl);

    const downloadTrack = await SpottyDL.downloadTrack(getTrackInformation, "/sdcard/new/tmp");
    
    const trackInformation = getTrackInformation;
    const trackLink = req.protocol + '://' + req.hostname + downloadTrack[0].filename;

    res.status(200).json({
      status: "Success",
      message: "The request was successful.",
      code: 200,
      author: "Dani Tech. - FullStack Engineer",
      donate: "https://trakteer.id/danitech",
      data: {
        trackInformation: trackInformation,
        trackLink: trackLink
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred."
    });
  }
});

export default router;