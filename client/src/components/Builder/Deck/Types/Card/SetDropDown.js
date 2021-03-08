import React, { useRef, useEffect } from 'react';
import SetOption from './SetOption';

const SetDropDown = ({
	typeIndex,
	cardIndex,
	sets,
	setImage,
	setOpenSetDropDown,
	changeCardSet,
}) => {
	const setDropDown = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (setDropDown.current && !setDropDown.current.contains(event.target)) {
				setOpenSetDropDown(false);
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [setDropDown, setOpenSetDropDown]);
	return (
		<div
			ref={setDropDown}
			className={sets.length > 10 ? 'setDropDown overflowY' : 'setDropDown'}
		>
			{sets.map((set, index) => (
				<SetOption
					typeIndex={typeIndex}
					cardIndex={cardIndex}
					set={set}
					key={index}
					index={index}
					setImage={setImage}
					changeCardSet={changeCardSet}
				/>
			))}
		</div>
	);
};

export default SetDropDown;
