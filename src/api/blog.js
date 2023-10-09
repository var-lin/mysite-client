import request from "./request";

export async function getBlogs(page = 1, limit = 10, categoryid = -1) {
    return await request.get("/api/blog", {
        params: {
            page,
            limit,
            categoryid
        }
    })
}

export async function getBlogCategories() {
    return await request.get("/api/blogtype")
}

export async function getBlog(id) {
    return request.get(`/api/blog/${id}`)
}

export async function postComment(commentInfo) {
    return request.post("/api/comment", commentInfo)
}

export async function getComments(blogid, page = 1, limit = 10) {
    return request.get("/api/comment", {
        params: {
            blogid,
            page,
            limit
        }
    })
}