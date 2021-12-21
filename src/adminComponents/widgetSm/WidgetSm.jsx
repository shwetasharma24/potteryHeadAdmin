import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect, useState } from "react";
import  {userRequest}  from "../../axios/requestMethods";

export default function WidgetSm() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await userRequest.get("users/?new=true");
      setUsers(res.data);
    }
    getUsers();
  }, []);

  // console.log("users: ",users);

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (

          <li className="widgetSmListItem" key={user._id}>
            <img
              src={user.profilePicture || "https://image.flaticon.com/icons/png/512/16/16363.png"}
              alt=""
              className="widgetSmImg"
              />
            <div className="widgetSmUser">
              <span className="widgetSmUsername"> {user.username} </span>
            </div>
            <button className="widgetSmButton">
              <Visibility className="widgetSmIcon" />
              Display
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
