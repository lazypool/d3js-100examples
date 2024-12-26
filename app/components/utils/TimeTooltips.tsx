"use client";

import * as d3 from "d3";
import { useState, useEffect } from "react";

export default function TimeTooltips({
  data,
  xAxis,
  yAxis,
  size,
  margin,
  svgRef,
}: {
  data: Array<{ id: number; date: string; value: number }>;
  xAxis: d3.ScaleTime<number, number>;
  yAxis: d3.ScaleLinear<number, number>;
  size: { width: number; height: number };
  margin: { top: number; right: number; bottom: number; left: number };
  svgRef: React.RefObject<SVGSVGElement>;
}) {
  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const verticalLine = svg
      .append("line")
      .attr("class", "vertical-line")
      .attr("y1", margin.top)
      .attr("y2", margin.top + size.height)
      .style("opacity", 0);

    const horizontalLine = svg
      .append("line")
      .attr("class", "horizontal-line")
      .attr("x1", margin.left)
      .attr("x2", margin.left + size.width)
      .style("opacity", 0);

    const tooltipDate = svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", margin.right)
      .style("opacity", 0);

    const tooltipValue = svg
      .append("text")
      .attr("x", margin.left)
      .attr("y", margin.right)
      .style("opacity", 0);

    svg
      .on("mousemove", (event) => {
        const [mouseX, mouseY] = d3.pointer(event);
        const date = xAxis.invert(mouseX - margin.left);
        const dateString = date.toISOString().split("T")[0];
        const d = data.find((d) => d.date === dateString);

        if (d) {
          const x = margin.left + xAxis(new Date(d.date));
          const y = yAxis(d.value) + margin.top;

          verticalLine
            .attr("x1", x)
            .attr("x2", x)
            .style("opacity", 1)
            .attr("stroke", "black")
            .attr("stroke-width", 1.5)
            .raise();

          horizontalLine
            .attr("y1", y)
            .attr("y2", y)
            .style("opacity", 1)
            .attr("stroke", "black")
            .attr("stroke-width", 1.5)
            .raise();

          tooltipDate
            .attr("x", mouseX + 10)
            .attr("y", mouseY + 10)
            .style("opacity", 1)
            .text(`Date: ${d.date}`)
            .raise();

          tooltipValue
            .attr("x", mouseX + 10)
            .attr("y", mouseY + 30)
            .style("opacity", 1)
            .text(`Value: ${d.value.toFixed(2)}`)
            .raise();
        }
      })
      .on("mouseleave", () => {
        verticalLine.style("opacity", 0).raise();
        horizontalLine.style("opacity", 0).raise();
        tooltipDate.style("opacity", 0).raise();
        tooltipValue.style("opacity", 0).raise();
      });

    return () => {
      verticalLine.remove();
      horizontalLine.remove();
      tooltipDate.remove();
      tooltipValue.remove();
    };
  }, [data, xAxis, yAxis, svgRef, margin, size]);

  return <div className="tooltip"></div>;
}
