import React from 'react';
import Header from './header';
import Footer from './Footer';

interface PageLayoutProps {
    children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8">
                {children}
            </div>
            <Footer />
        </div>
    );
};

export default PageLayout;
