import React from 'react'

const Loading = () => {
    return (
        <div className='flex justify-center items-center w-full min-h-screen'>
            <div className='w-10 h-10 border-4 border-primary rounded-full animate-ping delay-75'>
                <div className='w-8 h-8 border-4 border-primary rounded-full animate-ping delay-100'>
                    <div className='w-6 h-6 border-4  border-primary rounded-full animate-ping delay-150'>
                        <div className='w-4 h-4 border-4 border-primary rounded-full animate-ping delay-200'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loading