import RouteBeampsData from "./RouteBeampsData.json";

export default function HomePage() {
  return (
    <div className="beamp-container-wrapper">
      {RouteBeampsData.map((data, key) => (
        <div key={key} className="beamp-container">
          <a href={data.route}>
            <img className="beamp" src={data.beampsrc} />
            <div>
              <p className="beamp-caption">{data.caption}</p>
              <p className="beamp-description">{data.description}</p>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
