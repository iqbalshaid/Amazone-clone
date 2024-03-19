import {createSlice} from "@reduxjs/toolkit";
export const cartSlice = createSlice({
    name:"cart",
    initialState:{
        cart:[],
        currentUser: null,
  loading: false,
  error: false,
    },
    reducers:{
        loginStart: (state) => {
            state.loading = true;
          },
          loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            localStorage.setItem("user",JSON.stringify(state.currentUser));
          },
          loginFailure: (state) => {
            state.loading = false;
            state.error = true;
          },
          logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
          },
        addToCart:(state,action)=>{
            const itemPresent = state.cart.find((item)=>item.id===action.payload.id);
            if(itemPresent){
                itemPresent.quantity++;
            }
            else{
               state.cart.push({...action.payload,quantity:1});
            }
        },
        removeFromCart:(state,action)=>{
            const removeItem = state.cart.filter((item)=>item.id!==action.payload.id);
            state.cart = removeItem;
        },
        incrementQuantity:(state,action)=>{
            const itemPresent = state.cart.find((item)=>item.id===action.payload.id);
            itemPresent.quantity++;
        },
        decrementQuantity:(state,action)=>{
            const itemPresent = state.cart.find((item)=>item.id===action.payload.id);
              if(itemPresent===1){
                itemPresent.quantity = 0;
                const removeItem = state.cart.filter((item)=>item.id!==action.payload.id);
            state.cart = removeItem;

              }
              else{
                itemPresent.quantity--;
              }
        },
        cleanCart:(state,action)=>{
            state.cart = [];
        }
    }
});
export const {addToCart,removeFromCart,incrementQuantity,decrementQuantity,cleanCart,loginFailure,loginStart,loginSuccess,logout} = cartSlice.actions;
export default cartSlice.reducer;