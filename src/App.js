import 'bootstrap/dist/css/bootstrap.min.css';
import {useEffect,useState} from 'react';
import axios from 'axios';
import './App.css';
import Card from './Card';
import Carded from './Carded';


function App() {
  const [data,setdata] = useState([])
  const [cus,setcus] = useState([])
  useEffect(() => {
    async function fact (){
      let income = await axios.get("https://booking-node-server.herokuapp.com/")
      setdata(income.data)
      let income2 = await axios.get("https://booking-node-server.herokuapp.com/cust")
      setcus(income2.data)
    }
    fact()
  }, [])
  const [room,setroom] = useState("")
  const [ac,setac] = useState("NON-AC")
  const [seat,setseat] = useState("Normal-seat's")
  const [seats,setseats] = useState("")
  const [price,setprice] = useState("")
  const [date,setdate] = useState("")
  const [start,setstart] = useState("")
  const [end,setend] = useState("")
  const [cusname,setcusname] = useState("")
  const [palace,setpalace] = useState("Hall-1")
  const [vis,setvis] = useState("visible")
  return (
    <div className="App">
      <div className="row">
        <div className="col-4">
          <div className="border-dark m-1 card">
          <div>API for Create Room</div>
          <form className="text-left m-1" onSubmit={async (e)=>{
            e.preventDefault()
            let check = true
            data.forEach((item)=>{
              if(item.venue===room)
              check = false
            })
            if(check){
              setvis("hidden")
              await axios.post("https://booking-node-server.herokuapp.com/newhall",{"venue":room,"faci":[ac,seat],seats,price})
              let income = await axios.get("https://booking-node-server.herokuapp.com/")
              setdata(income.data)
              setroom("")
              setseats("")
              setprice("")
              setvis("visible")
            }
            else
            alert("Room name not available")
          }}>
            <label htmlFor="roomname">Room-name :</label>
            <input required id="roomname" className="form-control" value={room} onChange={(e)=>{setroom(e.target.value)}}/>
            <div className="custom-control custom-switch m-1">
                <input type="checkbox" className="custom-control-input" id="customSwitch" onChange={(e)=>{if(e.target.checked)setac("AC");else setac("NON-AC")}}/>
                <label className="custom-control-label" htmlFor="customSwitch">AC</label>
                </div>
                <div className="custom-control custom-switch m-1">
                <input type="checkbox" className="custom-control-input" id="customSwitches" onChange={(e)=>{if(e.target.checked)setseat("Recliner seat's");else setseat("Normal-seat's")}}/>
                <label className="custom-control-label" htmlFor="customSwitches">Recliner</label></div>
                <label htmlFor="seats">Seat's :</label>
                <input required id="seats" type="number" className="form-control" value={seats} onChange={(e)=>{setseats(e.target.value)}}/>
                <label htmlFor="price">Price/hour :</label>
                <input required id="price" type="number" className="form-control" value={price} onChange={(e)=>{setprice(e.target.value)}}/>
                <button style={{visibility:vis}} type="submit" className="btn-sm btn-primary m-1">Create</button>
          </form>
          </div>
          <div className="border-dark m-1 card">
            <div>API for Booking</div>
            <form className="text-left m-1" onSubmit={async (e)=>{
              e.preventDefault()
              setvis("hidden")
              let something= await axios.post("https://booking-node-server.herokuapp.com/booked",{"venue":palace,"customer_Name":cusname,"book":[{date,start,end}]})
              alert(something.data["msg"])
              let income = await axios.get("https://booking-node-server.herokuapp.com/")
              setdata(income.data)
              let income2 = await axios.get("https://booking-node-server.herokuapp.com/cust")
              setcus(income2.data)
              setcusname("")
              setdate("")
              setstart("")
              setend("")
              setvis("visible")
            }}>
            <select className="form-control" onChange={(e)=>{setpalace(e.target.value)}}>
              {
                data.map((item,index)=>{
                  return <option key={index} value={item.venue}>{item.venue}</option>
                })
              }
            </select>
            <label htmlFor="cusname">Customer-name :</label>
            <input required id="cusname" className="form-control" value={cusname} onChange={(e)=>{setcusname(e.target.value)}}/>
            <label htmlFor="date">Date :</label>
            <input required id="date" className="form-control" type="date" value={date} onChange={(e)=>{setdate(e.target.value)}} />
            <label htmlFor="date">Start :</label>
            <input required id="date" className="form-control" type="time" value={start} onChange={(e)=>{setstart(e.target.value)}}/>
            <label htmlFor="date">End :</label>
            <input required id="date" className="form-control" type="time" value={end} onChange={(e)=>{setend(e.target.value)}}/>
            <button style={{visibility:vis}} className="btn-sm btn-primary m-1" type="submit">Book</button>
            </form>
          </div>
        </div>
        <div className="col-4">
          <div>API for listing all customers with booked data</div>
          {
            cus.map((item,index)=>{
              return <Card pass={item} key={index}/>
            })
          }
          </div>
        <div className="col-4">
          <div>API for listing all rooms with booked data</div>
          {
            data.map((item,index)=>{
              return <Carded pass={item} key={index}/>
            })
          }
          </div>
      </div>
    </div>
  );
}

export default App;
