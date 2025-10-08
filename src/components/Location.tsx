function Location() {
  return (
    <section className="py-8 md:py-12 px-6 md:px-10 max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-5xl font-orbitron font-bold tracking-wide text-white uppercase mb-8 md:mb-12">
        Location
      </h2>

      <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-8 max-w-2xl">
        Just a 2-minute walk from Shibuya Station, Cross Base Shibuya is
        perfectly located near the iconic Hachiko Statue, the famous Shibuya
        Scramble Crossing, and Shibuya Center Town shopping district. Experience
        the vibrant heart of Tokyo at your doorstep.
      </p>

      <div className="mb-8">
        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
          <span className="font-orbitron font-semibold text-white">ADDRESS:</span>
          <br />
          WAVE Dogenzaka Bldg. 5F, 1-15-8 Dogenzaka, Shibuya-ku, Tokyo 150-0043
          <br />
          〒150-0043 東京都渋谷区道玄坂1-15-8 WAVE道玄坂ビル 5F
        </p>
      </div>

      <div className="w-full aspect-video overflow-hidden">
        <iframe
          src="https://maps.google.com/maps?hl=en&q=cross base shibuya&t=&z=15&ie=UTF8&iwloc=B&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Cross Base Shibuya Location"
          className="w-full h-full"
        />
      </div>
    </section>
  );
}

export default Location;
