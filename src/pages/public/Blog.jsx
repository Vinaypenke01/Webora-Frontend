import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';
import Pagination from '../../components/ui/Pagination';

const Blog = () => {
    const { blogs, loading } = useApp();
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6;

    const totalPages = Math.ceil(blogs.length / blogsPerPage);
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const featuredBlog = blogs[0];

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading Blog...</div>;
    }

    return (
        <div>
            <PageHeader
                title="Our Blog"
                subtitle="Insights, tips, and news from the world of web development"
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Blog' },
                ]}
            />

            <section className="section-padding bg-white">
                <div className="container-custom">
                    {/* Featured Post */}
                    {featuredBlog && (
                        <Card className="mb-12 overflow-hidden p-0">
                            <div className="grid grid-cols-1 md:grid-cols-2">
                                <div className="aspect-video md:aspect-square overflow-hidden">
                                    <img
                                        src={featuredBlog.featuredImage || 'https://via.placeholder.com/800x450?text=Blog+Post'}
                                        alt={featuredBlog.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8 flex flex-col justify-center">
                                    <span className="text-primary font-semibold mb-2">{featuredBlog.category}</span>
                                    <h2 className="text-3xl font-bold mb-4">{featuredBlog.title}</h2>
                                    <p className="text-gray-600 mb-4">{featuredBlog.excerpt}</p>
                                    <div className="flex items-center text-sm text-gray-500 mb-6">
                                        <span>{featuredBlog.author}</span>
                                        <span className="mx-2">•</span>
                                        <span>{featuredBlog.publishedDate}</span>
                                        <span className="mx-2">•</span>
                                        <span>{featuredBlog.readTime}</span>
                                    </div>
                                    <Link to={`/blog/${featuredBlog.slug}`} className="btn btn-primary inline-block w-fit">
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </Card>
                    )}

                    {/* Blog Grid */}
                    {currentBlogs.length > 0 && (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                                {currentBlogs.slice(featuredBlog ? 1 : 0).map(blog => (
                                    <Card key={blog.id} className="overflow-hidden p-0">
                                        <div className="aspect-video overflow-hidden">
                                            <img
                                                src={blog.featuredImage || 'https://via.placeholder.com/400x250?text=Blog+Post'}
                                                alt={blog.title}
                                                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                            />
                                        </div>
                                        <div className="p-6">
                                            <span className="text-sm text-primary font-semibold">{blog.category}</span>
                                            <h3 className="text-xl font-bold mt-2 mb-3">{blog.title}</h3>
                                            <p className="text-gray-600 mb-4">{blog.excerpt}</p>
                                            <div className="flex items-center text-sm text-gray-500 mb-4">
                                                <span>{blog.author}</span>
                                                <span className="mx-2">•</span>
                                                <span>{blog.readTime}</span>
                                            </div>
                                            <Link to={`/blog/${blog.slug}`} className="text-primary hover:text-secondary font-semibold">
                                                Read More →
                                            </Link>
                                        </div>
                                    </Card>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Blog;
