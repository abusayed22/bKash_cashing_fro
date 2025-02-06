import moment from "moment";

export const formatDateTime = (date) => {
    return moment(date).format(' MMMM Do , h:mm:ss a'); // " February 6th 2025, 12:45:30 pm"
    // return moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a'); // "Thursday, February 6th 2025, 12:45:30 pm"
};