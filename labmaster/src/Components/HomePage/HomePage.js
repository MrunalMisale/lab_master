import labMaster from './labMaster.png';
import { Link } from 'react-router-dom';
import React from 'react';
import Typed from 'typed.js';
import './HomePage.css'
function HomePage() {
    const autotyping = React.useRef(null);

    React.useEffect(() => {
        const typed = new Typed(autotyping.current, {
            strings: [", Welcomes You to the Home Page !!!!!!!!", "is a Smart online Website that can help lab manager to keep the lab and student disturbed-free and keep the PC’s in the working condition to avoid in-consistency."],
            typeSpeed: 30,
            backSpeed: 30,
            loop: false
        });

        return () => {
            // Destroy Typed instance during cleanup to stop animation
            typed.destroy();
        };
    }, []);

    return (
        <div>
            <div>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                {/* <p className="text-center py-56 text-gray-900 font-extralight">This page is under development</p> */}

                <div className='flex'>
                    <img src={labMaster} className="pt-10"></img>
                    <div className='  mt-5 w-auto rounded-3xl'>

                        <h1 className=" text-4xl mt-24 mx-12 font-normal leading-relaxed text-yellow-600 text-justify">LAB MASTER <span ref={autotyping} className="text-black font-light"></span> </h1>

                    </div>

                </div>

                <footer className=' mt-8 border-2 border-t-black mx-6'>
                    <div className='mx-auto w-full container p-4'>
                        <div className='mb-2 flex'>
                            <Link to="/"><li className='text-black text-2xl pl-32 pr-10 list-none font-bold text'>LAB MASTER</li></Link>

                            <p className='font-bold ml-72'>©2023 <Link to="/">Lab Master</Link>. All Right Reserved.</p>
                            <div className='ml-96'>
                                <a href="link of whataspp group" target="_blank" class="fa fa-whatsapp"></a>
                                <a href="https://github.com/" target="_blank" class="fa fa-github"></a>
                                <a href="https://www.linkedin.com/home" target="_blank" class="fa fa-linkedin"></a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}
export default HomePage;