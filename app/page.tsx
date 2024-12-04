//todo: integrate ai 
//todo add pagination if time 
//add ai grenerated image

"use client";

import React, { useEffect, useState } from "react";
import MissionCard from "../components/MissionCard";
import { Search, Moon, Sun, Satellite, RocketIcon } from "lucide-react";

interface Mission {
  UUID: string;
  Name: string;
  SerialNumber: string;
  LaunchDate: string;
  LaunchType: string;
  Payload: string;
  Link: string;
  MissionStatus: string;
}

const Home: React.FC = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [darkMode, setDarkMode] = useState<boolean>(true);

  // Fetch data from API
  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch("https://services.isrostats.in/api/launches");
        const data = await response.json();
        setMissions(data); 
      } catch (error) {
        console.error("Error fetching missions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMissions();
  }, []);

  const filteredMissions = missions.filter((mission) =>
    mission.Name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <div className="flex items-center space-x-6">
          <RocketIcon className="animate-pulse text-amber-500" size={56} />
          <span className="text-3xl font-light text-neutral-300">Launching Mission Data...</span>
        </div>
      </div>
    );
  }

  if (missions.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        <div className="text-center">
          <Satellite className="mx-auto mb-6 text-emerald-500 animate-bounce" size={72} />
          <p className="text-3xl font-light text-neutral-300">No missions found. Standby for updates.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode 
          ? "bg-gradient-to-br from-neutral-900 via-zinc-800 to-neutral-900 text-white" 
          : "bg-neutral-100 text-neutral-900"
      } p-6 pt-10`}
    >
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-10 text-center text-neutral-100 flex items-center justify-center">
          <RocketIcon className="mr-6 text-amber-500" size={48} />
          {darkMode ? (<p className="mr-6 text-white" >
          VyomTracker
          </p> ):(
          <p className="mr-6 text-black" >
          VyomTracker
          </p>
          )}
          <Satellite className="ml-6 text-emerald-500" size={48} />
        </h1>

        <div className="mb-10 flex space-x-6">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search ISRO Missions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full p-4 pl-12 border-2 rounded-xl shadow-lg 
                bg-neutral-800 border-neutral-700 text-white 
                focus:outline-none focus:ring-2 focus:ring-amber-500
                placeholder-neutral-500 text-lg"
            />
            <Search className="absolute left-4 top-4 text-neutral-500" size={24} />
          </div>

          <div className="flex items-center">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full bg-neutral-800 border-2 border-neutral-700 
              hover:bg-neutral-700 transition-colors group"
            >
              {darkMode ? (
                <Sun className="text-amber-500 group-hover:rotate-12 transition-transform" size={24} />
              ) : (
                <Moon className="text-neutral-400 group-hover:-rotate-12 transition-transform" size={24} />
              )}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMissions.map((mission) => (
            <MissionCard
              key={mission.UUID}
              mission={{
                id: mission.UUID,
                name: mission.Name,
                launchDate: mission.LaunchDate,
                launchType: mission.LaunchType,
                status: mission.MissionStatus,
                summary: `Payload: ${mission.Payload}`,
                image: "", // Add a placeholder or fetch an image URL dynamically
                link: mission.Link,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;