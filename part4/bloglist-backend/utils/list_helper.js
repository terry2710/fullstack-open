const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const reducer = (favorite, blog) => {
        return blog.likes > favorite.likes ? blog : favorite
    }

    return blogs.reduce(reducer, blogs[0])
}

const favoriteBlogByAuthor = (blogs) => {
    if (blogs.length === 0) {
        return []
    }

    const grouped = _.groupBy(blogs, 'author')

    return Object.keys(grouped).map((author) => {
        const favorite = _.maxBy(grouped[author], 'likes')
        return {
            author,
            favoriteBlog: {
                author: favorite.author,
                likes: favorite.likes,
                title: favorite.title,
            },
        }
    })
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const counts = _.countBy(blogs, 'author')
    const topAuthor = _.maxBy(Object.keys(counts), author => counts[author])

    return {
        author: topAuthor,
        blogs: counts[topAuthor]
    }
}


const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const byAuthor = _.groupBy(blogs, 'author')

    const totals = Object.keys(byAuthor).map((author) => ({
        author,
        likes: _.sumBy(byAuthor[author], 'likes'),
    }))

    return _.maxBy(totals, 'likes')
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    favoriteBlogByAuthor,
    mostBlogs,
    mostLikes
}