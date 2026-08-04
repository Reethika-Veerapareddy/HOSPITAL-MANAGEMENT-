import React, { useEffect, useState } from "react";
import {
getInventory
}
from "../services/bloodService";

import { getBloodRequests } from "../services/bloodRequestService";
import "../styles/blood.css";
import { useNavigate } from "react-router-dom";


export default function BloodDash() {
    const navigate = useNavigate();

    const [requests, setRequests] = useState([]);

useEffect(() => {
  loadRequests();
}, []);

const loadRequests = async () => {
  try {
    const data = await getBloodRequests();
    setRequests(data);
  } catch (error) {
    console.error(error);
  }
};


  const [inventory, setInventory] = useState([]);



  useEffect(() => {

    loadBlood();

  }, []);



  const loadBlood = async () => {

    try {

      const data = await getInventory();

      setInventory(data);

    }

    catch(error){

      console.log(
        "Blood inventory loading error:",
        error
      );

    }

  };




  return (

    <div className="blood-page">


      {/* Hero Section */}

      <section className="blood-hero">


        <div>

          <h1>
            🩸 Smart Blood Bank Network
          </h1>


          <p>
            AI Powered Emergency Blood Coordination & Hospital Network
          </p>


         <button
  className="emergency-btn"
  onClick={() => navigate("/blood-requests")}
>
  🚨 Create Emergency Blood Request
</button>

        </div>



        <div className="blood-animation">

          🩸

        </div>


      </section>
      <button
  className="inventory-btn"
  onClick={() => window.location.href = "/blood-inventory"}
>
  📦 Manage Blood Inventory
</button>





      {/* KPI Cards */}

      <section className="blood-kpis">


        <div className="blood-kpi">

          <h2>
            {
              inventory.reduce(
                (total,item)=>total+item.units,
                0
              )
            }
          </h2>

          <p>
            Total Blood Units
          </p>

        </div>






        <div className="blood-kpi danger">

          <h2>

            {
              inventory.filter(
                item=>item.status==="Critical"
              ).length
            }

          </h2>


          <p>
            Critical Groups
          </p>

        </div>





        <div className="blood-kpi">

          <h2>
            28
          </h2>


          <p>
            Emergency Requests
          </p>

        </div>





        <div className="blood-kpi">

          <h2>
            186
          </h2>


          <p>
            Active Donors
          </p>

        </div>



      </section>









      {/* LIVE INVENTORY */}

      <section className="section">


        <h2>
          Live Blood Inventory
        </h2>



        <div className="blood-grid">



          {
            inventory.map((blood)=>(


              <div

                key={blood.id}

                className={
                  "group-card "+
                  (
                    blood.status==="Critical"
                    ?
                    "red"
                    :
                    blood.status==="Low"
                    ?
                    "yellow"
                    :
                    "green"
                  )
                }

              >


                <h1>
                  {blood.blood_group}
                </h1>


                <p>
                  {blood.units} Units
                </p>


                <span>
                  {blood.status}
                </span>



                <small>

                  {blood.component}

                </small>



              </div>


            ))
          }



        </div>


      </section>









      {/* Emergency and Donor Section */}


      <section className="dashboard-two">



        <div className="glass-card">
  <h2>🚨 Emergency Requests</h2>

  {requests.length === 0 ? (
    <p>No emergency requests available</p>
  ) : (
    requests.slice(0, 5).map((request) => (
      <div className="request" key={request.id}>
        <h3>
          {request.blood_group} Blood Required
        </h3>

        <p>
          {request.patient_name}
        </p>

        <p>
          {request.units_required} unit(s)
        </p>

        <p>
          Status: {request.status}
        </p>
      </div>
    ))
  )}
</div>









        <div className="glass-card">


          <h2>
            👥 Nearby Donors
          </h2>



          <div className="donor">


            <div>

              <h3>
                Rahul Kumar
              </h3>


              <p>
                O+ | 2.4 KM Away
              </p>


            </div>


            <span>
              Available
            </span>


          </div>







          <div className="donor">


            <div>

              <h3>
                Ananya Rao
              </h3>


              <p>
                A- | 4 KM Away
              </p>


            </div>


            <span>
              Available
            </span>


          </div>



        </div>



      </section>









      {/* Hospital Network */}


      <section className="network">


        <h2>
          🏥 Hospital Network
        </h2>



        <div className="hospital-list">


          <div>

            <h3>
              City Emergency Center
            </h3>


            <p>
              O- : 8 Units
            </p>


          </div>




          <div>

            <h3>
              Apollo Hospital
            </h3>


            <p>
              A+ : 24 Units
            </p>


          </div>





          <div>

            <h3>
              Fortis Medical Center
            </h3>


            <p>
              B+ : 18 Units
            </p>


          </div>



        </div>



      </section>




    </div>


  );


}