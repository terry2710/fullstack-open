const {test, describe} = require('node:test')
const assert = require('node:assert')

const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
})

describe('total likes', () => {
    const listWithOneBlog = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
        }
    ]

    const blogs = [
        {title: 'a', author: 'x', url: 'u1', likes: 2},
        {title: 'b', author: 'y', url: 'u2', likes: 3},
        {title: 'c', author: 'z', url: 'u3', likes: 5}
    ]

    test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of empty list is zero', () => {
        assert.strictEqual(listHelper.totalLikes([]), 0)
    })

    test('of a bigger list is calculated right', () => {
        assert.strictEqual(listHelper.totalLikes(blogs), 10)
    })
})

describe('favorite blog', () => {
    const blogs = [
        {title: 'a', author: 'x', url: 'u1', likes: 2},
        {title: 'b', author: 'y', url: 'u2', likes: 7},
        {title: 'c', author: 'z', url: 'u3', likes: 54}
    ]

    test('returns the blog with most likes', () => {
        const result = listHelper.favoriteBlog(blogs)
        assert.deepStrictEqual(result, blogs[2])
    })

    test('of empty list is null', () => {
        assert.strictEqual(listHelper.favoriteBlog([]), null)
    })
})

describe('favorite blog by author', () => {
    const blogs = [
        {title: 'a', author: 'Robert C. Martin', likes: 2},
        {title: 'b', author: 'Robert C. Martin', likes: 3},
        {title: 'c', author: 'Robert C. Martin', likes: 5},
        {title: 'd', author: 'Brian C. Lovell', likes: 3},
        {title: 'dd', author: 'Brian C. Lovell', likes: 4},
        {title: '767d', author: 'Brian C. Lovell', likes: 7},
        {title: 'd56', author: 'Brian C. Lovell', likes: 54},
        {title: 'dwd', author: 'Edsger W. Dijkstra', likes: 34},
        {title: 'dte', author: 'Edsger W. Dijkstra', likes: 1}
    ]

    test('returns each author\'s most-liked blog', () => {
        const result = listHelper.favoriteBlogByAuthor(blogs)

        assert.deepStrictEqual(result, [
            {
                author: 'Robert C. Martin',
                favoriteBlog: { title: 'c', author: 'Robert C. Martin', likes: 5 }
            },
            {
                author: 'Brian C. Lovell',
                favoriteBlog: { title: 'd56', author: 'Brian C. Lovell', likes: 54 }
            },
                        {
                author: 'Edsger W. Dijkstra',
                favoriteBlog: { title: 'dwd', author: 'Edsger W. Dijkstra', likes: 34 }
            }
        ])
    })

    test('of empty list is empty array', () => {
        assert.deepStrictEqual(listHelper.favoriteBlogByAuthor([]), [])
    })
})

describe('most blogs', () => {
    const blogs = [
        {title: 'a', author: 'Robert C. Martin', likes: 2},
        {title: 'b', author: 'Robert C. Martin', likes: 3},
        {title: 'c', author: 'Robert C. Martin', likes: 5},
        {title: 'd', author: 'Brian C. Lovell', likes: 3},
        {title: 'dd', author: 'Brian C. Lovell', likes: 4},
        {title: '767d', author: 'Brian C. Lovell', likes: 7},
        {title: 'd56', author: 'Brian C. Lovell', likes: 54},
        {title: 'dwd', author: 'Edsger W. Dijkstra', likes: 34},
        {title: 'dte', author: 'Edsger W. Dijkstra', likes: 1}
    ]

    test('returns the author with most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        assert.deepStrictEqual(result, {author: 'Brian C. Lovell', blogs: 4})
    })

    test('of empty list is null', () => {
        assert.strictEqual(listHelper.mostBlogs([]), null)
    })
})

describe('most likes', () => {
    const blogs = [
        {title: 'a', author: 'Robert C. Martin', likes: 2},
        {title: 'b', author: 'Robert C. Martin', likes: 3},
        {title: 'c', author: 'Robert C. Martin', likes: 5},
        {title: 'd', author: 'Brian C. Lovell', likes: 3},
        {title: 'dd', author: 'Brian C. Lovell', likes: 4},
        {title: '767d', author: 'Brian C. Lovell', likes: 7},
        {title: 'd56', author: 'Brian C. Lovell', likes: 54},
        {title: 'dwd', author: 'Edsger W. Dijkstra', likes: 34},
        {title: 'dte', author: 'Edsger W. Dijkstra', likes: 1}
    ]

    test('returns the author with most total likes', () => {
        const result = listHelper.mostLikes(blogs)
        assert.deepStrictEqual(result, { author: 'Brian C. Lovell', likes: 68 })
    })

    test('of empty list is null', () => {
        assert.strictEqual(listHelper.mostLikes([]), null)
    })
})