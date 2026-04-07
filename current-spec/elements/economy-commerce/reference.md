# 経済・コマース の設定項目

経済・コマース要素は、現状だと数値バランスの多くがコード側にあります。YAML で直接触れるのは、主に公開コマンド、権限、Storage Box の制限です。

> [!NOTE]
> 価格式や手数料のような本体ロジックは `EconomyRuntime` 側にあり、今の `resources` では「入口と許可」を中心に管理しています。

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
| `commands.sell.permission` | 直売導線の権限。 | 即時換金の入口。 |
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

## `config.yml` の倉庫制限と共有インフラ

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `storage-box.blocked-items[]` | Storage Box に預けられない item key。 | 特殊アイテムの持ち逃げや混入を防ぐ。 |
| `redis-cache.enabled` | Redis キャッシュの ON/OFF。 | 複数サーバー運用で共有キャッシュを入れる時の入口。 |
| `redis-cache.host` | Redis ホスト名。 | 外部 Redis を使う時に必須。 |
| `redis-cache.port` | Redis ポート。 | 既定は `6379`。 |
| `redis-cache.username` / `password` | Redis 認証。 | ACL 利用時のみ設定。 |
| `redis-cache.database` | DB 番号。 | 共有 Redis で衝突を避ける。 |
| `redis-cache.timeout-millis` | 接続タイムアウト。 | 遅い回線で短すぎると接続失敗しやすい。 |
| `redis-cache.use-ssl` | TLS 接続を使うか。 | マネージド Redis 向け。 |
| `redis-cache.ttl-seconds` | キャッシュ寿命。 | 短いと整合性寄り、長いと速度寄り。 |
| `redis-cache.key-prefix` | キー接頭辞。 | 他システムとの衝突防止。 |

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
