import React, { useState, useEffect } from 'react'

function Dashboard() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || []

    setStudents(storedStudents)
  }, [])

  return (

    <div className="table-responsive">
        <h2 className="mb-3">Registered Student Accounts</h2>
        <h4 className="mb-3">Total registered students: {students.length}</h4>

        <table className="table table-info">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">fullname</th>
              <th scope="col">course</th>
              <th scope="col">email</th>
            </tr>
          </thead>
          <tbody>
            {
              students.map((student) => (
                <tr>
                  <th scope="row">{student.id}</th>
                  <td>{student.fullname}</td>
                  <td>{student.course}</td>
                  <td>{student.email}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  )
}

export default Dashboard