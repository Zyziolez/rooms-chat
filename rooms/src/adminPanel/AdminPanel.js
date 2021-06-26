import axios from 'axios'
import React, { useEffect, useState } from 'react'

let gloBalBigBoj = false;

const forEachPost = (posts) => {
const array = [];

if(posts.length > 0 ){
    posts.forEach(post => {
        // array.push(post.title)
        array.push([post.title, post.text, post.date, post.id])
    });
}

return array
}
const Irritator = () => {
    const [login,setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [display, setDisplay] = useState('block')

    const zaloguj = () => {
        axios.post('https://itinit.pl:5000/loginadmin', {login: login, password: password})
            .then(res => {
                console.log(res.data)
                if(res.data == 'T'){
                    setDisplay('none')
                }
            })
            .catch(err => console.log(err))
    }

    return(
        <div style={{width:'100vw', height:'100vh', background: 'black', color: 'white', position: 'fixed', top: 0, display: display}} >
            <h1 style={{color: 'pink'}} > Zaloguj sie </h1>
             <label>login</label> <input type='text' value={login} onChange={e => setLogin(e.target.value) } /> <br></br>
             <label>haslo</label> <input type='text' value={password} onChange={e => setPassword(e.target.value) } /> <br></br>
            <button onClick={e => zaloguj()} > zaloguj </button>
        </div>
    )
}

export default function AdminPanel() {
    const [posts, setPosts] = useState('')
    const [title,setTitle] = useState('')
    const [text,setText] = useState('')
    const [date,setDate] = useState('')
    const [id,setId] = useState('')

    useEffect(() => {
        axios.get('https://itinit.pl:5000/')
        .then(res => {
        
                setPosts(res.data)
          
        })
        .catch(err => console.log(err))
    }, [])

    const usunPost = (idPosta) => {
        axios.post('https://itinit.pl:5000/delete', {id: idPosta})
            .catch(err => console.log(err))
    }
    const dodajPost = ( tytul, text, data) => {
        axios.post('https://itinit.pl:5000/create', {
            id: null,
            title: tytul,
            text: text,
            date: data
        })
        .catch(err => console.log(err))
    }
    const modyfikujPost = (tytul, tekst, id) => {
        setTitle(tytul)
        setText(tekst)
        setId(id)
    }
    const modyfikujPostOst = () => {
        axios.post('https://itinit.pl:5000/modify', {
            id: id,
            title: title,
            text: text
        })
        .catch(err => console.log(err))
        setTitle('')
        setText('')
        setId('')
    }

    return (
        <div style={{fontFamily: 'comic-sans'}} >
            <p style={{color: 'green'}} >Info dla tych co tu trafia:</p>
            <p> To jest panel jeszcze mocno niedopracowany: jak chcesz modyfikowac post,
                 najpierw kliknij 'modyfikuj', potem w inpucie pojawi sie obecny post, zrob co chcesz i
                  kliknij 'zatwierdz modyfikacje posta'. Jak chcesz dodac post, to tylko uzupelniasz inputy i klikasz 
                  'dodaj nowy post'. Jak usuniesz/dodasz/zmodyfikujesz post, odswiez strone
                  (znaczy nie musisz ale wtedy bedziesz widzial wyniki) (ale bedziesz musial sie ponownie zalogowac lol) </p>
             <br></br>
            <button onClick={e => dodajPost(title, text, date)} >DODAJ NOWY POST</button>
            <button onClick={e => modyfikujPostOst()} >ZATWIERDZ MODYFIKACJE POSTA</button>
            <br></br>
                <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
                <input type='text' value={text} onChange={e => setText(e.target.value)} />
                <input type='date' value={date} onChange={e => setDate(e.target.value)} />
            <h1>Wszystkie dostepne posty:</h1>
            
        {console.log(posts)}

            {forEachPost(posts).map((ele, i) =>
            <div key={i} >
                <h2> {ele[0]} </h2> 
                <h3>{ele[1]}</h3>
                <p style={{color: 'red'}} > data posta: {ele[2].slice(0, 10)} </p>
                <button onClick={e=> modyfikujPost(ele[0], ele[1], ele[3])} >Modyfikuj</button> <button onClick={e => usunPost(ele[3])} >Usun</button>
            </div>)}
            {gloBalBigBoj ? null : <Irritator/>}
        </div>
    )
}
