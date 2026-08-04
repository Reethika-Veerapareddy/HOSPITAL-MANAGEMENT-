import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "../styles/layout.css";


function Layout({children}) {

    return (

        <div className="layout">

            <Sidebar />

            <div className="layout-main">

                <Navbar />

                <main className="page-content">

                    {children}

                </main>


            </div>


        </div>

    );

}


export default Layout;