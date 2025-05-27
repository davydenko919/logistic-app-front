export const selectAllRefuelings = (state) => state.refuelings.items;
export const selectCurrentRefueling = (state) => state.refuelings.current;
export const selectLoading = (state) => state.refuelings.isLoading;
export const selectRefuelingError = (state) => state.refuelings.error;