import React, {
  Component
} from "react";

import {
  connect
} from "react-redux";
import CheckOutInfo from "../CheckOutinfo";
import EditModal from "../EditModal";

import {removeItem, refresh} from "../../actions";

class CartList extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      itemInfo:""
    }
  }

  openModal = (item) => {
    this.setState({
      isOpen: true,
      itemInfo: item
    });
  }

  closeModal = (chileData) => {
    this.setState({
      isOpen: chileData
    });
  }
  removeItem = (item) => {
    this.props.removeItem(item);
  }

  refresh = () => {
    this.props.refresh();
  }

  render() {
    const {
      itemList
    } = this.props;

    const {itemInfo, isOpen} = this.state;


    return (
      <>
      <button className="btn btn-info" onClick={this.refresh}>Refresh</button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" colSpan="2">{itemList.length} ITEMS</th>
            <th scope="col">SIZE</th>
            <th scope="col">QTY</th>
            <th scope="col">PRICE</th>
          </tr>
        </thead>

      <tbody>
        {
          itemList.length > 0 && itemList.map((item, index) => {
            return(
              <tr key={index}>
                <td>{item.p_image}</td>
                <td className="text-left">
                  <h4>{item.p_name.toUpperCase()}</h4>
                  <p><span>Style</span><span>:</span><span>{item.p_style}</span></p>
                  <p><span>Color</span><span>:</span><span>{item.p_available_options.colors[0].name}</span></p>
                  <p>
                    <span onClick={() => this.openModal(item)}>Edit</span><span>|</span>
                    <span onClick={() => this.removeItem(item)}>X Remove</span><span>|</span>
                    <span>Save for later</span>
                  </p>
                </td>
                <td >{item.p_available_options.sizes[0].code}</td>
                <td><input type="text" readOnly value={item.p_quantity} id={item.p_id} /></td>
                <td><h4><sup>{item.c_currency}</sup>{item.p_price}</h4></td>
              </tr>
            )
          })
        }
      </tbody>
      </table>
      <hr/>
      <CheckOutInfo items={itemList}/>
      {itemInfo && <EditModal status={isOpen} onCloseClick={this.closeModal} myItem={itemInfo}/>}
      </>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state, "state in list");
  return {
    itemList: state.getItemList
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     removeItem :item => dispatch(removeItem(item))
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    removeItem :item => dispatch(removeItem(item)),
    refresh :() => dispatch(refresh())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartList);
