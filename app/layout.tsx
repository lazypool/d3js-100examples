import "./global.css";
import RouteBeampsData from "./RouteBeampsData";

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
            <ul>
              {RouteBeampsData.map((data, key) => (
                <li key={key}>
                  <a href={data.route}>{data.caption}</a>
                </li>
              ))}
            </ul>

            <div className="avatar-container">
              <img className="avatar" src="/img/avatar.jpg" />
            </div>
          </nav>

          <main className="content-main">{children}</main>
        </div>
      </body>
    </html>
  );
}
