import Hero from './components/Hero';
import Facilities from './components/Facilities';
import Location from './components/Location';
import BookingButton from './components/BookingButton';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <Hero />
      <Facilities />
      <Location />
      <BookingButton />
    </div>
  );
}

export default App;
