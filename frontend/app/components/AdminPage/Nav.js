'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const inactiveLink = ' flex items-center gap-2 p-2 rounded-xl hover:bg-white';
  const activeLink = inactiveLink + ' flex items-center bg-white shadow-xl';
  const pathname = usePathname();
//   const pathname = router
//   console.log(pathname)
  return (
    <aside className="text-slate-700 font-bold p-4">
      <Link href="/admin" className="flex items-center gap-4">
        <img src="/images/logo.png" alt="logo" className="w-10 h-10" />
        <span>Admin Dash</span>
      </Link>
      <nav className="text-gray-500 flex flex-col gap-3 mt-4">
        <Link
          href="/admin"
          className={pathname === '/admin' ? activeLink : inactiveLink}
        >
          <img src="/images/dashboard.png" className="h-5 w-5" />
          DASHBOARD
        </Link>
        <Link
          href="/admin/products"
          className={
            pathname.includes('/admin/products') ? activeLink : inactiveLink
          }
        >
          <img src="/images/product.png" />
          PRODUCTS
        </Link>
        <Link
          href="/admin/orders"
          className={
            pathname.includes('/admin/orders') ? activeLink : inactiveLink
          }
        >
          <img src="/images/order.png" className="h-5 w-5" />
          ORDERS
        </Link>
        <Link
          href="/admin/categories"
          className={
            pathname.includes('/admin/categories') ? activeLink : inactiveLink
          }
        >
          <img src="/images/categories.png" className="h-5 w-5" />
          CATEGORIES
        </Link>
        <Link
          href="/admin/adminlist"
          className={
            pathname.includes('/admin/adminlist') ? activeLink : inactiveLink
          }
        >
          <img src="/images/admin.png" className="h-5 w-5" />
          ADMIN
        </Link>
      </nav>
    </aside>
  );
}
