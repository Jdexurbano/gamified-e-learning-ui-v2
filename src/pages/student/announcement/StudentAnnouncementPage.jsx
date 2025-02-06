import { useState, useEffect } from "react";
import { Card, Typography, Button, Alert } from "@material-tailwind/react";
import axios from "axios";
import { PORT } from "../../../utils/constant";
import { convertDate } from "../../../utils/convert_date/convert_date";
import StudentAnnouncementModal from "../../../components/student/announcement/StudentAnnouncementModal";
function StudentAnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const handleOpen = (data) => {
    setTitle(data.title);
    setDescription(data.description);
    setOpen(!open);
  };
  const TABLE_HEAD = ["Title", "Description", "Date"];
  const getAnnouncements = async () => {
    try {
      const response = await axios.get(`${PORT}/announcements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAnnouncements(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAnnouncements();
  }, []);
  return (
    <>
      <main className="w-full flex justify-center items-center p-6">
        <Card className="w-full max-w-6xl overflow-hidden shadow-lg rounded-xl">
          <div className="bg-purple-700 text-white text-lg font-bold py-4 px-6 rounded-t-xl">
            Announcements
          </div>
          <div className="overflow-auto max-h-[30rem]">
            <table className="w-full min-w-max table-auto text-left border-collapse">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="p-4 text-center text-gray-700 font-semibold uppercase"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {announcements.map((data, index) => (
                  <tr
                    onClick={() => handleOpen(data)}
                    key={index}
                    className="hover:bg-purple-100 transition duration-300 text-center cursor-pointer border-b"
                  >
                    <td className="p-4 text-gray-800">
                      {data.title.length > 20
                        ? `${data.description.substring(0, 20)}...`
                        : data.description}
                    </td>
                    <td className="p-4 text-gray-600">
                      {data.description.length > 30
                        ? `${data.description.substring(0, 30)}...`
                        : data.description}
                    </td>
                    <td className="p-4 text-gray-500">
                      {convertDate(data.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <StudentAnnouncementModal
          open={open}
          handleOpen={handleOpen}
          title={title}
          description={description}
        />
      </main>
    </>
  );
}

export default StudentAnnouncementPage;
