"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function VerticalBarChart({
  size = { width: 600, height: 500 },
  margin = { top: 0, right: 0, bottom: 20, left: 20 },
  data = [
    { id: 0, tag: "A", value: 25, text: "25kg" },
    { id: 1, tag: "B", value: 10, text: "10kg" },
    { id: 2, tag: "C", value: 15, text: "15kg" },
  ],
  padding = 0.5,
  showText = false,
  fontsize = 10,
}: {
  size: { width: number; height: number };
  margin: { top: number; right: number; bottom: number; left: number };
  data: Array<{ id: number; tag: string; value: number; text: string }>;
  padding: number;
  showText: boolean;
  fontsize: number;
}) {
  const svgRef = useRef(null);
  const width = size.width + margin.left + margin.right;
  const height = size.height + margin.bottom + margin.top;

  const xAxis = d3
    .scaleBand()
    .range([0, size.width])
    .padding(padding)
    .domain(data.map((d) => d.tag));

  const yAxis = d3
    .scaleLinear()
    .range([size.height, 0])
    .domain([0, d3.max(data, (d) => d.value) || 0]);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (d) => xAxis(d.tag) || -1)
      .attr("y", (d) => yAxis(d.value))
      .attr("width", xAxis.bandwidth())
      .attr("height", (d) => size.height - yAxis(d.value));

    if (showText) {
      const xOffset = xAxis.bandwidth() / 2 + fontsize / 2;
      const yOffset = fontsize * 1.5;
      svg
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("x", (d) => (xAxis(d.tag) || 0) + xOffset)
        .attr("y", (d) => yAxis(d.value) + yOffset)
        .attr("font-size", fontsize)
        .text((d) => d.text);
    }

    svg
      .append("g")
      .attr("transform", `translate(${0},${size.height})`)
      .call(d3.axisBottom(xAxis));
    svg.append("g").call(d3.axisLeft(yAxis));
  }, [data]);

  return <svg ref={svgRef}></svg>;
}
