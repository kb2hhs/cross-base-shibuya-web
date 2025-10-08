function Hero() {
  return (
    <div className="w-full md:px-10">
      <section
        className="
          relative w-full h-[33vh] md:h-[50vh] 
          flex items-center justify-center overflow-hidden
          md:max-w-4xl md:mx-auto md:rounded-lg"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-main.webp')", animation: 'kenburns 15s ease-in-out infinite alternate' }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="section-heading" style={{
              textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)'
            }}>
            Cross Base Shibuya
          </h1>
        </div>
      </section>
    </div>
  );
}

export default Hero;
