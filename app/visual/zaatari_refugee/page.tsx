"use client";

import TimeAreaChart from "@/app/components/charts/TimeAreaChart";
import VerticalBarChart from "@/app/components/charts/VerticalBar";
import PopulationData from "./zaatari_population.json";
import ShelterTypeData from "./zaatari_sheltertype.json";
import { useState } from "react";
import "./subpage.css";

export default function ZaatariRefugeePage() {
  const population = PopulationData.map((d, key) => ({
    id: key,
    date: d.date,
    value: d.population,
  }));
  const shelterTypes = ShelterTypeData.map((d, key) => ({
    id: key,
    tag: d.type,
    value: d.percentage,
  }));

  return (
    <div className="subpage">
      <h1>Zaatari Refugee Population and Shelter Types</h1>
      <div className="flex-row-container">
        <div className="area-chart-container">
          <TimeAreaChart
            size={{ width: 800, height: 400 }}
            margin={{ top: 10, right: 10, bottom: 40, left: 50 }}
            data={population}
            timeformat="%Y %m"
            fillcolor="darkred"
          />
        </div>
        <div className="bar-chart-container">
          <VerticalBarChart
            size={{ width: 300, height: 400 }}
            margin={{ top: 10, right: 10, bottom: 40, left: 50 }}
            data={shelterTypes}
            padding={0.3}
          />
        </div>
      </div>
    </div>
  );
}
