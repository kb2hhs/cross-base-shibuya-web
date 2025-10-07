import React from 'react';

/**
 * 画像にグリッチエフェクトを適用するコンポーネント。
 * マウスホバー時にエフェクトが作動します。
 * @param {object} props - コンポーネントのプロパティ
 * @param {string} props.src - 画像のソースURL
 * @param {string} props.alt - 画像のaltテキスト
 */
const GlitchImage = ({ src, alt }) => {
  return (
    <div className="relative group overflow-hidden w-full h-full" role="img" aria-label={alt}>
      {/* メイン画像 */}
      <div
        style={{ backgroundImage: `url(${encodeURI(src)})` }}
        className="absolute inset-0 w-full h-full bg-contain bg-no-repeat bg-center"
      ></div>

      {/* グリッチレイヤー1 */}
      <div
        style={{ backgroundImage: `url(${encodeURI(src)})` }}
        className="
          absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-center
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          animate-glitch-top
          [clip-path:polygon(0_0,100%_0,100%_33%,0_33%)]
        "
        aria-hidden="true"
      ></div>

      {/* グリッチレイヤー2 */}
      <div
        style={{ backgroundImage: `url(${encodeURI(src)})` }}
        className="
          absolute top-0 left-0 w-full h-full bg-contain bg-no-repeat bg-center
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
          animate-glitch-bottom
          [clip-path:polygon(0_66%,100%_66%,100%_100%,0_100%)]
        "
        aria-hidden="true"
      ></div>
    </div>
  );
};

export default GlitchImage;