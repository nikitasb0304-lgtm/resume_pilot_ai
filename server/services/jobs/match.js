export const matchJobsBySkills = (jobs, skills = []) => {
    return jobs.map(job => {
      const matched = job.skills.filter(skill =>
        skills.includes(skill.toLowerCase())
      );
      const score = Math.round((matched.length / job.skills.length) * 100);
  
      return { ...job._doc, matched, score };
    });
  };
  