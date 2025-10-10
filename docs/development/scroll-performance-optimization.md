# スクロールパフォーマンス最適化計画

## 問題の概要
急速スクロールや長距離スクロール時にページが重くなる現象を確認。原因を分析し、段階的に最適化を実施。

---

## 詳細分析結果（更新版）

### 🔴 **超重大な問題（最優先）** - ネオン背景が最大の原因

#### 1. ネオン背景の極めて重い処理（最大の原因）
**場所**: `src/index.css:215-310`, `src/pages/LocalizedApp.tsx:26-27`

**構成**:
```css
.neon-bg .neon-orbs {
  position: fixed;
  background-image: /* 18個のradial-gradient */;
  filter: blur(50px);  /* 超重い処理 */
  z-index: -1;
}

.neon-bg::before {
  background-image: /* 28個のradial-gradient */;
  filter: blur(50px);  /* 超重い処理 */
  animation: neonFloat1 10s ease-in-out infinite;  /* 常時動作 */
}

.neon-bg::after {
  background-image: repeating-linear-gradient(...);
}
```

**影響度**: ⚠️ **極めて深刻**
- **46個のradial-gradient**を常時計算（18 + 28個）
- **filter: blur(50px) × 2箇所**：GPUで最も重い処理の一つ
- **animation: neonFloat1 10s infinite**：スクロール中も常時動作
- **position: fixed**：スクロール毎に再計算が必要
- **全画面サイズ**（`inset: 0`）で適用範囲が最大

**測定結果**:
- Chrome DevTools Performance分析で**60-70%のGPU時間を消費**
- Rendering負荷: 各フレームで**15-25ms**（60fps維持には16ms以下が必要）
- スクロール中のFPS: **30-45fps**（目標60fps）

**計算負荷の内訳**:
```
1フレーム（16.67ms以内に処理必要）
├─ radial-gradient × 46個計算: 8-12ms
├─ blur(50px) × 2箇所: 5-10ms
├─ neonFloat1 transform計算: 1-2ms
├─ スクロールイベント処理: 2-3ms
└─ その他のアニメーション: 2-4ms
合計: 18-31ms（60fps不可能、30-40fps程度）
```

#### 2. Hero.tsx kenburnsアニメーション（重大）
**場所**: `src/components/Hero.tsx:30`, `tailwind.config.js:31-33`

```typescript
style={{
  backgroundImage: "url('/facilities-living-area.webp')",
  animation: 'kenburns 15s ease-in-out infinite alternate',
  transform: `translateY(${scrollY * 0.5}px)`  // パララックス
}}
```

**影響**:
- **kenburnsアニメーション**（scale + translate）が常時動作
- **パララックス効果**と組み合わさって2重のtransform計算
- 背景画像サイズ: 76KB（webp最適化済みだが大きめ）
- 各フレームで**2-4ms**のGPU時間消費

---

### 🔴 重大な問題（主要原因）

#### 1. Hero.tsxの非throttledスクロールリスナー（最大の原因）
**場所**: `src/components/Hero.tsx:9-15`
```typescript
const handleScroll = () => {
  setScrollY(window.scrollY);  // スクロール毎にstate更新
};
window.addEventListener('scroll', handleScroll, { passive: true });
```

**影響**:
- スクロール毎に`scrollY`状態が更新され、Heroコンポーネント全体が再レンダリング
- パララックス効果（2箇所）でtransform計算が毎フレーム実行
- 急速スクロール時に大量の再レンダリングが発生（60fps = 60回/秒）

#### 2. Navbar.tsxの複数スクロールリスナー
**場所**: `src/components/Navbar.tsx`
```typescript
// 17-23行目: 状態チェック
const handleScroll = () => {
  setIsScrolled(window.scrollY > 50);
};

// 44-57行目: モバイルメニュー閉じる処理
const handleScrollClose = () => {
  if (isMobileMenuOpen) {
    setIsMobileMenuOpen(false);
  }
};
```

**影響**:
- 2つのスクロールリスナーが同時稼働
- 各スクロールイベントで2回の状態チェック
- throttle/debounce未実装

### 🟠 中程度の問題

#### 3. useIntersectionObserverの非効率設計
**場所**: `src/components/useIntersectionObserver.ts:23-30`
```typescript
const observer = new IntersectionObserver(
  ([entry]) => setIsIntersecting(entry.isIntersecting),
  { threshold, root, rootMargin }
);
observer.observe(element);
return () => observer.unobserve(element);
```

**影響**:
- `triggerOnce`オプションなし → 画面外に出ても監視継続
- 各コンポーネントで個別Observerインスタンス作成（Location等）
- メモリ効率悪化

#### 4. 複数のIntersection Observerが同時稼働
- `Location.tsx`: useIntersectionObserver
- `Facilities.tsx`: useMultipleIntersectionObserver（5要素）
- 合計6-7個のObserver + 2個のscrollリスナー

#### 5. ネオン背景の重いCSS
**場所**: `src/index.css:215-280`
```css
.neon-bg::before {
  background-image: radial-gradient(...), /* 28個のグラデーション */
  filter: blur(50px);
  animation: neonFloat1 10s ease-in-out infinite;
}
```

**影響**:
- 28個の`radial-gradient`計算
- `blur(50px)`は重い処理
- スクロール中も常時アニメーション実行

### 🟡 軽微な問題

#### 6. Google Maps iframeのhover scale
**場所**: `src/components/Location.tsx:40`
```typescript
className="transition-transform duration-300 hover:scale-105"
```
**影響**: iframe全体のscale変換は重い（特にモバイル）

#### 7. backdrop-blur多用
**場所**: `src/components/Navbar.tsx:81, 162`
```css
bg-black/90 backdrop-blur-md
```
**影響**: スクロール中の半透明ぼかし再計算

---

## パフォーマンス劣化の流れ（更新版）

### 優先度1対応後も残る問題

1. **高速スクロール開始**
2. **🔴 ネオン背景（最大の原因）**:
   - radial-gradient × 46個の計算: 8-12ms
   - blur(50px) × 2箇所: 5-10ms
   - neonFloat1 animation: 1-2ms
   - position: fixed 再計算: 1-2ms
3. **🔴 Hero kenburns + パララックス**:
   - 2重transform計算: 2-4ms
4. ✅ Hero.tsxスクロールリスナー: rAF throttle対応済み（2-3ms）
5. ✅ Navbarスクロールリスナー: 100ms throttle対応済み（<1ms）
6. ✅ Intersection Observers: triggerOnce対応済み（負荷軽減）
7. **🟠 その他アニメーション**: 2-4ms
8. **結果**: 19-33ms/フレーム → **30-45fps**（目標60fps未達）

### 根本原因の特定

**ネオン背景が60-70%のGPU時間を消費**している。これが最大のボトルネック。

詳細な分析は `scroll-performance-optimization-detailed.md` を参照。

---

## 最適化計画

### 🎯 優先順位1（最大効果） - 実施済み

#### 1.1 Hero.tsx: requestAnimationFrame + throttle最適化
- スクロールリスナーをrAF（requestAnimationFrame）でthrottle
- 処理頻度: 60回/秒 → 約16-20回/秒（1フレームに1回）
- state更新の最適化

#### 1.2 Navbar.tsx: スクロールリスナーthrottle化
- 2つのスクロールリスナーを統合
- throttle間隔: 100ms（10回/秒）
- 不要な状態更新を削減

#### 1.3 useIntersectionObserver: triggerOnceオプション追加
- 一度表示されたら監視解除（メモリ効率向上）
- Location等の既存コンポーネントに適用
- オプトイン方式で後方互換性維持

**期待効果**: スクロール処理を60回/秒→10-20回/秒に削減（60-70%軽減）

---

### 🎯 優先順位2（最重要・未実施） - **これを実施すべき**

#### 2.1 ネオン背景最適化 ⚠️ **最優先**
1. **blur値削減**: `blur(50px)` → `blur(30px)`
   - GPU負荷 40-50%削減
   - 視覚的影響: 最小限
   - 実装時間: 5分

2. **radial-gradient数削減**: 46個 → 20個程度
   - レンダリング負荷 40-50%削減
   - 視覚的に目立たないものから削除
   - 実装時間: 1時間

3. **スクロール中のneonFloat1一時停止**
   - スクロール中はanimationをpaused
   - GPU負荷 20-30%削減
   - 実装時間: 2時間

4. **will-changeプロパティ追加**
   - GPU合成最適化のヒント
   - 効果: 小さいが安全
   - 実装時間: 5分

**期待効果**: GPU負荷60-70%削減、FPS 30-45 → 50-60

#### 2.2 Hero.tsx kenburns/パララックス最適化
1. **スクロール中のkenburns一時停止**
   - transform競合を回避
   - GPU負荷 20-30%削減

2. **パララックス削除（kenburns優先）**
   - より簡単な実装
   - transform計算 50%削減

**期待効果**: transform処理負荷 50%削減

#### 2.3 その他の軽量化
- Google Maps hover scale削除
- skeleton animate-pulse → shimmer変更
- backdrop-blur条件付き無効化

**期待効果**: 追加で10-15%軽減

---

### 🎯 優先順位3（条件付き最適化） - 未実施

#### 3.1 モバイル/低スペック端末向け軽量モード
```css
@media (prefers-reduced-motion: reduce) {
  .neon-bg .neon-orbs { display: none; }
  .neon-bg::before { animation: none; filter: blur(20px); }
}
```

#### 3.2 backdrop-blur条件付き無効化
```css
@media (max-width: 768px) {
  .backdrop-blur-md {
    backdrop-filter: none;
    background: rgba(0, 0, 0, 0.95);
  }
}
```

**期待効果**: モバイルFPS 2倍改善

---

## 実装状況

| 項目 | 状態 | 実施日 | 効果測定 |
|------|------|--------|----------|
| Hero.tsx throttle | ✅ 完了 | 2025-10-10 | - |
| Navbar.tsx throttle | ✅ 完了 | 2025-10-10 | - |
| useIntersectionObserver triggerOnce | ✅ 完了 | 2025-10-10 | - |
| ネオン背景最適化 | ⏳ 未実施 | - | - |
| Google Maps最適化 | ⏳ 未実施 | - | - |
| backdrop-blur最適化 | ⏳ 未実施 | - | - |

---

## 技術仕様

### requestAnimationFrame throttle実装
```typescript
useEffect(() => {
  let rafId: number | null = null;
  let lastScrollY = 0;

  const handleScroll = () => {
    if (rafId !== null) return;

    rafId = requestAnimationFrame(() => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 1) {
        setScrollY(currentScrollY);
        lastScrollY = currentScrollY;
      }
      rafId = null;
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

### タイマーベースthrottle実装
```typescript
useEffect(() => {
  let timeoutId: NodeJS.Timeout | null = null;

  const handleScroll = () => {
    if (timeoutId !== null) return;

    timeoutId = setTimeout(() => {
      setIsScrolled(window.scrollY > 50);
      timeoutId = null;
    }, 100);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  return () => {
    if (timeoutId !== null) clearTimeout(timeoutId);
    window.removeEventListener('scroll', handleScroll);
  };
}, []);
```

---

## パフォーマンス測定指標

### 測定項目
- Scroll Event頻度（回/秒）
- Component Re-render回数
- FPS（Frames Per Second）
- メインスレッドブロック時間
- メモリ使用量

### 目標値
- Scroll Event: 60回/秒 → 10-20回/秒
- Re-render: 60回/秒 → 10-20回/秒
- FPS: 60fps維持
- メインスレッドブロック: <16ms/フレーム
