"use client";

import HorizontalBarChart from "@/app/components/charts/HorizontalBar";
import BuildingsData from "./buildings.json";
import { useState } from "react";
import "./subpage.css";
import Image from "next/image";

export default function TallestBuildingPage() {
  BuildingsData.sort((a, b) => a.height_px - b.height_px);
  const data = BuildingsData.map((d, key) => ({
    id: key,
    tag: d.building,
    value: d.height_px,
    text: `${d.height_m}m`,
  }));
  const [selected, setSelected] = useState(BuildingsData[0]);

  const SelectBar = (_: MouseEvent, data: { id: number }) =>
    setSelected(BuildingsData[data.id]);

  return (
    <div className="subpage">
      <h1>The World&apos;s Top10 Tallest Buildings</h1>
      <div className="flex-row-container">
        <div className="chart-container">
          <HorizontalBarChart
            size={{ width: 500, height: 500 }}
            margin={{ top: 0, right: 0, bottom: 0, left: 180 }}
            data={data}
            padding={0.5}
            showText={true}
            fontsize={16}
            showAxis={false}
            onBarClick={SelectBar}
          />
        </div>
        <div className="img-container">
          <Image
            src={selected.image}
            width={300}
            height={500}
            alt={selected.building}
          ></Image>
        </div>
        <div className="info-container">
          <h1>{selected.building}</h1>
          <ul>
            <li>Height: {selected.height_m}m</li>
            <li>City: {selected.city}</li>
            <li>Country: {selected.country}</li>
            <li>Floors: {selected.floors}</li>
            <li>Completed: {selected.completed}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
