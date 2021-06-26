import React, { lazy, Suspense, useEffect, useLayoutEffect, useState} from 'react'
import {
  Switch,
  useLocation,
  Route,
  Link,
} from 'react-router-dom'
import {isSetNickname, menuColor, menuOpen} from './index'
import {useRecoilState} from 'recoil'
import LoadingPage from './components/other/LoadingPage'
import MainPage from './components/MainPage'
import Menu from './components/other/Menu'
import AllTop from './components/other/AllTop'
import menuImg from './images/bars-solid.svg'

const CreateRoom = lazy(() => import('./components/CreateRoom'))
const Room = lazy(() => import('./components/Room'))
const AdminPanel = lazy (() => import('./adminPanel/AdminPanel'))
const News = lazy(() => import('./components/other/News'))
const SetNickname = lazy(() => import('./components/other/setNickname'))
const MLoading = lazy(() => import('./mobile/MLoading'))
const MAdmin = lazy(() => import('./mobile/MAdmin'))
const MCreate = lazy(() => import('./mobile/MCreate'))
const MMenu = lazy(() => import('./mobile/MMenu'))
const MNews = lazy(() => import('./mobile/MNews'))
const MRoom = lazy(() => import('./mobile/MRoom'))
const MMain = lazy(() => import('./mobile/MMain'))
//this component is mainly focused on handling routes




export default function App() {
const [open, setOpen] = useRecoilState(isSetNickname)
const [color, setColor] = useRecoilState(menuColor)
const [opened, setOpened] = useRecoilState(menuOpen)
  const location = useLocation()
  const [size, setSize] = useState(0)
  const background = location.state && location.state.background

  const updateSize = () => {
    setSize(window.innerWidth)
  }

    useEffect(() => {
      if(localStorage.getItem('nick') !== null){
        setOpen(false)
      }
    }, [])
    useLayoutEffect( () => {
      window.addEventListener('resize', updateSize)
      updateSize()
      return () => window.removeEventListener('resize', updateSize);
    }, [] )

    const openMenu = () => {
      setOpened(true)
    }

  return (
    <div className='all' >
      <Suspense fallback={ <LoadingPage/> } >
      {window.innerWidth > 800 ? 
        <div className='big'>
          <AllTop/>
          <Menu/>
          <div className='down' >
            
            <SetNickname open={open} setOpen={setOpen}/>
              <Switch location={ location || background }>
                <Route exact path='/'  children={ <MainPage/> } />
                <Route path='/create'  children={ <CreateRoom/> } />
                <Route path='/room'  children={ <Room/> } />
                <Route path='/admin' children={<AdminPanel/>} />
                <Route path='/news' children={<News/>} />
              </Switch>
          </div>
          <div className='transition-div' ></div>
        </div>  :
          <div className='small' >
            <button style={{border: 'none', background: 'transparent', color: color}}  className='menu-btn' onClick={openMenu}  > ||| </button>
            <div className='m-down'>
                <Switch location={location || background} >
                  <Route exact path='/' children={ <MMain/> } />
                  <Route path='/menu' children={ <MMenu/> } />
                  <Route path='/create' children={ <MCreate/> } />
                  <Route path='/room' children={ <MRoom/> } />
                  <Route path='/admin' children={ <MAdmin/> } />
                  <Route path='/news' children={ <MNews/> } />
                </Switch>
            </div>
            <div className='m-trans-div' ></div>
            <MMenu opened={opened} setOpened={setOpened} />
        </div>
    }
    </Suspense>
    </div>
  )
}
