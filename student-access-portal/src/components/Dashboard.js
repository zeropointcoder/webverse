import React from 'react'

function Dashboard() {
  return (

    <div className="table-responsive">
        <h2 className="mb-3">Student Dashboard</h2>
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
            <tr>
              <th scope="row">1</th>
              <td>Thomas Payne</td>
              <td>MSc. Pure Mathematics</td>
              <td>payne@gmail.com</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Julie Rose</td>
              <td>MSc. Applied Mathematics</td>
              <td>rose@gmail.com</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Ryan King</td>
              <td>MSc. Statistics</td>
              <td>king@gmail.com</td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default Dashboard