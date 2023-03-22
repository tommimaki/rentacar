import React from 'react';
import { FaLinkedin, FaCcAmex, FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <div className=''>
            <footer className="h-fit shadow dark:bg-gray-800">
                <div className="w-full mx-auto container p-6 flex flex-col items-center justify-center mt-auto">
                    <ul className="flex flex-wrap justify-center items-center mb-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a
                                href="https://github.com/tommimaki/rentacar"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-4"
                            >
                                <FaGithub className="text-4xl text-white" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.linkedin.com/in/tommi-maki/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-4"
                            >
                                <FaLinkedin className="text-4xl text-white" />
                            </a>
                        </li>
                        <li>

                        </li>
                        <li>
                            <a
                                href="https://tommimaki.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mx-4"
                            >
                                <FaCcAmex className="text-4xl text-white" />
                            </a>
                        </li>
                    </ul>
                    <span className="text-sm text-center text-gray-500 dark:text-gray-400">
                        © 2023 All Rights Reserved. Built by Tommi Maki
                    </span>
                </div>
            </footer >
        </div >
    );
};

export default Footer;
