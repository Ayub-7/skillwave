import SideNav from '@/app/ui/dashboard/sidenav';
import UserAvatar from '@/app/ui/user-avatar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="relative flex-grow p-6 md:overflow-y-auto md:p-12">
        <div className="absolute right-0 top-0 m-4">
          <UserAvatar />
        </div>
        {children}
      </div>
    </div>
  );
}
