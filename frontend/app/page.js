import Link from 'next/link';
import './styles/globals.css';
export default function Home() {
  return (
    <>
      <h1>Homepage</h1>
      <Link href='/pages/products'>Product Page</Link>
    </>
  );
}
