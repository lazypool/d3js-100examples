"use client";

import * as d3 from "d3";
import { useState, useEffect, useRef } from "react";
import BuildingsData from "./buildings.json";
import "./subpage.css";

export default function TallestBuildingPage() {
  const [data, _] = useState(BuildingsData);
  const [seld, setSeld] = useState(data[0]);
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    data.sort((a, b) => a.height_px - b.height_px);

    const margin = { top: 0, right: 20, bottom: 0, left: 180 };
    const width = 600 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.bottom + margin.top)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const x = d3
      .scaleLinear()
      .range([0, width])
      .domain([0, d3.max(data, (d) => d.height_px) || 0]);

    const y = d3
      .scaleBand()
      .range([height, 0])
      .padding(0.5)
      .domain(data.map((d) => d.building));

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", 0)
      .attr("y", (d) => y(d.building) || -1)
      .attr("width", (d) => x(d.height_px))
      .attr("height", y.bandwidth)
      .on("click", (_, data) => setSeld(data));

    svg
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("x", (d) => x(d.height_px) - 30)
      .attr("y", (d) => y(d.building) || -1)
      .text((d) => `${d.height_m}m`);

    svg.append("g").call(d3.axisLeft(y));
    svg.selectAll("path").attr("stroke", "none");
    svg.selectAll("line").attr("stroke", "none");
  }, [data]);

  return (
    <div className="subpage-wrapper">
      <h1>The World's Top10 Tallest Buildings</h1>
      <div className="subpage">
        <div ref={svgRef} className="bar-chart-container"></div>
        <div className="img-container">
          <img src={seld.image} />
        </div>
        <div className="info-container">
          <h1>{seld.building}</h1>
          <ul>
            <li>Height: {seld.height_m}m</li>
            <li>City: {seld.city}</li>
            <li>Country: {seld.country}</li>
            <li>Floors: {seld.floors}</li>
            <li>Completed: {seld.completed}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
