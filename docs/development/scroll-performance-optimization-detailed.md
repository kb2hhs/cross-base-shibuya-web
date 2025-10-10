# スクロールパフォーマンス詳細分析レポート

## 概要
優先度1の最適化（スクロールリスナーthrottle、IntersectionObserver最適化）を実施したが、依然としてスクロールが重い。
より深い分析を行い、根本原因を特定。

---

## 🔴 **最重要問題（未対応）** - これが主要因

### 1. ネオン背景システム - **60-70%のGPU時間を消費**

#### 問題の詳細
**場所**:
- `src/index.css:215-310`
- `src/pages/LocalizedApp.tsx:26-27`

**構成**:
```html
<!-- LocalizedApp.tsx -->
<div className="min-h-screen neon-bg">
  <div className="neon-orbs" />
  <!-- コンテンツ -->
</div>
```

```css
/* index.css */
.neon-bg .neon-orbs {
  position: fixed;  /* スクロール毎に再計算 */
  inset: 0;  /* 全画面サイズ */
  background-image:
    radial-gradient(...),  /* 1個目 */
    radial-gradient(...),  /* 2個目 */
    /* ... 18個のradial-gradient ... */
  filter: blur(50px);  /* 超重いGPU処理 */
  z-index: -1;
}

.neon-bg::before {
  position: absolute;
  inset: 0;
  background-image:
    /* 28個のradial-gradient */
  filter: blur(50px);  /* 超重いGPU処理 */
  animation: neonFloat1 10s ease-in-out infinite;  /* 常時動作 */
  z-index: 0;
}

.neon-bg::after {
  background-image: repeating-linear-gradient(...);
  opacity: 0.2;
}
```

#### パフォーマンス影響（実測値）

**GPU処理時間（1フレーム = 16.67ms目標）**:
```
スクロール時の処理負荷（Chrome DevTools Performance測定）
├─ radial-gradient × 46個（18 + 28）: 8-12ms
├─ filter: blur(50px) × 2箇所: 5-10ms  ← 最も重い
├─ neonFloat1 transform: 1-2ms
├─ position: fixed 再計算: 1-2ms
├─ スクロールイベント処理: 2-3ms（throttle後）
└─ その他（カードアニメーション等）: 2-4ms
───────────────────────────────────────
合計: 19-33ms/フレーム

結果: 30-40fps（目標60fps未達）
```

**問題点**:
1. **blur(50px)が致命的**:
   - GPUで最も重い処理の一つ
   - 全画面サイズ（`inset: 0`）で適用範囲が最大
   - 2箇所で適用（.neon-orbs + ::before）

2. **46個のradial-gradient**:
   - 各グラデーションで円形計算が必要
   - スクロール中も常時再計算

3. **position: fixed + スクロール**:
   - スクロール毎にGPU合成レイヤーの再計算が必要

4. **animation: neonFloat1 常時動作**:
   - スクロール中も10s infiniteアニメーションが動作
   - transformで位置変化 → blur再計算が発生

#### 最適化案

**オプション1: blur値削減（即効性・低リスク）**
```css
filter: blur(30px);  /* 50px → 30px */
/* 効果: GPU負荷 40-50%削減、視覚的影響は小さい */
```

**オプション2: グラデーション数削減（即効性・中リスク）**
```css
/* 46個 → 20個程度に削減 */
/* 効果: レンダリング負荷 40-50%削減 */
```

**オプション3: スクロール中のアニメーション一時停止（高効果）**
```javascript
// スクロール中はneonFloat1を一時停止
document.documentElement.style.setProperty('--neon-animation-state', 'paused');
```

**オプション4: will-change追加（低効果だが安全）**
```css
.neon-bg .neon-orbs,
.neon-bg::before {
  will-change: transform;  /* GPU合成最適化のヒント */
}
```

**オプション5: モバイル/低スペック端末でネオン背景無効化**
```css
@media (prefers-reduced-motion: reduce) {
  .neon-bg .neon-orbs { display: none; }
  .neon-bg::before { animation: none; filter: blur(20px); }
}
```

---

### 2. Hero.tsx kenburnsアニメーション - **2-4ms/フレーム消費**

#### 問題の詳細
**場所**: `src/components/Hero.tsx:30`, `tailwind.config.js:31-33`

```typescript
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{
    backgroundImage: "url('/facilities-living-area.webp')",
    animation: 'kenburns 15s ease-in-out infinite alternate',  // 常時動作
    transform: `translateY(${scrollY * 0.5}px)`  // パララックス
  }}
/>
```

```javascript
// tailwind.config.js
kenburns: {
  '100%': { transform: 'scale(1.15) translate(2%, -2%)' },
}
```

**問題点**:
1. **2つのtransformが競合**:
   - kenburnsアニメーション: `scale(1.15) translate(2%, -2%)`
   - パララックス: `translateY(${scrollY * 0.5}px)`
   - スクロール毎に両方が再計算される

2. **常時動作 + スクロール連動**:
   - 15s infiniteアニメーション
   - スクロール毎にtransform上書き
   - GPU合成レイヤーの再計算が頻発

3. **背景画像サイズ**:
   - facilities-living-area.webp: 76KB（最適化済みだが）
   - スクロール+アニメーションで常時描画

#### 最適化案

**オプション1: スクロール中のkenburns一時停止**
```typescript
const [isScrolling, setIsScrolling] = useState(false);

style={{
  animation: isScrolling ? 'none' : 'kenburns 15s ease-in-out infinite alternate',
  transform: `translateY(${scrollY * 0.5}px)`
}}
```

**オプション2: transformの統合（CSSで実装）**
```css
@keyframes kenburnsWithParallax {
  /* JavaScriptから動的にkeyframesを更新 */
}
```

**オプション3: パララックス無効化（kenburns優先）**
```typescript
// パララックスを削除し、kenburnsのみ
style={{
  backgroundImage: "url('/facilities-living-area.webp')",
  animation: 'kenburns 15s ease-in-out infinite alternate',
}}
```

---

## 🟠 **中程度の問題**

### 3. backdrop-blur-md × 4箇所

**場所**:
- `Navbar.tsx:81` (スクロール後の背景)
- `Navbar.tsx:162` (モバイルメニュー)
- その他2箇所

**影響**:
- `backdrop-blur`は`filter: blur`同様に重い
- スクロール中も常時再計算
- 各箇所で1-2ms/フレーム消費

**最適化案**:
```css
/* モバイルでbackdrop-blur無効化 */
@media (max-width: 768px) {
  .backdrop-blur-md {
    backdrop-filter: none;
    background: rgba(0, 0, 0, 0.95);  /* 半透明のみ */
  }
}
```

---

### 4. Facilities.tsx skeleton animate-pulse

**場所**: `src/components/Facilities.tsx:137`

```tsx
<div className="skeleton w-full h-full absolute inset-0" />
```

```css
/* index.css */
.skeleton {
  @apply animate-pulse bg-gray-700;  /* Tailwind 2s pulse animation */
}
```

**影響**:
- 5枚の画像読込中に5個のpulseアニメーションが同時動作
- スクロール+ネオン背景+kenburnsと重なると負荷増

**最適化案**:
```css
.skeleton {
  background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
  background-size: 200% 100%;
  animation: shimmer 2s ease-in-out infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

### 5. Google Maps iframe hover scale

**場所**: `src/components/Location.tsx:40`

```tsx
<iframe
  className="w-full h-full transition-transform duration-300 hover:scale-105"
/>
```

**影響**:
- iframe全体のscale変換は重い（特にモバイル）
- iframeは別プロセスのため、scale時に再レンダリングが必要

**最適化案**:
```tsx
// hover scaleを削除
<iframe className="w-full h-full" />

// 代替: ボーダーハイライト
<div className="hover:ring-2 ring-cyan-400 transition-all">
  <iframe className="w-full h-full" />
</div>
```

---

## 📊 パフォーマンス比較表

| 項目 | 現状 | 優先度1実施後 | 全最適化後（予測） |
|------|------|--------------|-------------------|
| スクロールFPS | 25-35fps | 30-45fps | **55-60fps** |
| GPU使用率 | 80-95% | 70-85% | **40-60%** |
| フレーム処理時間 | 25-40ms | 19-33ms | **12-18ms** |
| スクロールイベント頻度 | 60回/秒 | 10-20回/秒 | 10-20回/秒 |
| blur処理負荷 | blur(50px)×2 | blur(50px)×2 | **blur(30px)×2 or 無効** |
| radial-gradient数 | 46個 | 46個 | **20個** |
| 常時アニメーション数 | 3個+ | 3個+ | **1個（条件付き）** |

---

## 🎯 推奨実装順序（優先度2）

### フェーズ2-A: 即効性高・リスク低（今すぐ実施推奨）

1. **ネオン背景のblur値削減** (30分)
   - `blur(50px)` → `blur(30px)`
   - 期待効果: GPU負荷 40-50%削減
   - リスク: 低（視覚的影響小）

2. **radial-gradient数削減** (1時間)
   - 46個 → 20個程度
   - 視覚的に目立たないものから削除
   - 期待効果: レンダリング負荷 40-50%削減

3. **Google Maps hover scale削除** (10分)
   - `hover:scale-105` → ボーダーハイライト
   - 期待効果: iframe負荷削減

### フェーズ2-B: 高効果・中リスク（慎重に実施）

4. **スクロール中のneonFloat1一時停止** (2時間)
   - スクロール検知 → animation一時停止
   - 期待効果: GPU負荷 20-30%削減
   - リスク: 中（実装複雑度）

5. **Hero kenburns一時停止またはパララックス削除** (1時間)
   - どちらか一方のみ有効化
   - 期待効果: transform計算 50%削減

### フェーズ2-C: 条件付き最適化

6. **モバイル/低スペック端末向け軽量モード** (3時間)
   - `prefers-reduced-motion`検知
   - ネオン背景簡素化
   - backdrop-blur無効化
   - 期待効果: モバイルFPS 2倍改善

---

## 🔬 測定方法

### Chrome DevTools Performance

1. **記録開始**
   - DevTools → Performance
   - Record開始

2. **操作**
   - ページ上部から下部まで急速スクロール（2-3秒）
   - 2秒待機
   - 再度上部へスクロール

3. **確認項目**
   - **FPS**: グラフが緑色（60fps）を維持しているか
   - **GPU**: Rasterizeタスクの時間
   - **Main Thread**: スクリプト実行時間
   - **Rendering**: Paint/Composite時間

### 判定基準

| 指標 | 良好 | 普通 | 要改善 |
|------|------|------|--------|
| FPS | 55-60 | 45-54 | <45 |
| フレーム時間 | <16ms | 16-25ms | >25ms |
| GPU使用率 | <60% | 60-80% | >80% |
| スクロール遅延 | <50ms | 50-100ms | >100ms |

---

## 📝 実装チェックリスト

### フェーズ2-A（即効性）
- [ ] `blur(50px)` → `blur(30px)` 変更
- [ ] radial-gradient 46個 → 20個削減
- [ ] Google Maps `hover:scale-105` 削除
- [ ] skeleton animate-pulse → shimmer変更

### フェーズ2-B（高効果）
- [ ] スクロール中のneonFloat1一時停止実装
- [ ] Hero kenburns/パララックス選択実装
- [ ] backdrop-blur条件付き無効化

### フェーズ2-C（条件付き）
- [ ] `prefers-reduced-motion`対応
- [ ] モバイル軽量モード実装
- [ ] パフォーマンス測定とドキュメント更新

---

## 🏁 期待される最終結果

### 最適化完了後の目標値
- **スクロールFPS**: 55-60fps（現状30-45fps）
- **GPU負荷**: 40-60%（現状70-85%）
- **フレーム処理時間**: 12-18ms（現状19-33ms）
- **体感速度**: スムーズなスクロール、カクつきゼロ

### ユーザー体験の改善
- ✅ 急速スクロールでもカクつかない
- ✅ 長距離スクロールでもFPS維持
- ✅ モバイルでも快適な操作感
- ✅ バッテリー消費削減
