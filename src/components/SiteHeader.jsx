import Link from 'next/link'

export default function SiteHeader() {
  return (
    <header className="flex items-center justify-between border-b border-[#ededed] px-6 py-4 md:px-10">
      <Link href="/" className="font-head text-lg font-extrabold text-geru">◆ Aipan House</Link>
      <nav className="hidden gap-5 font-sans text-[13px] font-semibold text-slate-soft md:flex">
        <Link href="/aipan" className="hover:text-geru">Aipan</Link>
        <Link href="/festivals" className="hover:text-geru">Festivals</Link>
        <Link href="/traditions" className="hover:text-geru">Traditions</Link>
        <Link href="/about" className="hover:text-geru">About</Link>
      </nav>
    </header>
  )
}
