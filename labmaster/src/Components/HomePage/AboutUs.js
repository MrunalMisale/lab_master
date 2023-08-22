import { Link } from 'react-router-dom';
import labMaster from './labMaster.png';
import './HomePage.css'
function AboutUs() {
    return (
        <div>
            {/* <p className="text-center py-56 text-gray-900 font-extralight">This page is under development</p> */}
            
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <figure className="mx-14 mb-10 mt-12 md:flex  rounded-xl p-8 bg-slate-800">
                <img className="w-36 ml-40 mr-40 h-36 rounded-full mx-10" src={labMaster} alt="" width="384" height="512" />
                <div className="pt-9 mr-20 ml-52 text-center space-y-4">

                    <figcaption className="font-medium">
                        <div class="text-sky-400">
                            PROF. H B
                        </div>
                        <div className="text-slate-500">
                            Assistant Professor at Institute of Technology
                        </div>
                        <div className="text-slate-500">
                            Project Guide
                        </div>
                    </figcaption>
                </div>
            </figure>



            <div className='flex w-11/12 mx-auto'>
                <figure class=" rounded-xl p-8 mx-9 bg-slate-800">
                    <img class="w-32 h-32 rounded-full mx-auto" src={labMaster} alt="" width="384" height="512" />
                    <div class="pt-6 text-center space-y-4">
                        
                        <figcaption class="font-medium">
                            <div class="text-sky-400">
                                M M
                            </div>
                            <div class="text-slate-500">
                                Student | TE-Comps-DIV B | 
                            </div>
                        </figcaption>
                    </div>
                </figure>
                <figure class=" rounded-xl p-8 mx-9 bg-slate-800">
                    <img class="w-32 h-32 rounded-full mx-auto" src={labMaster} alt="" width="384" height="512" />
                    <div class="pt-6 text-center space-y-4">
                        
                        <figcaption class="font-medium">
                            <div class="text-sky-400">
                                S M
                            </div>
                            <div class="text-slate-500">
                                Student | TE-Comps-DIV B | 
                            </div>
                        </figcaption>
                    </div>
                </figure>
                <figure class=" rounded-xl p-8 mx-9 bg-slate-800">
                    <img class="w-32 h-32 rounded-full mx-auto" src={labMaster} alt="" width="384" height="512" />
                    <div class="pt-6 text-center space-y-4">
                        
                        <figcaption class="font-medium">
                            <div class="text-sky-400">
                                A N
                            </div>
                            <div class="text-slate-500">
                                Student | TE-Comps-DIV B | 
                            </div>
                        </figcaption>
                    </div>
                </figure>
                <figure class=" rounded-xl p-8 mx-9 bg-slate-800">
                    <img class="w-32 h-32 rounded-full mx-auto" src={labMaster} alt="" width="384" height="512" />
                    <div class="pt-6 text-center space-y-4">
                        
                        <figcaption class="font-medium">
                            <div class="text-sky-400">
                                S J
                            </div>
                            <div class="text-slate-500">
                                Student | TE-Comps-DIV B | 
                            </div>
                        </figcaption>
                    </div>
                </figure>
            </div>
            <footer className=' mt-6 border-2 border-t-black mx-6'>
                <div className='mx-auto w-full container p-4'>
                    <div className='mb-0.5 flex'>
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
    )
}
export default AboutUs;