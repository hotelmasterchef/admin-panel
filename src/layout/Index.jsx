import React, { useEffect, useState } from "react";
import sideBar from "../data/sidebar.json";
import { useNavigate, Outlet } from "react-router-dom";
import SecureLS from "secure-ls";
import { useGlobalContext } from "../contextapi/Context";

const Index = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useGlobalContext();
  const [sideNavToggled, setSideNavToggled] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [open, setOpen] = useState({
    state: false,
    type: null,
  });
  useEffect(() => {
    sideBar?.forEach((menu) => {
      if (menu?.submenu === null) {
        if (window.location.pathname === menu?.path) {
          setActiveTab(menu?.name);
        }
      } else {
        menu?.submenu?.forEach((subMenu) => {
          if (window.location.pathname === subMenu?.path) {
            setActiveTab(menu?.name);
            setTimeout(() => {
              setOpen({
                state: true,
                type: menu?.name,
              });
            }, 1000);
          }
        });
      }
    });
  }, [window.location.pathname]);
  return (
    <div className={`app sidebar-mini ${sideNavToggled ? "sidenav-toggled" : null} `}>
      <header className="app-header">
        <span className="app-header__logo cp" onClick={() => navigate("/")}>
          Hotel MasterChef
        </span>
        <span
          className="app-sidebar__toggle"
          href="#"
          data-toggle="sidebar"
          aria-label="Hide Sidebar"
          onClick={() => setSideNavToggled(!sideNavToggled)}
        ></span>
        <ul className="app-nav">
          <li className="app-search">
            <input className="app-search__input" type="search" placeholder="Search" />
            <button className="app-search__button">
              <i className="fa fa-search"></i>
            </button>
          </li>
          <li className="dropdown">
            <a className="app-nav__item" href="#" data-toggle="dropdown" aria-label="Show notifications">
              <i className="fa fa-bell-o fa-lg"></i>
            </a>
            <ul className="app-notification dropdown-menu dropdown-menu-right">
              <li className="app-notification__title">Notification functionality not started yet.</li>
              <div className="app-notification__content">
                {/* <li>
                  <a className="app-notification__item" href="javascript:;">
                    <span className="app-notification__icon">
                      <span className="fa-stack fa-lg">
                        <i className="fa fa-circle fa-stack-2x text-primary"></i>
                        <i className="fa fa-envelope fa-stack-1x fa-inverse"></i>
                      </span>
                    </span>
                    <div>
                      <p className="app-notification__message">Lisa sent you a mail</p>
                      <p className="app-notification__meta">2 min ago</p>
                    </div>
                  </a>
                </li> */}
              </div>
              {/* <li className="app-notification__footer">
                <a href="#">See all notifications.</a>
              </li> */}
            </ul>
          </li>
          <li className="dropdown">
            <a className="app-nav__item" href="#" data-toggle="dropdown" aria-label="Open Profile Menu">
              <i className="fa fa-user fa-lg"></i>
            </a>
            <ul className="dropdown-menu settings-menu dropdown-menu-right">
              {/* <li>
                <a className="dropdown-item" href="page-user.html">
                  <i className="fa fa-cog fa-lg"></i> Settings
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="page-user.html">
                  <i className="fa fa-user fa-lg"></i> Profile
                </a>
              </li> */}
              <li>
                <span
                  className="dropdown-item cp"
                  onClick={() => {
                    var ls = new SecureLS({ encodingType: "aes" });
                    ls.set("7e2bad80-f8a4-4180-9682-1198cbc35725", { data: false });
                    setIsLoggedIn(false);
                  }}
                >
                  <i className="fa fa-sign-out fa-lg"></i> Logout
                </span>
              </li>
            </ul>
          </li>
        </ul>
      </header>
      <div className="app-sidebar__overlay" data-toggle="sidebar"></div>
      <aside className="app-sidebar">
        <div className="app-sidebar__user">
          <img
            className="app-sidebar__user-avatar"
            src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
            alt="User Image"
            style={{
              height: "50px",
            }}
          />
          <div>
            <p className="app-sidebar__user-name">Sahoochinmay</p>
            <p className="app-sidebar__user-designation">Admin</p>
          </div>
        </div>
        <ul className="app-menu">
          {sideBar?.map((s) => {
            return (
              <li className={`cp ${s?.submenu !== null && open?.state && open?.type === s?.name ? "treeview is-expanded" : null}`}>
                <span
                  className={`app-menu__item ${activeTab === s?.name ? "active" : null}`}
                  onClick={() => {
                    if (s?.submenu !== null) {
                      if (open?.state && open?.type === s?.name) {
                        setOpen({
                          state: false,
                          type: null,
                        });
                      } else {
                        setOpen({
                          state: true,
                          type: s?.name,
                        });
                      }
                    } else {
                      setOpen({
                        state: false,
                        type: null,
                      });
                      navigate(s?.path);
                    }
                  }}
                >
                  <i className={`app-menu__icon ${s?.icon}`}></i>
                  <span className="app-menu__label">{s?.name}</span>
                  {s?.submenu !== null ? <i className="treeview-indicator fa fa-angle-right"></i> : null}
                </span>
                {s?.submenu !== null ? (
                  <ul className="treeview-menu ">
                    {s?.submenu?.map((sm) => {
                      return (
                        <li
                          onClick={() => {
                            navigate(sm?.path);
                          }}
                        >
                          <span className={`treeview-item ${window.location.pathname === sm?.path ? "active" : null}`}>
                            <i className={`icon ${sm?.icon}`} style={{ marginRight: "10px" }}></i>
                            {sm?.name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </aside>
      <main className="app-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Index;
