import React from 'react'

function Carded(props) {
    return (
        <div className="card border-dark m-1">
            <div className="card-body">
                <div className="card-title">{props.pass.venue}</div>
                <div className="card-text text-left">
                    <div>Amenities: {props.pass.amenities[0]},{props.pass.amenities[1]}</div>
                    <div>Seat's: {props.pass["seat's"]}</div>
                    <div>Price/hour: {props.pass.price_Per_Hour}</div>
                    <hr/>
                    {
                        props.pass.customers.map((item,index)=>{
                            return (<div key={index}>
                            <div>Name: {item.customer_Name}</div> 
                            <div>Date: {item.book[0].date}</div>
                            <div>Start time: {item.book[0].start}</div>
                            <div>End time: {item.book[0].end}</div>
                            <hr/>
                            </div>)
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Carded
