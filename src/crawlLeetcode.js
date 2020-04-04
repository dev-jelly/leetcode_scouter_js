const fs = require('fs');
const $ = require('axios');


const crawl = async () => {
  const response = await $.get('https://leetcode.com/api/problems/all/');
  const orgProblems = response.data['stat_status_pairs'];
  const savedProblems = {};

  for(const problem of orgProblems) {
    const stat = problem['stat'];
    savedProblems[stat['question_id']] = {
      problemNumber: stat['question_id'],
      title: stat['question__tile'],
      slug: stat['question__title_slug'],
      likes: 0,
      dislikes: 0,
      difficulty: problem['difficulty']['level'],
      accepted: stat['total_acs'],
      submitted: stat['total_submitted']
    }
  }

  fs.writeFileSync('./problems.json', JSON.stringify(savedProblems));
};

crawl();