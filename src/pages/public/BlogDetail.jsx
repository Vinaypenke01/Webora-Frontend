import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import PageHeader from '../../components/ui/PageHeader';
import Card from '../../components/ui/Card';

const BlogDetail = () => {
    const { slug } = useParams();
    const { blogs } = useApp();

    const blog = blogs.find(b => b.slug === slug);

    if (!blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2>Blog Post Not Found</h2>
                    <Link to="/blog" className="text-primary hover:underline">
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    const relatedBlogs = blogs.filter(b => b.category === blog.category && b.id !== blog.id).slice(0, 3);

    return (
        <div>
            <PageHeader
                title={blog.title}
                subtitle={`${blog.author} • ${blog.publishedDate} • ${blog.readTime}`}
                breadcrumbs={[
                    { name: 'Home', path: '/' },
                    { name: 'Blog', path: '/blog' },
                    { name: blog.title },
                ]}
                image={blog.featuredImage}
            />

            <section className="section-padding bg-white">
                <div className="container-custom">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg max-w-none mb-12">
                            <p className="text-xl text-gray-700 leading-relaxed">{blog.excerpt}</p>
                            <div className="my-8">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{blog.content}</p>
                            </div>
                        </div>

                        {/* Tags */}
                        {blog.tags && (
                            <div className="mb-8">
                                <h4 className="font-bold mb-4">Tags</h4>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag, index) => (
                                        <span key={index} className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Related Posts */}
            {relatedBlogs.length > 0 && (
                <section className="section-padding bg-gray-50">
                    <div className="container-custom">
                        <h2 className="text-center mb-12">Related Articles</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedBlogs.map(relatedBlog => (
                                <Card key={relatedBlog.id} className="overflow-hidden p-0">
                                    <div className="aspect-video overflow-hidden">
                                        <img
                                            src={relatedBlog.featuredImage}
                                            alt={relatedBlog.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <span className="text-sm text-primary font-semibold">{relatedBlog.category}</span>
                                        <h4 className="font-bold mt-2 mb-3">{relatedBlog.title}</h4>
                                        <p className="text-gray-600 text-sm mb-4">{relatedBlog.excerpt.slice(0, 100)}...</p>
                                        <Link to={`/blog/${relatedBlog.slug}`} className="text-primary hover:text-secondary font-semibold">
                                            Read More →
                                        </Link>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default BlogDetail;
