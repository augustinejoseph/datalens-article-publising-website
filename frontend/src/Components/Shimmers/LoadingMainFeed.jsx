import './LoadingMainFeed.css'

const LoadingMainFeed = () => {
  return (
    <div className='shimmer_mainfeeedloading_container'>
      <svg className='roundloading_svg' viewBox="25 25 50 50">
        <circle r="20" cy="50" cx="50"></circle>
      </svg>
    </div>
  );
};
export default LoadingMainFeed