import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addNewAogPositions = createAsyncThunk(
  "aog/addNewPositions",
  async (rawNewPositions, thunkAPI) => {
    console.time("aogDataPreparerAll");
    const state = thunkAPI.getState();
    let sections = state.aogClientData;
    let sectionsRaw = rawNewPositions.data.sections;
    let vehicle = rawNewPositions.data.vehicle;
    const controlButtonsState = rawNewPositions?.data?.controlButtonsState;

    let activeSections = JSON.parse(JSON.stringify(sections.activeSections));
    let multiPolygon = JSON.parse(JSON.stringify(sections.multiPolygon));
    let sectionsIds = JSON.parse(JSON.stringify(sections.sectionsIds));
    let activeIdx = [];

    let vehiclePath = JSON.parse(JSON.stringify(sections.vehiclePath));
    for (let sectRaw of sectionsRaw) {
      if (sectRaw?.buttonState === "Auto" || sectRaw?.buttonState === "On") {
        let idx = sectionsIds.findIndex(
          (x) => x.sectionId === sectRaw.sectionId
        );
        if (idx >= 0) {
          activeSections[idx].leftPoints.push([
            sectRaw.pointLeft.lat,
            sectRaw.pointLeft.lon,
          ]);
          activeSections[idx].rightPoints.push([
            sectRaw.pointRight.lat,
            sectRaw.pointRight.lon,
          ]);
          activeIdx.push(idx);
        } else {
          activeSections.push({
            leftPoints: [[sectRaw.pointLeft.lat, sectRaw.pointLeft.lon]],
            rightPoints: [[sectRaw.pointRight.lat, sectRaw.pointRight.lon]],
          });
          let lastIdx = activeSections.length - 1;
          sectionsIds.push({
            sectionId: sectRaw.sectionId,
            activeSectionIdx: lastIdx,
            isClosed: false,
            multiPolygonIdx: -1,
          });
          activeIdx.push(lastIdx);
        }
      }
    }

    //let index = 0;
    for (let [index, si] of sectionsIds.entries()) {
      let i = activeIdx.find((el) => el === index && !si.isClosed);
      //   console.log("si.isClosed:" + si.isClosed + " I:" + i + "idx:" + index);
      if (i < 0 || i == null) {
        si.isClosed = true;
      }
      index++;
    }

    //create multiPolygon
    for (let si of sectionsIds) {
      if (!si.isClosed) {
        let mIdx = 0;
        if (si.multiPolygonIdx >= 0) {
          mIdx = si.multiPolygonIdx;
          multiPolygon[mIdx] = JSON.parse(
            JSON.stringify(activeSections[si.activeSectionIdx].leftPoints)
          );
        } else {
          if (multiPolygon.length > 0) mIdx = multiPolygon.length;
          else mIdx = 0;
          si.multiPolygonIdx = mIdx;
          multiPolygon[mIdx] = JSON.parse(
            JSON.stringify(activeSections[si.activeSectionIdx].leftPoints)
          );
        }
        let rightPoints = [...activeSections[si.activeSectionIdx].rightPoints];
        for (let z of rightPoints.reverse()) multiPolygon[mIdx].push(z);
      }
    }

    //-----Vehicle
    let vehicleCurrentPoint = [vehicle.lat, vehicle.lon];
    vehiclePath.push(vehicleCurrentPoint);

    console.timeEnd("aogDataPreparerAll");

    return {
      multiPolygon: multiPolygon,
      activeSections: activeSections,
      sectionsIds: sectionsIds,
      vehicle,
      vehiclePath,
      vehicleCurrentPoint,
      distanceNavigationError: Math.round(
        controlButtonsState?.distanceNavigationError * 0.1
      ),
    };
  }
);

const aogClientDataSlice = createSlice({
  name: "aogClientData",
  initialState: {
    multiPolygon: [],
    activeSections: [],
    sectionsRaw: [],
    sectionsIds: [],
    initValue: true,
    vehicleCurrentPoint: [],
    vehiclePath: [],
  },
  reducers: {},
  extraReducers: {
    [addNewAogPositions.pending]: (state, action) => {
      state.status = "loading";
    },
    [addNewAogPositions.fulfilled]: (state, action) => {
      state.status = "succeeded";
      //   console.log("extra reducers payload: ");
      //   console.log(action.payload);
      state.multiPolygon = action.payload.multiPolygon;
      state.activeSections = action.payload.activeSections;
      state.sectionsIds = action.payload.sectionsIds;
      state.vehicle = action.payload.vehicle;
      state.vehiclePath = action.payload.vehiclePath;
      state.vehicleCurrentPoint = action.payload.vehicleCurrentPoint;
      state.initValue = false;
      state.distanceNavigationError = action.payload.distanceNavigationError;
    },
  },
});

//export const {} = aogClientDataSlice.actions;
export default aogClientDataSlice.reducer;
