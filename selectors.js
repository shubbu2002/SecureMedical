import { createSelector } from "reselect";
import { get, reject } from "lodash";
import moment from "moment/moment";
const allData = (state) =>get(state,"medical.allMedical.data",[]);
const deleteData = (state) =>get(state,"medical.deleteMedical.data",[]);
const events = (state) =>get(state,"medical.events");
const openData=(state)=>{
const all=allData(state);
const delet = deleteData(state);
const openData = reject(all,(data)=>{
    const dataDelete = delet.some((o)=>o.recordId.toString()===data.recordId.toString());
    return dataDelete;
});
return openData;
};

export const dataBookSelector=createSelector(allData,(data)=>{
    data = decorateOrderData(data);
    return data;

});
const decorateOrderData = (datas) => {
    return datas.map((data)=>{
      data=decorateOrder(data);
      return data;
    });
};
const decorateOrder = (data) => {
    const precision = 100000;
    let recordIdNew = Math.round(data.recordId*precision)/precision;
    let ageNew = Math.round(data.age*precision)/precision;

    return {
        ...data,
        recordIdNew,
        ageNew,
        formattedTimestamp:moment.unix(data.timestamp).format("h:mm:ssa d MMM yyyy"),
    };
};
export const myEventSelector = createSelector(events,(events)=>{
    console.log(events);
    return events;
});