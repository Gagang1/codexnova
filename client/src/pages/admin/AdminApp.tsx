import type { ReactNode } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AdminLayout } from '@/layouts/AdminLayout';
import { PageLoader } from '@/components/ui/PageLoader';
import LoginPage from '@/pages/admin/LoginPage';
import DashboardPage from '@/pages/admin/DashboardPage';
import { AdminResourcePage } from '@/pages/admin/AdminResourcePage';

function Guard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!user) return <Navigate to="/admin/login" replace />;
  return children;
}

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route
          element={
            <Guard>
              <AdminLayout />
            </Guard>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="courses" element={<AdminResourcePage resource="courses" />} />
          <Route path="categories" element={<AdminResourcePage resource="categories" />} />
          <Route path="students" element={<AdminResourcePage resource="students" />} />
          <Route path="enrollments" element={<AdminResourcePage resource="enrollments" />} />
          <Route path="inquiries" element={<AdminResourcePage resource="inquiries" />} />
          <Route path="faculty" element={<AdminResourcePage resource="instructors" />} />
          <Route path="projects" element={<AdminResourcePage resource="projects" />} />
          <Route path="events" element={<AdminResourcePage resource="events" />} />
          <Route path="blog" element={<AdminResourcePage resource="blog" />} />
          <Route path="testimonials" element={<AdminResourcePage resource="testimonials" />} />
          <Route path="faqs" element={<AdminResourcePage resource="faqs" />} />
          <Route path="settings" element={<AdminResourcePage resource="settings" />} />
        </Route>
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </AuthProvider>
  );
}
