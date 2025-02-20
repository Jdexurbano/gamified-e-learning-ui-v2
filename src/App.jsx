import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import StudentLayout from "./shared/components/layouts/student/StudentLayout";
import TeacherLayout from "./shared/components/layouts/teacher/TeacherLayout";
import NotFoundPage from "./pages/public/NotFoundPage";
import LoginPage from "./pages/public/LoginPage";
import TeacherHomePage from "./pages/teacher/TeacherHomePage";
import StudentHomePage from "./pages/student/home/StudentHomePage";
import StudentAnnouncementPage from "./pages/student/announcement/StudentAnnouncementPage";
import TeacherStudentListPage from "./pages/teacher/TeacherStudentListPage";
import TeacherAnnouncementPage from "./pages/teacher/announcement/TeacherAnnouncementPage";
import TeacherCoursesPage from "./pages/teacher/courses/TeacherCoursesPage";
import AdminLayout from "./shared/components/layouts/admin/AdminLayout";
import AdminTeacherListPage from "./pages/admin/teacher/AdminTeacherListPage";
import AdminHomePage from "./pages/admin/home/AdminHomePage";
import AdminAnnouncementPage from "./pages/admin/announcement/AdminAnnouncementPage";
import AdminCoursesPage from "./pages/admin/courses/AdminCoursesPage";
import AdminStudentPage from "./pages/admin/student/AdminStudentPage";
import FindMissingLetter from "./pages/games/FindMissingLetter";
import NameTheColor from "./pages/games/NameTheColor";
import CountTheFruit from "./pages/games/CountTheFruit";
import StudentLessonsPage from "./pages/student/lessons/StudentLessonsPage";
import WatchVideo from "./pages/student/lessons/WatchVideo";
import TeacherLessonsPage from "./pages/teacher/lessons/TeacherLessonsPage";
import ActivityHistoryPage from "./pages/student/acitivity_history/ActivityHistoryPage";
import FruitLesson from "./pages/student/lesson/FruitLesson";
import StudentMainLessonPage from "./pages/student/lesson/StudentMainLessonPage";
import TeacherLeaderBoard from "./pages/teacher/leaderboard/TeacherLeaderBoard";
function App() {
  return (
    <>
      <Routes>
        {/* student routes */}
        <Route element={<StudentLayout />}>
          <Route path="student/home" element={<StudentHomePage />} />
          <Route
            path="student/announcement"
            element={<StudentAnnouncementPage />}
          />
          <Route path="student/videos" element={<StudentLessonsPage />} />
          <Route path="student/watch/:videoId" element={<WatchVideo />} />

          <Route path="student/history" element={<ActivityHistoryPage />} />
          <Route path="student/lessons" element={<StudentMainLessonPage />} />
          <Route path="student/fruitlesson" element={<FruitLesson />} />
        </Route>

        {/* teachers route */}
        <Route element={<TeacherLayout />}>
          <Route path="teacher/home" element={<TeacherHomePage />} />
          <Route path="teacher/student" element={<TeacherStudentListPage />} />
          <Route
            path="teacher/announcement"
            element={<TeacherAnnouncementPage />}
          />
          <Route path="teacher/courses" element={<TeacherCoursesPage />} />
          <Route path="teacher/leaderboard" element={<TeacherLeaderBoard />} />
          <Route path="teacher/videos" element={<TeacherLessonsPage />} />
        </Route>

        {/* admin routes */}
        <Route element={<AdminLayout />}>
          <Route path="admin/home" element={<AdminHomePage />} />
          <Route path="admin/teacher" element={<AdminTeacherListPage />} />
          <Route
            path="admin/announcement"
            element={<AdminAnnouncementPage />}
          />
          <Route path="admin/courses" element={<AdminCoursesPage />} />
          <Route path="admin/student" element={<AdminStudentPage />} />
        </Route>

        {/* game routes */}
        <Route path="FML" element={<FindMissingLetter />} />
        <Route path="NTC" element={<NameTheColor />} />
        <Route path="CTF" element={<CountTheFruit />} />

        {/* public route */}
        <Route path="/" element={<LoginPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
