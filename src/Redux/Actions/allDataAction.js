import { endOfWeek, parseISO, startOfWeek } from "date-fns";
import { db } from "../../firebase";
import {
  SET_ADMIN_DATA_ERRORS,
  SET_DATA,
  SET_FILTER_DATA,
} from "../Types/actionTypes";

export const allData = () => async (dispatch) => {
  try {
    let querySnapshot = await db.collection("data").get();
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    let sortedData = data.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA - dateB;
    });
    console.log(sortedData);

    const groupedData = {};
    sortedData.forEach((item) => {
      const weekStart = startOfWeek(parseISO(item.date));
      const weekEnd = endOfWeek(parseISO(item.date));
      const weekKey = `${weekStart}-${weekEnd}`;
      console.log(weekKey);

      if (!groupedData[weekKey]) {
        groupedData[weekKey] = [];
      }

      groupedData[weekKey].push(item);
    });
    console.log(typeof groupedData);

    dispatch({
      type: SET_DATA,
      payload: sortedData,
    });
    // dispatch({
    //   type: SET_FILTER_DATA,
    //   payload: filterdata,
    // });
  } catch (error) {
    dispatch({
      type: SET_ADMIN_DATA_ERRORS,
      payload: error,
    });
  }
};
