import React from 'react';
import GlitchImage from './GlitchImage';

const HeroSection = () => {
  return (
    <section className="relative w-full h-screen bg-black">
      {/* グリッチ画像コンポーネントを配置 */}
      <div className="absolute inset-0">
        <GlitchImage src="/hero-main.png" alt="Interior view of the property" />
      </div>

      {/* ヒーローセクションのテキストコンテンツ */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white p-4">
        <h1 className="text-5xl md:text-7xl font-orbitron text-neon-cyan uppercase drop-shadow-[0_0_10px_#00FFFF]">
          Dive into the Future
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;