import React, {
  Component
} from "react";
import {
  connect
} from "react-redux";

import Modal from "react-bootstrap/Modal";


import {removeItem, updateList} from "../../actions";

class EditModal extends Component {
  constructor(props){
    super(props);
    this.state ={
      isOpen: false,
      color: "",
      size:"",
      qty: 1
    }
  }

  hideModal = () => {
    this.setState ({
      isOpen: false,
      color: "",
      size:"",
      qty: 1
    }, () => {
      this.props.onCloseClick(this.state.isOpen);
    });
  };

  removeItem = (item) => {
    this.props.removeItem(item);
  }

  getColor = (color) => {
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

  updatePrice = (itemInfo) => {

      itemInfo.p_price = this.state.qty * itemInfo.p_price;
      itemInfo.p_quantity = this.state.qty;
      itemInfo.selectedColor = this.state.color;

      this.props.updateList(itemInfo);

    this.hideModal();
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
                  return (<div className="float-left" key={index}
                    style={{ background: color.hexcode, height: "20px", width: "20px" }}
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
            <input type="number" defaultValue={ this.state.qty || 1 } onKeyUp={this.getQty} min="1" id={myItem.p_id}/>
          </div>
        </section>
        <section>
          <img src={myItem.p_image} alt={myItem.p_image}/>
        </section>
        <section>
          <button type="button" className="btn btn-primary" onClick={() => this.updatePrice(myItem, qty, color)}>EDIT</button>
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
  return {
    itemList: state.getItemList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem :item => dispatch(removeItem(item)),
    updateList : item => dispatch(updateList(item))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
