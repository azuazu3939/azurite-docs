# 経済・コマース Wiki

> [!WARNING]
> この要素は code 主導の比重が高く、価格や GUI だけを変えたつもりでも runtime 全体の導線に波及します。概念整理を先にしてから実装側へ降りるのが安全です。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | Vault、共有倉庫、ドロップ倉庫、直売、Market Board、Trade Shop |
| 主設定 | `EconomyRuntime.kt`, `plugin.yml` の commerce 系コマンド定義 |
| 影響先 | 価格体感、素材流通、報酬受取、鍛造品の売買 |
| 変更難度 | 高 |

## 概要

このページは Azuriter の流通と販売導線をまとめます。  
共有倉庫、ドロップ倉庫、直売、マーケット、Trade Shop は別機能に見えますが、runtime 内では受取、ledger、価格体感が強くつながっています。
Trade Shop は保存済み shop 定義を GUI で組み立てる前提で扱い、runtime 起動時に特殊 shop をコード注入する前提は持ちません。
さらに Quest 外では `目標導線` がこの runtime にぶら下がり、Shop / Market Board 販売中商品 / Help / Unlock / MythicMob Drop をまたいで現在地から到達ルートを表示します。

## プレイヤー体験

1. 必要な Shop 商品、販売中の Market Board 商品、Help 項目を目標に設定する
2. アイテムを集める
3. 倉庫へ入れる、受け取る、または市場に流す
4. 直売やマーケットで価値が見える
5. Trade Shop や他ループの報酬と合流して経済が回る

## 構成の見取り図

| レイヤー | 主な場所 | メモ |
| --- | --- | --- |
| runtime 本体 | `core/src/main/kotlin/com/github/azuazu3939/azuriter/core/economy/EconomyRuntime.kt` | 主要サービスの束ね役 |
| コマンド入口 | `core/src/main/resources/plugin.yml` | commerce 系コマンド導線 |
| 共有倉庫 | runtime 内の shared storage | ドロップ倉庫とは別コンテナ |
| ドロップ倉庫 | runtime 内の drop storage | 受取処理や ledger は共通化されやすい |
| 販売系 | Direct Sell / Market Board / Trade Shop | 価格の感じ方を作る層 |

## 編集フロー

1. 倉庫導線を触るのか、販売導線を触るのかを分ける
2. 価格変更なら直売だけでなく市場体感も考える
3. 受取や ledger を触るなら shared / drop の両方を見る

## よく触る変更パターン

### 価格の体感を変えたい

- 直売の値だけでなく、Market Board 側の納得感も見る
- 鍛造品や採集品の価値とズレないかを確認する

### 倉庫導線を調整したい

- shared storage と drop storage を分けて考える
- ただし受取処理や ledger は共通の流れとして見る

### Trade Shop の NPC 窓口を差し替えたい

- 通常 NPC は個体 UUID で結びます。
- Mythic NPC は `mmid` ではなく `Spawner` 名で結びます。
- 同じ shop を複数配置したい場合は mob を複製するより `Spawner` を分けて運用する方が扱いやすいです。

### Trade Shop でまとめ買いしたい

- NPC Shop の購入 GUI はクリック種別で数量を切り替えます。
- 左クリックは 1 回購入、右クリックは 10 回まとめ買い、`Shift+クリック` は 64 回までまとめ買いです。
- 資源が中途半端な時は、要求数ぴったりで失敗させるより「買えるぶんだけ」へ自動調整して購入します。

### 目標導線を調整したい

- 目標は 1 人 1 件だけ保持し、BossBar と Sidebar に現在候補を出します。
- Shop 目標は必要素材を非同期で逆探索し、複数 Shop や MythicMob Drop をまたいだ候補を `next / prev` で切り替えます。
- Market Board の販売中商品も目標にできます。販売が終わった場合は、その item を集める代替候補へ自動で寄せます。
- Storage GUI の shop 由来アイテムも目標に戻せます。倉庫に残っている購入品から、元の shop 目標を作り直せます。
- 進捗判定は `手持ち + SHARED_STORAGE` ですが、購入時に倉庫を実際に使うのは GUI で `手持ち+倉庫` を明示した時だけです。
- waypoint が解決できる候補だけ、Quest のオレンジ導線とは別に `黄色ガラス` を出します。
- Quest 中や WorldBoss 受注中は HUD を隠して競合を避けます。

### Market Board の販売中アイテムを目標にしたい

- マーケット GUI の `目標設定モード` を ON にして、販売中商品をクリックするとその出品を目標化します。
- 進捗は item 所持数で見ます。出品が消えても目標自体は残り、Shop や MythicMob Drop の代替候補を回せます。
- 自分の出品や、すでに販売終了した出品は目標化できません。

### Storage GUI から shop 目標に戻したい

- Storage GUI の `目標設定モード` を ON にすると、`npc_shop` 由来の保管アイテムをクリックして元の shop 目標へ戻せます。
- 必要数は、その保管アイテム量と shop 報酬量から逆算します。
- shop 定義が消えている物や、shop 由来ではない保管アイテムは目標化できません。

### `/help` を導線に含めたい

- `/help` 項目は左クリックで従来どおりコマンド案内、右クリックで目標設定です。
- Help 目標は項目確認で完了しますが、unlock 条件がある項目は先に解放が必要です。

### MythicMobs reload の負荷を抑えたい

- 毎回 full scan はせず、`plugins/MythicMobs/packes` / `packs` 配下 pack の `.git` 差分から変更ファイルだけ再解析します。
- `.git` が読めない pack や dirty worktree は mtime / size の fallback に落として、その pack だけ確認します。
- `Drops:`、`~onDeath` の `mlg/mlgo`、`skills` 側の `mlg/mlgo`、`skill{s=...}` 連鎖を拾って reverse index を組みます。

### 経済 runtime の失敗条件を追いたい

- `EconomyRepository` 初期化まわりを確認する
- ここで失敗すると runtime 自体が立たない前提で考える

## 連動する要素

- [鍛造](../forge/wiki.md)  
  鍛造品の価値と流通先に直結します。
- [レシピ・ストレージ・採集コレクション](../recipe-gathering/wiki.md)  
  素材供給と保管導線が重なります。
- [フロンティア・遠征・釣り戦闘](../frontier-fishing/wiki.md)  
  報酬や持ち帰り導線が経済に流れ込みます。

## FAQ

### 倉庫系は全部同じ仕組みか

同じではありません。shared と drop は別コンテナですが、受取や ledger の流れが近いので、片方だけ直すと不整合が出やすいです。

### 目標進捗は倉庫内アイテムも数えるか

数えます。`SHARED_STORAGE` は進捗判定に含めます。ただし Shop 購入で共有倉庫を実際に消費するのは `手持ち+倉庫` を選んだ時だけです。

### MythicMobs reload のたびに全 pack を読み直すか

原則そうしません。pack ごとの `.git` 履歴差分を見て、変わった pack / file だけ再解析します。`.git` が使えない時だけ fallback でその pack を見直します。

### 価格変更は直売だけ見ればよいか

十分ではありません。Market Board や Trade Shop での相対価値も含めて見ないと、プレイヤー体感が崩れます。

### まずコードと設定のどちらを見るべきか

この要素は code 主導なので、まず runtime 側で責務を見てから、コマンドや UI 導線を追うのが早いです。

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
