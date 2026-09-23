# Nick's Job Search

A fast, client-side React application that I built, which uses advanced Google Search Operators (Dorking) to query Applicant Tracking Systems (ATS) directly. By bypassing traditional job board algorithms, this tool helps you find the most recent and relevant job postings straight from company career pages.

## Features

* **Targeted ATS Search:** Pre-configured queries for over 30 major platforms including Greenhouse, Lever, Workday, Ashby, and direct career pages.
* **Granular Filtering:** Filter results by job title, specific locations (using native datalist autocomplete), and posting recency (e.g., past 24 hours, past week).
* **Shareable State:** Search parameters automatically sync with the URL parameters, allowing you to bookmark or share specific searches natively.
* **Progress Tracking:** Clicked links are visually marked with a checkmark and dimmed, ensuring you do not duplicate efforts during a search session. State resets automatically on new searches.
* **Privacy First:** Fully static frontend application. No databases, no user tracking, and no server-side processing required.

## Tech Stack

* **Framework:** React with TypeScript
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Components:** Headless UI
* **Package Manager:** Yarn

## Getting Started

To run this project locally, clone the repository and install the dependencies using Yarn.

```bash
# Clone the repository
git clone [https://github.com/nung22/nicks-job-search.git](https://github.com/nung22/nicks-job-search.git)

# Navigate to the project directory
cd nicks-job-search

# Install dependencies
yarn install

# Start the development server
yarn dev