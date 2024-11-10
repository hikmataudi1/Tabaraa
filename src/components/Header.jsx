import React from 'react'
import "bootstrap/dist/css/bootstrap.css";
import {Link} from 'react-router-dom'

const Header = ({activeTab,setActiveTab}) => {
    const handleTabSwitch = (tab) => {
        setActiveTab(tab);
      };
    return(
        <>
          <h1 className="text-center mt-5">
            Blood Donation <br /> التبرع بالدم
          </h1>

          <div className="d-flex justify-content-center align-items-center mt-5">
        <Link
          to={"/posts"}
          className="p-2 border rounded text-dark text-decoration-none post"
          style={{
            backgroundColor: "#fff",
          }}
        >
          طلبات المستشفيات
        </Link>
      </div>
          {/* Tab toggle */}
          <div className="d-flex justify-content-center align-items-center mt-5">
            <button
              className="p-2 m-2 border rounded text-dark"
              style={{backgroundColor: activeTab === "Tab1" ? "#0096ff" : "#fff",}}
              onClick={() => handleTabSwitch("Tab1")}
            >
              تعبئة استمارة التبرع
            </button>

            <button
              className="p-2 m-2 border rounded text-dark"
              style={{backgroundColor: activeTab === "Tab2" ? "#0096ff" : "#fff",}}
              onClick={() => handleTabSwitch("Tab2")}
            >
              البحث عن متبرعين
            </button>
          </div>
          <br />
          <br />
          </>
          )}

export default Header