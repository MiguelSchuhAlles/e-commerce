import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {auth} from '../../firebase/firebase.utils';

//special sintax to import SVG file as React component. Could also be imported as an ordinary image and set as src of html element 
import {ReactComponent as Logo} from '../../assets/crown.svg';  //https://facebook.github.io/create-react-app/docs/adding-images-fonts-and-files

import './header.styles.scss';

const Header = ({currentUser}) => (
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
        </div>
    </div>
);

const mapStateToProps = state => ({
    currentUser: state.currentUser
})

export default connect(mapStateToProps)(Header);

