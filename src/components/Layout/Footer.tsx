export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="container mx-auto px-4 py-4 text-xs opacity-70">
        © {new Date().getFullYear()} Signal from the Stars
      </div>
    </footer>
  )
}

