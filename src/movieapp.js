import { useState , useEffect } from "react";
// http://www.omdbapi.com/?s=spider man&apikey=148f7e34
import "./movie.css"
function App(){
    var [choice,setchoice] = useState('')
    const [watched, setWatched] = useState([]);
    const [towatch, setToWatch] = useState([]);
    function addwatched(a,b,c){
        let exist = true
        watched.map((item)=>item.title===a ? exist=false: true )
        if(exist ===true){
            setWatched((pw) => [...pw, { title: a, year: b, poster: c }]);
        }
    }
    function addtowatched(a,b,c){
        let exist = true
        towatch.map((item)=>item.title===a ? exist=false: true )
        if(exist===true){
            setToWatch((pw) => [...pw, { title: a, year: b, poster: c }]);
        }
    }
    function Add(){
        var [data,setdata] = useState('')
        var [sear,setSearch] = useState('')
        useEffect(()=>{
            if(sear!==""){
                fetch(`https://www.omdbapi.com/?s=${sear}&apikey=148f7e34`)
                .then(rep=>rep.json())
                .then((d)=> setdata(d))
                .catch((e)=>console.error(e))
            }
        },[sear])

        return(
            <>
                <div className="films">
                    <input className="inputs" value={sear} placeholder="Search for a movie" onChange={(e)=>{setSearch(e.target.value)}}/>
                    <div className="fc">
                        { sear!=="" && data["Response"] ==="True" ? data["Search"].map((item)=><Fil p={item.Poster} fil={item}> </Fil>) : <h1> {data.Error} </h1> }
                    </div>
                </div>
            </>
        )
    }
    function Fil(props){
        return(
            <>
                 <div className="film">
                     <img src={props.p} className="poster" alt="poster" />
                     <div className="yb">
                         <h4>{props.fil.Title}</h4>
                         <h5>{props.fil.Year}</h5>
                         <div>                     
                            <button onClick={()=>{addwatched(props.fil.Title, props.fil.Year, props.p)}} className="watched">watched</button>
                            <button onClick={()=>{addtowatched(props.fil.Title, props.fil.Year, props.p)}} className="watched">watch list</button>
                         </div>
                     </div>
                    
                 </div>
            </>
         )
     }
    function Watched() {
        return(
            <>
                {watched.map((item)=> <div className="film">
                     <img src={item.poster} className="poster" alt="poster" />
                     <div className="yb">
                         <h4>{item.title}</h4>
                         <h5>{item.year}</h5>
                     </div>
                </div>)}
            </>
        )
    }
    function Towatch(){
        return(
            <>
                {towatch.map((item)=> <div className="film">
                     <img src={item.poster} className="poster" alt="poster" />
                     <div className="yb">
                         <h4>{item.title}</h4>
                         <h5>{item.year}</h5>
                     </div>
                </div>)}
            </>
        )
    }
    return(
        <>
            <div className="all">
                <div className="navbar">
                    <h1 className="logo">MOVIELAND</h1>
                    <div className="watchedlist">
                        <button onClick={()=>{setchoice("towatch")}}  className="w">WATCH LIST</button>
                        <button onClick={()=>{setchoice("watched")}}  className="w">WATCHED</button>
                        <button onClick={()=>{setchoice("add")}}  className="add">ADD</button>
                    </div>
                </div>
                <div className="container">
                    {choice ==="towatch" ?  <div className="fc"><Towatch /></div> : choice ==="watched" ?<div className="fc"><Watched /></div> : <Add />}
                </div>  
            </div>
        </>
    )
}


export default App;