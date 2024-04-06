import './App.scss';
import React from 'react';
import HeaderContainer from './components/Header/HeaderContainer.tsx';
import NavbarContainer from './components/Navbar/NavbarContainer.tsx';
import ProfileContainer from './components/Profile/ProfileContainer.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginContainer from './components/Login/Login.tsx';
import { initializeApp } from './redux/appReducer.ts';
import { connect } from 'react-redux';
import Preloader from './components/Common/Preloader/Preloader.tsx';
import { RootStateType } from './redux/redux-store.ts';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.tsx'))
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer.tsx'))

type MapStateToPropsType = {
  initialized: boolean
}
type MapDispatchToPropsType = {
  initializeApp: () => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType

class App extends React.Component<PropsType> {

  catchUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('Some error occured')
  }

  componentDidMount() {
    this.props.initializeApp()
    window.addEventListener('unhandledrejection', this.catchUnhandledErrors)
  }

  render() {
    if(!this.props.initialized) {
      return <Preloader />
    }

    return (
        <BrowserRouter basename='/'>
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

let mapStateToProps = (state: RootStateType) => {
  return{
    initialized: state.appReducer.initialized
  }
}

export default connect(mapStateToProps, { initializeApp } )(App);
