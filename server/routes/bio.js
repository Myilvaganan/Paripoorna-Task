const express = require('express');

const router = express.Router();
const { createBio, getBio, deleteBio, editBio } = require('../controller/bio');

router.post('/', createBio);
router.get('/', getBio);
router.delete('/:id', deleteBio);
router.put('/:id', editBio);

module.exports = router;
