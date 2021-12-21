import React from "react";
import { logout } from "../../adminRedux/apiCalls";
import "./topbar.css";
import { useDispatch, useSelector } from "react-redux";

export default function Topbar() {

  const user = useSelector(state => state.user.currentUser);
  const dispatch = useDispatch();
  
  const handleClick = () => {
    if(window.confirm("Are you sure you want to logout?")){
      logout(dispatch, user);
    }
  }

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Pottery Head Admin</span>
        </div>
        <div className="topRight">
          {/* <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" className="topAvatar" /> */}
          <button className="logoutButton" onClick={handleClick} >
            <h3  >Logout</h3>
          </button>
        </div>
      </div>
    </div>
  );
}
