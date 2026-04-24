# 経済・コマース の設定項目

経済・コマース要素は、現状だと数値バランスの多くがコード側にあります。YAML で直接触れるのは、主に公開コマンド、権限、Storage Box の制限、OpenBook の価格帯とジャンルです。

> [!NOTE]
> 価格式や手数料のような本体ロジックは `EconomyRuntime` 側にあり、今の `resources` では「入口と許可」を中心に管理しています。
> Trade Shop 自体は保存済み定義を編集して増やす前提で、予約済みの built-in 特殊 shop は持ちません。

このページでは、可変のキー名を `[command-id]` のように表記します。

## `plugin.yml` のコマンド公開設定

コマース周辺で日常的に使うのは次のコマンド群です。

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `commands.economy.permission` | 経済管理コマンドの実行権限。 | 管理者用入口。 |
| `commands.economy.aliases[]` | 別名コマンド。 | 現状は alias なし。 |
| `commands.commerce.permission` | コマース総合コマンド権限。 | `/commerce` の本体。 |
| `commands.commerce.aliases[]` | コマースの別名。 | `com` が設定されている。 |
| `commands.storage.permission` | 共有倉庫系コマンド権限。 | `commerce` 権限に紐づく。 |
| `commands.drop.permission` | ドロップ倉庫系コマンド権限。 | 受け取り導線の制御。 |
| `commands.shop.permission` | Trade Shop 系コマンド権限。 | 店舗 UI の入口。 |
| `commands.market.permission` | Market Board 権限。 | `ah` alias が付いている。 |
| `commands.openbook.permission` | OpenBook 権限。 | 現在は運営・テスター向けの直接入口。一般向け `/commerce` と GUI からは外している。 |
| `commands.sell.permission` | 直売導線の権限。 | 即時換金の入口。 |
| `commands.trade.permission` | プレイヤー間 Trade 権限。 | 同一サーバーへ寄せて交換する入口。 |
| `commands.pay.permission` | プレイヤー間送金権限。 | Money / Delivery Credit の送付入口。 |
| `commands.bind.permission` | 共通コマンドバインド権限。 | `menu` や `bp1..bp6` ショートカットの基盤。 |
| `commands.backpack.permission` | BackPack 権限。 | `bp` alias 付きの quick access 保管。 |
| `commands.myset.permission` | MySet 権限。 | 装備 4 部位の即時切替 GUI。 |
| `commands.yes.permission` / `commands.no.permission` | 確認ダイアログ応答権限。 | 取引確認を共通化している。 |
| `commands.q.permission` | 短縮確認コマンド権限。 | チャット運用向けの簡易入口。 |

コマンド定義は共通して次の形です。

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `commands.[command-id].permission` | そのコマンドを使う権限ノード。 | 権限設計の主キー。 |
| `commands.[command-id].aliases[]` | 短縮名や互換名。 | 既存運用と衝突しない別名だけを足す。 |

## `plugin.yml` の権限ノード

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `permissions.azurite.command.commerce.default` | コマース系共通権限の既定値。 | 現状は `true`。一般プレイヤー利用前提。 |
| `permissions.azurite.command.economy.default` | 経済管理権限の既定値。 | 現状は `op`。 |
| `permissions.azurite.command.trade.default` | プレイヤー間取引権限の既定値。 | 現状は `true`。 |
| `permissions.azurite.command.pay.default` | 送金権限の既定値。 | 現状は `true`。 |
| `permissions.azurite.command.openbook.default` | OpenBook 権限の既定値。 | 現状は `op`。一般非公開。 |
| `permissions.azurite.command.bind.default` | 共通バインド権限の既定値。 | 現状は `true`。 |
| `permissions.azurite.command.backpack.default` | BackPack 権限の既定値。 | 現状は `true`。 |
| `permissions.azurite.command.myset.default` | MySet 権限の既定値。 | 現状は `true`。 |
| `permissions.azurite.commerce.shop.edit.default` | Shop 編集権限。 | 現状は `op`。店舗編集を限定する。 |
| `permissions.azurite.command.*.children` | まとめ権限にぶら下がる個別権限。 | 一括配布したいときの親ノード。 |
| `permissions.azurite.*.children` | 全体管理権限の子ノード。 | 管理権限ロールを組む時の最上位。 |

## Trade Shop の窓口バインド

Trade Shop の窓口は保存済み shop 定義へバインドして使います。
通常 NPC は UUID 固定、Mythic NPC は `mmid` ではなく MythicMobs の `Spawner` 名で束ねます。

| 対象 | 判定キー | 変更時の見方 |
| --- | --- | --- |
| 村人 / 行商人 | `entityUuid` + `entityType` | 単体 NPC を固定窓口にする時に使う。 |
| Mythic NPC | `spawnerNames[]` | 同じ `Spawner` から出る NPC 群をまとめて同一 shop にしたい時に使う。 |
| 掲示板 / 施設入口 | `world` + `x/y/z` + `blockType` | ブロック窓口を固定したい時に使う。 |

| コマンド | 役割 | 変更時の見方 |
| --- | --- | --- |
| `/commerce shop bind-npc <shopId>` | 視線先の NPC を shop に紐付ける。 | Mythic NPC は `Spawner` 管理されている個体だけが対象。 |
| `/commerce shop bind-board <shopId>` | 視線先のブロックを board shop に紐付ける。 | 座標固定なので置き換え時は再バインドが必要。 |
| `/commerce shop unbind <shopId>` | 視線先の NPC / ブロックのバインドを外す。 | Mythic 側は `Spawner` 名一致で解除される。 |

## Trade Shop GUI の購入操作

| 操作 | 役割 | 変更時の見方 |
| --- | --- | --- |
| 左クリック | 1 回購入。 | 従来の単発購入。 |
| 右クリック | 10 回まとめ買い。 | 少量素材や通貨交換向け。 |
| `Shift+クリック` | 64 回までまとめ買い。 | 買える資源量まで自動調整して処理される。 |

## Trade Shop エントリの価格構成

| 項目 | 役割 | 変更時の見方 |
| --- | --- | --- |
| `priceComponents[]` | entry が要求する価格コンポーネント一覧。 | 各要素は加算で扱う。複数要素があれば全部必要。 |
| `priceComponents[].currencyType` | `VAULT` / `DELIVERY_CREDIT` / `FORGE_POINT`。 | 通貨を使わない素材コストだけの要素でも保持する。 |
| `priceComponents[].amount` | 通貨要求量。 | `0` なら通貨なしの素材要素として扱える。 |
| `priceComponents[].item` | 任意の素材アイテム 1 種。 | 複数素材が必要なら別コンポーネントへ分ける。 |
| `priceComponents[].quantity` | 素材アイテム要求数。 | まとめ買い時は purchase 数に応じてスケールする。 |

Shop editor の価格スロットは 9 個です。  
複数素材コストを作る時は、1 スロットに 1 素材ずつ積み、必要なら通貨成分も別スロットへ分けて加算します。

## Shop Editor の報酬構成

| 操作 | 役割 | 変更時の見方 |
| --- | --- | --- |
| `報酬を選んでエントリ作成` | 新規 entry を作る。 | 通常クリックは下段インベントリから item 報酬を選ぶ。 |
| `報酬を選んでエントリ作成` の `Shift+左クリック` | 所持金 reward entry を新規作成する。 | 初期量は 1 で作り、entry 側で数量を編集する。 |
| `報酬を選んでエントリ作成` の `Shift+右クリック` | 配送クレジット reward entry を新規作成する。 | 初期量は 1 で作り、entry 側で数量を編集する。 |
| 報酬スロットの左クリック | item 報酬を設定する。 | 下段インベントリから選んだ item をそのスロットへ入れる。 |
| 報酬スロットの `Shift+右クリック` | 通貨報酬へ切り替える。 | `所持金` と `配送クレジット` を交互に切り替える。 |
| 報酬スロットの `Shift+左クリック` | 報酬量を編集する。 | item / 通貨のどちらでも整数数量を入れる。 |

## Trade Shop GUI の導線補助

| UI | 役割 | 変更時の見方 |
| --- | --- | --- |
| `支払元切替` | `手持ちのみ` と `手持ち+倉庫` を切り替える。 | 既定値は `手持ちのみ`。倉庫を支払元に含めるのは明示時だけ。 |
| `目標設定モード` | 商品クリックを購入ではなく目標設定に切り替える。 | ロック中でも表示されていれば目標化できる。 |
| BossBar | 現在の目標と進捗を常時表示する。 | Quest 中 / WorldBoss 受注中は隠す。 |
| Sidebar | 目標候補の短い手順を表示する。 | 進捗値だけ色付き、候補名と手順は白ベースの短縮表記。表示はプレイヤーごとの専用 scoreboard で持ち、複数人同時でも混線しない。既存 Sidebar を使っている他要素があれば出さない。 |
| 黄色ガラス | 目標の移動先導線。 | BlockBinding、通常 NPC、Mythic NPC、Frontier ルート入口、Quest Board、Boss Board の順で waypoint を解決する。近距離目標では固定 32 ブロック先へ飛ばさず、目標位置までで止める。 |

## Market Board GUI の導線補助

| UI | 役割 | 変更時の見方 |
| --- | --- | --- |
| `目標設定モード` | 販売中商品のクリックを購入ではなく目標設定に切り替える。 | 自分の出品や販売終了品は目標化できない。 |
| BossBar / Sidebar | 現在目標の進捗と候補を表示する。 | 出品終了後は item の代替入手候補へ切り替わる。 |
| 売上通知 | 出品が売れた時に売り手へ知らせる。 | 売り手がオンラインなら、購入者名・売れた item・入金額を chat で返す。 |

## OpenBook

`OpenBook` はユーザーが書いた `WRITTEN_BOOK` を公開・販売するための市場です。  
一覧には本アイテムそのものを並べず、内部 UUID 管理の書籍データを map 表示します。
現在は一般公開前のため、利用導線は `/openbook` 権限保持者の直接実行だけに絞っています。

### `openbook.yml`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `pricing.min` | OpenBook の最低価格。 | 現状は `20000`。 |
| `pricing.max` | OpenBook の最高価格。 | 現状は `50000`。 |
| `browse.suggest-limit` | `有力書籍` / `トレンド書籍` の表示上限。 | 現状は `18`。 |
| `browse.trend-window-days` | トレンド集計期間。 | 現状は `7` 日。 |
| `genres[].key` | 内部ジャンルキー。 | `guide` など固定キーを使う。 |
| `genres[].label` | GUI 表示名。 | `攻略` `採集` `戦闘` `金策` `知識` `エンチャント` `職業/進行` `雑記`。 |

### OpenBook の公開・購買ルール

| 項目 | 役割 | 変更時の見方 |
| --- | --- | --- |
| 公開元 | メインハンドの `WRITTEN_BOOK`。 | タイトル空欄は拒否する。 |
| 価格帯 | `20000〜50000`。 | 範囲外は公開不可。 |
| 発行番号 | 公開ごとに `1` から連番採番。 | 再投稿では増やさず据え置く。 |
| バージョン | 作者の再投稿ごとに `+1`。 | 所持者は自動更新されない。 |
| 購買制限 | 自己購入不可、重複購入不可。 | 判定は同じ書籍 master を所持しているか。 |
| 閲覧版 | 所持者ごとに `selectedVersion` を保持。 | 最後に開いた版で保存する。 |

### OpenBook のサジェストと推薦

| 項目 | 役割 | 変更時の見方 |
| --- | --- | --- |
| `有力書籍` | 累計売上金額降順の Top18。 | 同額時は販売数、次に発行番号で並べる。 |
| `トレンド書籍` | 直近 7 日の購入補正値合計 Top18。 | `5分以内 +5` `10分以内 +3` `30分以内 +1`。0 点だけなら空欄。 |
| `/openbook recommend <bookNo> <player>` | 他プレイヤーへ本を勧める。 | 対象が初回購入した時だけ紹介者へ `10000` 入る。 |
| おすすめ導線 | 詳細画面から chat の suggest command を出す。 | 「買われると上位に食い込みやすくなる」旨を明記する。 |

> `/commerce openbook`、経済ハブ GUI、`menu` 既定ショートカットは現在無効です。

## Storage GUI の導線補助

| UI | 役割 | 変更時の見方 |
| --- | --- | --- |
| `目標設定モード` | 保管アイテムのクリックを受取ではなく目標設定へ切り替える。 | 保管アイテムなら種類を問わず item 目標にできる。 |
| 保管アイテムクリック | その item を item 目標にする。 | 必要数量は保管量を初期値にして保存する。shop 由来なら shop 候補も混ざる。 |

## `/commerce goal` の導線

| コマンド | 役割 | 変更時の見方 |
| --- | --- | --- |
| `/commerce goal` | 現在目標の概要と候補ルートを表示する。 | 目標未設定時は空状態を返す。 |
| `/commerce goal clear` | 現在目標を解除する。 | 永続保存も同時に消える。 |
| `/commerce goal next` | 候補ルートを次へ切り替える。 | Shop 逆探索で複数候補がある時だけ意味を持つ。 |
| `/commerce goal prev` | 候補ルートを前へ切り替える。 | `next` の逆順。 |
| `/commerce goal refresh` | 目標進捗を再計算する。 | 非同期で再評価される。 |
| `/commerce goal set shop <shopId> <entryId> [quantity]` | Shop 商品を目標にする。 | 必要素材は複数 Shop をまたいで逆探索する。設定時点の所持分は進捗に含めない。 |
| `/commerce goal set item <canonicalItemKey> [quantity]` | item 目標を直接設定する。 | `Shop / Frontier直取得 / Frontier Quest報酬 / Boss Quest報酬 / MythicMob Drop` の候補を横断して出す。設定後に新しく入手した分だけ進捗する。 |
| `/commerce goal set hand [quantity]` | 手に持っている item を目標にする。 | GUI を開かずに、その場の item から導線を張れる。設定時点の手持ちや倉庫分は基準値として差し引く。 |
| `/commerce goal set help <topicId>` | `/help` のコマンド項目を目標にする。 | 手動設定時は項目確認型の Help 目標として扱う。 |
| `/commerce goal set unlock <unlockId>` | 解放状態を目標にする。 | Profession unlock と同じ ID 正規化を使う。 |

## プレイヤー間 Trade / Pay

| コマンド | 役割 | 変更時の見方 |
| --- | --- | --- |
| `/trade <player>` | 相手へ取引申請を送る。 | 別サーバーの相手にも送れ、同一サーバーでは `Shift+右クリック` でも同じ申請を送れる。相手から先に申請されている相手へ実行した場合は、その場で受諾扱いになって Trade 画面を開く。 |
| `/trade accept <player>` | 届いた取引申請を受ける。 | 受諾側が申請元サーバーへ移動してから GUI を開き、chat 上の `[受諾]` クリックからも実行できる。GUI は各プレイヤー 16 枠の提示欄を持つ。 |
| `/trade deny <player>` | 取引申請を拒否する。 | 申請側へ拒否通知を返し、chat 上の `[拒否]` クリックからも実行できる。 |
| `/trade cancel` | 今の取引を中止する。 | 提示済みアイテムは配送返却で戻す。 |
| `/trade log [page]` | 最近の取引・送金ログを見る。 | `PLAYER_TRADE` / `PLAYER_PAYMENT` ledger を読む。 |
| `/pay <player> <amount> [money\|credit]` | 通貨を直接送る。 | Money と Delivery Credit に対応する。鍛冶ポイントは対象外。 |

## `menu` と `bind` のショートカット体系

| UI / コマンド | 役割 | 変更時の見方 |
| --- | --- | --- |
| `/menu` | 自分用メニュー GUI を開く。 | 初期配置はそのまま使える密度へ整え、通常クリックは実行、`Shift+右クリック` だけショートカット化する。 |
| `/menu edit` | メニュー内容を自分で編集する。 | `表示名 \| /command` か `/command` をチャット入力して設定する。 |
| `/menu reset` | メニューを初期配置へ戻す。 | 個別編集をまとめて捨ててテンプレートへ戻したい時に使う。 |
| メニュー扉 | `/menu` バインド済み固定アイテム。 | 固定スロットから右クリックで GUI を開く。 |
| `/bind list` | 使える shortcut ID を見る。 | `menu`、`sethome`、`bp1..bp6` などを含む。 |
| `/bind <shortcutId>` | 手持ちアイテムへ既知ショートカットを付ける。 | `menu` や `bp1..bp6` などをこの基盤で扱う。 |
| `/bind /command ...` | 手持ちアイテムへ任意コマンドを付ける。 | 先頭 `/` 必須。 |
| `しゃがみ右クリック` | 手持ちのコマンドバインドを解除する。 | 専用ショートカットは消去し、既存アイテムは bind タグだけ外す。 |
| `/unbind` | 手持ちのコマンドバインドを解除する。 | クリックで解除しづらい状況向けの入口。 |
| `/bind clear` | 手持ちのコマンドバインドを解除する。 | 旧導線との互換。固定ショートカットは解除できない。 |
| `/backpack (/bp) [1-6]` | BackPack #1〜#6 を開く。 | quick access 保管は 6 枠まで独立保存する。 |

> 初期配置テンプレートには `/camera` と `/class gui` も含め、未編集のメニューからそのまま視点切替とクラス一覧 GUI を開けるようにする。
## コマンドバインド品の制限

| 対象 | 役割 | 変更時の見方 |
| --- | --- | --- |
| 直売 `/sell` | コマンドバインド品は売却不可。 | 誤換金や特殊導線アイテムの流出を防ぐ。 |
| Market 出品 | コマンドバインド品は出品不可。 | バインド済みユーティリティを市場へ流さない。 |
| プレイヤー間 Trade | コマンドバインド品も交換可。 | 売買制限だけ掛け、直接受け渡しは許可する。 |

## `/help` の目標化

| 操作 | 役割 | 変更時の見方 |
| --- | --- | --- |
| `/help` トップ | `よく使うコマンド集` と `進行ヘルプ` に分かれる。 | 用途別に入口を分けて迷いを減らす。 |
| コマンド集の一覧 | 一般プレイヤーが普段使う前提のコマンドだけを案内する。 | `menu` は自分用 GUI、`/hub` は軽い ASP 側へ、`/pve` は軽い Paper 側へ寄せる移動コマンド、`BackPack` は `/backpack (/bp) [1-6]`、`MySet` は `/myset [list\|save\|load\|delete]` として出す。解除は基本 しゃがみ右クリックで消去。 |

## `/help` からの導線補助

| UI | 役割 | 変更時の見方 |
| --- | --- | --- |
| コマンド集の右クリック | 未解放コマンドだけ目標設定できる。 | 解放済みコマンドは説明閲覧のみ。 |
| 進行ヘルプの右クリック | ライセンスや許可証の解放を目標化する。 | 権限型の機能も導線付きで追える。 |

## MythicMobs Drop 逆引き

| 対象 | 読み方 | 変更時の見方 |
| --- | --- | --- |
| `mobs/**/*.yml` の `Drops:` | 直接 Drop 候補として逆引きする。 | pack 単位 `.git` 差分で部分再読込する。 |
| `mobs/**/*.yml` の `~onDeath` 内 `mlg/mlgo` | death skill 経由 Drop として扱う。 | skill 参照連鎖をたどる。 |
| `skills/**/*.yml` の `mlg/mlgo` | skill 由来 Drop として逆引きする。 | `skill{s=...}` 連鎖を cycle guard 付きで解決する。 |
| `.git` が読めない pack | mtime / size fallback で変更検出する。 | その pack だけ部分再解析する。 |

## `config.yml` / `database.yml` の倉庫制限と共有インフラ

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `storage-box.blocked-items[]` | Storage Box に預けられない item key。 | 特殊アイテムの持ち逃げや混入を防ぐ。 |
| `database.yml > redis-cache.enabled` | Redis キャッシュの ON/OFF。 | 複数サーバー運用で共有キャッシュを入れる時の入口。 |
| `database.yml > redis-cache.host` | Redis ホスト名。 | 外部 Redis を使う時に必須。 |
| `database.yml > redis-cache.port` | Redis ポート。 | 既定は `6379`。 |
| `database.yml > redis-cache.username` / `password` | Redis 認証。 | ACL 利用時のみ設定。 |
| `database.yml > redis-cache.database` | DB 番号。 | 共有 Redis で衝突を避ける。 |
| `database.yml > redis-cache.timeout-millis` | 接続タイムアウト。 | 遅い回線で短すぎると接続失敗しやすい。 |
| `database.yml > redis-cache.use-ssl` | TLS 接続を使うか。 | マネージド Redis 向け。 |
| `database.yml > redis-cache.ttl-seconds` | キャッシュ寿命。 | 短いと整合性寄り、長いと速度寄り。 |
| `database.yml > redis-cache.key-prefix` | キー接頭辞。 | 他システムとの衝突防止。 |
| `database.yml > redis-cache.presence-ttl-seconds` | オンライン同期の寿命。 | 長すぎると幽霊在席が残りやすい。 |
| `database.yml > redis-cache.presence-heartbeat-seconds` | オンライン同期の心拍間隔。 | 短いほど追従性寄り、長いほど負荷寄り。 |

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
