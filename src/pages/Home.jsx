import React, {useEffect, useState} from 'react';
import appwriteService from "../appwrite/config.js";
import {Container, PostCard} from '../components/index.js';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        if (authStatus) {
            appwriteService.getPosts()
                .then((postsResponse) => {
                    if (postsResponse && postsResponse.documents) {
                        setPosts(postsResponse.documents)
                    } else {
                        setPosts([])
                    }
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error);
                    setPosts([])
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [authStatus])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400 text-sm md:text-base">Loading your stories...</p>
                </div>
            </div>
        )
    }

    if (!authStatus) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-8">
                <div className="text-center max-w-2xl w-full">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-2xl">
                        <span className="text-white text-2xl md:text-4xl">✍️</span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4 px-4">
                        Welcome to <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">BlogVerse</span>
                    </h1>
                    <p className="text-slate-400 text-sm md:text-lg mb-6 md:mb-8 px-4">
                        Join our community of writers and readers. Share your stories, discover amazing content, and connect with like-minded people.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
                        <button 
                            onClick={() => navigate('/login')}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-blue-500/25 text-sm md:text-base"
                        >
                            Get Started
                        </button>
                        <button 
                            onClick={() => navigate('/signup')}
                            className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base"
                        >
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center px-4 py-8">
                <div className="text-center max-w-md w-full">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-800 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6">
                        <span className="text-2xl md:text-3xl">📝</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-3">No Stories Yet</h2>
                    <p className="text-slate-400 mb-6 text-sm md:text-base">
                        Be the first to share your story with the community!
                    </p>
                    <button 
                        onClick={() => navigate('/add-post')}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 text-sm md:text-base w-full sm:w-auto"
                    >
                        Create Your First Post
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className='py-4 md:py-8'>
            <Container>
                {/* Header */}
                <div className='text-center mb-8 md:mb-12 px-4'>
                    <h1 className='text-2xl md:text-4xl font-bold text-white mb-3 md:mb-4'>
                        Discover <span className='bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>Amazing Stories</span>
                    </h1>
                    <p className='text-slate-400 text-sm md:text-lg max-w-2xl mx-auto'>
                        Explore inspiring stories, tutorials, and experiences from our creative community
                    </p>
                </div>

                {/* Responsive Grid */}
                <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 md:gap-6 space-y-4 md:space-y-6 px-2'>
                    {posts.map((post) => (
                        <PostCard key={post.$id} {...post} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home;