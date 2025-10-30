import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components/index.js'
import appwriteService from "../appwrite/config.js";

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        appwriteService.getPosts([])
            .then((postsResponse) => {
                console.log("Posts response:", postsResponse); // Debug log
                if (postsResponse && postsResponse.documents) {
                    setPosts(postsResponse.documents)
                } else {
                    setPosts([])
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error)
                setError("Failed to load posts")
                setPosts([])
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="min-h-screen flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                            <p className="text-slate-400">Loading your stories...</p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    if (error) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-red-600">{error}</h1>
                    </div>
                </Container>
            </div>
        )
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold">No posts found</h1>
                        <p className="text-gray-600">There are no posts to display.</p>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts;