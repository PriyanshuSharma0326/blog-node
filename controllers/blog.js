const Blog = require("../models/blog");
const Comment = require("../models/comment");
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
    return res.status(200).redirect(`/blog/${blog.id}`);
}

async function showBlog(req, res) {
    const blog = await Blog.findById(req.params.blogId).populate("createdBy");
    const comments = await Comment.find({ blogId: req.params.blogId }).populate("createdBy");

    if (!blog) {
        return res.status(404).send('Blog not found');
    }

    return res.render('blog', {
        blog,
        comments,
        pageTitle: blog.title,
        user: req.user,
        currentPath: req.path,
    });
}

async function handlePostNewComment(req, res) {
    const commentBody = { content: req.body.content, createdBy: req.user._id, blogId: req.params.blogId };
    const comment = await Comment.create(commentBody);
    return res.status(200).redirect(`/blog/${req.params.blogId}`);
}

module.exports = {
    addBlogForm,
    handlePublishPost,
    showBlog,
    handlePostNewComment,
}
