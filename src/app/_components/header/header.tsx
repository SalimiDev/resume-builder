'use client';

export const Header: React.FC = () => {
    return (
        <header className='flex h-12 w-full justify-between bg-primary px-4 text-text-light'>
            <div className='flex items-center justify-center gap-4'>
                <h2>logo</h2>
                <h3>resume scored</h3>
            </div>

            <div className='flex items-center justify-center gap-4'>
                <button>Download</button>
                <span>user avatar</span>
            </div>
        </header>
    );
};
