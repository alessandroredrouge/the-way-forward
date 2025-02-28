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
              className="relative w-full max-w-md h-40 sm:h-32 cursor-pointer group"
              aria-label="Learn how to make a difference"
            >
              {/* Text that appears sequentially - Responsive version */}
              <div className="flex justify-center mb-6">
                <div className="flex flex-wrap justify-center gap-x-2 gap-y-1 px-4">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/auth/signup"
              className="inline-block px-6 sm:px-8 py-3 bg-[#ffbd59] text-white rounded-md hover:bg-[#e6aa50] transition-colors"
            >
              Join the Community
            </Link>
          </div>

          {/* About the Project Section */}
          <div className="max-w-4xl mx-auto mt-20 mb-12 px-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Manifesto
            </h2>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 sm:p-8 mb-6">
              <blockquote className="text-lg italic text-gray-700 dark:text-gray-300 mb-4">
                "In our world today, humanity faces unprecedented challenges
                that demand immediate and impactful solutions. Yet, many of our brightest
                minds, talented, ambitious individuals with extraordinary
                potential find themselves working on incremental improvements to
                products with limited global impact. Or simply, they don't know
                where to start.
                <br />
                <br />
                This profound 'talent misplacement' problem is what's stopping us
                from reaching a future where all humanity can prosper. The Way Forward
                has been therefore created to address this problem, by indicating the way
                to the most impactful challenges while providing the resources
                needed to make a difference.
                <br />
                <br />
                Let's make the world a better place, so that all humans can thrive. 
                Let's pave The Way Forward, together."
              </blockquote>
              <p className="text-right text-gray-800 dark:text-gray-200 font-medium">
                — Alessandro Rossi, Creator of The Way Forward
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex justify-center gap-6 mt-6">
              <a
                href="https://www.linkedin.com/in/alessandro-rossi1/"
                className="text-gray-600 hover:text-[#0077b5] dark:text-gray-400 dark:hover:text-[#0077b5] transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://x.com/aleredrouge"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://github.com/alessandroredrouge"
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                aria-label="GitHub"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Home;
