import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import noavatar from "../../assets/images/noavatar.jpg";
import "../../assets/css/SidebarChat.css";
import { Badge } from "@mui/material";
import { AuthContext } from "../../Context/AuthContext";

const BadgeStyle = {
    left: "380px"
}

function SidebarChat({ chatroomtile, currentUser }) {
  const [user, setUser] = useState(null);
  const [online, setOnline] = useState(false);
  const socket = useRef();
  const { count ,setCount } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_API);
  }, []);

  useEffect(() => {
    const amigoId = chatroomtile.members.find((m) => m !== currentUser._id);
    socket.current.on("getUsers", (users) => {
      setOnline(users.find((user) => user.userId === amigoId));
    });
    const getAmigodetails = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API + "/api/users/" + amigoId
        );

        setUser(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAmigodetails();
  }, [currentUser, chatroomtile, online]);
  return (
    <div className="sidebarchat">
      <img
        className="amigo-profilepic"
        src={user?.photo ? user?.photo : noavatar}
        alt=""
      />
      <div className={online ? "online" : "offile"}></div>
      <p className="sidebarchat-info-name">
        {user != null ? user.username : ""}
      </p>
      {/* <Badge color="success" badgeContent={count} style={BadgeStyle}>
      </Badge> */}
    </div>
  );
}

export default SidebarChat;
