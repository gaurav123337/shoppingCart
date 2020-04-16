import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';

import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import ModalTitle from "react-bootstrap/ModalTitle";

import {removeItem} from '../../actions';

class EditModal extends Component {
  constructor(props){
    super(props);
    this.state ={
      isOpen: false,
      color: '',
      size:'',
      qty: 1
    }
  }
  // showModal = () => {
  //   this.setState ({
  //     isOpen: true
  //   })
  // };

  hideModal = () => {
    this.setState ({
      isOpen: false
    }, () => {
      this.props.onCloseClick(this.state.isOpen);
    });
  };

  removeItem = (item) => {
    this.props.removeItem(item);
  }

  getColor = (color) => {
    console.log(color, 'ev')
    this.setState({
      color
    });
  }

  getQty = (ev) => {
    let val =parseInt(ev.target.value);
    val = (val > 0 && val) || 1;
    this.setState({
      qty :val
    })
  }

  render() {
    const { status, myItem } = this.props;
    const { color, size, qty } = this.state;


    return (
     <Modal show={status} >
      <Modal.Header className="justify-content-end">
        <span onClick={this.hideModal}>X</span>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h3>{myItem.p_name.toUpperCase()}</h3>
        <h4>{myItem.c_currency} {myItem.p_price}</h4>
        <section>
          <div>
            {
              myItem.p_available_options.colors.length > 0 && (
                myItem.p_available_options.colors.map((color, index) => {
                  return (<div className="float-left"
                    style={{ background: color.hexcode, height: '20px', width: '20px' }}
                    data-color={color.name} onClick={()=>this.getColor(color)}></div>)
                })
              )
            }
            <span>Color:{color.name || myItem.p_available_options.colors[0].name}</span>
          </div>
          <div>
            <select id="sizes" name="sizes">
            {
              myItem.p_available_options.sizes.length > 0 && (
                myItem.p_available_options.sizes.map((size, index) => {
                  return (<option value={size.code} key={index}>{size.name}</option>)
                })
              )
            }
            </select>
          </div>
          <div>
            <input type="number" defaultValue={ this.state.qty || 1 } onKeyUp={this.getQty} min="1"/>
          </div>
        </section>
        <section>
          <img src={myItem.p_image} alt={myItem.p_image}/>
        </section>
        <section>
          <button type="button" className="btn btn-primary">EDIT</button>
        </section>
      </Modal.Body>
      <Modal.Body>
        Final price: {myItem.c_currency} {qty * myItem.p_price}
      </Modal.Body>
    </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state, 'state in list');
  return {
    itemList: state.getItemList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem :item => dispatch(removeItem(item))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
