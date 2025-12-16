import { useState } from 'react';
import ButtonGrid from '@/app/components/ButtonGrid';

'use client';


export default function Mining() {
	const [miningLevel, setMiningLevel] = useState(1);
	const [ore, setOre] = useState(0);

	const handleMine = () => {
		setOre(ore + miningLevel);
	};

	const handleLevelUp = () => {
		setMiningLevel(miningLevel + 1);
	};

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6">Mining</h1>
			
			<div className="mb-8">
				<p className="text-lg mb-2">Ore: {ore}</p>
				<p className="text-lg mb-4">Level: {miningLevel}</p>
			</div>

			<ButtonGrid
				buttons={[
					{ label: 'Mine', onClick: handleMine, variant: 'primary' },
					{ label: 'Level Up', onClick: handleLevelUp, variant: 'secondary' },
				]}
			/>
		</div>
	);
}