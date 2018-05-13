import Menu from '../components/Menu';
import { connect } from 'react-redux';

let MainMenu = connect(
    state => ({
        isSigned: state.auth.status === 'signed',
        cart_length: state.cart.length
    })
)(Menu);

export default MainMenu;
