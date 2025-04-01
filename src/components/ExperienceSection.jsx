import React from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useResume } from '../context/ResumeContext';

const ExperienceSection = () => {
	const { state, dispatch } = useResume();

	const handleAddExperience = () => {
		dispatch({
			type: 'ADD_EXPERIENCE',
			payload: {
				company: '',
				position: '',
				location: '',
				startDate: '',
				endDate: '',
				responsibilities: ['']
			}
		});
	};

	const handleRemoveExperience = (index) => {
		dispatch({
			type: 'REMOVE_EXPERIENCE',
			payload: index
		});
	};

	const handleInputChange = (index, field, value) => {
		dispatch({
			type: 'UPDATE_EXPERIENCE',
			payload: { index, field, value }
		});
	};

	const handleAddResponsibility = (expIndex) => {
		dispatch({
			type: 'ADD_RESPONSIBILITY',
			payload: { expIndex }
		});
	};

	const handleUpdateResponsibility = (expIndex, respIndex, value) => {
		dispatch({
			type: 'UPDATE_RESPONSIBILITY',
			payload: { expIndex, respIndex, value }
		});
	};

	const handleRemoveResponsibility = (expIndex, respIndex) => {
		dispatch({
			type: 'REMOVE_RESPONSIBILITY',
			payload: { expIndex, respIndex }
		});
	};

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold text-gray-800">Experience</h2>
				<button
					onClick={handleAddExperience}
					className="flex items-center space-x-2 px-4 py-2 bg-[#544cd7] text-white rounded-lg hover:bg-[#4038ac] transition-colors"
				>
					<Plus size={20} />
					<span>Add Experience</span>
				</button>
			</div>

			{state.experience.map((exp, expIndex) => (
				<div key={expIndex} className="bg-gray-50 p-6 rounded-lg space-y-4">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						<input
							type="text"
							placeholder="Company"
							value={exp.company}
							onChange={(e) => handleInputChange(expIndex, 'company', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
						/>
						<input
							type="text"
							placeholder="Position"
							value={exp.position}
							onChange={(e) => handleInputChange(expIndex, 'position', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
						/>
						<input
							type="text"
							placeholder="Location"
							value={exp.location}
							onChange={(e) => handleInputChange(expIndex, 'location', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
						/>
						<input
							type="text"
							placeholder="Start Date"
							value={exp.startDate}
							onChange={(e) => handleInputChange(expIndex, 'startDate', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
						/>
						<input
							type="text"
							placeholder="End Date"
							value={exp.endDate}
							onChange={(e) => handleInputChange(expIndex, 'endDate', e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
						/>
					</div>

					<div className="space-y-4">
						<div className="flex justify-between items-center">
							<h3 className="text-lg font-medium text-gray-700">Responsibilities</h3>
							<button
								onClick={() => handleAddResponsibility(expIndex)}
								className="flex items-center space-x-2 px-3 py-1 text-[#544cd7] hover:bg-[#544cd7]/10 rounded-lg transition-colors"
							>
								<Plus size={16} />
								<span>Add Responsibility</span>
							</button>
						</div>

						{exp.responsibilities.map((resp, respIndex) => (
							<div key={respIndex} className="flex items-start space-x-2">
								<input
									type="text"
									value={resp}
									onChange={(e) => handleUpdateResponsibility(expIndex, respIndex, e.target.value)}
									placeholder="Describe your responsibility..."
									className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#544cd7] focus:border-transparent"
								/>
								<button
									onClick={() => handleRemoveResponsibility(expIndex, respIndex)}
									className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
								>
									<Trash2 size={20} />
								</button>
							</div>
						))}
					</div>
					

					<button
						onClick={() => handleRemoveExperience(expIndex)}
						className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
					>
						<Trash2 size={20} />
						<span>Remove Experience</span>
					</button>
				</div>
			))}
		</div>
	);
};

export default ExperienceSection;