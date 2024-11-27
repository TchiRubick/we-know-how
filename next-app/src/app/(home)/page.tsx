const HomePage = () => (
  <div className='flex min-h-screen items-center justify-center bg-gray-100'>
    <div className='max-w-2xl px-4 text-center'>
      <h1 className='mb-6 text-5xl font-bold text-foreground'>
        Welcome to Your Amazing Product
      </h1>
      <p className='mb-8 text-xl text-gray-600'>
        You don&apos;t care about how your website is built, how modern it is,
        or how fast it runs. You only care about having it for a cheaper price
        and in a record time without worrying about security, performance,
        scalability or the best practice.
      </p>
      <div className='flex justify-center space-x-4'>
        <button className='rounded-lg bg-foreground px-6 py-3 text-white transition duration-300 hover:bg-foreground'>
          That fit my description
        </button>
        <button className='rounded-lg bg-gray-200 px-6 py-3 text-gray-800 transition duration-300 hover:bg-gray-300'>
          I disagree !!
        </button>
      </div>
    </div>
  </div>
);

export default HomePage;
