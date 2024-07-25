import './App.css';

function App() {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: 'url(/background2.jpg)' }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative flex items-center flex-col justify-center min-h-screen">
        <h1 className="text-white text-4xl font-eczar">Quiz</h1> <br/>
        <p className="text-white text-lg font-catamaran">This is a sample text using the Catamaran font.</p>
      </div>
    </div>
  );
}

export default App;
