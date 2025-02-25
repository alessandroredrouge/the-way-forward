import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/shared/PageLayout";
import logoSvg from "@/assets/icons/The Way Forward - Logo Circular.svg";

const Home = () => {
  const featuresGridRef = useRef<HTMLDivElement>(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    // Start the animation after component mounts
    const timer = setTimeout(() => {
      setAnimationStarted(true);
    }, 1000); // Increased initial delay

    return () => clearTimeout(timer);
  }, []);

  const scrollToFeatures = () => {
    featuresGridRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const features = [
    {
      title: "Global Challenges Tracker",
      description:
        "Have an overview of humanity's most pressing challenges through our real-time Global Challenges Tracker",
      icon: "🌍",
      link: "/challenges",
    },
    {
      title: "Ideas' Portal",
      description:
        "Get inspired by innovative, applicable ideas to solve those challenges. Act, today!",
      icon: "💡",
      link: "/ideas",
    },
    {
      title: "Knowledge Hub",
      description:
        "Access curated insights, research, and resources to increase your knowledge about global challenges and their solutions",
      icon: "📚",
      link: "/knowledge-hub",
    },
    {
      title: "Community",
      description:
        "Connect with others like you that want to make a difference, and work together on meaningful projects",
      icon: "👥",
      link: "/community",
    },
  ];

  return (
    <PageLayout>
      <div className="w-full max-w-full">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-up">
          <div className="mb-8">
            <img
              src={logoSvg}
              alt="The Way Forward Logo"
              className="w-20 md:w-32 lg:w-48 mx-auto h-auto"
            />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            The Way Forward
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            The source of truth for everything that matters - bridging today's
            challenges with tomorrow's solutions for humanity's prosperity.
          </p>

          {/* Sequential Text Animation with Arrow */}
          <div className="flex justify-center mb-8">
            <button
              onClick={scrollToFeatures}
              className="relative w-full max-w-md h-32 cursor-pointer group"
              aria-label="Learn how to make a difference"
            >
              {/* Text that appears sequentially */}
              <div className="flex justify-center mb-6 h-8 overflow-hidden">
                <div className="flex space-x-2">
                  <span
                    className={`text-2xl font-bold text-[#ffbd59] transition-opacity duration-500 ${
                      animationStarted ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "1000ms" }}
                  >
                    Learn
                  </span>
                  <span
                    className={`text-2xl font-bold text-[#ffbd59] transition-opacity duration-500 ${
                      animationStarted ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "1600ms" }}
                  >
                    how
                  </span>
                  <span
                    className={`text-2xl font-bold text-[#ffbd59] transition-opacity duration-500 ${
                      animationStarted ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "2200ms" }}
                  >
                    YOU
                  </span>
                  <span
                    className={`text-2xl font-bold text-[#ffbd59] transition-opacity duration-500 ${
                      animationStarted ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "2800ms" }}
                  >
                    can
                  </span>
                  <span
                    className={`text-2xl font-bold text-[#ffbd59] transition-opacity duration-500 ${
                      animationStarted ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "3400ms" }}
                  >
                    make
                  </span>
                  <span
                    className={`text-2xl font-bold text-[#ffbd59] transition-opacity duration-500 ${
                      animationStarted ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "4000ms" }}
                  >
                    a
                  </span>
                  <span
                    className={`text-2xl font-bold text-[#ffbd59] transition-opacity duration-500 ${
                      animationStarted ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ transitionDelay: "4600ms" }}
                  >
                    difference
                  </span>
                </div>
              </div>

              {/* Single arrow that appears after the last word */}
              <div className="flex justify-center">
                <div
                  className={`transition-all duration-700 ${
                    animationStarted ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: "5200ms" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffbd59"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-bounce group-hover:stroke-[#e6aa50] transition-colors"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div
          ref={featuresGridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 sm:p-8 hover:shadow-lg transition-shadow"
            >
              <div className="text-3xl sm:text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </Link>
          ))}
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join our community of changemakers and help shape humanity's path to
            prosperity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth/signup"
              className="inline-block px-6 sm:px-8 py-3 bg-[#ffbd59] text-white rounded-md hover:bg-[#e6aa50] transition-colors"
            >
              Join the Community
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
