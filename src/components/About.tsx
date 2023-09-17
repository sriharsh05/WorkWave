import React from 'react';

export default function About() {
    return (
        <div className="flex flex-col items-center h-full text-gray-900 justify-center">
            <div className="text-3xl font-bold m-4">About WorkWave</div>
            <div className="max-w-md text-center">
                <p className="mb-4">
                    Welcome to WorkWave, your trusted solution for efficient task and project management.
                    We are passionate about simplifying the way you work, and our platform is designed to help you
                    achieve your goals and streamline your processes.
                </p>
                <p className="mb-4">
                WorkWave offers a range of features, creating boards, creating stages, 
                creating tasks awith descriptions, moving tasks from different stages etc.
                </p>
                
            </div>
        </div>
    );
}
