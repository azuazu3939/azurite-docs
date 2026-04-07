# ポータブルシティ・キャンペーン・パーティー・クエスト看板 の設定項目

都市運用と長期進行は `portable-city.yml`、`progression-campaigns.yml`、`community-projects.yml` の 3 本柱です。party と questboard の細かい秒数は現状コード側なので、YAML 側は運用と週替わり進行が中心です。

> [!TIP]
> 週替わり体験を触るなら `campaigns` だけでなく、対応する `community-projects.yml` の tier 報酬も同時に確認すると、解放順が崩れません。

このページでは、可変のキー名を `[campaign-id]` や `[project-id]` のように表記します。

## `portable-city.yml` の都市ノード運用

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `enabled` | ポータブルシティ全体の ON/OFF。 | city role の runtime を止める最上位。 |
| `server-node.accepting-new-worlds` | 新規 world 割り当てを受けるか。 | 一時メンテ時に閉じたい時に使う。 |
| `server-node.status` | ノード状態。 | 監視や rebalance の参照値。 |
| `server-node.heartbeat-seconds` | heartbeat 間隔。 | 短いほど落ち検知が早い。 |
| `rebalance.enabled` | world 再配置を許すか。 | 負荷分散の本体。 |
| `rebalance.interval-minutes` | rebalance 判定周期。 | 頻度を上げると揺れやすくなる。 |
| `rebalance.cooldown-minutes` | 再配置後の待機。 | world 移動の連鎖防止。 |
| `rebalance.heartbeat-stale-seconds` | stale 扱い秒数。 | ノード死亡判定。 |
| `rebalance.min-target-tps-1m` | 許容最低 TPS。 | 低すぎる world を逃がす基準。 |
| `rebalance.max-target-memory-pressure` | 許容最大メモリ圧。 | メモリ逼迫回避。 |
| `rebalance.min-score-improvement` | 移動する最低改善幅。 | 小さな差で揺れないための閾値。 |
| `mount.fallback-world` | mount 失敗時の退避先 world。 | 空だと既定動作に依存する。 |
| `mount.idle-unload-seconds` | 放置 world の unload 秒数。 | メモリ節約用。 |
| `mount.afk-player-seconds` | AFK プレイヤー判定。 | idle 判定に影響する。 |
| `transfer.default-port` | world transfer の既定ポート。 | プロキシ構成に合わせる。 |
| `transfer.servers.[server-id].proxy-server` | 表示・識別用のサーバー名。 | Velocity/Bungee 側の名前と揃える。 |
| `transfer.servers.[server-id].host` / `port` | 接続先。 | ノード増設時に必要。 |
| `runtime.*` | world runtime gamerule。 | autosave、固定時刻、天候固定、keep inventory などをまとめて持つ。 |
| `runtime.spawn-safe-radius` | spawn 安全地帯の半径。 | この範囲は全員に対して絶対保護。 |
| `runtime.void-rescue-y-threshold` | 奈落復帰を発火する Y。 | これ未満に落ちると city spawn へ戻す。 |
| `defaults.member-limit` | 既定メンバー数上限。 | 都市の収容人数。 |
| `defaults.environment` | world environment。 | `normal` など。 |
| `defaults.difficulty` | 難易度。 | city world の危険度。 |
| `defaults.allow-monsters/animals` | Mob 許可。 | hub 化するなら monster を切る。 |
| `defaults.pvp` | PvP 許可。 | 都市内の安全性。 |
| `defaults.visitor-access` | 新規 city の一般訪問既定値。 | `visit` コマンドで入れるか。 |
| `defaults.member-flight` | 新規 city のメンバーfly既定値。 | city 内移動の快適さに直結。 |
| `defaults.visitor-flight` | 新規 city の訪問者fly既定値。 | 観光をどこまで自由にするか。 |
| `defaults.default-biome` | 既定バイオーム。 | 何もない city world の見た目。 |
| `defaults.save-poi/save-block-ticks/save-fluid-ticks` | 保存対象。 | パフォーマンスと忠実性のトレードオフ。 |
| `defaults.sea-level` | 海面高さ。 | world 生成見た目に効く。 |

## city ごとの runtime policy

| 項目 | 役割 | 変更時の見方 |
| --- | --- | --- |
| `visitor_access_enabled` | その city が一般訪問を受け付けるか。 | `/city visit <cityId>` の可否。 |
| `member_flight_enabled` | その city 内でメンバー fly を許すか。 | 住民の移動導線。 |
| `visitor_flight_enabled` | その city 内で訪問者 fly を許すか。 | 観光向け導線。 |

## プレイヤー向け city コマンドの追加ルール

| コマンド | 役割 | 変更時の見方 |
| --- | --- | --- |
| `/city home <cityId>` | 所属シティへ戻る。 | メンバー専用。 |
| `/city visit <cityId>` | 公開 city へ見学訪問する。 | 非メンバーは `visit=on` が必要。 |
| `/city setting <cityId> <visit\|memberfly\|visitorfly> <on\|off>` | city の公開設定を変える。 | OWNER / ADMIN が使う。 |

## city 内の保護ルール

| 項目 | 役割 | 変更時の見方 |
| --- | --- | --- |
| spawn 安全地帯 | spawn 半径 5 ブロック。 | メンバーでも設置・破壊・干渉できない。 |
| 訪問者制限 | city 全域の見学専用ルール。 | 設置、破壊、drop、pickup、容器操作、ボタン/レバー、エンティティ操作を止める。 |
| 奈落復帰 | `Y < -64` で city spawn へ戻す。 | 落下死を city 内の事故導線にしない。 |

## `progression-campaigns.yml` の全体統治設定

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `governance.timezone` | 週替わり基準のタイムゾーン。 | 公開運用時は絶対に固定する。 |
| `governance.weekly-reset.hour/minute` | 週リセット時刻。 | 例: 毎週 05:00。 |
| `governance.active-count` | 同時に有効な campaign 数。 | world の話題分散を決める。 |
| `governance.cooldown-weeks` | 同じ campaign が再登場するまでの週数。 | ローテーションの新鮮さに効く。 |
| `governance.fallback-community-threshold` | 代替採用のしきい値。 | community 不足時の救済基準。 |
| `governance.scheduler-period-seconds` | scheduler 更新間隔。 | 短いほど即時反映だが負荷増。 |
| `governance.focus-bonuses.contract-reward-multiplier` | 注力 campaign の契約報酬倍率。 | 今週推しをどれだけ強くするか。 |
| `governance.focus-bonuses.utility-extra-amount` | utility 報酬の追加量。 | 供給線を太くする量。 |

## `progression-campaigns.yml` の `campaigns.[campaign-id]`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `chapter` | 章番号。 | 全体進行の並び順。 |
| `display-name` | 表示名。 | UI と告知文に出る。 |
| `icon` | アイコン Material。 | 看板や一覧向け。 |
| `contract-ids[]` | 紐づく契約 ID。 | `frontier.yml` 側と一致させる。 |
| `life-resource-tags[]` | 生活資源タグ。 | 資源テーマの分類。 |
| `forge-output-ids[]` | 関連 forge 出力 ID。 | 鍛造側 reward と接続する。 |
| `community-project-id` | 恒久 project ID。 | `community-projects.yml` と一致させる。 |
| `cooldown-weeks` | その campaign 固有の休止週数。 | 全体既定を上書きしたい時に使う。 |
| `telemetry-profile.*` | テレメトリ指標。 | scarcity / hazard / density / recommended-online を持つ。 |
| `legacy-dependencies[]` | 旧要素との依存キー。 | 移行期の橋渡し。 |
| `utility-recipe-ids[]` | 強化対象 utility recipe。 | 今週作ってほしい消耗品の束。 |
| `focus-forge-offer-ids[]` | 注力 week の forge offer。 | trade を押し出す時に使う。 |
| `focus-vendor-offers.[offer-id].label` | 注力 vendor 商品名。 | 週替わり店頭表示。 |
| `focus-vendor-offers.[offer-id].icon` | 商品アイコン。 | 一覧視認用。 |
| `focus-vendor-offers.[offer-id].price` | 価格。 | campaign 通貨や通常経済の重さを見る。 |
| `focus-vendor-offers.[offer-id].rewards.*` | 商品中身。 | `material` / `mmid` / `amount` を持つ。 |

## `community-projects.yml` の恒久プロジェクト段階

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `projects.[project-id].campaign-id` | 紐づく campaign。 | 週替わりと恒久進行を接続する。 |
| `projects.[project-id].display-name` | プロジェクト名。 | 都市 UI 向け。 |
| `projects.[project-id].meter-label` | 進捗メーター名。 | 何を積み上げているかを示す。 |
| `projects.[project-id].icon` | アイコン Material。 | 一覧視認性。 |
| `projects.[project-id].tiers.[tier].required-contributions` | その tier に必要な累計貢献。 | 長期到達ペースの主調整点。 |
| `projects.[project-id].tiers.[tier].permanent-unlocks.unlock-ids[]` | 恒久解放 ID。 | route 解放や機能フラグ向け。 |
| `projects.[project-id].tiers.[tier].permanent-unlocks.forge-offer-ids[]` | 恒久で追加する forge offer。 | 鍛造と強く接続する。 |

## questboard のコード側ルール

| 項目 | 役割 | 変更時の見方 |
| --- | --- | --- |
| `/questboard <category> [player]` | 通常看板の配布コマンド。 | `category` は `fishing` `harvesting` `mining` `logging` の安定 ID を使う。 |
| `frontier-quest-boards.yml` | 設置済み看板の保存先。 | `category` と `quest-id` を保持し、カテゴリ専用看板として復元する。 |
| `QuestBoardService` | 受注待ち 45 秒、再出現 10 分。 | 抽選は同カテゴリの active contract だけを母集団にする。 |
| 旧式看板 | category 未保存の過去データ。 | `quest-id` からカテゴリ推定し、無理なら現在の active contract から1回だけカテゴリを決める。 |

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
