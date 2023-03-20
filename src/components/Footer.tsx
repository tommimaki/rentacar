import React from 'react';

const Footer = () => {
    return (
        <div className='mt-6'>

            <footer className="rounded-lg h-fit shadow dark:bg-gray-800">
                <div className="w-full mx-auto container md:p-6 p-4 md:flex md:items-center md:justify-between mt-auto">
                    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                        © 2023 All Rights Reserved.
                    </span>
                    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                        <li>
                            <a href="/" className="mr-4 hover:underline md:mr-6">
                                About
                            </a>
                        </li>
                        <li>
                            <a href="/" className="mr-4 hover:underline md:mr-6">
                                Privacy Policy
                            </a>
                        </li>
                        <li>
                            <a href="/" className="mr-4 hover:underline md:mr-6">
                                Licensing
                            </a>
                        </li>
                        <li>
                            <a href="/" className="hover:underline">
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
