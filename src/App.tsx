import React, { useState, useEffect } from 'react';

interface SearchTarget {
  id: string;
  name: string;
  queryPrefix: string;
}

const SEARCH_TARGETS: SearchTarget[] = [
  { id: 'greenhouse', name: 'Greenhouse', queryPrefix: 'site:boards.greenhouse.io' },
  { id: 'lever', name: 'Lever', queryPrefix: 'site:jobs.lever.co' },
  { id: 'ashby', name: 'Ashby', queryPrefix: 'site:jobs.ashbyhq.com' },
  { id: 'remote-rocketship', name: 'Remote Rocketship', queryPrefix: 'site:remoterocketship.com' },
  { id: 'pinpoint', name: 'Pinpoint', queryPrefix: 'site:pinpointhq.com' },
  { id: 'jobs-subdomain', name: 'Jobs Subdomain', queryPrefix: 'inurl:jobs' },
  { id: 'careers-pages', name: 'Careers Pages', queryPrefix: 'inurl:careers' },
  { id: 'people-subdomain', name: 'People Subdomain', queryPrefix: 'inurl:people' },
  { id: 'talent-subdomain', name: 'Talent Subdomain', queryPrefix: 'inurl:talent' },
  { id: 'paylocity', name: 'Paylocity', queryPrefix: 'site:recruiting.paylocity.com' },
  { id: 'keka', name: 'Keka', queryPrefix: 'site:keka.com' },
  { id: 'workable', name: 'Workable', queryPrefix: 'site:apply.workable.com' },
  { id: 'breezyhr', name: 'BreezyHR', queryPrefix: 'site:breezy.hr' },
  { id: 'zoho', name: 'Zoho', queryPrefix: 'site:zohorecruit.com' }
];

interface TimeOption {
  label: string;
  value: string;
  urlParam: string;
}

const TIME_OPTIONS: TimeOption[] = [
  { label: 'Past Hour', value: 'qdr:h1', urlParam: 'hour' },
  { label: 'Past 4 Hours', value: 'qdr:h4', urlParam: '4hours' },
  { label: 'Past 8 Hours', value: 'qdr:h8', urlParam: '8hours' },
  { label: 'Past 12 Hours', value: 'qdr:h12', urlParam: '12hours' },
  { label: 'Past 24 Hours', value: 'qdr:h24', urlParam: '24hours' },
  { label: 'Past 48 Hours', value: 'qdr:h48', urlParam: '48hours' },
  { label: 'Past 72 Hours', value: 'qdr:h72', urlParam: '72hours' },
  { label: 'Past Week', value: 'qdr:w', urlParam: '7days' },
  { label: 'Past Month', value: 'qdr:m', urlParam: '30days' },
  { label: 'Any Time', value: '', urlParam: 'any' }
];

export default function App() {
  const [jobTitle, setJobTitle] = useState<string>('');
  const [timeFilter, setTimeFilter] = useState<string>('qdr:d');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const jobParam = params.get('job');
    const timeParam = params.get('time');
    
    if (jobParam) {
      setJobTitle(jobParam);
      setIsSearching(true);
    }
    
    if (timeParam) {
      const matchedTime = TIME_OPTIONS.find(opt => opt.urlParam === timeParam);
      if (matchedTime) {
        setTimeFilter(matchedTime.value);
      }
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (jobTitle.trim() !== '') {
      const params = new URLSearchParams(window.location.search);
      params.set('job', jobTitle);
      
      const selectedTime = TIME_OPTIONS.find(opt => opt.value === timeFilter);
      if (selectedTime) {
        params.set('time', selectedTime.urlParam);
      }
      params.set('campaign', jobTitle);
      
      window.history.pushState({}, '', `?${params.toString()}`);
      setIsSearching(true);
    }
  };

  const generateGoogleLink = (queryPrefix: string): string => {
    const query = `${queryPrefix} "${jobTitle}"`;
    const url = new URL('https://www.google.com/search');
    url.searchParams.set('q', query);
    if (timeFilter) {
      url.searchParams.set('tbs', timeFilter);
    }
    return url.toString();
  };

  const selectedTimeLabel = TIME_OPTIONS.find(opt => opt.value === timeFilter)?.label || '';

  return (
    <div className="min-h-screen bg-black text-white font-sans p-8 flex flex-col items-center">
      <header className="w-full max-w-3xl mb-8 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6">Nick's Job Search</h1>
        <form onSubmit={handleSearch} className="flex flex-wrap gap-2 justify-center">
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="Job Title"
            className="bg-black border border-gray-600 text-white px-3 py-1 rounded min-w-50"
            required
          />
          <select
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="bg-black border border-gray-600 text-white px-3 py-1 rounded min-w-37.5"
          >
            {TIME_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="bg-white text-black px-4 py-1 rounded font-semibold hover:bg-gray-200 transition-colors"
          >
            Start
          </button>
        </form>
      </header>

      {isSearching && (
        <main className="w-full max-w-3xl border-t border-gray-700 pt-8 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-6">
            {jobTitle} - {selectedTimeLabel}
          </h2>
          <div className="w-full flex flex-col gap-2">
            {SEARCH_TARGETS.map((target) => (
              <a
                key={target.id}
                href={generateGoogleLink(target.queryPrefix)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-gray-600 rounded p-3 text-blue-400 hover:bg-gray-900 transition-colors flex items-center gap-3 text-sm"
              >
                <div className="w-4 h-4 bg-white rounded-sm shrink-0" /> 
                {target.name}
              </a>
            ))}
          </div>
        </main>
      )}
    </div>
  );
}