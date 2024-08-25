import React from 'react'

const Loader: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center my-auto">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500 mx-auto"></div>
      <h2 className="text-zinc-900 dark:text-white mt-4">
        Please wait, Content is Loading...
      </h2>
    </div>
  )
}

export default Loader
