import React from "react";
import '../css/menu.css'

export function Profile() {
  return (
    <div className="profile-menu">
      <ProfileMenu></ProfileMenu>
    </div>
  );
}
export function ProfileMenu(props) {
  return (
    <div className="sub-menu">
      {props.children}

      <li>Name</li>
      <li>Age</li>
    </div>
  );
}
// _____________________________________________________SETTINGS_______________________________________________________________


export function Settings() {
  return (
    <div className="setting-menu">
      <SettingsMenu></SettingsMenu>
    </div>
  );
}
export function SettingsMenu(props) {
  return (
    <div className="sub-menu">
      {props.children}
      <li>Dark Theme</li>
      <li>Change Password</li>
    </div>
  );
}

// _____________________________________________________LOGOUT_______________________________________________________________
export function Logout() {
  return (
    <div className="logout-menu">
      <LogoutMenu></LogoutMenu>
    </div>
  );
}
export function LogoutMenu(props) {
  return (
    <div className="sub-menu">
      {props.children}

      <li>logout</li>
    </div>
  );
}
