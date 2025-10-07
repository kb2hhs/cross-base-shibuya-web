function Location() {
  return (
    <section className="py-8 md:py-12 px-6 md:px-10 max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-orbitron font-bold tracking-wide text-white uppercase mb-8 md:mb-12">
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
          2-25-17 Dogenzaka, Shibuya-ku, Tokyo 150-0043
          <br />
          東京都渋谷区道玄坂2-25-17
        </p>
      </div>

      <div className="w-full aspect-video overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.4947347842643!2d139.69738731525822!3d35.65844638019742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188b5e9b2e3b45%3A0x3b0b3b0b0b0b0b0b!2s2-ch%C5%8Dme-25-17%20D%C5%8Dgenzaka%2C%20Shibuya%20City%2C%20Tokyo%20150-0043!5e0!3m2!1sen!2sjp!4v1234567890123!5m2!1sen!2sjp"
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
