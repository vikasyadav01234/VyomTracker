import React, { useState } from "react";
import { Rocket, Clock, Target, ExternalLink } from "lucide-react";

interface MissionProps {
  mission: {
    id: string;
    name: string;
    launchDate: string;
    launchType: string;
    status: string;
    summary: string;
    image: string;
    link: string;
  };
}

const MissionCard: React.FC<MissionProps> = ({ mission }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Determine status color
  const getStatusColor = () => {
    switch(mission.status.toLowerCase()) {
      case 'success': return 'text-emerald-400';
      case 'in progress': return 'text-amber-400';
      case 'planned': return 'text-indigo-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <>
      {/* Sophisticated Space-Themed Card */}
      <div
        className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-zinc-800 to-neutral-900 text-white shadow-2xl rounded-2xl transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-neutral-700"
        onClick={openModal}
      >
        {/* Top Section: Image */}
        <div
          className="h-48 w-full bg-cover bg-center relative group"
          style={{ 
            backgroundImage: `url(${mission.image || "/space-backdrop.jpg"})`,
            backgroundBlendMode: 'multiply',
            backgroundColor: 'rgba(20,20,20,0.7)'
          }}
        >
          <div className="absolute bottom-2 left-2 bg-black/40 px-3 py-1 rounded-full">
            <span className={`text-sm font-semibold ${getStatusColor()} uppercase tracking-wider`}>
              {mission.status}
            </span>
          </div>
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
        </div>

        {/* Middle Section: Mission Name and Date */}
        <div className="p-5 space-y-2">
          <h2 className="text-xl font-bold text-neutral-100 truncate flex items-center">
            <Rocket className="mr-3 text-amber-500" size={24} />
            {mission.name}
          </h2>
          <p className="text-sm text-neutral-400 flex items-center">
            <Clock className="mr-3 text-emerald-500" size={18} />
            {mission.launchDate} | {mission.launchType}
          </p>
        </div>
      </div>

      {/* Modal for Full-Screen View */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="relative bg-gradient-to-br from-neutral-900 via-zinc-800 to-neutral-900 text-white rounded-3xl shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 p-8 border-2 border-neutral-700">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-neutral-400 hover:text-white transition-colors"
              onClick={closeModal}
            >
              ✕
            </button>

            {/* Full Mission Details */}
            <div className="flex flex-col items-center">
              {/* Image */}
              <div
                className="h-56 w-full bg-cover bg-center rounded-2xl mb-6 relative group"
                style={{ 
                  backgroundImage: `url(${mission.image || "/space-backdrop.jpg"})`,
                  backgroundBlendMode: 'multiply',
                  backgroundColor: 'rgba(20,20,20,0.7)'
                }}
              >
                <div className="absolute bottom-2 left-2 bg-black/40 px-3 py-1 rounded-full">
                  <span className={`text-sm font-semibold ${getStatusColor()} uppercase tracking-wider`}>
                    {mission.status}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </div>

              {/* Mission Name */}
              <h2 className="text-3xl font-bold mb-4 text-neutral-100 flex items-center">
                <Rocket className="mr-4 text-amber-500" size={36} />
                {mission.name}
              </h2>

              {/* Mission Details */}
              <div className="space-y-3 text-center">
                <p className="text-sm text-neutral-300 flex justify-center items-center">
                  <Target className="mr-3 text-emerald-500" size={20} />
                  <span className="font-semibold mr-2">Launch Date:</span> {mission.launchDate}
                </p>
                <p className="text-sm text-neutral-300 flex justify-center items-center">
                  <Rocket className="mr-3 text-indigo-500" size={20} />
                  <span className="font-semibold mr-2">Launch Type:</span> {mission.launchType}
                </p>
                <p className="text-sm text-neutral-300 mt-4 text-center">
                  <span className="font-bold block mb-2 text-neutral-200">Mission Details:</span> 
                  {mission.summary}
                </p>
              </div>

              {/* External Link */}
              <a
                href={mission.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center text-amber-400 hover:text-amber-300 transition-colors"
              >
                <ExternalLink className="mr-2" size={16} />
                View Official Mission Details
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MissionCard;