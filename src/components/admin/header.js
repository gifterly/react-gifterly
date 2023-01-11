import React, { useState, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { IconButton } from "@material-ui/core";
import ProfilePage from "../messages/ProfilePage";
import Badge from "@mui/material/Badge";
import NotificationsNoneSharpIcon from "@material-ui/icons/NotificationsNoneSharp";
import { AuthContext } from "../../Context/AuthContext";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Avatar from "../../assets/images/avatar.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Avatarwrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;
const SearchHeader = () => {
  const { user, setUserData } = useContext(AuthContext);
  const [profiletoggle, setProfiletoggle] = useState(false);
  //   const userPhoto = user.user.photo;
  const profiletoggler = () => {
    profiletoggle === false ? setProfiletoggle(true) : setProfiletoggle(false);
  };
  const logoutRef = useRef();
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    logoutRef.current.click();
  };
  return (
    <Wrapper>
      {profiletoggle && (
        <ProfilePage
          toggler={() => {
            profiletoggler();
          }}
          togglestate={profiletoggle}
        />
      )}
      <Avatarwrapper>
        <IconButton
          onClick={() => {
            profiletoggler();
          }}
        >
          <img className="user-profile-image" src={Avatar} alt="" />
        </IconButton>
        <IconButton>
          <Badge color="secondary" variant="dot">
            <NotificationsNoneSharpIcon style={{ color: "white" }} />
          </Badge>
        </IconButton>
        <IconButton onClick={logout}>
          <ExitToAppIcon style={{ color: "white" }} />
        </IconButton>
      </Avatarwrapper>
      <Link to = '/' style={{display: 'none'}} ref={logoutRef}></Link>
    </Wrapper>
  );
};

export default SearchHeader;
