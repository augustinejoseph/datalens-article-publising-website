import React from 'react'
import HomeCategoryList from './HomeCategoryList'
import HomePostContainer from './HomePostContainer'

const MainFeed = () => {
  return (
    <div className='mainfeed_container'>
        < HomeCategoryList />
        < HomePostContainer />
    
    </div>
  )
}

export default MainFeed