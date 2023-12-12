function App() {

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-blue-500 py-4 text-white text-center">
        <h1 className="text-3xl font-bold">PathfinderQuiz</h1>
        <div className="mt-2">
          <a href="/login" className="mx-2 hover:underline">Login</a>
          <a href="/register" className="mx-2 hover:underline">Register</a>
          <a href="/logout" className="mx-2 hover:underline">Logout</a>
          <a href="/resources" className="mx-2 hover:underline">Resources</a>
          <a href="/classes" className="mx-2 hover:underline">Classes</a>
          <a href="/categories" className="mx-2 hover:underline">Categories</a>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto mt-8 p-6">
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Advantages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Advantage Card 1 */}
            <div className="p-4 border border-gray-300 rounded-md bg-white">
              <div className="rounded-full bg-gray-200 p-3 mb-4 mx-auto">
                <svg className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {/* SVG path for advantage icon 1 */}
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">No custom CSS</h3>
              <p className="text-sm">Lorem</p>
            </div>

            {/* Advantage Card 2 */}
            <div className="p-4 border border-gray-300 rounded-md bg-white">
              <div className="rounded-full bg-gray-200 p-3 mb-4 mx-auto">
                <svg className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {/* SVG path for advantage icon 2 */}
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Developer Experience</h3>
              <p className="text-sm">Lorem</p>
            </div>

            {/* Advantage Card 3 */}
            <div className="p-4 border border-gray-300 rounded-md bg-white">
              <div className="rounded-full bg-gray-200 p-3 mb-4 mx-auto">
                <svg className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {/* SVG path for advantage icon 3 */}
                </svg>
              </div>
              <h3 className="text-lg font-bold mb-2">Mobile Friendly</h3>
              <p className="text-sm">Lorem</p>
            </div>
          </div>
        </section>
        {/* Example: Displaying classes */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Classes</h2>
          {/* Display your classes here */}
        </section>

        {/* Example: Displaying categories */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Categories</h2>
          {/* Display your categories here */}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 py-4 text-white text-center">
        <p>&copy; 2023 PathfinderQuiz. All rights reserved.</p>
      </footer>
    </div>
 );
}
export default App;