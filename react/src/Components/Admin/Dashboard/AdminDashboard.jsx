import "./AdminDashboard.css";
import {
  useEffect,
  adminAxiosToDjangoServerInterceptor,
  useState,
  LoadingModal,
} from "../index";
import { fetchStatics, fetchArticleStatistics } from "./functions";

const AdminDashboard = () => {
  const [statistics, setStatistics] = useState(null);
  const [articleStatistics, setArticleStatistics] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStatics(setLoading, setStatistics);
    fetchArticleStatistics(setLoading, setArticleStatistics);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingModal />
      ) : (
        <div className="admin_table_container">
          <div className="admin_panel_section_title">
            <span>Dashboard</span>
          </div>

          <div className="admin_dash_container">
            <div className="admin_dash_overview">
              <div className="admin_dash_overview_users">
                <span>Users</span>
                <span>
                  {statistics ? statistics?.totalUsers : "Loading..."}
                </span>
              </div>
              <div className="admin_dash_overview_users">
                <span>Page views</span>
                <span>
                  {articleStatistics
                    ? articleStatistics?.totalPageViews
                    : "Loading..."}
                </span>
              </div>
              <div className="admin_dash_overview_users">
                <span>Total Articles</span>
                <span>
                  {articleStatistics
                    ? articleStatistics?.totalArticlesCount
                    : "Loading..."}
                </span>
              </div>
              <div className="admin_dash_overview_users">
                <span>Interests</span>
                <span>
                  {statistics ? statistics?.totalInterests : "Loading..."}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
