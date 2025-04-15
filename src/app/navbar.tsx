import Link from "next/link"

const Navbar = () => {
    return (
        <nav className="bg-white shadow-md py-4 px-6 flex items-center space-x-6">
            <Link href="keywords" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Keywords
            </Link>
            <Link href="stories" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
                Stories
            </Link>
        </nav>
    )
}

export default Navbar;