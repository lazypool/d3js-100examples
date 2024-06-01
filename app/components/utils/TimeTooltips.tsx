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
  const [content, setContent] = useState("");
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (visible) {
      setStyle({
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        background: "white",
        border: "1px solid #ccc",
        padding: "10px",
        pointerEvents: "none",
        opacity: 1,
      });
    } else {
      setStyle({ opacity: 0 });
    }
  }, [visible, position]);

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

    svg
      .on("mousemove", (event) => {
        const [mouseX, mouseY] = d3.pointer(event);
        const date = xAxis.invert(mouseX - margin.left);
        const dateString = date.toISOString().split("T")[0];
        const d = data.find((d) => d.date === dateString);

        if (d) {
          setContent(`Date: ${d.date}<br/>Value: ${d.value.toFixed(2)}`);
          setPosition({ x: mouseX + margin.left, y: mouseY + margin.top });
          setVisible(true);

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
        }
      })
      .on("mouseleave", () => {
        setVisible(false);
        verticalLine.style("opacity", 0).raise();
        horizontalLine.style("opacity", 0).raise();
      });

    return () => {
      verticalLine.remove();
      horizontalLine.remove();
    };
  }, [data, xAxis, yAxis, svgRef]);

  return (
    <div
      style={style}
      className="tooltip"
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
}
