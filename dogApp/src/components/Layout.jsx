import React, {useState, useEffect, useContext} from 'react';
import { NavLink, Outlet, useParams} from 'react-router-dom';

import './css/layout.css';
import PopupBtn from './PopupBtn';
import UserCont from './UserCont';
import { DogsContext } from './Context';

const Header = () => {
  const {activeUser, users} = useContext(DogsContext);
  const activeUserName = users.find(user => user._id == activeUser)?.name;

    return (
      <header className='header'>
          <h1>All your dogs!</h1>
          <PopupBtn title={`👤 ${activeUserName || 'Guest'}`}>
            <div className='userCont'>
              {users.map(user => <UserCont
                key={user._id}
                name={user.name}
                profilePic={user.profilPic}
                id={user._id}
              />)}
            </div>
            <button className='addUserBtn'>Add User</button>
          </PopupBtn>
          <nav>
              <NavLink className='link' to='/'>Home</NavLink>
              <NavLink className='link' to='/breeds/hound'>Breeds</NavLink>
              <NavLink className='link' to='/favorites'>Favorites</NavLink>
          </nav>
      </header>
    )
  }

function SideBar() {
    const [choose, setChoose] = useState();
    useEffect(() => {
      fetch('https://dog.ceo/api/breeds/list/all')
      .then(res => res.json())
      .then(obj => setChoose(Object.keys(obj.message)))
    }, []);
  
    return <div className='sideBar'>
      {choose?.map((item, i) => <NavLink 
        to={`/breeds/${item}`} 
        key={i} 
        style={({isActive}) => isActive ? {textDecoration: 'underline'} : {}}>
        {item}
      </NavLink>) || <span>Loading...</span>}
      </div>
  }

export function Layout() {
  const params = useParams();
  const breed = params.breed;
  const [showSideBar, setShowSideBar] = useState(true);

  return (
    <>
      <Header/>
      <>
      {
        showSideBar ?
          <>
            <div className='containerWithSideBar'>
                <button className='sideBarBtn' onClick={() => setShowSideBar(false)} >Side Bar</button>
                <SideBar activeBreed={breed}/>
                <Outlet/>
            </div>
          </> 
        :
          <>
            <div className='container'>
                <button className='closedSideBarBtn' onClick={() => setShowSideBar(true)} >≡</button>
                <Outlet/>
            </div>
          </>
        }
      </>
    </>
  );
}

