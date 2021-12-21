import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link, useParams, useHistory } from "react-router-dom";
import "./user.css";
import { useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import app from '../../firebase';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {updateUser} from "../../adminRedux/apiCalls";


export default function User() {


  const {userId} = useParams();
  const [user, setUser] = useState( useSelector(state => state.users.users.find(user => user._id === userId)) );
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();


  // console.log("USER: ", user);

  const handleChange = (e) => {
    setUser(prev => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleClick = (e) => {
    e.preventDefault();

    if(file!==null){
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                default: 
                }
            }, 
            (error) => {
                // Handle unsuccessful uploads
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setUser(prev => (
                        {...prev, profilePicture:downloadURL}
                    ));
                    updateUser(userId, user, dispatch);
                    history.push("/users");
                });
            }
        );
    }
    else{
        // console.log("UPDATED USER:::::: ", user);
        updateUser(userId, user, dispatch);
        history.push("/users");   
    }
  }

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.profilePicture ? user.profilePicture : "https://image.flaticon.com/icons/png/512/16/16363.png"}
              alt=""
              className="userShowImg"
            />
            
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.fname + " " + user.lname}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{user.createdAt.substring(0,10)}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <span className="userShowTitle">Is Admin</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{""+user.isAdmin === 'true' ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <div className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  value={user.username}
                  name="username"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>First Name</label>
                <input
                  type="text"
                  value={user.fname}
                  name="fname"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Last Name</label>
                <input
                  type="text"
                  value={user.lname}
                  name="lname"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={user.email}
                  name="email"
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.profilePicture ? user.profilePicture : "https://image.flaticon.com/icons/png/512/16/16363.png"}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" name="profilePicture" id="file" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
              </div>
              <button className="userUpdateButton" onClick={handleClick}>Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
