"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function HorizontalBarChart({
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
  showAxis = true,
  onBarClick,
}: {
  size: { width: number; height: number };
  margin: { top: number; right: number; bottom: number; left: number };
  data: Array<{ id: number; tag: string; value: number; text: string }>;
  padding: number;
  showText: boolean;
  fontsize: number;
  showAxis: boolean;
  onBarClick?: (
    event: MouseEvent,
    data: { id: number; tag: string; value: number },
  ) => void;
}) {
  const svgRef = useRef(null);
  const width = size.width + margin.left + margin.right;
  const height = size.height + margin.bottom + margin.top;

  const xAxis = d3
    .scaleLinear()
    .range([0, size.width])
    .domain([0, d3.max(data, (d) => d.value) || 0]);

  const yAxis = d3
    .scaleBand()
    .range([size.height, 0])
    .padding(padding)
    .domain(data.map((d) => d.tag));

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
      .attr("x", xAxis(0))
      .attr("y", (d) => yAxis(d.tag) || 0)
      .attr("width", (d) => xAxis(d.value))
      .attr("height", yAxis.bandwidth)
      .on("click", (e, d) => {
        if (onBarClick) {
          onBarClick(e, d);
        }
      });

    if (showText) {
      const yOffset = yAxis.bandwidth() / 2 + fontsize / 2;
      svg
        .selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .attr("text-anchor", "end")
        .attr("x", (d) => xAxis(d.value) - fontsize)
        .attr("y", (d) => (yAxis(d.tag) || 0) + yOffset)
        .attr("font-size", fontsize)
        .text((d) => d.text);
    }

    svg
      .append("g")
      .attr("transform", `translate(${0},${size.height})`)
      .call(d3.axisBottom(xAxis));
    svg.append("g").call(d3.axisLeft(yAxis));

    if (!showAxis) {
      svg.selectAll("line").attr("stroke", "none");
      svg.selectAll("path").attr("stroke", "none");
    }
  }, [data]);

  return <svg ref={svgRef}></svg>;
}
