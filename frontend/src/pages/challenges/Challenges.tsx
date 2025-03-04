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

// Define interfaces for type safety
interface KPI {
  label: string;
  value: string;
  limit: string;
  trend: "increasing" | "decreasing" | "stable";
  explanation?: {
    methodology: string;
    source: string;
    verification: string;
  };
}

interface Challenge {
  id: string;
  name: string;
  icon: React.ElementType;
  color: string;
  description: string;
  kpis: KPI[];
  timeSeriesData: { year: number; value: number }[];
}

// Updated challenges data with explanations
export const CHALLENGES: Challenge[] = [
  {
    id: "climate",
    name: "Climate Change",
    icon: Thermometer,
    color: "#22c55e",
    description: "Tracking global climate metrics and environmental impact",
    kpis: [
      {
        label: "Global Temperature Rise",
        value: "1.2",
        limit: "1.5°C",
        trend: "increasing",
        explanation: {
          methodology:
            "Global temperature rise is measured as the increase in Earth's average surface temperature compared to pre-industrial levels (1850-1900). The current value represents the temperature anomaly for the most recent complete year.",
          source:
            "Data is sourced from NASA's Goddard Institute for Space Studies (GISS) and NOAA's National Centers for Environmental Information (NCEI).",
          verification:
            "This data can be verified through: \n1. NASA GISS Surface Temperature Analysis (GISTEMP) \n2. NOAA Global Temperature Anomaly Dataset \n3. UK Met Office Hadley Centre observations datasets",
        },
      },
      {
        label: "CO2 Levels",
        value: "425",
        limit: "450 ppm",
        trend: "increasing",
        explanation: {
          methodology:
            "Atmospheric CO2 levels are measured in parts per million (ppm) using a global network of monitoring stations. The primary measurement comes from the Mauna Loa Observatory in Hawaii, which provides the longest continuous record of CO2 measurements.",
          source:
            "Data is collected by NOAA's Global Monitoring Laboratory and the Scripps Institution of Oceanography.",
          verification:
            "You can verify this data through: \n1. NOAA's Global Monitoring Laboratory website \n2. The Scripps CO2 Program \n3. The World Data Centre for Greenhouse Gases",
        },
      },
      {
        label: "Sea Level Rise",
        value: "81",
        limit: "200 mm",
        trend: "increasing",
        explanation: {
          methodology:
            "Sea level rise is measured using satellite altimetry and tide gauges worldwide. The value represents the global mean sea level rise in millimeters relative to the 1993-2008 average.",
          source:
            "Data is collected by multiple satellites and agencies including NASA, NOAA, and the European Space Agency.",
          verification:
            "This data can be verified through: \n1. NASA's Sea Level Change Portal \n2. NOAA Tides and Currents \n3. The Copernicus Marine Service",
        },
      },
      {
        label: "Arctic Ice Loss",
        value: "13.1%",
        limit: "0%",
        trend: "decreasing",
        explanation: {
          methodology:
            "Arctic ice loss is calculated as the percentage decrease in minimum sea ice extent compared to the 1981-2010 average. Measurements are taken using satellite observations.",
          source:
            "Data is provided by the National Snow and Ice Data Center (NSIDC) using satellite measurements.",
          verification:
            "You can verify this data through: \n1. National Snow and Ice Data Center \n2. NASA's Arctic Sea Ice News \n3. The Copernicus Climate Change Service",
        },
      },
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
    name: "AI Ethics (Coming Soon)",
    icon: Brain,
    color: "#6366f1",
    description:
      "Coming soon - Track AI development risks and ethical considerations",
    kpis: [
      {
        label: "Coming Soon",
        value: "0",
        limit: "0",
        trend: "stable",
      },
      {
        label: "Coming Soon",
        value: "0",
        limit: "0",
        trend: "stable",
      },
      {
        label: "Coming Soon",
        value: "0",
        limit: "0",
        trend: "stable",
      },
      {
        label: "Coming Soon",
        value: "0",
        limit: "0",
        trend: "stable",
      },
    ],
    timeSeriesData: [{ year: 2023, value: 0 }],
  },
  {
    id: "other",
    name: "Other Challenges (Coming Soon)",
    icon: MoreHorizontal,
    color: "#8b5cf6",
    description:
      "Coming soon - Explore additional global challenges and their impact",
    kpis: [
      {
        label: "Coming Soon",
        value: "0",
        limit: "0",
        trend: "stable",
      },
      {
        label: "Coming Soon",
        value: "0",
        limit: "0",
        trend: "stable",
      },
      {
        label: "Coming Soon",
        value: "0",
        limit: "0",
        trend: "stable",
      },
      {
        label: "Coming Soon",
        value: "0",
        limit: "0",
        trend: "stable",
      },
    ],
    timeSeriesData: [{ year: 2023, value: 0 }],
  },
];

const Challenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(CHALLENGES[0]);
  const [isCurtainOpen, setIsCurtainOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<KPI | null>(null);

  const renderTrendIcon = (trend: string) => {
    switch (trend) {
      case "increasing":
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      case "decreasing":
        return (
          <TrendingUp className="w-4 h-4 text-green-500 transform rotate-180" />
        );
      default:
        return (
          <TrendingUp className="w-4 h-4 text-yellow-500 transform rotate-90" />
        );
    }
  };

  // Calculate progress percentage for KPIs
  const calculateProgress = (kpi: KPI) => {
    // Extract numeric values from strings
    const extractNumber = (str: string) => {
      const match = str.match(/[\d,.]+/);
      return match ? parseFloat(match[0].replace(/,/g, "")) : 0;
    };

    const currentValue = extractNumber(kpi.value);
    const limitValue = extractNumber(kpi.limit);

    // Special case for temperature (climate change context)
    if (kpi.label === "Global Temperature Rise") {
      // For temperature, show the ratio of current to limit value
      return Math.min(Math.round((currentValue / limitValue) * 100), 100);
    }

    // Handle different types of metrics
    if (kpi.trend === "increasing") {
      // For metrics where higher is better (e.g., adoption rates)
      if (currentValue > limitValue) return 100;
      return Math.round((currentValue / limitValue) * 100);
    } else {
      // For metrics where lower is better (e.g., incidents, emissions)
      if (currentValue <= limitValue) return 100;
      // Avoid division by zero
      if (limitValue === 0) {
        // If limit is zero, calculate how far we are from zero as a percentage
        // Use a reasonable maximum value (e.g., twice the current value)
        const maxValue = currentValue * 2;
        return Math.round(((maxValue - currentValue) / maxValue) * 100);
      }
      return Math.round((limitValue / currentValue) * 100);
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
                {selectedChallenge.id === "climate" && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Source:{" "}
                    <a
                      href="https://www.climate.gov/climatedashboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-600 underline"
                    >
                      Climate.gov
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Only show KPIs and Charts for Climate Change */}
          {selectedChallenge.id === "climate" && (
            <>
              {/* KPI Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {selectedChallenge.kpis.map((kpi, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setSelectedKPI(kpi)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {kpi.label}
                      </h3>
                      {renderTrendIcon(kpi.trend)}
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-baseline">
                        <p className="text-3xl font-bold text-gray-900 dark:text-white">
                          {kpi.value}
                        </p>
                        <span className="ml-2 text-lg text-gray-500 dark:text-gray-400 font-medium">
                          / {kpi.limit}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Current vs Manageable Limit
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 relative group">
                        <div
                          className={`h-2 rounded-full ${
                            calculateProgress(kpi) <= 25
                              ? "bg-green-500"
                              : calculateProgress(kpi) <= 60
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${calculateProgress(kpi)}%` }}
                        ></div>
                        <div className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 pointer-events-none">
                          {calculateProgress(kpi)}%{" "}
                          {kpi.trend === "increasing" ? "of limit" : "to limit"}
                        </div>
                      </div>
                      <div className="flex items-center justify-center mt-4">
                        <div className="text-sm text-blue-500 dark:text-blue-400 flex items-center gap-2 animate-pulse">
                          <span>Find out more</span>
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Explanation Modal */}
              {selectedKPI && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {selectedKPI.label}
                      </h3>
                      <button
                        onClick={() => setSelectedKPI(null)}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Current Value
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {selectedKPI.value} / {selectedKPI.limit}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Methodology
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {selectedKPI.explanation?.methodology}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Data Source
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300">
                          {selectedKPI.explanation?.source}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          How to Verify
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line">
                          {selectedKPI.explanation?.verification}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

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
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default Challenges;
