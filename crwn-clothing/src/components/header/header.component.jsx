import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';  //higher order component that lets us modify our component to have acess to redux objects
import {createStructuredSelector} from 'reselect';

import {auth} from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden, selectCartItems} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selector';

//special sintax to import SVG file as React component. Could also be imported as an ordinary image and set as src of html element 
import {ReactComponent as Logo} from '../../assets/crown.svg';  //https://facebook.github.io/create-react-app/docs/adding-images-fonts-and-files

import './header.styles.scss';

const Header = ({currentUser, hidden}) => (
    <div className='header'>
        <Link className='logo-container' to="/"> 
            <Logo className='logo'/>
        </Link>
        <div className='options'>
            <Link className='option' to='/shop'>SHOP</Link>
            <Link className='option' to='/contact'>CONTACT</Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}> SIGN OUT </div>
                :
                <Link className='option' to='/signin'> SIGN IN </Link>
            }
            <CartIcon/>
        </div>
        {
            hidden ? null :
            <CartDropdown />
        }
    </div>
);

//callback that is sent to the connect method to get the state from Reducer and map to props
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);

