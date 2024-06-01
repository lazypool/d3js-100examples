"use client";

import RouteBeampsData from "./RouteBeampsData.json";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "./global.css";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <h1 className="title">
          <Link href="/">D3.js 数据可视化的 100 个案例</Link>
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
                  <Link href={data.route}>{data.caption}</Link>
                </li>
              ))}
            </SimpleBar>

            <div className="avatar-container">
              <a
                href="https://github.com/lazypool"
                style={{ display: "block" }}
              >
                <Image
                  className="avatar"
                  src="/img/avatar.jpg"
                  width={100}
                  height={100}
                  alt="avatar"
                ></Image>
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
