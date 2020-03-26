import React, {useState} from 'react';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

  return (
    <table>
      <thead>
        <th>ID</th>
        <th>Title</th>
        <th>Difficulty</th>
        <th>Likes</th>
        <th>Dislikes</th>
        <th>Rate</th>
        <th>Acceptance</th>
        <th>Submitted</th>
        <th>Accepted</th>
      </thead>
      <tbody>
      {problems.map(p => {
        return (
          <tr key={p.id}>
            <td>{p.problem_number}</td>
            <td><a href={"https://leetcode.com/problems/" + p.slug}>{p.title}</a></td>
            <td>{p.difficulty}</td>
            <td>{p.slug}</td>
            <td>{p.likes}</td>
            <th>{p.acceptance}</th>
            <td>{p.submitted}</td>
            <td>{p.accepted}</td>
          </tr>
        )
      })}
      </tbody>
    </table>
  )
};

export default ProblemList;