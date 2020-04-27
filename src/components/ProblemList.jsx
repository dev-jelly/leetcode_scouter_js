import React, {useEffect, useState} from 'react';
import axios from "axios";
import MaterialTable from "material-table";
import './ProblemList.css';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/problems.json');
      setProblems(Object.values(response.data));
    })();
  }, []);

  return (

    <div>
      <MaterialTable
        title={"Leetcode Scouter"}
        columns={[
          {title: "ID", field: "problemNumber"},
          {
            title: "Title", field: "slug", render: p => {
              return <a className="problem-link" href={`https://leetcode.com/api/problems/${p.slug}`}><span className={"title"}>{p.slug.replace(/-/g, " ").toUpperCase()}</span></a>
            }
          },
          {
            title: "Difficulty", field: "difficulty", render: p => {
              if (p.difficulty === 1) {
                return (<span className={"difficulty easy"}>EASY</span>)
              } else if (p.difficulty === 2) {
                return (<span className={"difficulty medium"}>MEDIUM</span>)
              } else {
                return (<span className={"difficulty hard"}>HARD</span>)
              }
            },
            customFilterAndSearch: (term, rowData) => {
              const difficulty = rowData.difficulty;
              const T = term.toUpperCase();
              if (T === "EASY") {
                return difficulty === 1;
              }
              if (T === "MEDIUM") {
                return difficulty === 2;
              }
              if (T === "HARD") {
                return difficulty === 3;
              }

              return false;
            }
          },
          {
            title: "Likes", field: "likes", customFilterAndSearch: (term, rowData) => {
              return rowData.likes > term
            }
          },
          {
            title: "Dislikes", field: "dislikes", customFilterAndSearch: (term, rowData) => {
              return rowData.dislikes < term
            }
          },
          {
            title: "Rate", field: "rate", customFilterAndSearch: (term, rowData) => {
              return rowData.rate > term
            }
          },
          {
            title: "Acceptance", field: "acceptance", customFilterAndSearch: (term, rowData) => {
              return rowData.acceptance > term
            }
          },
          {
            title: "Submitted", field: "submitted", customFilterAndSearch: (term, rowData) => {
              return rowData.submitted > term
            }
          },
          {
            title: "Accepted", field: "accepted", customFilterAndSearch: (term, rowData) => {
              return rowData.accepted > term
            }
          },
        ]}
        data={problems}
        options={{
          search: true,
          filtering: true

        }}
      >

      </MaterialTable>
    </div>

  )
};

export default ProblemList;