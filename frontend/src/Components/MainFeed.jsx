import React from 'react'
import HomeCategoryList from './HomeCategoryList'
import HomePostContainer from './HomePostContainer'
import './MainFeed.css'

const MainFeed = () => {
  return (
    <div className='mainfeed_container'>
        < HomeCategoryList />
        < HomePostContainer />
        < HomePostContainer />
        < HomePostContainer />
        < HomePostContainer />
        < HomePostContainer />
        < HomePostContainer />
        < HomePostContainer />
        < HomePostContainer />


    
    </div>
  )
}

export default MainFeed