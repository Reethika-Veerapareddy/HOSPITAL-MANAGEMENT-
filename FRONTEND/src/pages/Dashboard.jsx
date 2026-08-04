import React from 'react';

import '../styles/dashboard.css';
import { Link, useNavigate } from 'react-router-dom';


export default function Dashboard() {

  const navigate = useNavigate();


  return (

    <div className="dashboard-layout">


      <aside className="sidebar">

        <div className="logo">
          Smart Hospital
        </div>


        <nav className="sidebar-nav">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/patients">
            Patients
          </Link>

          <Link to="/doctors">
            Doctors
          </Link>

          <Link to="/appointments">
            Appointments
          </Link>

          <Link to="/blood-bank">
            Blood Bank
          </Link>

          <Link to="/laboratory">
            Laboratory
          </Link>

          <Link to="/pharmacy">
            Pharmacy
          </Link>

          <Link to="/billing">
            Billing
          </Link>

          <Link to="/profile">
            Profile
          </Link>


        </nav>


        <button className="logout-btn">
          Logout
        </button>


      </aside>



      <main className="dashboard-main">


        <section className="dashboard-header">


          <div>

            <h1>
              Hospital Command Center
            </h1>


            <p>
              Real-time overview of patients, doctors, appointments, and blood inventory
            </p>


          </div>



          <div className="header-actions">


            <button
  className="primary-btn"
  onClick={() => navigate('/appointments')}
>
  + New Appointment
</button>


            <button className="secondary-btn">
              Generate Report
            </button>


          </div>


        </section>





        {/* Blood Bank Navigation Card */}

        <div
          className="module-card blood"
          onClick={() => navigate("/blood-bank")}
        >

          <div className="icon">
            🩸
          </div>


          <h3>
            Blood Bank
          </h3>


          <p>
            Emergency blood network
          </p>


        </div>






        <section className="kpi-grid">


          <div className="kpi-card">

            <span>
              Total Patients
            </span>

            <h2>
              1,248
            </h2>

            <small>
              +18% this month
            </small>

          </div>




          <div className="kpi-card">

            <span>
              Doctors
            </span>

            <h2>
              124
            </h2>

            <small>
              94 available today
            </small>

          </div>




          <div className="kpi-card">

            <span>
              Appointments Today
            </span>

            <h2>
              186
            </h2>

            <small>
              32 pending
            </small>

          </div>




          <div className="kpi-card alert">

            <span>
              Blood Inventory
            </span>

            <h2>
              214 Units
            </h2>

            <small>
              O- stock running low
            </small>

          </div>



        </section>






        <section className="dashboard-grid">


          <div className="panel large">


            <div className="panel-header">

              <h3>
                Today’s Appointments
              </h3>


              <a href="#">
                View All
              </a>


            </div>




            <table className="appointment-table">

              <thead>

                <tr>

                  <th>
                    Patient
                  </th>

                  <th>
                    Doctor
                  </th>

                  <th>
                    Time
                  </th>

                  <th>
                    Status
                  </th>

                </tr>

              </thead>




              <tbody>


                <tr>

                  <td>
                    Rahul Kumar
                  </td>

                  <td>
                    Dr. Priya Reddy
                  </td>

                  <td>
                    10:30 AM
                  </td>

                  <td>
                    <span className="status confirmed">
                      Confirmed
                    </span>
                  </td>

                </tr>




                <tr>

                  <td>
                    Ananya Sharma
                  </td>

                  <td>
                    Dr. Sneha Patel
                  </td>

                  <td>
                    11:15 AM
                  </td>

                  <td>
                    <span className="status waiting">
                      Waiting
                    </span>
                  </td>

                </tr>




                <tr>

                  <td>
                    Vikram Singh
                  </td>

                  <td>
                    Dr. Rahul Sharma
                  </td>

                  <td>
                    12:00 PM
                  </td>

                  <td>
                    <span className="status completed">
                      Completed
                    </span>
                  </td>

                </tr>


              </tbody>


            </table>


          </div>







          <div className="panel">


            <div className="panel-header">

              <h3>
                Emergency Blood Alerts
              </h3>


            </div>



            <div className="blood-alerts">


              <div className="blood-item critical">

                <div>

                  <strong>
                    O Negative
                  </strong>

                  <p>
                    Only 8 units remaining
                  </p>

                </div>


                <button>
                  Request Donors
                </button>


              </div>




              <div className="blood-item warning">


                <div>

                  <strong>
                    AB Negative
                  </strong>

                  <p>
                    14 units remaining
                  </p>

                </div>


                <button>
                  Notify
                </button>


              </div>





              <div className="blood-item success">


                <div>

                  <strong>
                    A Positive
                  </strong>


                  <p>
                    Healthy stock level
                  </p>


                </div>


                <button>
                  Details
                </button>


              </div>



            </div>


          </div>








          <div className="panel">


            <div className="panel-header">

              <h3>
                Quick Actions
              </h3>

            </div>



            <div className="quick-actions">


              <button>
                Register Patient
              </button>


              <button>
                Add Doctor
              </button>


              <button>
                Book Appointment
              </button>


              <button>
                Issue Prescription
              </button>


              <button>
                Blood Request
              </button>


              <button>
                Generate Bill
              </button>


            </div>


          </div>









          <div className="panel">


            <div className="panel-header">

              <h3>
                Hospital Performance
              </h3>


            </div>




            <div className="performance">


              <div className="progress-item">

                <span>
                  Bed Occupancy
                </span>


                <div className="progress">

                  <div style={{width:'82%'}}></div>

                </div>


              </div>





              <div className="progress-item">

                <span>
                  Operation Theatres
                </span>


                <div className="progress">

                  <div style={{width:'65%'}}></div>

                </div>


              </div>





              <div className="progress-item">

                <span>
                  Emergency Response
                </span>


                <div className="progress">

                  <div style={{width:'94%'}}></div>

                </div>


              </div>



            </div>



          </div>




        </section>



      </main>



    </div>


  );

}