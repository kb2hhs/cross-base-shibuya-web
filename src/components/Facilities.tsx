function Facilities() {
  const rooms = [
    {
      image: '/facilities-bedroom-1.webp',
      title: 'Bedroom 1',
      description: '2 double beds and 1 futon bed',
    },
    {
      image: '/facilities-bedroom-2.webp',
      title: 'Bedroom 2',
      description: '3 double beds and 1 futon bed',
    },
    {
      image: '/facilities-living-area.webp',
      title: 'Living Area',
      description: '',
    },
  ];

  return (
    <section className="py-8 md:py-12 px-6 md:px-10 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-orbitron font-bold tracking-wide text-white uppercase mb-8 md:mb-12">
        Facilities
      </h2>

      <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-12 md:mb-16 max-w-2xl">
        Spacious apartment in the heart of Tokyo city centre with two bedrooms,
        two bathrooms, a comfortable living area and a fully equipped
        kitchenette.
      </p>

      <div className="space-y-12 md:space-y-16">
        {rooms.map((room, index) => (
          <div key={index} className="space-y-4">
            <div className="relative w-full aspect-[4/3] overflow-hidden">
              <img
                src={room.image}
                alt={room.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-orbitron font-semibold text-white tracking-wide mb-1">
                {room.title}
              </h3>
              {room.description && (
                <p className="text-sm md:text-base text-gray-400 font-light">
                  {room.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Facilities;
