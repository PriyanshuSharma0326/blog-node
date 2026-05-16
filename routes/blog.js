const { Router } = require('express');
const { addBlogForm, handlePublishPost, showBlog } = require('../controllers/blog');
const upload = require('../middlewares/multer');

const router = Router();

router.get('/new', addBlogForm);

router.post('/', upload.single('coverImage'), handlePublishPost);

router.get('/:blogId', showBlog);

module.exports = router;
