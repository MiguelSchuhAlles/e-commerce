import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect}  from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component.jsx';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';

import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selector';

const HatsPage = () => (
  <div>
    <h1>Hats Page</h1>
  </div>
)

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const {setCurrentUser}  = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser ({
              id: snapShot.id,
              ...snapShot.data()
            })
          });
      }

      setCurrentUser(userAuth);
    });
  }



  //disposal of the open onAuthStateChanged subscription
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path='/' component={HomePage}/>
          <Route path='/shop' component={ShopPage}/>    
          <Route exact path='/checkout' component={CheckoutPage}/> 
          <Route exact path='/signin' render={() => this.props.currentUser ? (<Redirect to='/' />) : <SignInAndSignUpPage/>}/>    
        </Switch>
  
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
}) 

//callback that dispatches actions to store, triggering a state change
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)) //prop that dispatches the action. "dispatch" is a way for redux to know that the object being passed is and action to be passed to every Reducer 
})

export default connect(mapStateToProps,mapDispatchToProps)(App);
