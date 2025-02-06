import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { PORT } from "../../../utils/constant";

function AddAdminStudentModal({
  open,
  handleOpen,
  fetchStudents,
  setOpenAlert,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleInitial, setMiddleInitial] = useState("");
  const [studentNumber, setStudentNumber] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teachers, setTeachers] = useState([{ name: "lorane" }]);

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setMiddleInitial("");
    setStudentNumber("");
    setAge("");
    setAddress("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setSelectedTeacher("");
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`${PORT}/teachers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setTeachers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      first_name: firstName,
      last_name: lastName,
      middle_initial: middleInitial,
      student_No: studentNumber,
      age: age,
      address: address,
      role: "student",
      username: username,
      password: password,
      password_confirmation: confirmPassword,
      teacher_id: selectedTeacher,
    };

    try {
      const response = await axios.post(`${PORT}/admin/students`, payload, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchStudents();

      setOpenAlert(true);
      clearFields();
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        className="flex items-center justify-center"
      >
        <div className="w-full max-w-md px-4 py-6 bg-white rounded-xl shadow-md">
          <DialogHeader>
            <p className="text-lg font-semibold text-purple-800 text-center">
              Add Student
            </p>
          </DialogHeader>
          <DialogBody>
            <form
              id="addStudent"
              onSubmit={handleSubmit}
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
              <div>
                <Input
                  required
                  label="Student Number"
                  color="purple"
                  value={studentNumber}
                  onChange={(e) => setStudentNumber(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  required
                  label="Age"
                  color="purple"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
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
              <div className="grid grid-cols-2 gap-4">
                <Input
                  required
                  label="Password"
                  color="purple"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  required
                  label="Confirm Password"
                  color={`${
                    confirmPassword
                      ? confirmPassword !== password
                        ? "red"
                        : "green"
                      : "purple"
                  }`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-purple-700 mb-1 block">
                  Select Teacher
                </label>
                <select
                  required
                  value={selectedTeacher}
                  onChange={(e) => setSelectedTeacher(e.target.value)}
                  className="w-full border border-purple-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring focus:ring-purple-200 overflow-y-auto"
                >
                  <option value="" disabled>
                    Choose a teacher
                  </option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.first_name}
                    </option>
                  ))}
                </select>
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
                form="addStudent"
                type="submit"
                disabled={password !== confirmPassword}
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

export default AddAdminStudentModal;
