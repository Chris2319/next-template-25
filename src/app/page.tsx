import Link from "next/link";

export default function Index() {
  return (
      <>
        <div>Index</div>
        <Link href="/home">Home</Link>
        <Link href="/test">Test</Link>
      </>
  );
}
