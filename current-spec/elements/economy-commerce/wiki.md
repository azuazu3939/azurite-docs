# 経済・コマース Wiki

> [!WARNING]
> この要素は code 主導の比重が高く、価格や GUI だけを変えたつもりでも runtime 全体の導線に波及します。概念整理を先にしてから実装側へ降りるのが安全です。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | Vault、共有倉庫、ドロップ倉庫、BackPack、直売、Market Board、OpenBook（現在一般非公開）、Trade Shop、プレイヤー間 Trade / Pay |
| 主設定 | `EconomyRuntime.kt`, `openbook.yml`, commerce 系コマンド定義 |
| 影響先 | 価格体感、素材流通、報酬受取、鍛造品の売買 |
| 変更難度 | 高 |

## 概要

このページは Azuriter の流通と販売導線をまとめます。  
共有倉庫、ドロップ倉庫、BackPack、直売、マーケット、OpenBook、Trade Shop、プレイヤー間 Trade / Pay は別機能に見えますが、runtime 内では受取、ledger、価格体感、回遊導線が強くつながっています。
OpenBook の runtime 自体は維持していますが、現在は一般公開前なので `/openbook` 権限者だけが直接使い、一般向けの `/commerce` と `menu` GUI からは外しています。
ただし BackPack だけは「経済倉庫の亜種」ではなく、増殖耐性を優先して専用の操作系で即時出し入れする quick access 保管として分離しています。
Trade Shop は保存済み shop 定義を GUI で組み立てる前提で扱い、runtime 起動時に特殊 shop をコード注入する前提は持ちません。
プレイヤー間 Trade は別サーバー相手にも申請できますが、確定は必ず同じサーバーへ寄せてから行い、二重確定や跨ぎ整合崩れを避けます。
さらに Quest 外では `目標導線` がこの runtime にぶら下がり、Shop / Market Board 販売中商品 / Help / Unlock / MythicMob Drop をまたいで現在地から到達ルートを表示します。

## プレイヤー体験

1. 必要な Shop 商品、販売中の Market Board 商品、Help 項目を目標に設定する
2. アイテムを集める
3. 倉庫へ入れる、受け取る、または市場に流す
4. 直売とマーケットで価値が見える
5. Trade Shop や他ループの報酬と合流して経済が回る

## 構成の見取り図

| レイヤー | 主な場所 | メモ |
| --- | --- | --- |
| runtime 本体 | `core/src/main/kotlin/com/github/azuazu3939/azuriter/core/economy/EconomyRuntime.kt` | 主要サービスの束ね役 |
| コマンド入口 | `core/bootstrap/CoreFeatureRegistrar.kt` | commerce 系コマンド導線 |
| 共有倉庫 | runtime 内の shared storage | ドロップ倉庫とは別コンテナ |
| ドロップ倉庫 | runtime 内の drop storage | 受取処理や ledger は共通化されやすい |
| BackPack | quick access runtime | 1 クリックごと保存する別系統の即時保管 |
| 販売系 | Direct Sell / Market Board / OpenBook（現在一般非公開） / Trade Shop | 価格と回遊の感じ方を作る層 |

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

### BackPack を調整したい

- `BackPack` は shared / drop と UI も保存単位も分けて考える
- 安全性優先のため、通常チェストの自由移動ではなく「クリックごとに保存する専用操作」を崩さない
- 使いやすさを足す場合も、先に duplication の戻り道を増やしていないかを見る
- GUI タイトルや案内アイテムはイタリック崩れを避け、`TextUtil` 経由で表示する
- `BackPack` は #1〜#6 まで独立して持てる
- 手持ちアイテムへ番号ごとのショートカットを付ける時は `/bind bp1..bp6` を使う

### プレイヤー間 Trade / Pay を調整したい

- `/trade` は相手が別サーバーでも申請でき、受諾時に受諾側を申請元サーバーへ寄せてから開始する
- 同一サーバーで見えている相手には `Shift+右クリック` でも `/trade <player>` と同じ申請を送れ、相手から先に申請されている場合は `/trade <player>` または `Shift+右クリック` でそのまま受諾扱いになり Trade 画面を開ける
- 取引申請の受信側には chat 上へ `[受諾]` / `[拒否]` のクリック導線を出し、コマンド入力なしで応答できる
- 取引 GUI では各プレイヤーが最大 16 枠までアイテムを提示でき、通貨は Money と Delivery Credit だけを扱う
- `/pay` と `/bal` は鍛冶ポイントを扱わず、Money / Delivery Credit だけを対象にする
- 双方承認が揃った瞬間にだけ確定し、途中変更が入ったら承認を落として再確認させる
- 提示済みアイテムはセッション中に手元から外し、中止時は配送返却で戻す
- `/trade log` と `/pay` は `EconomicEventLedger` に `PLAYER_TRADE` / `PLAYER_PAYMENT` として残す

### Trade Shop の NPC 窓口を差し替えたい

- 通常 NPC は個体 UUID で結びます。
- Mythic NPC は `mmid` ではなく `Spawner` 名で結びます。
- 同じ shop を複数配置したい場合は mob を複製するより `Spawner` を分けて運用する方が扱いやすいです。

### Trade Shop でまとめ買いしたい

- NPC Shop の購入 GUI はクリック種別で数量を切り替えます。
- 左クリックは 1 回購入、右クリックは 10 回まとめ買い、`Shift+クリック` は 64 回までまとめ買いです。
- 資源が中途半端な時は、要求数ぴったりで失敗させるより「買えるぶんだけ」へ自動調整して購入します。

### Trade Shop で複数素材をコストにしたい

- Trade Shop の価格は `priceComponents[]` の加算です。複数要素がある場合はどれか 1 つではなく、全部を同時に要求します。
- Shop editor では価格スロットを 9 個使えます。複数素材を要求したい時は、素材ごとに別スロットへ積みます。
- 1 スロットは `通貨 1 種 + 任意素材 1 種` を持てますが、運用上は「1 素材 1 スロット」で分けた方が見やすいです。
- 購入 GUI でも必要コストは `+` 連結で表示します。

### Trade Shop の報酬に通貨を入れたい

- Shop editor の新規 entry 作成は、通常クリックで item 報酬、`Shift+左クリック` で所持金報酬、`Shift+右クリック` で配送クレジット報酬を作れます。
- entry 編集では、報酬スロットの左クリックで item 報酬、`Shift+右クリック` で `所持金 / 配送クレジット` を切り替えます。
- 報酬量は item でも通貨でも同じ数量欄を使い、整数で持ちます。
- 購入時は item なら通常配送、所持金なら即時入金、配送クレジットなら即時加算です。

### 目標導線を調整したい

- 目標は 1 人 1 件だけ保持し、BossBar と Sidebar に現在候補を出します。
- Shop 商品の exact target は残しつつ、item 目標は `Shop / MythicMob Drop` を横断して候補化します。
- Market Board の販売中商品も目標にできます。販売が終わった場合は、その item を集める代替候補へ自動で寄せます。
- Storage GUI の目標設定モードは保管アイテム全体を item 目標化します。shop 由来でなくても、倉庫にある item から導線を作れます。
- `/commerce goal set item <canonicalItemKey> [quantity]` と `/commerce goal set hand [quantity]` で、GUI を開かずに item 目標を張れます。
- `shop / item / hand / market` 系の目標は、設定時点の `手持ち + SHARED_STORAGE` を基準値として控えます。設定後に新しく入手した分だけ進捗し、既存在庫だけで即達成にはなりません。
- 進捗判定は `手持ち + SHARED_STORAGE` ですが、購入時に倉庫を実際に使うのは GUI で `手持ち+倉庫` を明示した時だけです。
- waypoint が解決できる候補だけ、Quest のオレンジ導線とは別に `黄色ガラス` を出します。shop 窓口や Boss Board に出せます。
- Sidebar は進捗値だけ色を付け、候補名と手順は白ベースの短縮表記で出します。`route shop -> ...` のような長い文言は圧縮して見切れを減らします。
- Sidebar はプレイヤーごとの専用表示として扱い、複数人が同時に目標を出しても互いの表示を壊しません。
- WorldBoss など強い UI がある導線では、HUD の表示量を控えめにして競合を避けます。

### Market Board の販売中アイテムを目標にしたい

- マーケット GUI の `目標設定モード` を ON にして、販売中商品をクリックするとその出品を目標化します。
- 進捗は item 所持数で見ます。出品が消えても目標自体は残り、Shop や MythicMob Drop の代替候補を回せます。
- 自分の出品や、すでに販売終了した出品は目標化できません。
- 出品が売れた時は、売り手がオンラインなら購入者名・売れた item・入金額を chat で返します。

### 時給と収入源を見たい

- `/income` は直近60分、または `/income start` 後のセッションを使って収入と時給を表示します。
- `/income <15m|30m|60m|2h> [money|credit|all]` で時間幅と通貨を指定できます。alias は `/jikyuu`、`/hourly`、`/wage` です。
- Money 収入は直接売却、自動売却、マーケット販売、プレイヤー送金、プレイヤー取引、MythicMob 討伐、MythicMobs スキル入金に分けて表示します。
- MythicMob の `Drops: - money ...` は討伐収入として自動集計されます。
- 既存の `currencygive{amount=...}` も MythicMobs スキル入金として集計します。戦闘GiftやアーマーGiftなどを個別名で見たい時は、MM 側を `azmoneygive{amount=<...>;reason=combat_gift;label="戦闘Gift"}` のように置き換えます。
- 配送クレジットも `credit` / `all` 指定時に見られますが、鍛冶ポイントは時給対象外です。

### OpenBook を調整したい

- OpenBook は現在一般公開前で、運営・テスター向けの `/openbook` 直打ちだけを残しています。
- 一般プレイヤー向けの `/commerce`、経済ハブ GUI、`menu` ショートカットからは外しています。
- OpenBook は `WRITTEN_BOOK` をそのまま売り物に置かず、内部 UUID 管理の書籍データを map 表示して扱います。
- 公開価格は `openbook.yml` の `pricing.min / max` に従い、現状は `20000〜50000` 固定です。
- ジャンルは `攻略 / 採集 / 戦闘 / 金策 / 知識 / エンチャント / 職業/進行 / 雑記` を前提に UI を整理します。
- 作者が再投稿するとバージョンだけ増え、発行番号は変わりません。
- 購入者の `selectedVersion` は自動更新されず、最後に開いた版のまま保持します。
- `有力書籍` は累計売上順、`トレンド書籍` は連続購入の短時間補正順です。
- `/openbook recommend <bookNo> <player>` で他プレイヤーに勧められ、対象が初回購入した時だけ紹介者へ `10000` 入ります。
- おすすめ導線には「買われると上位に食い込みやすくなる」説明を必ず添えます。

### Storage GUI から item 目標を作りたい

- Storage GUI の `目標設定モード` を ON にすると、保管アイテムをクリックしてその item を目標にできます。
- 必要数は保管量を初期値にして保存します。shop 由来 item なら shop 候補もそのまま混ざります。
- 倉庫内 item は進捗判定にも含めるので、手持ちと shared storage を合わせた数で達成を見ます。

### `/help` を導線に含めたい

- `/help` はトップで `よく使うコマンド集` と `進行ヘルプ` に分かれます。
- `よく使うコマンド集` は `menu`、`/hub`、`/pve`、`/class`、`/profession`、`BackPack`、`MySet`、`trade`、`pay`、`income` を含む最新一覧を表示します。
- `専門職` は `/profession`、`/profession list`、`/profession info <profession>` を案内し、resourceworld 採集と Packet 釣りの職業進行へ戻れる入口にします。
- `BackPack` は `/backpack (/bp) [1-6]`、`MySet` は `/myset [list|save|load|delete]` として案内します。
- コマンド集は説明閲覧中心で、未解放の機能だけ右クリックで目標設定できます。
- 進行ヘルプはライセンスや許可証の詰まり整理に寄せ、未解放時だけ導線を張れます。

### `menu` ショートカットを調整したい

- `/menu` は `自分用に編集できるコマンド実行 GUI` です。
- 初期配置はそのまま使えるように詰めたテンプレートですが、固定メニューではありません。`/menu edit` で各スロットを自分向けに差し替えられます。
- OpenBook は一般非公開のため、初期配置・ショートカット候補・既定メニュー導線から外しています。
- 初期配置には `/camera` と `/class gui` も含め、視点距離の切替やクラス一覧 GUI へすぐ飛べるようにします。
- `party` や `city` のような低優先コマンドは初期配置へ置かず、必要な人だけ自分で追加する前提です。
- 実行用 GUI は配置密度に応じて高さを詰めて開き、編集用 GUI だけ 36 スロットのフル画面を使います。
- 固定のメニュー扉は `/menu` バインド済みアイテムとして配り、右クリックで同じ GUI を開きます。
- `BackPack` や `MySet` など quick access 系もこの GUI からそのまま開けます。
- 既知ショートカットは `/bind <shortcutId>` でも付けられ、BackPack 用は `bp1..bp6` を使います。
- 任意コマンドも `/bind /command ...` で手持ちアイテムへ付けられます。
- `/menu edit` では `表示名 | /command` か `/command` をチャット入力して設定します。`clear` で空欄、`cancel` で中止です。
- 通常クリックで実行し、`Shift+右クリック` の時だけショートカット化します。
- 解除はバインド済みアイテムを持って `しゃがみ右クリック` を基本導線にし、`/unbind` と旧 `/bind clear` も互換で残します。
- GUI や手ぶらで `/bind <shortcutId>` して受け取った専用ショートカットは、解除時にそのまま消去します。
- 既存アイテムへ `/bind ...` で後付けした場合は、解除時にアイテムは残し、コマンド bind のタグと案内 lore だけ外します。

### コマンドバインド品の扱いを調整したい

- コマンドバインド品は `sell` と `market` だけ禁止し、プレイヤー間 Trade は許可します。
- これにより便利アイテムの誤売却や市場流出を防ぎつつ、直接の受け渡しは残せます。
- 固定ショートカットは別扱いで、解除やドロップなどの一部操作自体を制限します。

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
- [釣り戦闘・旧遠征残務](../frontier-fishing/wiki.md)
  報酬や持ち帰り導線が経済に流れ込みます。

## FAQ

### 倉庫系は全部同じ仕組みか

同じではありません。shared と drop は別コンテナですが、受取や ledger の流れが近いので、片方だけ直すと不整合が出やすいです。BackPack はさらに別系統で、経済倉庫より安全側へ寄せた quick access 保管です。

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
