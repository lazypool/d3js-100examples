"use client";

import FIFAWorldCupData from "./fifa_worldcup.json";

export default function FifaWorldCupPage() {
	return (
	<div className="subpage">
			<h1>FIFA World Cup Statics</h1>
			<div className="flex-row-container">
				<div className="chart-container"></div>
				<div className="infocard-container"></div>
			</div>
		</div>
	)
}
