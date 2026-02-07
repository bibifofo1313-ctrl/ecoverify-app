import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./layouts/AppLayout";
import { MarketingPage } from "./pages/Marketing";
import { DashboardPage } from "./pages/app/Dashboard";
import { OnboardingPage } from "./pages/app/Onboarding";
import { NotFoundPage } from "./pages/NotFound";

export const App = () => (
  <Routes>
    <Route path="/" element={<MarketingPage />} />
    <Route path="/app" element={<AppLayout />}>
      <Route index element={<Navigate to="/app/dashboard" replace />} />
      <Route path="onboarding" element={<OnboardingPage />} />
      <Route path="dashboard" element={<DashboardPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);
