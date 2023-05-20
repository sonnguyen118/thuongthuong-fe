import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdressState {
  adress: {
    id: number;
    name: string;
    phone: string;
    email: string;
    conscious: string;
    district: string;
    commune: string;
  }[];
}

const initialState: AdressState = {
  adress: [],
};

export const adressSlice = createSlice({
  name: "adress",
  initialState,
  reducers: {
    addAdress: (state, action: PayloadAction<AdressState["adress"][0]>) => {
      const index = state.adress.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
      } else {
        state.adress.push(action.payload);
      }
    },
    removeAdress: (state, action: PayloadAction<number>) => {
      state.adress = state.adress.filter((item) => item.id !== action.payload);
    },
    updateAdress: (
      state,
      action: PayloadAction<{
        id: number;
        name: string;
        phone: string;
        email: string;
        conscious: string;
        district: string;
        commune: string;
      }>
    ) => {
      const index = state.adress.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.adress[index].name = action.payload.name;
        state.adress[index].phone = action.payload.phone;
        state.adress[index].email = action.payload.email;
        state.adress[index].conscious = action.payload.conscious;
        state.adress[index].district = action.payload.district;
        state.adress[index].commune = action.payload.commune;
      }
    },
  },
});

export const { addAdress, removeAdress, updateAdress } = adressSlice.actions;

export default adressSlice;
