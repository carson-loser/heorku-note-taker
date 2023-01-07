const router = require('express').Router();
const path = require('path');

// GET route using router sending notes.html file
router.get('/notes', (req, res) => {
  res.sendFile(path.join(_dirname, 'public/notes.html'));
});



module.exports = router;