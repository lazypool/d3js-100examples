"use client"

import { useState } from "react";

export default function FieldSelector({
	options = [ "opt1", "opt2", "opt3" ],
	handlerCallBack = () => {},
}: {
	options: string[],
	handlerCallBack: Function,
}) {
	const [selectedOption, setSelectedOption] = useState(options[0]);

	const onChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(e.target.value);
		handlerCallBack(e.target.value);
	}

	return (
		<div className="field-selector">
			<select value={selectedOption} onChange={onChangeHandler}>
				{options.map((option, key) => (
					<option key={key} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}
