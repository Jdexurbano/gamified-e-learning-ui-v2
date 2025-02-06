import { Card, Typography, Button, Alert } from "@material-tailwind/react";
import { FaClipboardList } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { convertDate } from "../../../utils/convert_date/convert_date";
import axios from "axios";
import { PORT } from "../../../utils/constant";
import AddAnnouncementModal from "../../../components/teacher/announcement/AddAnnouncementModal";
import UpdateAnnouncementModal from "../../../components/teacher/announcement/UpdateAnnouncementModal";
import DeleteAnnouncementModal from "../../../components/teacher/announcement/DeleteAnnouncementModal";
function AdminAnnouncementPage() {
  const TABLE_HEAD = ["Title", "Description", "Date", ""];
  const [announcements, setAnnouncements] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [openAlert, setOpenAlert] = useState(false);
  const [openUpdateAlert, setOpenUpdateAlert] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const fetchAnnouncement = async () => {
    try {
      const response = await axios.get(`${PORT}/announcements`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAnnouncements(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAnnouncement();
  }, []);
  return (
    <>
      <main className="px-6 pt-8">
        {/* Add Announcement Button */}
        <Button
          size="sm"
          className="flex items-center gap-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 shadow-md transition-all duration-300"
          onClick={handleOpen}
        >
          <FaClipboardList size={18} />
          Add Announcement
        </Button>

        {/* Table Card */}
        <Card className="w-full overflow-y-auto max-h-[30rem] mt-4 shadow-lg rounded-xl">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="bg-purple-600 text-white">
                {["Title", "Description", "Created At", "Actions"].map(
                  (head) => (
                    <th key={head} className="p-4 text-center font-semibold">
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {announcements.map((data, index) => (
                <tr
                  key={index}
                  className="even:bg-gray-100 hover:bg-purple-50 transition duration-200 text-center"
                >
                  <td className="p-4">
                    <Typography
                      variant="small"
                      className="text-gray-700 font-medium"
                    >
                      {data.title}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      className="text-gray-700 font-medium"
                    >
                      {data.description}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      className="text-gray-700 font-medium"
                    >
                      {convertDate(data.created_at)}
                    </Typography>
                  </td>
                  <td className="p-2 flex items-center justify-center gap-3">
                    <UpdateAnnouncementModal
                      data={data}
                      fetchAnnouncement={fetchAnnouncement}
                      id={data.id}
                      setOpenUpdateAlert={setOpenUpdateAlert}
                    />
                    <DeleteAnnouncementModal
                      id={data.id}
                      fetchAnnouncement={fetchAnnouncement}
                      setOpenDeleteAlert={setOpenDeleteAlert}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Add Announcement Modal */}
        <AddAnnouncementModal
          open={open}
          handleOpen={handleOpen}
          fetchAnnouncement={fetchAnnouncement}
          setOpenAlert={setOpenAlert}
        />

        {/* Alerts */}
        <Alert
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          color="light-green"
          className="fixed top-5 right-5 w-72 shadow-lg"
        >
          Announcement has been added successfully!
        </Alert>

        <Alert
          open={openUpdateAlert}
          onClose={() => setOpenUpdateAlert(false)}
          color="light-green"
          className="fixed top-5 right-5 w-72 shadow-lg"
        >
          Updates were successful!
        </Alert>

        <Alert
          open={openDeleteAlert}
          onClose={() => setOpenDeleteAlert(false)}
          color="red"
          className="fixed top-5 right-5 w-72 shadow-lg"
        >
          Announcement has been deleted successfully!
        </Alert>
      </main>
    </>
  );
}

export default AdminAnnouncementPage;
