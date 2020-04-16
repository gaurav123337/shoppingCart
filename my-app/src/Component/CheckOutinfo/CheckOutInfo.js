import React, {
  Component
} from 'react';

import {
  connect
} from 'react-redux';


class CheckOutInfo extends Component {
  getUpdatePrice = () => {
    const {
        items
      } = this.props;
      let sum = 0;
      for(let i=0; i<items.length; i++){
        sum = sum+items[i].p_price;
      }
      return sum;
  }


  render() {
    const updatePrice = this.getUpdatePrice();
    const {c_currency} = this.props.items.length > 0 ? this.props.items[0] : '$';

    let calculatedVal,newVal;  //If in future
    return (
     <section>
       <div className="row">
         <div className="col-4"><p>Need help</p></div>
         <div className="col-8">
           <div className="h-25">
           <form className="discount">
             <label className="float-left">Enter promotion code</label>
             <input className="float-right" type="button" value="APPLY" />
             <input className="float-right" type="text" value="AJ10" />
           </form>
           </div>
           <hr/>
           <div className="subTotal">
             <p className="text-right">
               <label className="float-left">Sub Total</label>
               <span ><sup>{c_currency}</sup>{calculatedVal || 0}</span>
             </p>
             <p className="text-right">
               <label className="float-left">Promotion code </label>
               <span><sup>{c_currency}</sup>{newVal || 0}</span>
             </p>
             <p className="text-right">
               <label className="float-left">Estimated Shipping* </label>
               <span>Free</span>
             </p>
           </div>
           <hr/>
          <div className="subTotal">

               <h1 className="float-left">Estimated total</h1>
               <h1 className="float-right"><sup>{c_currency}</sup>{updatePrice || 0}</h1>

           </div>
         </div>
       </div>
     </section>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    itemList: state.getItemList
  }
}

export default connect(mapStateToProps)(CheckOutInfo);
