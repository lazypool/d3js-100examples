"use client";

import { useState } from "react";
import FIFAWorldCupData from "./fifa_worldcup.json";

export default function FifaWorldCupPage() {
	const [selectedNode, setSelectedNode] = useState(FIFAWorldCupData[0])

	return (
	<div className="subpage">
			<h1>FIFA World Cup Statics</h1>
			<div className="flex-row-container">
				<div className="chart-container"></div>
				<div className="infocard-container">
					<h3>{ selectedNode.edtion }</h3>
					<table><tbody>
					  <tr><td>Winner</td><td>{ selectedNode.winner }</td></tr>
					  <tr><td>Goals</td><td>{ selectedNode.goals }</td></tr>
					  <tr><td>Matches</td><td>{ selectedNode.matches }</td></tr>
					</tbody></table> 
				</div>
			</div>
		</div>
	)
}
