export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Professional Home Services</h1>
        <p className="text-xl md:text-2xl mb-8">AC Repair | Plumbing | Cleaning</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="tel:+920000000000"
            className="bg-white text-primary px-6 py-3 rounded font-bold text-lg hover:bg-gray-100 transition-colors"
          >
            📞 Call Now
          </a>
          <a
            href="#chat"
            className="bg-teal-700 text-white px-6 py-3 rounded font-bold text-lg hover:bg-teal-800 transition-colors border border-teal-600"
          >
            💬 Chat Now
          </a>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-5xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="text-5xl mb-4">❄️</div>
            <h3 className="text-2xl font-semibold mb-2">AC Repair</h3>
            <p className="text-gray-600 mb-4">Expert repair for Split, Inverter, and Window ACs.</p>
            <p className="font-bold text-primary">Est. 2,000 - 8,000 PKR</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="text-5xl mb-4">🔧</div>
            <h3 className="text-2xl font-semibold mb-2">Plumbing</h3>
            <p className="text-gray-600 mb-4">Quick fixes for pipe leaks, fittings, and drains.</p>
            <p className="font-bold text-primary">Est. 1,500 - 6,000 PKR</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 text-center">
            <div className="text-5xl mb-4">🧹</div>
            <h3 className="text-2xl font-semibold mb-2">Cleaning</h3>
            <p className="text-gray-600 mb-4">Deep cleaning for homes and offices.</p>
            <p className="font-bold text-primary">Est. 3,000 - 10,000 PKR</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center mt-10">
        <p>&copy; 2026 Home Services. All rights reserved.</p>
      </footer>
    </main>
  );
}
