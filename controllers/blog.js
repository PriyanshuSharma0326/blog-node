const Blog = require("../models/blog");
const User = require("../models/user");

function addBlogForm(req, res) {
    return res.render('newBlog', {
        pageTitle: 'Add a new blog',
        user: req.user,
        currentPath: req.originalUrl,
    });
}

async function handlePublishPost(req, res) {
    const newBlogContent = req.body;
    const blogBody = { ...newBlogContent, coverImgUrl: `uploads/${req.file.filename}`, createdBy: req.user._id };
    const blog = await Blog.create(blogBody);
    return res.redirect(`/blog/${blog.id}`);
}

async function showBlog(req, res) {
    const blog = await Blog.findOne({
        id: req.params.id,
    });

    if (!blog) {
        return res.status(404).send('Blog not found');
    }

    return res.render('blog', {
        blog,
        pageTitle: blog.title,
        user: req.user,
        currentPath: req.path,
    });
}

module.exports = {
    addBlogForm,
    handlePublishPost,
    showBlog
}
