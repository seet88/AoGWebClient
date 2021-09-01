import { createSlice } from "@reduxjs/toolkit";

import { aogButtonsList } from "../config/configButtons";

const aogButtonsControlSlice = createSlice({
  name: "aogButtonsControl",
  initialState: { aogButtonsList },
  reducers: {
    updateButtonByName(state, action) {
      const { name, buttonState } = action.payload;

      const button = state?.aogButtonsList.find(
        (button) => button.name === name
      );
      button.buttonState = buttonState;
    },
    updateSectionsButtons(state, action) {
      const { sections } = action.payload;
      sections.forEach((section) => {
        const name = `section${section.sectionNumber + 1}`;
        const button = state?.aogButtonsList.find(
          (button) => button.name === name
        );
        if (button) button.buttonState = section.buttonState;
      });
    },
  },
});

export const { updateButtonByName, updateSectionsButtons } =
  aogButtonsControlSlice.actions;

export default aogButtonsControlSlice.reducer;

export const selectButtonByName = (state, name) =>
  state?.aogButtonsControl.aogButtonsList.find(
    (button) => button.name === name
  );

export const buttonsListByCssClassName = (state, cssClassName) =>
  state?.aogButtonsControl.aogButtonsList.filter(
    (button) => button.cssClassName === cssClassName
  );
