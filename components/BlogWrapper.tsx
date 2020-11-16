import Link from "next/link";

const BlogWrapper = ({children}) => {
    return (
        <>
            <nav>
                <Link href={"/"}><a>Main Page</a></Link>
                <Link href={"/posts/new"}><a>Create new Post</a></Link>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}

export default BlogWrapper;