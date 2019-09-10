const express  = require('express');
const db = require('./accountsDb.js');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await db.get();
        res.status(200).json({ accounts });
    } catch (err) { 
        console.log(err.message);
    }
});

router.post('/', async (req, res) => {
    try {
        db.insert(req.body);
        let accounts = await db.get();
        res.status(200).json({accounts});
    } catch (err) {
        console.log(err.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        let editedPost;
        const isPostEdited = await db.update(req.params.id, req.body);
        isPostEdited ? editedPost = await db.getById(req.params.id) : editedPost = null;
        res.status(200).json({ editedPost });
    } catch (err) {
        console.log(err.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deleteSuccessful = await db.remove(req.params.id);
        res.status(200).json({ deleteSuccessful });
    } catch (err) {
        console.log(err.message);
    }
});

module.exports = router;