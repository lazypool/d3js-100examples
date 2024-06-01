"use client";

import RouteBeampsData from "./RouteBeampsData.json";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <h1 className="title">
          <a href="/">数据可视化 100 例</a>
        </h1>

        <div className="dashboard-layout">
          <nav className="sidebar-nav">
            <SimpleBar
              className="sidebar-nav-lst"
              style={{ maxHeight: "70%" }}
              autoHide={false}
            >
              {RouteBeampsData.map((data, key) => (
                <li key={key}>
                  <a href={data.route}>{data.caption}</a>
                </li>
              ))}
            </SimpleBar>

            <div className="avatar-container">
              <a href="https://github.com/lazypool">
                <img className="avatar" src="/img/avatar.jpg" />
              </a>
            </div>
          </nav>

          <SimpleBar
            className="content-main"
            style={{ maxHeight: "100%" }}
            autoHide={false}
          >
            {children}
          </SimpleBar>
        </div>
      </body>
    </html>
  );
}
