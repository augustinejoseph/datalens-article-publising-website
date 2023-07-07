
import "./Home.css";

import {MainFeed, Sidebar, AuthContext, useContext, React} from '../index'

function Home() {
  const { user } = useContext(AuthContext);
  return (

      <div className="home_container">
      <div className="home_container_mainfeed">
      <MainFeed />
      </div>
      <div className="home_container_sidebar">
      <Sidebar />
      </div>
    </div>


      );    
}

export default Home;
