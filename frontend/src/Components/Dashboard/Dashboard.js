import React from 'react'
import Cookies from 'js-cookie';
import './dashboard.css'
import bar from '../../assets/img/bar.png'
import barmixte from '../../assets/img/barmixte.png'
import pie from '../../assets/img/pie.png'
import piecolor from '../../assets/img/piecolor.png'
import area from '../../assets/img/area.png'
import mixte from '../../assets/img/mixte.png'

function Dashboard() {
  return (
    <div className='container-fluid'>
      <div className='row my-3 mx-0 clou'>
        <div className='col-5 d-flex'>
          <div className='container-fluid my-auto'>
            <h4 className='mb-0'>
              Tableau de bord
            </h4>
            <span className="text-italic">{ Cookies.get("role") }</span>
          </div> 
        </div>

        <div className='col-7 d-flex px-0 justify-content-end'>
          <div className="card-statistique text-center" >
              <h6>Personnels</h6>
              <span>015</span>
          </div>

          <div className="card-statistique text-center">
              <h6>Congés</h6>
              <span>124</span>
          </div>

          <div className="card-statistique text-center" >
              <h6>Autorisation</h6>
              <span>150</span>
          </div>

          <div className="card-statistique text-center">
              <h6>Mission</h6>
              <span>067</span>
          </div>

        </div>
      </div>

      <hr/>

      <div className='container clou-graph-gle pb-4'>
        <div className='row d-flex my-3 justify-content-around'>
          <div className=' col-6 clou clou-graph'>
            <h6 className='graph-title text-center'>Personnels</h6>
            <img src={area} alt='sary' className='graph_dashboard'/>
          </div>
          <div className=' col-5 clou clou-graph'>
            <h6 className='graph-title text-center'>Pointages</h6>
            <img src={barmixte}  alt='sary' className='graph_dashboard' />
          </div>
        </div>
        {/* <div className='row d-flex my-3 justify-content-around'>
          <div className=' col-6 clou clou-graph'>
            <h6 className='graph-title text-center'>Congés</h6>
            <img src={pie}  alt='sary' className='graph_dashboard'/>
          </div>
          <div className=' col-5 clou clou-graph'>
            <h6 className='graph-title text-center'>Permission</h6>
            <img src={piecolor}  alt='sary' className='graph_dashboard'/>
          </div>
        </div> */}
        <div className='row d-flex my-3 justify-content-around'>
          <div className=' col-6 clou clou-graph'>
            <h6 className='graph-title text-center'>Autorisation</h6>
            <img src={bar}  alt='sary' className='graph_dashboard'/>
          </div>
          <div className=' col-5 clou clou-graph'>
            <h6 className='graph-title text-center'>Missions</h6>
            <img src={mixte} alt='sary' className='graph_dashboard' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;