# Product Requirements Document (PRD)

The Way Forward

## Introduction

### Purpose

The purpose of this Product Requirements Document (PRD) is to outline the requirements and specifications for _The Way Forward_, a comprehensive web platform designed to be the source of truth for everything that matters - bridging today's challenges with tomorrow's solutions for humanity's prosperity. This document serves as a guide for the development team to deliver an MVP that connects global challenges with innovative solutions while fostering collaboration and engagement among changemakers worldwide.

### Scope

This PRD covers the functional and non-functional requirements of _The Way Forward_, including user interactions, system architecture, technology stack, and integration points. It also defines the assumptions, dependencies, constraints, and risks associated with the project.

### Definitions, Acronyms, and Abbreviations

- MVP: Minimum Viable Product
- LLM: Large Language Model
- API: Application Programming Interface
- UI/UX: User Interface/User Experience
- TAM/SAM/SOM: Total/Serviceable/Segmented Addressable Market
- EV: Electric Vehicle

## Background

### Problem Statement

The world faces numerous complex challenges that require innovative solutions, yet there's no centralized platform that effectively connects these challenges with potential solutions and the people who can implement them. While various resources exist for specific aspects (challenge tracking, startup ideas, knowledge sharing), they operate in silos and don't provide an integrated view of humanity's challenges and their potential solutions. As a result, opportunities for impactful innovation are missed, and potential collaborators fail to connect.

### Project Overview

_The Way Forward_ aims to address this problem by creating an integrated platform that connects global challenges with innovative solutions and the people who can implement them. The platform consists of six main areas:

- **Home**: The landing page that introduces users to the platform's mission and provides quick access to all main sections.
- **Challenges**: A dashboard tracking major global challenges (e.g., Climate Change, AI Safety, Healthcare Distribution) with live KPIs, data visualizations, and maps.
- **Ideas Portal**: A central hub where ideas are collected and users can interact with them. Ideas come from interviews, user submissions, and AI agents that crawl specific web resources (e.g., LinkedIn, Reddit, Hacker News) to identify needs and generate ideas. Each idea follows a structured format with consistent fields (title, category, subcategory, difficulty, market estimates, time horizon, sources, etc.). Users can vote on ideas, post comments, and form interest groups. A premium model offers direct contact features for deeper collaboration.
- **Knowledge Hub**: A comprehensive resource center that includes:
  - Podcast: A curated list of "The Way Forward" podcast episodes, available on Spotify and YouTube.
  - Deep-dives: A collection of in-depth articles exploring specific ideas, published also on Medium and Substack.
  - Resources: A curated collection of useful external resources that help users explore related industries in greater depth.
- **Community**: A space for users to connect, collaborate, and engage with other changemakers.
- **Profile**: Personal user space for managing preferences, saved ideas, and account settings.

### Objectives and Goals

**Primary Objective:** Develop an MVP of _The Way Forward_ that serves as the definitive platform for understanding, tracking, and solving humanity's greatest challenges through collaborative innovation.

Goals include:

- Create a comprehensive dashboard of global challenges with real-time tracking and visualization.
- Enable the discovery, submission, and refinement of innovative solutions to these challenges.
- Foster collaboration between experts, innovators, and implementers across different domains.
- Provide an integrated knowledge hub that connects challenges, solutions, and resources.
- Build a vibrant community of changemakers dedicated to humanity's progress.
- Ensure accessibility while maintaining premium features for deeper engagement.

## User Personas and Use Cases

### User Profiles

- **Aspiring Entrepreneur:** Looks for new markets, problems to solve, or challenges to tackle. Seeks inspiration and potential collaborators.
- **Industry Expert / Investor:** Has deep knowledge in a specific vertical (e.g., Energy, AI, Finance) or invests in early-stage ventures. Wants to spot trends and startup opportunities.
- **Collaborator / Developer:** Interested in partnering or contributing skills to particular ideas. Needs a way to find ideas that match their interests or expertise.

### User Stories

- As an **Aspiring Entrepreneur**, I want to browse popular ideas in the Energy sector so that I can find a potential opportunity to pursue.
- As an **Industry Expert**, I want to expand my understanding of what are the main opportunities right now in my industry.
- As a **Collaborator**, I want to see how many people are interested in a specific idea so that I can join or form a group to work on it.
- As a **Premium Subscriber**, I want to contact the idea creator directly to discuss collaboration details.

## Product Features and Requirements

### Functional Requirements

1. **Ideas Portal page** - Users can submit ideas directly on the platform (with mandatory fields like title, category, difficulty, etc.). - Interviews uploaded (by the "curators", which have access to a different additional view respect to "normal" users) can automatically generate multiple ideas, all linked to the associated podcast/interview. - Automated AI agent to collect startup ideas from public platforms (Reddit, LinkedIn, X, etc.). - Upvote/downvote system for each idea (similar to Reddit). - Comment section under each idea for detailed discussion. - Ability to form an "interest bucket" or group for each idea to facilitate collaboration among interested users. - Various browsing sections: Curated Selection, Users' Choice, Category-based listing, Newest ideas. - Search and filtering by category, subcategory, difficulty, and popularity.
   **Ideas fields**

**Mandatory Fields**

- **Title** _(String)_: The main name or headline of the idea.
- **Humanity's Challenge** _(String)_: The Humanity's Challenge that this idea addresses (e.g., Climate Change, AI Safety).
- **Category** _(String)_: The top-level category (e.g., Energy, Supply Chain, LLMs).
- **Sub-category** _(String)_: A more specific classification under the main category (e.g., Energy Storage, Logistics, AI Alignment).
- **Geographic Focus** _(String)_: The location or region targeted by the idea.
- **Time Horizon** _(String)_: Estimate of the amount of time needed to have the idea realized (<1 year, 1-5 years, 5-10 years, >10 years).
- **Date of Creation** _(Date)_: The day the idea was first submitted.
- **Date of Last Update** _(Date)_: The day the idea was last edited or updated.
- **Problem Statement** _(String)_: A concise explanation of the problem this idea aims to solve.
- **Solution** _(String)_: A summary of how the idea addresses the identified problem.
- **Why Now** _(String)_: A brief rationale for why this idea is timely or relevant.
- **Market Estimate** _(Integer)_: An approximation or range indicating market size or potential.
- **Business Model** _(String)_: How the idea plans to generate revenue or create value.
- **Technologies** _(List of Strings)_: A list of core technologies involved (e.g., LLMs, blockchain).
- **Competition** _(String)_: Key competitors or alternative solutions in the market.
- **Status** _(String)_: A label for the stage of the idea (e.g., early-stage, proven, pilot).
- **Type of Author** _(String)_: Identifies if the author is a user, curator, or AI agent.
- **Author** _(String)_: The username or display name of the idea creator.
- **Sources** _(List of Strings)_: References or citations for data that informed the idea.

**Optional Fields**

- **Ideal Customer Profile (ICP)** _(String)_: A concise profile of the target customer or audience.
- **Skills Required** _(List of Strings)_: Specific expertise needed to develop or implement the idea.
- **Potential Investors** _(List of Strings)_: Links or names of investors who might be interested.
- **Potential Customers** _(List of Strings )_: References to early adopters, pilot customers, or target companies.
- **Contacts** _(List of Strings)_: Relevant email addresses, websites, or other ways to get in touch.
- **Collaboration Groups** _(List of Strings)_: Related discussion communities such as subreddits or Discord channels.
- **Similar Ideas** _(List of Strings)_: References to ideas on the portal with overlapping concepts.
- Supporting Material _(Files)_: A place where users can add external files as additional info/context.
- **Other** _(String)_: A general field for additional notes or details outside the standard categories.

2. **Challenges Page**

   - Dashboard tracking major global challenges with live KPIs and data visualizations
   - Real-time tracking and visualization of challenge metrics
   - Interactive maps showing geographic impact and distribution
   - Detailed descriptions and statistics for each challenge
   - Links to related ideas and solutions in the Ideas Portal
   - Ability to filter and sort challenges by category, urgency, and impact
   - Regular updates of challenge metrics and statistics

3. **Knowledge Hub**

   - Comprehensive resource center organized by industry and topic
   - Podcast section with links to Spotify and YouTube episodes
   - Deep-dive articles with rich text formatting and media support
   - Curated external resources with descriptions and relevance explanations
   - Cross-referencing between resources and related challenges/ideas
   - Curator-exclusive content management interface
   - Search and filter functionality for all resources

4. **Community Page**

   - Discussion forums organized by topics and interests
   - User groups based on expertise and focus areas
   - Event announcements and virtual meetup organization
   - Direct messaging system for premium users
   - Activity feed showing recent discussions and contributions
   - User reputation and contribution tracking
   - Integration with external community platforms

5. **Profile Page**

   - Personal profile management with bio and expertise sections
   - Portfolio showcase for past projects and contributions
   - Activity tracking for platform engagement
   - Premium features access management
   - Saved ideas and challenges tracking
   - Network connections and collaborations display
   - Privacy settings and notification preferences

6. **Split between "users" and "curators" views**

   - Differentiated access levels and capabilities
   - Curator-exclusive content management tools
   - Special curator features for Ideas Portal management
   - Content moderation and curation tools
   - Analytics and engagement metrics for curators

7. **Premium Modes**

   - Subscription and per-idea access options
   - Direct contact features for premium users
   - AI-powered idea analysis and structuring (future feature)
   - Enhanced collaboration tools
   - Premium content access

8. **Content Promotion**

   - Automated social media post generation
   - Event and hackathon organization tools
   - Cross-platform content distribution
   - Engagement tracking and analytics

9. **Multi-Channel Publishing**

   - Integration with external platforms (YouTube, Spotify)
   - Automated content syndication
   - Cross-posting capabilities
   - Media embedding support

10. **Fostering Early Engagement**
    - Community seeding strategies
    - Strategic outreach tools
    - Engagement analytics and tracking
    - Community growth monitoring

## Non-Functional Requirements

- **Performance:** Quick loading and real-time updates when users vote or comment.
- **Scalability:** Capable of handling an expanding user base, multiple categories, and large volumes of content.
- **Security:** User authentication, structured role-based access for premium features, secure data storage.
- **Usability:** Simple, intuitive user interface with clear navigation.
- **Reliability:** High uptime, reliable notification mechanisms for new comments or messages.
- **Maintainability:** Clean, modular code for easy feature additions.

## Technical Requirements

- **Frontend:** React with TypeScript for the user interface.
- **Backend:** Python with FastAPI for the main logic (managing ideas, user interactions, premium features).
- **AI Agent Framework:** Langchain or Hugging Face to automate the ingestion of ideas from external platforms.
- **Databases:**
  - Supabase (SQL) for primary data storage and user authentication.
  - Pinecone as an optional vector database (if advanced semantic searches or recommendation engines become needed).
- **Hosting:** Render for both frontend and backend.
- **Content Storage & Processing:**
  - Store interview videos or audio externally (YouTube, Spotify) and link them back to each idea.
  - Monitoring workflows to parse and categorize content.
- **Payment System:** Integration with a payment gateway (Stripe or similar) to support subscription and per-idea payments.

## Development Plan

Check DevelopmentPlan.md

## Design

### Color Palette

Accent colors are yellow (#ffbd59) and blue (#4c77f6). Main color for text is black (#000000)

### Font

Roboto

### Inspiration

Basic example from which take inspiration for the Idea Portal

![image.png](attachment:871b6986-2a92-46ae-985f-a64d38c2191d:image.png)

## Assumptions and Dependencies

**Assumptions:**

- Users have stable internet connections and modern browsers.
- Sufficient interview content or user-submitted ideas exist to populate the platform and keep it engaging.
- AI agent can reliably scrape publicly available content from social media.

**Dependencies:**

- Continued availability and affordability of LLM or AI hosting (Hugging Face).
- Third-party APIs (LinkedIn/Reddit/X) remain accessible for data collection.

### Constraints

- **Time Constraint:** Given an MVP target, focus on core features (idea submission, rating, discussions, premium contact). Advanced AI-driven features can be phased in.
- **Resource Constraint:** A small development team, meaning minimal overhead for complex solutions.
- **Budget Constraint:** Keep hosting and service costs manageable (likely using free or low-cost tiers where possible).

### Risks and Mitigations

| Risk                                     | Likelihood | Impact | Mitigation Strategy                                               |
| ---------------------------------------- | ---------- | ------ | ----------------------------------------------------------------- |
| AI agent failing to scrape desired data  | Medium     | Medium | Diversify data sources, fallback on manual curation.              |
| Low user engagement at launch            | High       | High   | Seed the platform with "fake" activity, strong marketing push.    |
| Legal challenges around content scraping | Low        | Medium | Limit scraping to publicly available data in compliance with TOS. |
| Scalability issues with rapid growth     | Medium     | Medium | Use cloud services capable of scaling on demand.                  |

## Conclusion

_The Way Forward_ aims to become the definitive platform for understanding and addressing humanity's greatest challenges. By providing an integrated view of global challenges, innovative solutions, and comprehensive resources, the platform serves as a bridge between today's problems and tomorrow's breakthroughs. Through its combination of challenge tracking, solution development, knowledge sharing, and community building, _The Way Forward_ empowers changemakers to collaborate effectively and accelerate humanity's progress. The MVP will establish the core infrastructure for this vision, with future developments expanding its capabilities in data analysis, AI-driven insights, and global collaboration.
