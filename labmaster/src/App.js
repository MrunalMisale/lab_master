import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddLab from "./Components/Admin/AddLab";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import AdminLabDisplay from "./Components/Admin/AdminLabDisplay";
import AdminViewLab from "./Components/Admin/AdminViewLab";
import DeleteLab from "./Components/Admin/DeleteLab";
import DeleteUser from "./Components/Admin/DeleteUser";
import EnrollUser from "./Components/Admin/EnrollUser";
import ReportGeneration from "./Components/Admin/ReportGeneration";
import AdminAccess from "./Components/AuthPermission/AdminAccess";
import InchargeAccess from "./Components/AuthPermission/InchargeAccess";
import SystemAdminAccess from "./Components/AuthPermission/SystemAdminAccess";
import LandingPage from "./Components/HomePage/LandingPage";
import LabInchargeDashboard from "./Components/Lab_Incharge/LabInchargeDashBoard";
import LabSelection from "./Components/Lab_Incharge/LabSelection";
import LabViewIncharge from "./Components/Lab_Incharge/LabViewIncharge";
import ReportLabPage from "./Components/Lab_Incharge/ReportLabPC";
import ReportPage from "./Components/Lab_Incharge/ReportPage";
import LabConfiguration from "./Components/System_Admin/LabConfiguration";
import LabDisplayPage from "./Components/System_Admin/LabDisplayPage";
import LabView from "./Components/System_Admin/LabView";
import SystemAdminDashboard from "./Components/System_Admin/SystemAdminDashboard";
import ViewConfiguredLab from "./Components/System_Admin/ViewConfiguredLab";
import ViewEditLab from "./Components/System_Admin/ViewEditLab";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<LandingPage></LandingPage>}></Route>
        <Route element={<AdminAccess></AdminAccess>}>
          <Route path="/admin/dashboard" element={<AdminDashboard></AdminDashboard>}></Route>
          <Route path="/admin/dashboard/enroll-user" element={<EnrollUser></EnrollUser>}></Route>
          <Route path="/admin/dashboard/delete-user" element={<DeleteUser></DeleteUser>}></Route>
          <Route path="/admin/dashboard/add-lab" element={<AddLab></AddLab>}></Route>
          <Route path="/admin/dashboard/delete-lab" element={<DeleteLab></DeleteLab>}></Route>
          <Route path="/admin/dashboard/view-lab" element={<AdminLabDisplay></AdminLabDisplay>}></Route>
          <Route path="/admin/dashboard/view-lab/:id" element={<AdminViewLab></AdminViewLab>}></Route>
          <Route path="/admin/dashboard/report" element={<ReportGeneration></ReportGeneration>}></Route>
        </Route>
        <Route element={<InchargeAccess></InchargeAccess>}>
          <Route path="/incharge/dashboard" element={<LabInchargeDashboard></LabInchargeDashboard>}></Route>
          <Route path="/incharge/dashboard/lab" element={<ReportPage></ReportPage>}></Route>
          <Route path="/incharge/dashboard/lab/:id" element={<ReportLabPage></ReportLabPage>}></Route>
          <Route path="/incharge/dashboard/view" element={<LabSelection></LabSelection>}></Route>
          <Route path="/incharge/dashboard/view/:id" element={<LabViewIncharge></LabViewIncharge>}></Route>
        </Route>
        <Route element={<SystemAdminAccess></SystemAdminAccess>}>
          <Route path="/system_admin/dashboard" element={<SystemAdminDashboard></SystemAdminDashboard>}></Route>
          <Route path="/system_admin/dashboard/labs" element={<LabDisplayPage></LabDisplayPage>}></Route>
          <Route path="/system_admin/dashboard/labs/configure/:id" element={<LabConfiguration></LabConfiguration>}></Route>
          <Route path="/system_admin/dashboard/labs/configure/:id/view" element={<LabView></LabView>}></Route>
          <Route path="/system_admin/dashboard/labs/view" element={<ViewConfiguredLab></ViewConfiguredLab>}></Route>
          <Route path="/system_admin/dashboard/labs/view/:id" element={<ViewEditLab></ViewEditLab>}></Route>
        </Route>
      </Routes>

    </BrowserRouter>
  );
}
export default App;
