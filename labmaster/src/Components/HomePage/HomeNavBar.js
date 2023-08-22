import { Link } from 'react-router-dom'
function HomeNavBar() {
    return (
        <div className=" shadow-slate-300 shadow-md
        lg:flex lg:justify-between lg:px-10 lg:py-3">
            <Link to="/">
                <h1 className='text-center text-2xl pt-5 mb-2 tracking-widest text-gray-800
                lg:text-3xl lg:py-2.5 lg:mb-0'>
                    LAB MASTER
                </h1>
            </Link>
            <ul className="flex justify-center space-x-10 font-sans font-extralight text-gray-800 pb-2
            lg:justify-end lg:space-x-20 lg:px-20 lg:py-2.5 lg:text-xl">
                <Link to="/login"><li className=' bg-slate-800 text-slate-200 px-5 py-1 rounded'>Log In</li></Link>
                <Link to="/about-us"><li className=' bg-slate-800 text-slate-200 px-2 py-1 rounded'>About Us</li></Link>
            </ul>
        </div>
    );
}
export default HomeNavBar;