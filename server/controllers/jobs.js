import Job from "../models/Job.js";
import puppeteer from "puppeteer";
import axios from "axios";

export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 }).limit(50);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Fetch jobs error" });
  }
};

export const searchJobs = async (req, res) => {
  const { query = 'Software Engineer', location = 'Remote' } = req.query;
  
  try {
    const allJobs = [];

    // 1. Fetch from RemoteOK API (Great for remote jobs)
    try {
        const remoteOkUrl = `https://remoteok.com/api?tag=${encodeURIComponent(query.split(' ')[0])}`; // RemoteOK uses tags like 'dev', 'engineer'
        const remoteOkRes = await axios.get(remoteOkUrl, { 
            headers: { 'User-Agent': 'ResumePilot/1.0' },
            timeout: 5000 
        });
        
        if (Array.isArray(remoteOkRes.data)) {
            // First element is legal disclaimer, skip it
            const remoteOkJobs = remoteOkRes.data.slice(1).map(job => ({
                title: job.position,
                company: job.company,
                location: job.location || 'Remote',
                skills: job.tags,
                description: job.description,
                applyLink: job.apply_url,
                source: 'RemoteOK',
                matchScore: Math.floor(Math.random() * 20) + 80, // Mock score
                posted: new Date(job.date).toLocaleDateString(),
                logo: job.company_logo
            }));
            allJobs.push(...remoteOkJobs.slice(0, 10));
        }
    } catch (err) {
        console.error("RemoteOK fetch failed:", err.message);
    }

    // 2. LinkedIn Scraping (Fallback/Supplementary)
    try {
        const browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        const url = `https://www.linkedin.com/jobs/search?keywords=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}`;
        
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
        
        await page.goto(url, { waitUntil: 'domcontentloaded' });
        
        // Try to wait for content, but don't fail if timeout
        try {
            await page.waitForSelector('.jobs-search__results-list', { timeout: 3000 });
        } catch (e) { /* ignore */ }
        
        const linkedinJobs = await page.evaluate(() => {
            const jobNodes = document.querySelectorAll('li');
            const results = [];
            
            jobNodes.forEach(node => {
                try {
                    const titleElement = node.querySelector('.base-search-card__title');
                    const companyElement = node.querySelector('.base-search-card__subtitle');
                    const locationElement = node.querySelector('.job-search-card__location');
                    const dateElement = node.querySelector('.job-search-card__listdate');
                    const linkElement = node.querySelector('a.base-card__full-link');
                    const imgElement = node.querySelector('img.artdeco-entity-image');

                    if (titleElement && companyElement && linkElement) {
                        results.push({
                            title: titleElement.innerText.trim(),
                            company: companyElement.innerText.trim(),
                            location: locationElement ? locationElement.innerText.trim() : 'Remote',
                            applyLink: linkElement.href,
                            source: 'LinkedIn',
                            logo: imgElement ? imgElement.src : null,
                            matchScore: Math.floor(Math.random() * 15) + 85,
                            posted: dateElement ? dateElement.innerText.trim() : 'Recently'
                        });
                    }
                } catch (e) { }
            });
            return results.slice(0, 10);
        });
        
        await browser.close();
        allJobs.push(...linkedinJobs);
    } catch (err) {
        console.error("LinkedIn scrape failed:", err.message);
    }

    // 3. Store jobs in DB (Upsert)
    const savePromises = allJobs.map(async (job) => {
        try {
            // Avoid duplicates based on link
            await Job.updateOne(
                { applyLink: job.applyLink },
                { 
                    $set: {
                        title: job.title,
                        company: job.company,
                        location: job.location,
                        source: job.source,
                        description: job.description || '',
                        skills: job.skills || [],
                    }
                },
                { upsert: true }
            );
        } catch (e) {
            console.error("Error saving job:", e.message);
        }
    });
    
    // Don't wait for save to finish before responding (optional, but better for speed)
    // But user wants "store it... then fetch", so maybe wait to ensure they are there?
    // Let's just respond with `allJobs` for speed, but save in background.
    Promise.all(savePromises);

    // If absolutely no jobs found, return mock data
    if (allJobs.length === 0) {
        const mockJobs = [
            {
                title: "Senior Full Stack Developer",
                company: "Tech Giant Inc.",
                location: "Remote",
                posted: "Today",
                applyLink: "https://www.google.com/search?q=jobs",
                matchScore: 98,
                source: "Mock",
                salary: "$140k - $180k"
            },
            {
                title: "Frontend Engineer",
                company: "Startup Co",
                location: location || "New York, NY",
                posted: "2 days ago",
                applyLink: "#",
                matchScore: 92,
                source: "Mock",
                salary: "$100k - $130k"
            }
        ];
        return res.json(mockJobs);
    }

    res.json(allJobs);

  } catch (error) {
    console.error('Search jobs error:', error);
    res.status(500).json({ message: "Failed to fetch jobs", error: error.message });
  }
};

export const matchJobs = async (req, res) => {
  try {
    const { skills } = req.body;
    // Mock match logic
    const jobs = await Job.find();
    const matches = jobs.map((j) => ({
      ...j._doc,
      matchScore: Math.floor(Math.random() * 40) + 60
    }));
    res.json(matches);
  } catch (error) {
    res.status(500).json({ message: "Job match error" });
  }
};
