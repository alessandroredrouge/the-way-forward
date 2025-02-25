import React, { useState } from "react";
import PageLayout from "@/components/shared/PageLayout";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
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
  Heart,
  Car,
  Scale,
  Globe,
  TrendingUp,
  Users,
  AlertTriangle,
} from "lucide-react";

// Mock data - In production, this would come from your API
const CHALLENGES = [
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
    id: "ai-safety",
    name: "AI Safety",
    icon: Brain,
    color: "#6366f1",
    description: "Monitoring AI development risks and safety measures",
    kpis: [
      { label: "AI Safety Incidents", value: "245", trend: "increasing" },
      { label: "Safety Protocols Adopted", value: "67%", trend: "increasing" },
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
    id: "healthcare",
    name: "Healthcare Distribution",
    icon: Heart,
    color: "#ec4899",
    description: "Analyzing global healthcare access and distribution",
    kpis: [
      { label: "Global Healthcare Access", value: "64%", trend: "increasing" },
      { label: "Medical Resource Gap", value: "31%", trend: "decreasing" },
      { label: "Healthcare Workers Ratio", value: "2.8/1000", trend: "stable" },
      { label: "Vaccination Coverage", value: "76%", trend: "increasing" },
    ],
    timeSeriesData: [
      { year: 2019, value: 58 },
      { year: 2020, value: 60 },
      { year: 2021, value: 62 },
      { year: 2022, value: 63 },
      { year: 2023, value: 64 },
    ],
  },
  {
    id: "transportation",
    name: "Transportation",
    icon: Car,
    color: "#f59e0b",
    description:
      "Tracking sustainable transportation adoption and infrastructure",
    kpis: [
      { label: "EV Adoption Rate", value: "14%", trend: "increasing" },
      { label: "Public Transit Usage", value: "27%", trend: "stable" },
      { label: "Carbon Emissions", value: "-8%", trend: "decreasing" },
      { label: "Infrastructure Score", value: "6.4/10", trend: "increasing" },
    ],
    timeSeriesData: [
      { year: 2019, value: 8 },
      { year: 2020, value: 9 },
      { year: 2021, value: 11 },
      { year: 2022, value: 12 },
      { year: 2023, value: 14 },
    ],
  },
  {
    id: "equality",
    name: "Equality",
    icon: Scale,
    color: "#8b5cf6",
    description: "Measuring global equality metrics and progress",
    kpis: [
      { label: "Gender Pay Gap", value: "17%", trend: "decreasing" },
      { label: "Education Access", value: "72%", trend: "increasing" },
      { label: "Income Inequality", value: "0.68", trend: "stable" },
      { label: "Opportunity Index", value: "6.2/10", trend: "increasing" },
    ],
    timeSeriesData: [
      { year: 2019, value: 21 },
      { year: 2020, value: 20 },
      { year: 2021, value: 19 },
      { year: 2022, value: 18 },
      { year: 2023, value: 17 },
    ],
  },
];

const Challenges = () => {
  const [selectedChallenge, setSelectedChallenge] = useState(CHALLENGES[0]);

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

        {/* Challenge Selection Menu */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {CHALLENGES.map((challenge) => (
            <button
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                selectedChallenge.id === challenge.id
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
              } shadow-md`}
            >
              <challenge.icon className="w-5 h-5" />
              <span className="font-medium">{challenge.name}</span>
            </button>
          ))}
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

          {/* Additional Metrics or Maps could be added here */}
        </div>
      </div>
    </PageLayout>
  );
};

export default Challenges;
