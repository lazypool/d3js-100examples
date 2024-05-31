"use client";

import * as d3 from "d3";
import { useEffect, useRef } from "react";
import TimeTooltips from "../utils/TimeTooltips";

export default function TimeAreaChart({
  size = { width: 600, height: 500 },
  margin = { top: 0, right: 0, bottom: 20, left: 20 },
  data = [
    { id: 0, date: "2013-01-14", value: 56666.0 },
    { id: 1, date: "2013-01-15", value: 57250.0 },
    { id: 2, date: "2013-01-16", value: 58576.0 },
  ],
  timeformat = "%Y-%m-%d",
  fillcolor = "gray",
  showTooltips = false,
}: {
  size: { width: number; height: number };
  margin: { top: number; right: number; bottom: number; left: number };
  data: Array<{ id: number; date: string; value: number }>;
  timeformat: string;
  fillcolor: string;
  showTooltips: boolean;
}) {
  const svgRef = useRef(null);
  const width = size.width + margin.left + margin.right;
  const height = size.height + margin.bottom + margin.top;

  const timeFormat = d3.timeFormat(timeformat);
  const [minDate, maxDate] = d3.extent(data, (d) => new Date(d.date));
  const xAxis = d3
    .scaleTime()
    .range([0, size.width])
    .domain([minDate || Date.now(), maxDate || Date.now()]);

  const yAxis = d3
    .scaleLinear()
    .range([size.height, 0])
    .domain([0, d3.max(data, (d) => d.value) || 0]);

  const area = d3
    .area<{ id: number; date: string; value: number }>()
    .x((d) => xAxis(new Date(d.date)))
    .y0(yAxis(0))
    .y1((d) => yAxis(d.value));

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    svg.append("path").attr("d", area(data)).attr("fill", fillcolor);

    svg
      .append("g")
      .attr("transform", `translate(0, ${size.height})`)
      .call(d3.axisBottom(xAxis).tickFormat((d) => timeFormat(d as Date)))
      .selectAll(".tick text")
      .style("text-anchor", "end")
      .attr("transform", "rotate(-45)");
    svg.append("g").call(d3.axisLeft(yAxis));
  }, [data]);

  return (
    <div className="time-area-chart-container">
      <svg ref={svgRef}></svg>
      {showTooltips && (
        <TimeTooltips
          data={data}
          xAxis={xAxis}
          yAxis={yAxis}
          size={size}
          margin={margin}
          svgRef={svgRef}
        />
      )}
    </div>
  );
}
