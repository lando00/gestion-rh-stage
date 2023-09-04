import React from 'react'

const TitreBlock = props => {
  return (
    <div className="col">
        <h3>Personnel</h3>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item" style={{fontStyle : 'italic'}} aria-current="page"><span className="h6">Personnel</span></li>
                <li className="breadcrumb-item active" aria-current="page" ><span className="h6" style={{fontStyle : 'italic'}}>{props.titleItem}</span></li>
            </ol>
        </nav>
    </div>
  )
}

export default TitreBlock
