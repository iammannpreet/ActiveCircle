import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/icons/tab-AC.gif'
import github from '../assets/icons/connect-icons/github.png'
import link from '../assets/icons/connect-icons/link.png'
import resume from '../assets/icons/connect-icons/resume.png'

const Footer = () => {
    return (
        <>
            <footer className="bg-black text-lightGray p-4 md:px-8 lg:px-12">
                <div className="">
                    <div className=''>
                        <div>
                            <Link to="/" className="block items-center">
                                <img src={logo} alt="Logo" className="block w-32 h-8 md:2-36 md:h-10 lg:w-40 lg:h-12" />
                            </Link>
                            <p className="text-lightGray text-sm mt-1 md:text-base lg:text-lg">
                                Explore the <span className='text-primary'>C</span>ircle
                            </p>

                        </div>
                        <div className='flex py-6 justify-between md:justify-evenly'>
                            <div>
                                <ul className="space-y-2 pb-2">
                                    <li className="text-sm md:text-base lg:text-lg hover:text-primary cursor-pointer">About Us</li>
                                    <Link to="/happening-now">
                                        <li className="text-sm md:text-base lg:text-lg hover:text-primary cursor-pointer">Events Near You</li></Link>
                                </ul>
                                <ul className="space-y-2">
                                    <li className="text-sm md:text-base lg:text-lg hover:text-primary cursor-pointer">Join Active<span className='text-primary'>C</span>ircle</li>
                                    <li className="text-sm md:text-base lg:text-lg hover:text-primary cursor-pointer">Services</li>
                                </ul></div><div>
                                <ul className="space-y-2 pb-2">
                                    <li className="text-sm md:text-base lg:text-lg hover:text-primary cursor-pointer">Terms & Conditions</li>
                                    <li className="text-sm md:text-base lg:text-lg hover:text-primary cursor-pointer">Privacy Policy</li>
                                </ul>
                                <ul className="space-y-2">
                                    <li className="text-sm md:text-base lg:text-lg hover:text-primary cursor-pointer">Blog/Resources</li>
                                    <li className="text-sm md:text-base lg:text-lg hover:text-primary cursor-pointer">Cookies Policy</li>
                                </ul></div>
                        </div>
                    </div>
                    <hr className="border-gray-700 p-2 " />
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className='flex gap-8 p-2'>

                            <a href="https://www.linkedin.com/in/iammannpreet/" target="_blank" rel="noopener noreferrer">
                                <img
                                    src={link}
                                    alt="LinkedIn"
                                    className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-transparent rounded-full glowing-outline"
                                />
                            </a>
                            <a href="https://github.com/iammannpreet" target="_blank" rel="noopener noreferrer">
                                <img
                                    src={github}
                                    alt="GitHub"
                                    className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-transparent rounded-full glowing-outline"
                                />
                            </a>
                            <a href="https://github.com/iammannpreet/myResume/raw/main/Manpreet's%20Resume.pdf" target="_blank" rel="noopener noreferrer">
                                <img
                                    src={resume}
                                    alt="Resume"
                                    className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-transparent rounded-full glowing-outline"
                                />
                            </a>
                        </div>
                        <p className="text-primary text-sm md:text-base ">©Copyright. BrainStation capstone.</p>
                    </div>
                </div>
            </footer>


        </>
    )
}

export default Footer