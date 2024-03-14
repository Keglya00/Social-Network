import './App.css';
import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer';
import NavbarContainer from './components/Navbar/NavbarContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginContainer from './components/Login/Login';
import { initializeApp } from './redux/appReducer';
import { connect } from 'react-redux';
import Preloader from './components/Common/Preloader/Preloader';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'))

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp() 
  }

  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }

    return (
        <BrowserRouter>
          <div className='wrapper'>
            <HeaderContainer />
            <div className='container'>
              <NavbarContainer />
              <div className='container__content'>
                <React.Suspense fallback={<Preloader />}>
                  <Routes>
                    <Route path='/profile/:userId' element={ <ProfileContainer /> } />
                    <Route path='/dialogs/*' element={ <DialogsContainer /> } />
                    <Route path='/users/*' element={ <UsersContainer/> } />
                    <Route path='/login/*' element={ <LoginContainer/> } />
                  </Routes>
                </React.Suspense>
              </div>
            </div>
          </div>
        </BrowserRouter>
    );
  }
}

let mapStateToProps = (state) => {
  return{
    initialized: state.appReducer.initialized
  }
}

export default connect(mapStateToProps, { initializeApp } )(App);
