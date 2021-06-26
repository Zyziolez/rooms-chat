import axios from 'axios'
import React, { useEffect, useState } from 'react'

const siftNews = (news) => {
const arr = [];
if( news.length > 0 ){
    news.forEach(newe => {
        arr.push([newe.title, newe.text, newe.date])
    });
}
return arr.reverse();
}

export default function MNews() {
    const [news, setNews] = useState([])
    useEffect(() => {
        axios.get('https://itinit.pl:5000/')
        .then(res => setNews(res.data))
        .catch(err => console.log(err))
    }, [])
    
    return (
        <div className='news' >
            {siftNews(news).map((ele, i) => 
            <li key={i} >
                <h1> {ele[0]} </h1> <label> {ele[2].slice(0, 10)} </label> <br></br>
                <p> {ele[1]} </p>
            </li>
            )}
        </div>
    )
}
