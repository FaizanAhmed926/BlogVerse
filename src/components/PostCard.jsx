import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config.js"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, content }) {
    const [imageUrl, setImageUrl] = useState('')
    const [imageError, setImageError] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadImage = async () => {
            if (featuredImage) {
                try {
                    const url = await appwriteService.getFileView(featuredImage);
                    if (url) {
                        setImageUrl(url);
                    } else {
                        setImageError(true);
                    }
                } catch (error) {
                    setImageError(true);
                }
            } else {
                setImageError(true);
            }
            setLoading(false);
        };

        loadImage();
    }, [featuredImage]);

    // Extract plain text from HTML content for preview
    const getTextPreview = (html) => {
        if (!html) return 'No content available';
        return html.replace(/<[^>]*>/g, '').substring(0, 120) + '...';
    };

    if (loading) {
        return (
            <div className='bg-slate-800 rounded-2xl p-4 animate-pulse'>
                <div className='w-full h-48 bg-slate-700 rounded-xl mb-4'></div>
                <div className='h-4 bg-slate-700 rounded mb-2'></div>
                <div className='h-4 bg-slate-700 rounded w-3/4'></div>
            </div>
        );
    }

    return (
        <div className='break-inside-avoid mb-6'>
            <Link to={`/post/${$id}`}>
                <div className='bg-slate-800 rounded-2xl overflow-hidden shadow-2xl hover:shadow-blue-500/20 hover:scale-[1.02] transition-all duration-300 border border-slate-700 group'>
                    {/* Image */}
                    <div className='relative overflow-hidden'>
                        {imageError || !imageUrl ? (
                            <div className='w-full h-48 bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center'>
                                <span className='text-slate-400 text-lg'>📷 No Image</span>
                            </div>
                        ) : (
                            <img
                                src={imageUrl}
                                alt={title || 'Post image'}
                                className='w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500'
                                onError={() => setImageError(true)}
                            />
                        )}
                        {/* Gradient Overlay */}
                        <div className='absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </div>

                    {/* Content */}
                    <div className='p-4'>
                        <h2 className='text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-300 transition-colors'>
                            {title || 'Untitled Post'}
                        </h2>
                        <p className='text-slate-400 text-sm line-clamp-3'>
                            {getTextPreview(content)}
                        </p>
                        
                        {/* Read More */}
                        <div className='mt-4 flex items-center justify-between'>
                            <span className='text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors'>
                                Read More →
                            </span>
                            <div className='w-2 h-2 bg-green-400 rounded-full'></div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PostCard;