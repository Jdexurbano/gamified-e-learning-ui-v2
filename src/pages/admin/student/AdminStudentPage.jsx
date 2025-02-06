import { Card, Typography, Button, Alert } from "@material-tailwind/react";
import { FaUserPlus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";
import AddAdminStudentModal from "../../../components/admin/student_list/AddAdminStudentModal";
function AdminStudentPage() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [students, setStudents] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openUpdateAlert, setOpenUpdateAlert] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);
  const TABLE_HEAD = ["First Name", "Last Name", "ID", "Age", ""];

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${PORT}/admin/students`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  return (
    <>
      <main className="px-6 pt-8">
        <Button
          variant="filled"
          size="sm"
          className="flex items-center gap-2 rounded-md bg-purple-300 mb-2"
          onClick={handleOpen}
        >
          <FaUserPlus size={20} />
          Add Student
        </Button>
        <Card className=" w-full overflow-y-auto max-h-[30rem]">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr className="">
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-purple-200 p-4"
                  >
                    <Typography
                      variant="small"
                      className="font-extrabold text-white leading-none"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {students.map((data, index) => (
                <tr
                  key={index}
                  className="even:bg-blue-gray-50/50 even:border-2"
                >
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {data.first_name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {data.last_name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {data.student_No}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {data.age}
                    </Typography>
                  </td>
                  <td className=" p-2 flex gap-4">
                    {/* <UpdateStudentModal
                      data={data}
                      fetchStudents={fetchStudents}
                      id={data.id}
                      setOpenUpdateAlert={setOpenUpdateAlert}
                    /> */}
                    {/* <DeleteStudentModal
                      id={data.id}
                      fetchStudents={fetchStudents}
                      setOpenDeleteAlert={setOpenDeleteAlert}
                    /> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
        <AddAdminStudentModal
          open={open}
          handleOpen={handleOpen}
          fetchStudents={fetchStudents}
          setOpenAlert={setOpenAlert}
        />

        <Alert
          open={openAlert}
          onClose={() => setOpenAlert(false)}
          color="light-green"
          className="fixed top-5 right-5 w-72"
          animate={{ mount: { x: 0 }, unmount: { x: 50 } }}
        >
          Student has been added successfully!
        </Alert>

        <Alert
          open={openUpdateAlert}
          onClose={() => setOpenUpdateAlert(false)}
          color="light-green"
          className="fixed top-5 right-5 w-72"
          animate={{ mount: { x: 0 }, unmount: { x: 50 } }}
        >
          Updates were successful!
        </Alert>
        <Alert
          open={openDeleteAlert}
          onClose={() => setOpenDeleteAlert(false)}
          color="red"
          className="fixed top-5 right-5 w-72"
          animate={{ mount: { x: 0 }, unmount: { x: 50 } }}
        >
          Student has been deleted successfully!
        </Alert>
      </main>
    </>
  );
}

export default AdminStudentPage;
