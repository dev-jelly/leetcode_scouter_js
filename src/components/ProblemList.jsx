import React, {useEffect, useState} from 'react';
import axios from "axios";
import MaterialTable from "material-table";

const ProblemList = () => {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get('/problems.json')

      setProblems(Object.values(response.data));
    })();
  });

  return (

    <div>
      <MaterialTable
        columns={[
          {title: "ID", field: "problemNumber"},
          {title: "Title", field: "slug"},
          {title: "Difficulty", field: "difficulty"},
          {title: "Likes", field: "likes"},
          {title: "Dislikes", field: "dislikes"},
          {title: "Rate", field: "rate"},
          {title: "Acceptance", field: "acceptance"},
          {title: "Submitted", field: "submitted"},
          {title: "Accepted", field: "accepted"},
        ]}
        data={problems}

      >

      </MaterialTable>
    </div>

  )
};

export default ProblemList;