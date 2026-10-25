# 1210M14R10 ダウンロードサイト仕様書

- 版: 1.0 (2026-10-23)
- 対象: `website/` 配下の静的サイト (HTML / CSS / JavaScript のみ。ビルド工程なし)
- 製品情報の情報源: `1210M14R10_TECHNICAL_SPECIFICATION.md` (数値はすべてここから転記する)

---

## 1. 目的

1. 初めて訪れた人が **5 秒で「何ができるアプリか」** を理解できること。
2. **迷わずに Setup.exe をダウンロード** し、インストールまで完了できること。
3. 省電力・オフライン・近接転送という技術的な強みを、専門用語に頼らず **大きな数字と短い言葉** で伝えること。

参考とする体験は Apple の製品ページ (iPhone Pro) とする。模倣するのは「構成と余白とタイポグラフィの考え方」であり、Apple のロゴ・画像・文言・商標は一切使わない。

## 2. デザイン原則

| 原則 | 内容 |
| :--- | :--- |
| 1 画面 1 メッセージ | 各セクションは見出し 1 つ + 短い本文 1 段落 + 視覚要素 1 つ。説明を詰め込まない。 |
| 大きな文字、少ない言葉 | 見出しは 40-96px。本文は 17-21px。1 行 40 字程度で改行する。 |
| 余白で区切る | セクション上下の余白は 120-160px (スマホは 80px)。罫線や枠で区切らない。 |
| 数字で語る | 0.02 W / 0.7 W / 0.00% のように、強みは数字を主役にする。 |
| 動きは控えめに | スクロールでフェードイン (opacity + 24px 上昇、0.8 秒) のみ。`prefers-reduced-motion` の時は動かさない。 |
| 正直に書く | 未署名の exe による SmartScreen 警告など、利用者がつまずく点はダウンロード欄に先に書く。 |
| 記号の制限 | 絵文字・装飾記号・Unicode 矢印は使わない (製品仕様書 9.2 と同じ方針)。矢印やシェブロンは SVG で描く。 |

## 3. カラー & タイポグラフィ

製品 UI (仕様書 7.2) の配色をサイトに引き継ぐ。

| トークン | 値 | 用途 |
| :--- | :--- | :--- |
| `--black` | `#000000` | ヒーロー / 省電力セクション背景 |
| `--oled` | `#101214` | 暗色カード背景 (製品の Deep OLED Black) |
| `--surface` | `#16191D` | 暗色カードの境界・内側 |
| `--paper` | `#F5F5F7` | 明色セクション背景 |
| `--white` | `#FFFFFF` | 明色カード背景 |
| `--ink` | `#1D1D1F` | 明色背景の本文 |
| `--ink-2` | `#6E6E73` | 補足文 |
| `--lime` | `#84CC16` | アクセント (Cyber Lime Green)、ボタン背景 |
| `--lime-bright` | `#A3E635` | 暗色背景上の強調文字・グロー |
| `--lime-ink` | `#3F6212` | 明色背景上のリンク文字 (白背景でコントラスト比 4.5 以上) |

- 本文フォント: `-apple-system, BlinkMacSystemFont, "Segoe UI Variable Display", "Segoe UI", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic UI", "Meiryo", sans-serif` (Web フォントは読み込まない。表示速度を優先)
- 数字・技術値: `"Cascadia Mono", Consolas, ui-monospace, monospace` (製品の計器表示と同じ等幅)
- 見出しは `font-weight: 700`、`letter-spacing: -0.02em`、`line-height: 1.08`。
- ボタンは角丸 980px のピル形。主ボタンは `--lime` 背景 + `#0B0F05` 文字。

## 4. ページ構成 (1 ページ完結)

| # | セクション ID | 背景 | 見出し | 内容 |
| :-: | :--- | :--- | :--- | :--- |
| 0 | ナビ | 半透明ブラー | - | 製品名 / 概要・機能・省電力・仕様・FAQ / 「ダウンロード」ピル。スクロールで固定。 |
| 1 | `#top` ヒーロー | 黒 | 手のひとふりで、隣の PC へ。 | アイコン (グロー付き)、サブコピー、主ボタン「ダウンロード」、副リンク「仕様を見る」、対応 OS と版の 1 行。 |
| 2 | `#highlights` ハイライト | 明 | 4 つのことを、驚くほど静かに。 | 横スクロールのカード 4 枚: THROW DECK / 仮想デスクトップ切替 / 近接ダイレクト転送 / 0.02 W 待機。 |
| 3 | `#gesture` ジェスチャー | 黒 | 掴んで、溜めて、解放。 | 3 ステップ (つまむ / 溜める / 解放)。手のランドマークを模した SVG アニメーション。水平スワイプで仮想デスクトップ切替の説明。 |
| 4 | `#connect` 接続 | 明 | ケーブルも、ルーターも、要らない。 | Bluetooth で探して承認 -> Wi-Fi Direct へ自動昇格 -> 使えない時は Bluetooth のまま転送、の 3 段の図。クリップボード同期・フォルダ丸ごと転送。 |
| 5 | `#power` 省電力 | 黒 | 待機 0.02 W。 | 大きな数字 3 つ (0.02 W 待機 / 0.7 W 稼働 / 0.00% 待機時 CPU)。EcoQoS・E コア固定・カメラ物理切断の 3 項目。 |
| 6 | `#privacy` オフライン | 明 | すべて、この部屋の中で。 | クラウド・アカウント・インターネット接続が不要であること。 |
| 7 | `#specs` 技術仕様 | 明 (白) | 技術仕様 | 2 列の定義リスト (下記 5 章)。 |
| 8 | `#download` ダウンロード | 黒 | 今すぐ、はじめよう。 | アイコン、ファイル名、版、サイズ、SHA-256、主ボタン、インストール 3 ステップ、SmartScreen の注意。 |
| 9 | `#faq` FAQ | 明 | よくある質問 | `<details>` の折りたたみ 6-8 問。 |
| 10 | フッター | 明 (灰) | - | 製品名、版、第三者ライセンス、著作権表記。 |

## 5. 掲載する製品情報 (仕様書からの転記)

| 項目 | 値 | 出典 |
| :--- | :--- | :--- |
| 対応 OS | Windows 10 バージョン 2004 (ビルド 19041) 以降 / Windows 11、64 ビット (x64) | 仕様書 0 章 (`net10.0-windows10.0.19041.0`) |
| 待機電力 | 0.02 W (CPU 0.00%、カメラ物理切断) | 仕様書 3.1 |
| ミニカプセル | 0.03 W | 仕様書 3.1 |
| 稼働電力 | 0.47-0.70 W (15 FPS) | 仕様書 3.1 |
| カメラ | 320 x 240、最大 15 FPS、手が無い時は切断 | 仕様書 4.1 / 8.1 |
| ジェスチャー | 21 関節ランドマーク (MediaPipe Hand Landmarker) | 仕様書 1.1 |
| 探索 | Bluetooth Low Energy | 仕様書 5.1 |
| 接続 | Bluetooth RFCOMM (要求・承認・切断) | 仕様書 5.3 |
| データ経路 | Wi-Fi Direct > Bluetooth RFCOMM (既定で通常 LAN は使わない) | 仕様書 5.3 |
| 必要なもの | Web カメラ (ジェスチャー用)、Bluetooth 4.0 以降 (LE 対応)、Wi-Fi Direct 対応無線 LAN (任意、高速転送用) | 仕様書 1.2 |
| Python | 同梱 (別途インストール不要) | 仕様書 8.2 |
| インストール | ユーザー単位 (`%LocalAppData%\1210M14R10`)、管理者権限不要 | Velopack 既定動作 |
| 更新 | Velopack (差分更新対応) | 仕様書 2.1 |

## 6. ダウンロード仕様

- 配布物: `1210M14R10-<版>-Setup.exe` (Velopack `vpk pack` の `1210M14R10-win-Setup.exe` を改名したもの)。
- アイコン (2026-10-25 変更、ユーザー指示): 緑の渦巻きのアイコン。原画はプロジェクト直下の `app_icon_source.png` (2048 px、白背景)、背景を透過したものが `app_icon_transparent.png` (1024 px。緑の光は半透明で残す)。これから `app.ico` (16 / 20 / 24 / 32 / 40 / 48 / 64 / 96 / 128 / 256 px) とサイトのアイコンを作る。`app.ico` は exe 本体 (`ApplicationIcon`) と Setup.exe (`vpk pack --icon`) の両方に使う。
- 作成手順: プロジェクト直下の `インストーラーを作成.bat` を実行する。
  1. `配布用フォルダを最新に更新.bat /nopause /nozip` で `Publish_Offline` を作り直す。
  2. `vpk pack` で `Releases/` に Setup.exe・nupkg・更新フィードを出力する。
  3. `Releases/1210M14R10-<版>-Setup.exe` と `website/downloads/1210M14R10-<版>-Setup.exe` に複製する。
- サイトのリンク先は `index.html` の `<a data-download>` の `href` で一元管理する (`releases/latest/download/1210M14R10-win-Setup.exe`。最新のリリースを指す)。
- ダウンロード欄の版・ファイル名・サイズ・SHA-256 は、ページを開いた時に `main.js` が GitHub API (`https://api.github.com/repos/seisuma2-sketch/1210M14R10/releases/latest`) の最新リリースから読み込んで表示する (2026-10-24 変更、ユーザー指示)。
  - 対象のファイルは `1210M14R10-win-Setup.exe`。版は `tag_name` (先頭の `v` を除く)、サイズは `size`、SHA-256 は `digest` (`sha256:` の後ろ)。`[data-version]` (ヒーローとダウンロード欄) と `#dlFile` / `#dlSize` / `#dlHash` を書き換え、リンクも `browser_download_url` にする。
  - 読み込みはページを開いた時の 1 回だけ。GitHub API に届かない / 回数制限 (認証なしで 1 時間 60 回 / IP) の場合は、`index.html` に書いた値のまま表示する。新しい版を公開した時に `index.html` の値も合わせておくと、その場合も正しい値になる。
- 公開先 (2026-10-23 決定):
  - サイト: GitHub Pages `https://seisuma2-sketch.github.io/1210M14R10/` (リポジトリ `seisuma2-sketch/1210M14R10` の `main` ブランチ直下。中身は `website/` だけで、アプリのソースは置かない)。
  - Setup.exe: 同リポジトリの GitHub Releases (タグ `v<版>`)。GitHub Pages は 100 MB を超えるファイルを置けないため。
  - リンク: `https://github.com/seisuma2-sketch/1210M14R10/releases/download/v<版>/1210M14R10-<版>-Setup.exe`
  - `website/downloads/` はローカル確認用で、`.gitignore` によりリポジトリに含めない。

## 7. インタラクション

- ナビ: スクロール 8px 以上で背景を `rgba(0,0,0,0.72)` + `backdrop-filter: saturate(180%) blur(20px)` にする。現在のセクションのリンクを強調 (IntersectionObserver)。
- スクロール表示: `.reveal` 要素を IntersectionObserver で一度だけフェードイン。監視は表示後に解除する。
- ハイライトカード: `scroll-snap-type: x mandatory` の横スクロール。左右ボタン (SVG シェブロン) で 1 枚ずつ送る。
- ジェスチャー SVG: CSS アニメーションのみ (JavaScript の毎フレーム処理はしない)。`prefers-reduced-motion: reduce` で停止。
- ダウンロードボタン: 通常のリンク (`download` 属性付き)。クリック後に「ダウンロードが始まらない場合はこちら」を表示する。
- FAQ: `<details>` / `<summary>` の標準動作のみ。

## 8. レスポンシブ

| 幅 | 対応 |
| :--- | :--- |
| 1068px 以上 | 最大幅 980px (本文) / 1200px (カード列) で中央寄せ。 |
| 735-1067px | 見出しを 1 段階縮小。数字 3 つは 3 列のまま。 |
| 734px 以下 | 左右 16px の余白。ナビのリンクは非表示にし「ダウンロード」ピルだけ残す。数字・ステップは 1 列。横スクロールが発生しないこと。 |

## 9. アクセシビリティ / 品質

- 色コントラスト比: 本文 4.5:1 以上。
- 画像には `alt`、装飾 SVG には `aria-hidden="true"`。
- キーボード操作: すべてのリンク・ボタンに可視フォーカス (`outline: 2px solid var(--lime)`)。
- `lang="ja"`、`<meta name="description">`、OGP (`og:title` / `og:description` / `og:image`)、favicon / apple-touch-icon を設定。
- 外部 CDN・Web フォント・アクセス解析は読み込まない (オフライン思想と表示速度のため)。HTML + CSS + JS の合計 (画像除く) は 100KB 以内。

## 10. ファイル構成

```
website/
  DOWNLOAD_SITE_SPECIFICATION.md  本書
  index.html                      1 ページ完結の本体
  style.css                       デザイントークンとレイアウト
  main.js                         ナビ・スクロール表示・カード送り
  assets/
    icon-1024.png / icon-512.png  ヒーロー・ダウンロード欄・OGP のアイコン (app_icon_transparent.png から生成、背景透過)
    apple-touch-icon.png          180px (iOS は透過部分を黒で塗るため、黒地に余白 15px で不透明にしたもの)
    favicon-32.png / favicon-64.png  (背景透過)
  downloads/
    1210M14R10-<版>-Setup.exe     インストーラーを作成.bat が配置
```
