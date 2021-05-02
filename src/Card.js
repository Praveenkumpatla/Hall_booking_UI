import React from 'react'

function Card(props) {
    return (
        <div className="card border-dark m-1">
            <div className="card-body">
                <div className="card-title">{props.pass.list.customer_Name}</div>
                <div className="card-text text-left">
                    <div>Venue: {props.pass.venue} </div>
                    <div>Status: Booked</div> 
                    <div>Date: {props.pass.list.book[0].date}</div>
                    <div>Start time: {props.pass.list.book[0].start}</div>
                    <div>End time: {props.pass.list.book[0].end}</div>
                </div>
            </div>
        </div>
    )
}

export default Card
