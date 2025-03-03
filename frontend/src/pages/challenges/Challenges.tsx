import React, { useState } from "react";
import PageLayout from "@/components/shared/PageLayout";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  Thermometer,
  Brain,
  MoreHorizontal,
  TrendingUp,
  ChevronDown,
  X,
} from "lucide-react";

// Updated challenges data with fewer options
export const CHALLENGES = [
  {
    id: "climate",
    name: "Climate Change",
    icon: Thermometer,
    color: "#22c55e",
    description: "Tracking global climate metrics and environmental impact",
    kpis: [
      { label: "Global Temperature Rise", value: "1.1°C", trend: "increasing" },
      { label: "CO2 Levels", value: "417 ppm", trend: "increasing" },
      { label: "Sea Level Rise", value: "3.4 mm/year", trend: "increasing" },
      { label: "Arctic Ice Loss", value: "13.1%", trend: "decreasing" },
    ],
    timeSeriesData: [
      { year: 2019, value: 414.7 },
      { year: 2020, value: 416.5 },
      { year: 2021, value: 417.2 },
      { year: 2022, value: 418.0 },
      { year: 2023, value: 419.3 },
    ],
  },
  {
    id: "ai-ethics",
    name: "AI Ethics",
    icon: Brain,
    color: "#6366f1",
    description: "Monitoring AI development risks and ethical considerations",
    kpis: [
      { label: "AI Ethics Incidents", value: "245", trend: "increasing" },
      { label: "Ethics Protocols Adopted", value: "67%", trend: "increasing" },
      { label: "Risk Assessment Score", value: "7.2/10", trend: "stable" },
      { label: "Compliance Rate", value: "82%", trend: "increasing" },
    ],
    timeSeriesData: [
      { year: 2019, value: 150 },
      { year: 2020, value: 180 },
      { year: 2021, value: 210 },
      { year: 2022, value: 230 },
      { year: 2023, value: 245 },
    ],
  },
  {
    id: "other",
    name: "Other Challenges",
    icon: MoreHorizontal,
    color: "#8b5cf6",
    description: "Exploring additional global challenges and their impact",
    kpis: [
      { label: "Active Initiatives", value: "1,245", trend: "increasing" },
      { label: "Global Participation", value: "47%", trend: "increasing" },
      { label: "Success Rate", value: "62%", trend: "stable" },
      { label: "Resource Allocation", value: "8.4/10", trend: "increasing" },
    ],
    timeSeriesData: [
      { year: 2019, value: 1000 },
      { year: 2020, value: 1050 },
      { year: 2021, value: 1150 },
      { year: 2022, value: 1200 },
      { year: 2023, value: 1245 },
    ],
  },
];

const Challenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(CHALLENGES[0]);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);

  const renderTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "decreasing":
        return (
          <TrendingUp className="w-4 h-4 text-red-500 transform rotate-180" />
        );
      default:
        return (
          <TrendingUp className="w-4 h-4 text-yellow-500 transform rotate-90" />
        );
    }
  };

  return (
    <PageLayout>
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Global Challenges Dashboard
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time insights into humanity's most pressing challenges. Monitor
            progress, identify trends, and understand the impact of global
            initiatives.
          </p>
        </div>

        {/* Challenge Selection Button and Curtain Menu */}
        <div className="relative mb-12">
          <button
            onClick={() => setIsCurtainOpen(!isCurtainOpen)}
            className="mx-auto flex items-center gap-2 px-6 py-3 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-all"
          >
            <selectedChallenge.icon className="w-5 h-5" />
            <span className="font-medium">{selectedChallenge.name}</span>
            <ChevronDown
              className={`w-5 h-5 transition-transform ${
                isCurtainOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Curtain Menu */}
          {isCurtainOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg z-50 transform transition-all">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Select Challenge
                  </h3>
                  <button
                    onClick={() => setIsCurtainOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {CHALLENGES.map((challenge) => (
                    <button
                      key={challenge.id}
                      onClick={() => {
                        setSelectedChallenge(challenge);
                        setIsCurtainOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                        selectedChallenge.id === challenge.id
                          ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-200"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      <challenge.icon className="w-5 h-5" />
                      <span className="font-medium">{challenge.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Dashboard Content */}
        <div className="space-y-8">
          {/* Challenge Description */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-4 mb-4">
              <selectedChallenge.icon
                className="w-8 h-8"
                style={{ color: selectedChallenge.color }}
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedChallenge.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {selectedChallenge.description}
                </p>
              </div>
            </div>
          </div>

          {/* KPI Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {selectedChallenge.kpis.map((kpi, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {kpi.label}
                  </h3>
                  {renderTrendIcon(kpi.trend)}
                </div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {kpi.value}
                </p>
              </div>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trend Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Historical Trend
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={selectedChallenge.timeSeriesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={selectedChallenge.color}
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Impact Areas Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Impact Distribution
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      nameKey="name"
                      data={[
                        { name: "Direct Impact", value: 400 },
                        { name: "Indirect Impact", value: 300 },
                        { name: "Potential Risk", value: 200 },
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      fill={selectedChallenge.color}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {[
                        { color: selectedChallenge.color },
                        { color: `${selectedChallenge.color}cc` },
                        { color: `${selectedChallenge.color}99` },
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value} units`} />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Challenges;
