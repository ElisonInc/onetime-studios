export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-violet-50 to-white">
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">OneTime Studios</h1>
          <nav className="flex gap-4">
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Sign In</button>
            <button className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700">Get Started</button>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-24">
        <section className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">🟢 1,240 studios available now</span>
          </div>
          <h2 className="text-6xl font-bold text-gray-900 mb-6">
            Book studio space in <span className="text-violet-600">under 2 minutes</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Real availability. Instant confirmation. No back-and-forth.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-violet-600 text-white rounded-lg hover:bg-violet-700">
              Search Studios
            </button>
            <button className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
              List Your Studio
            </button>
          </div>
        </section>

        <section className="bg-white rounded-xl border p-12 mt-16">
          <h3 className="text-3xl font-bold text-center mb-12">Why Artists Choose OneTime</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {["Real-time Availability", "Instant Booking", "Secure Payments"].map((feature) => (
              <div key={feature} className="text-center">
                <h4 className="text-lg font-semibold mb-2">{feature}</h4>
                <p className="text-gray-600">Experience seamless studio booking.</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>© 2024 OneTime Studios. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
