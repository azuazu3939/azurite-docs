# スポーン制御・ワールドボス・Mythic AI の設定項目

この要素は、spawn director が全体交通整理をし、package が個別 mob 群を定義し、world boss と Mythic AI がその上に乗る構成です。

> [!TIP]
> 「湧かない」の原因は 1 つとは限りません。`00-spawn-director.yml` の条件、`10-spawn-packages.yml` の territory、`20-world-bosses.yml` の world 制約、`mythic-ai.yml` の負荷制限を順に見ます。

このページでは、可変のキー名を `[budget-id]` や `[package-id]` のように表記します。

## `mob-spawns/00-spawn-director.yml` の全体制御

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `enabled` | spawn director 全体の ON/OFF。 | 切ると package はあっても動かない。 |
| `scheduler.director-tick` | director 更新 tick。 | 短いほど反応は早い。 |
| `scheduler.active-cell-refresh-tick` | 活性 cell 再計算周期。 | プレイヤー移動追従に効く。 |
| `scheduler.cache-rebuild-budget-per-tick` | 1 tick に再構築する cache 量。 | 負荷とのトレードオフ。 |
| `scheduler.sync-placement-budget-per-tick` | 同期配置の上限。 | 同時湧き数の天井。 |
| `scheduler.max-cells-evaluated-per-tick` | 評価する cell 数上限。 | 広域時の重さを抑える。 |
| `cell.size-xz/size-y` | cell サイズ。 | territory 分解の粒度。 |
| `cell.active-radius-cells` | プレイヤー周辺で活性化する半径。 | 湧き範囲。 |
| `cell.idle-ttl-seconds` | idle cell の保持秒数。 | キャッシュ寿命。 |
| `cell.max-cached-cells-per-world` | world ごとの cell cache 上限。 | メモリ保護。 |
| `load-shedding.*` | 負荷時の重み減衰。 | high / critical で heavy package をどこまで絞るか。 |
| `cache.*` | 候補点キャッシュ戦略。 | 距離、期限、失敗時 eviction 条件を持つ。 |
| `budgets.[budget-id].alive-cap` | 生存 Mob 総量上限。 | budget 単位で制御。 |
| `budgets.[budget-id].threat-cap` | threat 合計上限。 | 高 threat 群の湧きすぎ防止。 |
| `budgets.[budget-id].respawn-delay-seconds` | 再湧き待ち。 | budget 単位の呼吸。 |
| `budgets.[budget-id].category-caps.*` | ambient / elite 等のカテゴリ上限。 | world の雰囲気を決める。 |
| `conditions.profiles.[profile-id].eligibility[]` | 候補にする前の条件。 | プレイヤー距離や cap 判定。 |
| `conditions.profiles.[profile-id].placement[]` | 実配置条件。 | 地面・空間・液体・密度など。 |
| `rules[].id` | ルール ID。 | ログと cooldown の主キー。 |
| `rules[].enabled` | 個別 rule の ON/OFF。 | 特定 Mob を止める最短手段。 |
| `rules[].priority` | ルール優先度。 | 同時候補時の順序。 |
| `rules[].package-id` | 使う package。 | `10-spawn-packages.yml` と一致させる。 |
| `rules[].condition-profile` | 使用条件 profile。 | `conditions.profiles` を参照。 |
| `rules[].budget-key` | 参照する budget。 | category 上限と紐づく。 |
| `rules[].cooldown-key` | cooldown 共有キー。 | 類似湧きの連続発生抑制。 |
| `rules[].weight` | 出現重み。 | 直接的な湧きやすさ。 |
| `rules[].respawn-delay-seconds` | その rule 固有の待ち時間。 | package 個別のテンポ。 |
| `rules[].max-per-cell` | 1 cell の最大配置数。 | 局所密度を防ぐ。 |

## `mob-spawns/10-spawn-packages.yml` の個別 package 定義

2026-04-17 時点で、通常 mob への territory 由来のステータス補正と報酬補正は廃止しています。  
package 側の territory は出現位置の選定にのみ使います。

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `packages.[package-id].category` | spawn カテゴリ。 | `ambient` `elite` `territory` `event` など。 |
| `packages.[package-id].threat` | 脅威値。 | budget の `threat-cap` と噛む。 |
| `packages.[package-id].heavy` | heavy 扱いか。 | 高負荷時に絞られやすい。 |
| `packages.[package-id].class-exp-base` | 互換用の予約値。 | 現在の通常 mob では未使用。 |
| `packages.[package-id].territory.frontier-domains[]` | 主ドメイン。 | `surface` などの大分類。 |
| `packages.[package-id].territory.preferred-families[]` | 好む family。 | `forest` `plains` など。 |
| `packages.[package-id].territory.climate-tags-any[]` | 気候 tag 条件。 | 湿地・寒冷などを絞る。 |
| `packages.[package-id].territory.feature-sets-any[]` | 地物 tag 条件。 | `ore_nodes` など。 |
| `packages.[package-id].territory.route-tags-any[]` | route tag 条件。 | どのルートに出したいか。 |
| `packages.[package-id].territory.coverage-weight` | 面的な好み。 | 広く出したいかの補正。 |
| `packages.[package-id].territory.cluster-weight` | 群れやすさ補正。 | 局所的に固めたい時に上げる。 |
| `packages.[package-id].mob-entries[]` | 実際に出す Mob 群。 | `mob-id` と `count` を持つ。 |
| `packages.[package-id].spawn.formation` | 配置形。 | `spread` や `cluster`。 |
| `packages.[package-id].spawn.radius-min/max` | ばらける範囲。 | プレイヤーからの見え方が変わる。 |
| `packages.[package-id].spawn.line-of-sight-to-player` | 視線要求。 | 唐突湧きを減らしたい時に使う。 |
| `packages.[package-id].spawn.target-mode` | 互換用の初期ターゲット設定。現在は Azuriter 側で固定せず、MythicMobs 側で制御する。 | 推奨は `none`。 |

## `mob-spawns/20-world-bosses.yml` のボス定義

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `bosses.[boss-id].mythic-mob-id` | 実際に出す MythicMob ID。 | boss 本体の参照先。 |
| `bosses.[boss-id].worlds[]` | 出現候補 world。 | frontier pool と一致させる。 |
| `bosses.[boss-id].territory.*` | 出現地形の好み。 | package と似た形で family / climate / feature / route を持つ。 |
| `bosses.[boss-id].class-exp-base` | 討伐時 class exp 基礎値。 | ボス報酬の核。 |
| `bosses.[boss-id].respawn-min-minutes` | 最短再出現。 | 周回可能性の下限。 |
| `bosses.[boss-id].respawn-max-minutes` | 最長再出現。 | ばらつき幅。 |
| `bosses.[boss-id].quest-id` | 討伐契約 ID。 | questboard や achievement と繋ぐ。 |

## 2026-04 の world boss 現地転送メモ

- 討伐クエスト受注後の現地 TP は、ボス中心から半径 `100 / 108 / 116 / 124 / 128` ブロックのリング候補だけを使う。
- 実際の着地点も平面距離 `100..128` を満たす地点だけ採用し、中心への fallback は使わない。
- 安全地点がリング内に無い場合は TP を諦め、座標サマリを案内して手動移動へ落とす。

## `mythic-ai.yml`・`mythic-ai-candidates.yml`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `mythic-ai.yml > enabled` | AI runtime 全体の ON/OFF。 | 切ると safe mode 制御も止まる。 |
| `scheduler.ai-tick` | AI 判断 tick。 | 低いほど反応が速い。 |
| `scheduler.phase-tick` | phase 更新周期。 | 行動段階の切替速度。 |
| `scheduler.shared-cooldown-tick` | 共有 cooldown 更新周期。 | 多重発動の抑制。 |
| `combat.scan-range` | 周囲走査距離。 | 広いほど賢いが重くなる。 |
| `combat.recent-skill-memory` | 直近スキル記憶数。 | 同じ行動の連打防止。 |
| `load.tps/projectiles/summons/heavy.*` | 負荷レベル境界。 | elevated / high / critical ごとの閾値。 |
| `director.base-heavy-skill-cap` | heavy skill 同時上限。 | 高負荷時の安全弁。 |
| `director.base-summon-cap` | summon 同時上限。 | Mob 連鎖の暴走防止。 |
| `director.base-projectile-cap` | projectile 上限。 | 弾幕制御。 |
| `director.base-display-density-cap` | display 密度上限。 | 見た目負荷を抑える。 |
| `director.heavy-reservation-ticks` | heavy skill の占有時間。 | 重い行動の競合防止。 |
| `director.default-encounter-duration-seconds` | 想定交戦時間。 | AI 配分の母数。 |
| `boss-bindings` | ボス個別 AI バインド。 | 現在は空。後から差し込む余地。 |
| `mythic-ai-candidates.yml > groups.[group-id]` | 候補スキル群。 | 各候補は `id` `mythic-skill-name` `category` `weight` `heavy` を持つ。 |
| `estimated-projectile-cost` | 弾幕コスト見積り。 | director cap と噛む。 |
| `estimated-summon-cost` | summon コスト見積り。 | 召喚過多を防ぐ。 |
| `plugins/AzuriteCore/ai-player-telemetry-state.json` | player telemetry の永続状態。 | `JOIN` `CHAT` `GATHER_BREAK` `MYTHIC_KILL` `PROGRESSION_STUCK` を保持する主ファイル。 |
| `plugins/AzuriteCore/telemetry/encounter-surveys/[server-id]/[target-type]/[target-id]/[encounter-id].json` | encounter survey 保存先。 | 回答完了時にローカルへ UTF-8 JSON を出力する。 |
| MariaDB / Redis | runtime 補助依存。 | telemetry の主系統は plugin 内 JSON。 |

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
