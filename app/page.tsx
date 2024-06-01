import Image from "next/image";
import RouteBeampsData from "./RouteBeampsData.json";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="beamp-container-wrapper">
      {RouteBeampsData.map((data, key) => (
        <div key={key} className="beamp-container">
          <Link href={data.route}>
            <Image
              className="beamp"
              src={data.beampsrc}
              width={400}
              height={400}
              alt={data.caption}
            ></Image>
            <div>
              <p className="beamp-caption">{data.caption}</p>
              <p className="beamp-description">{data.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
