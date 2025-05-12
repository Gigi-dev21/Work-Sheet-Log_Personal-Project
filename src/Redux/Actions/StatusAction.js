import { db } from "../../firebase";
import { SET_STATUS } from "../Types/actionTypes";

export const handleApproveStatus = (id) => async (dipatch) => {
  try {
    const querySnapshot = await db.collection("data").doc(id);

    await querySnapshot.update({
      status: "Approved",
    });
    dipatch({
      type: SET_STATUS,
      payload: { status: "Approved", id },
    });
    console.log("Approved", id);
  } catch (error) {
    console.error(error);
  }
};
export const handleDeclineStatus = (id) => async (dipatch) => {
  try {
    let querySnapshot = await db.collection("data").doc(id);
    await querySnapshot.update({
      status: "Declined",
    });
    dipatch({
      type: SET_STATUS,
      payload: { status: "Declined", id },
    });

    console.log("Declined", id);
  } catch (error) {
    console.log(error);
  }
};
