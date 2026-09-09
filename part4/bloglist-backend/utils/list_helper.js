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
    const grouped = blogs.reduce((acc, blog) => {
        if (!acc[blog.author] || blog.likes > acc[blog.author].likes) {
            acc[blog.author] = blog
        }
        return acc
    }, {})

    return Object.keys(grouped).map(author => ({
        author,
        favoriteBlog: grouped[author]
    }))
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const counts = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1
        return acc
    }, {})

    const topAuthor = Object.keys(counts).reduce((top, author) => {
        return counts[author] > counts[top] ? author : top
    })

    return {
        author: topAuthor,
        blogs: counts[topAuthor]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const likesByAuthor = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes
        return acc
    }, {})

    const topAuthor = Object.keys(likesByAuthor).reduce((top, author) => {
        return likesByAuthor[author] > likesByAuthor[top] ? author : top
    })

    return {
        author: topAuthor,
        likes: likesByAuthor[topAuthor]
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    favoriteBlogByAuthor,
    mostBlogs,
    mostLikes
}