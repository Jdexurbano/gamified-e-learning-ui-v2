import { format } from "date-fns";

export function convertDate(isoString) {
  try {
    // Parse and format the date
    const formattedDate = format(new Date(isoString), "MMMM d, yyyy");
    return formattedDate;
  } catch (error) {
    console.error("Error parsing the date:", error);
    return "Invalid Date";
  }
}
