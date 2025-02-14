import { Route, Routes } from "react-router";
import HomePage from "../pages/home/home";
import AuthLayout from "../shared/ui/auth-layout";
import AppLayout from "@/shared/ui/app-layout";
// import SubscriptionsPageShort from "@/pages/subscribe/subscribe-page-short";
import LandingLayout from "@/shared/ui/landing-layout";
import LandingPage from "@/pages/landing/landing-page";
import LoginPage from "@/pages/auth/sign-in/login-page";
import RegisterPage from "@/pages/auth/sign-up/register-page";
import ProfilePage from "@/pages/auth/profile/profile";
import NotFound from "@/pages/not-found/not-found";
import MyBooking from "@/pages/my-booking/my-booking";
import CreateBookingPage from "@/pages/create-booking/create-booking-page";
import Authentication from "./providers/authenication-provider";
import EditBookingMultiStepForm from "@/feature/edit-booking-multi-step-form/ui/multi-step-form";
import SuccessPage from "@/pages/payment/payment-success";
import ErrorPage from "@/pages/payment/payment-failed";
import { BookingCardPage, BookingTablePage, MapPage } from "@/pages/home";
import ProposalsPage from "@/pages/proposals/proposals-page";

function App() {
  return (
    <Routes>
      <Route path="landing" element={<LandingLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      <Route element={<AppLayout />}>
        <Route path="" element={<HomePage />}>
          <Route path="table-view" element={<BookingTablePage />} />
          <Route path="map-view" element={<MapPage />} />
          <Route index element={<BookingCardPage />} />
        </Route>
        {/* <Route path="subscribe" element={<SubscriptionsPageShort />} /> */}
        <Route
          path="profile"
          element={
            <Authentication>
              <ProfilePage />
            </Authentication>
          }
        />
        <Route path="my-booking" element={<MyBooking />} />
        <Route
          path="edit-booking/:bookingId"
          element={
            <Authentication>
              <EditBookingMultiStepForm />
            </Authentication>
          }
        />
        <Route
          path="create-booking"
          element={
            <Authentication>
              <CreateBookingPage />
            </Authentication>
          }
        />
        <Route path="/payment-success" element={<SuccessPage />} />
        <Route path="/payment-failed" element={<ErrorPage />} />
        <Route
          path="/proposals"
          element={
            <Authentication>
              <ProposalsPage />
            </Authentication>
          }
        />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
