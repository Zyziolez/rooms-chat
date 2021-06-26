import React,{ useEffect, useRef, useState } from 'react'
import Peer from 'peerjs'

  export default function Proba() {
let [peer, setPeer] = useState(new Peer(Math.floor(Math.random() * 10)))
const [text, setText] = useState('')

    useEffect(() => {

        peer.on('connection', (conn) => {
            conn.on('data', (data) => {
              const con = peer.connect(data)
              con.send('hejka')
            });
            conn.on('open', (mess) => {
              conn.send('hello!');
            });
          });
          peer.on('call', function(call) {
            
              call.answer(stream); 
          });
    }, [])

    function handleChange (){
        const conn = peer.connect(text)
        conn.on('open', () =>{
            conn.send(peer.id)
        })
    }ZZ
      return (
          <div>
              <h1> twoje id: {peer.id}</h1>
              <input type='text' value={text} onChange={e => setText(e.target.value)} />
              <button onClick={handleChange} >Connect</button>

          </div>
      )
  }
  