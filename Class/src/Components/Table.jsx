import React from 'react';

const Table = ({ data = [] }) => {  // Default value for `data` is an empty array
  if (!Array.isArray(data)) {
    return null; // Optionally return null if data isn't an array (just a safety check)
  }

  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => (
            <tr key={i}>
              <td>{e.userName}</td>
              <td>{e.userEmail}</td>
              <td>{e.userPass}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
    