import React from 'react'

function Shop() {
  return (
    <div className="table-responsive">
        <h2 className="mb-3">Books</h2>
        <table className="table table-info">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">author/publisher</th>
              <th scope="col">price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Pure Mathematics Y2</td>
              <td>Pearson</td>
              <td>28.00</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Applied Mathematics Y2</td>
              <td>Pearson</td>
              <td>27.00</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Pure Mathematics Practicebook Y2</td>
              <td>Pearson</td>
              <td>7.00</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Applied Mathematics Practicebook Y2</td>
              <td>Pearson</td>
              <td>6.50</td>
            </tr>
          </tbody>
        </table>
    </div>
  )
}

export default Shop