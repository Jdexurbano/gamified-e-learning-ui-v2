import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useState } from "react";
import { FaPenToSquare } from "react-icons/fa6";
import axios from "axios";
import { PORT } from "../../../utils/constant";
function UpdateTeacherModal({ data, fetchTeachers, id, setOpenUpdateAlert }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [firstName, setFirstName] = useState(data.first_name);
  const [lastName, setLastName] = useState(data.last_name);
  const [middleInitial, setMiddleInitial] = useState(data.middle_initial);
  const [studentNumber, setStudentNumber] = useState(data.student_No);
  const [age, setAge] = useState(data.age);
  const [address, setAddress] = useState(data.address);
  const [username, setUsername] = useState(data.username);

  const handleUpdateTeacher = async (e) => {
    e.preventDefault();

    const payload = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      middle_initial: middleInitial,
      age: age,
      student_No: studentNumber,
      address: address,
    };

    try {
      const response = await axios.put(`${PORT}/teachers/${id}`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchTeachers();
      setOpenUpdateAlert(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Button size="sm" color="deep-purple" onClick={handleOpen}>
        <FaPenToSquare size={12} />
      </Button>

      <Dialog
        open={open}
        handler={handleOpen}
        className="flex items-center justify-center"
      >
        <div className="w-full max-w-md px-4 py-6 bg-white rounded-xl shadow-md">
          <DialogHeader>
            <p className="text-lg font-semibold text-purple-800 text-center">
              Update Teacher
            </p>
          </DialogHeader>
          <DialogBody>
            <form
              onSubmit={handleUpdateTeacher}
              id="updateStudent"
              className="flex flex-col gap-4"
            >
              <div>
                <Input
                  required
                  label="First Name"
                  color="purple"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <Input
                  required
                  label="Last Name"
                  color="purple"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <Input
                  required
                  label="Middle Name"
                  color="purple"
                  value={middleInitial}
                  onChange={(e) => setMiddleInitial(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  required
                  label="Student Number"
                  color="purple"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                />
                <Input
                  required
                  label="Age"
                  color="purple"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <Input
                  required
                  label="Address"
                  color="purple"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <Input
                  required
                  label="Username"
                  color="purple"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </form>
          </DialogBody>
          <DialogFooter>
            <div className="flex justify-end gap-4">
              <Button
                variant="text"
                color="purple"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
                variant="gradient"
                color="deep-purple"
                form="updateStudent"
                type="submit"
                onClick={handleOpen}
              >
                <span>Confirm</span>
              </Button>
            </div>
          </DialogFooter>
        </div>
      </Dialog>
    </>
  );
}

export default UpdateTeacherModal;
