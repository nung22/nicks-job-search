import React, { useState, useEffect } from "react";
import { Input, Select, Button } from "@headlessui/react";

interface SearchTarget {
  id: string;
  name: string;
  queryPrefix: string;
}

const SEARCH_TARGETS: SearchTarget[] = [
  {
    id: "greenhouse",
    name: "Greenhouse",
    queryPrefix: "site:boards.greenhouse.io",
  },
  { id: "lever", name: "Lever", queryPrefix: "site:jobs.lever.co" },
  { id: "ashby", name: "Ashby", queryPrefix: "site:jobs.ashbyhq.com" },
  { id: "indeed", name: "Indeed", queryPrefix: "site:indeed.com/viewjob" },
  {
    id: "y-combinator",
    name: "Y Combinator Work at a Startup",
    queryPrefix: "site:workatastartup.com",
  },
  { id: "careers-pages", name: "Careers Pages", queryPrefix: "inurl:careers" },
  {
    id: "oracle-cloud",
    name: "Oracle Cloud",
    queryPrefix: "site:oraclecloud.com",
  },
  {
    id: "workday",
    name: "Workday Jobs",
    queryPrefix: "site:myworkdayjobs.com",
  },
  { id: "adp", name: "ADP", queryPrefix: "site:workforcenow.adp.com" },
  {
    id: "linkedin",
    name: "LinkedIn",
    queryPrefix: "site:linkedin.com/jobs/view",
  },
  {
    id: "linkedin-search",
    name: "LinkedIn via Search Engine",
    queryPrefix: "site:linkedin.com/jobs",
  },
  {
    id: "glassdoor",
    name: "Glassdoor",
    queryPrefix: "site:glassdoor.com/job-listing",
  },
  {
    id: "remote-rocketship",
    name: "Remote Rocketship",
    queryPrefix: "site:remoterocketship.com",
  },
  { id: "pinpoint", name: "Pinpoint", queryPrefix: "site:pinpointhq.com" },
  { id: "jobs-subdomain", name: "Jobs Subdomain", queryPrefix: "inurl:jobs" },
  {
    id: "people-subdomain",
    name: "People Subdomain",
    queryPrefix: "inurl:people",
  },
  {
    id: "talent-subdomain",
    name: "Talent Subdomain",
    queryPrefix: "inurl:talent",
  },
  {
    id: "paylocity",
    name: "Paylocity",
    queryPrefix: "site:recruiting.paylocity.com",
  },
  { id: "keka", name: "Keka", queryPrefix: "site:keka.com" },
  { id: "workable", name: "Workable", queryPrefix: "site:apply.workable.com" },
  { id: "breezyhr", name: "BreezyHR", queryPrefix: "site:breezy.hr" },
  { id: "zoho", name: "Zoho", queryPrefix: "site:zohorecruit.com" },
  {
    id: "wellfound",
    name: "Wellfound",
    queryPrefix: "site:wellfound.com/jobs",
  },
  { id: "recruitee", name: "Recruitee", queryPrefix: "site:recruitee.com" },
  { id: "rippling", name: "Rippling", queryPrefix: "site:rippling-ats.com" },
  { id: "gusto", name: "Gusto", queryPrefix: "site:gusto.com" },
  { id: "careerpuck", name: "CareerPuck", queryPrefix: "site:careerpuck.com" },
  { id: "teamtailor", name: "Teamtailor", queryPrefix: "site:teamtailor.com" },
  {
    id: "smartrecruiters",
    name: "SmartRecruiters",
    queryPrefix: "site:smartrecruiters.com",
  },
  { id: "talentreef", name: "TalentReef", queryPrefix: "site:talentreef.com" },
  { id: "homerun", name: "Homerun", queryPrefix: "site:homerun.co" },
  { id: "gem", name: "Gem", queryPrefix: "site:gem.com" },
  { id: "trakstar", name: "Trakstar", queryPrefix: "site:hire.trakstar.com" },
  { id: "cats", name: "Cats", queryPrefix: "site:catsone.com" },
  { id: "jazzhr", name: "JazzHR", queryPrefix: "site:applytojob.com" },
  { id: "jobvite", name: "Jobvite", queryPrefix: "site:jobs.jobvite.com" },
  { id: "icims", name: "iCIMS", queryPrefix: "site:icims.com" },
  { id: "dover", name: "Dover", queryPrefix: "site:dover.io" },
  { id: "notion", name: "Notion", queryPrefix: "site:notion.site" },
  { id: "builtin", name: "Builtin", queryPrefix: "site:builtin.com" },
  { id: "factorial", name: "Factorial", queryPrefix: "site:factorialhr.com" },
  { id: "trinet", name: "TriNet Hire", queryPrefix: "site:trinethire.com" },
  { id: "join", name: "Join", queryPrefix: "site:join.com" },
  { id: "personio", name: "Personio", queryPrefix: "site:jobs.personio.com" },
  { id: "dayforce", name: "Dayforce", queryPrefix: "site:dayforcehcm.com" },
  { id: "avature", name: "Avature", queryPrefix: "site:avature.net" },

  // Aggregate / Custom Queries
  {
    id: "other-ats",
    name: "Other ATS's",
    queryPrefix:
      "site:bamboohr.com OR site:recruiting.ultipro.com OR site:careerplug.com OR site:paycomonline.net OR site:successfactors.com OR site:taleo.net OR site:brassring.com OR site:csod.com OR site:freshteam.com OR site:comeet.com OR site:careers-page.com OR site:jobscore.com OR site:applicantpro.com OR site:applicantstack.com OR site:careers.hireology.com OR site:pageuppeople.com OR site:work.fountain.com OR site:workstream.us OR site:recruitingbypaycor.com",
  },
  {
    id: "other-pages",
    name: "Other Pages",
    queryPrefix:
      "inurl:employment OR inurl:vacancies OR inurl:opportunities OR inurl:openings OR inurl:join-us OR inurl:work-with-us",
  },
];

interface TimeOption {
  label: string;
  value: string;
  urlParam: string;
}

const LOCATION_SUGGESTIONS = [
  "Remote",
  "United States",
  "California",
  "San Francisco",
  "Los Angeles",
  "San Diego",
  "New York",
  "Seattle",
  "Austin",
  "Chicago",
];

const TIME_OPTIONS: TimeOption[] = [
  { label: "Past Hour", value: "qdr:h1", urlParam: "hour" },
  { label: "Past 4 Hours", value: "qdr:h4", urlParam: "4hours" },
  { label: "Past 8 Hours", value: "qdr:h8", urlParam: "8hours" },
  { label: "Past 12 Hours", value: "qdr:h12", urlParam: "12hours" },
  { label: "Past 24 Hours", value: "qdr:h24", urlParam: "24hours" },
  { label: "Past 48 Hours", value: "qdr:h48", urlParam: "48hours" },
  { label: "Past 72 Hours", value: "qdr:h72", urlParam: "72hours" },
  { label: "Past Week", value: "qdr:w", urlParam: "7days" },
  { label: "Past Month", value: "qdr:m", urlParam: "30days" },
  { label: "Any Time", value: "", urlParam: "any" },
];

export default function App() {
  const [jobTitle, setJobTitle] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("job") || "Software Engineer";
  });

  const [location, setLocation] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("location") || "Remote";
  });

  const [timeFilter, setTimeFilter] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const timeParam = params.get("time");
    const matchedTime = TIME_OPTIONS.find((opt) => opt.urlParam === timeParam);
    return matchedTime ? matchedTime.value : "qdr:h48";
  });

  const [isSearching, setIsSearching] = useState<boolean>(true);
  const [clickedLinks, setClickedLinks] = useState<string[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has("job")) {
      params.set("job", jobTitle);
      params.set("location", location);
      const selectedTime = TIME_OPTIONS.find((opt) => opt.value === timeFilter);
      if (selectedTime) {
        params.set("time", selectedTime.urlParam);
      }
      params.set("campaign", jobTitle);
      window.history.replaceState({}, "", `?${params.toString()}`);
    }
  }, [jobTitle, location, timeFilter]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobTitle.trim() !== "") {
      const params = new URLSearchParams(window.location.search);
      params.set("job", jobTitle);

      if (location.trim() !== "") {
        params.set("location", location);
      } else {
        params.delete("location");
      }

      const selectedTime = TIME_OPTIONS.find((opt) => opt.value === timeFilter);
      if (selectedTime) {
        params.set("time", selectedTime.urlParam);
      }
      params.set("campaign", jobTitle);

      window.history.pushState({}, "", `?${params.toString()}`);
      setIsSearching(true);

      setClickedLinks([]);
    }
  };

  const generateGoogleLink = (queryPrefix: string): string => {
    let query = `${queryPrefix} "${jobTitle}"`;
    if (location.trim() !== "") {
      query += ` "${location}"`;
    }
    const url = new URL("https://www.google.com/search");
    url.searchParams.set("q", query);
    if (timeFilter) {
      url.searchParams.set("tbs", timeFilter);
    }
    return url.toString();
  };

  const selectedTimeLabel =
    TIME_OPTIONS.find((opt) => opt.value === timeFilter)?.label || "";

  return (
    <div className="min-h-screen bg-black text-white font-sans p-8 flex flex-col items-center">
      <header className="w-full max-w-3xl mb-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Nick's Job Search</h1>
        <form
          onSubmit={handleSearch}
          className="flex flex-wrap gap-2 justify-center"
        >
          <Input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job Title"
            className="bg-black border border-gray-600 text-white px-3 py-1 rounded min-w-50"
            required
          />
          <Input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="bg-black border border-gray-600 text-white px-3 py-1 rounded min-w-50"
            list="location-options"
          />
          <datalist id="location-options">
            {LOCATION_SUGGESTIONS.map((loc) => (
              <option key={loc} value={loc} />
            ))}
          </datalist>
          <Select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-black border border-gray-600 text-white px-3 py-1 rounded min-w-37.5"
          >
            {TIME_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Button
            type="submit"
            className="bg-gray-300 text-black px-4 py-1 rounded font-semibold hover:bg-white transition-colors cursor-pointer"
          >
            Start
          </Button>
        </form>
      </header>

      {isSearching && (
        <main className="w-full max-w-3xl border-t border-gray-700 pt-8 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-6 text-center">
            {jobTitle} {location ? `- ${location} ` : ""}- {selectedTimeLabel}
          </h2>
          <div className="w-full max-w-lg flex flex-col gap-2">
            {SEARCH_TARGETS.map((target) => {
              const isClicked = clickedLinks.includes(target.id);

              return (
                <a
                  key={target.id}
                  href={generateGoogleLink(target.queryPrefix)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (!isClicked) {
                      setClickedLinks((prev) => [...prev, target.id]);
                    }
                  }}
                  className={`w-full border rounded p-3 transition-colors flex items-center gap-3 text-sm ${
                    isClicked
                      ? "border-gray-700 text-gray-500 hover:bg-gray-900/50"
                      : "border-gray-600 text-blue-400 hover:bg-gray-900"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-sm shrink-0 flex items-center justify-center border transition-colors ${
                      isClicked
                        ? "bg-blue-600 border-blue-600"
                        : "bg-white border-white"
                    }`}
                  >
                    {isClicked && (
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  {target.name}
                </a>
              );
            })}
          </div>
        </main>
      )}

      <footer className="w-full max-w-3xl border-t border-gray-700 pt-6 mt-6 mb-4 flex justify-center text-sm">
        <p>
          Created by{" "}
          <a
            href="https://github.com/nung22"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-300 transition-colors"
          >
            Nicholas Ung
          </a>{" "}
          - Copyright {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
