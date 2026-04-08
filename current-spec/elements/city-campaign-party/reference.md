# ポータブルシティ・キャンペーン・パーティー・クエスト看板 の設定項目

都市運用と長期進行は `portable-city.yml`、`progression-campaigns.yml`、`community-projects.yml` の 3 本柱です。  
questboard はこれに加えて `packet-quest-boards.yml` で固定 board の見え方と抽選ルールを持ちます。

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
| `mount.fallback-world` | mount 失敗時の退避先 world。 | 空だと既定動作に依存する。 |
| `mount.idle-unload-seconds` | 放置 world の unload 秒数。 | メモリ節約用。 |
| `transfer.default-port` | world transfer の既定ポート。 | プロキシ構成に合わせる。 |
| `runtime.*` | world runtime gamerule。 | autosave、固定時刻、天候固定、keep inventory などをまとめて持つ。 |
| `runtime.spawn-safe-radius` | spawn 安全地帯の半径。 | この範囲は全員に対して絶対保護。 |
| `runtime.void-rescue-y-threshold` | 奈落復帰を発火する Y。 | これ未満に落ちると city spawn へ戻す。 |
| `defaults.*` | 新規 city の既定値。 | member limit、visit/fly、difficulty、biome、保存設定などをまとめて持つ。 |

## `progression-campaigns.yml` と `community-projects.yml`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `governance.timezone` | 週替わり基準のタイムゾーン。 | campaign の切替時刻の基準。 |
| `governance.weekly-reset.hour/minute` | 週リセット時刻。 | 週替わり更新タイミング。 |
| `governance.active-count` | 同時に有効な campaign 数。 | world の話題分散を決める。 |
| `campaigns.[campaign-id].contract-ids[]` | 紐づく契約 ID。 | questboard 母集団に直結する。 |
| `campaigns.[campaign-id].community-project-id` | 恒久 project ID。 | 長期進行との接続点。 |
| `projects.[project-id].tiers.[tier].required-contributions` | tier 到達に必要な累計貢献。 | 長期ペースの主調整点。 |
| `projects.[project-id].tiers.[tier].permanent-unlocks.*` | 恒久解放。 | route / 기능 / offer 解放に使う。 |

## `packet-quest-boards.yml`

### `settings`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `settings.server-salt` | seed 生成用の固定ソルト。 | 変えると全員の候補順が変わる。 |
| `settings.refresh-cooldown-seconds` | 同一条件での再計算間隔。 | 短いほど即応だが再計算が増える。 |

### `progression-profiles.[profile-id]`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `profession-level-thresholds[]` | 職業レベルから stage を上げる閾値。 | 高いほど初心者帯が長く残る。 |
| `gathering-point-thresholds[]` | 採集 total point から stage を上げる閾値。 | 解放済み milestone 量を stage へ反映する。 |
| `unlock-count-thresholds[]` | unlock 数から stage を上げる閾値。 | 長期解放量を候補制御へ混ぜる。 |

### `boards.[board-id]`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `display-name` | 掲示板表示名。 | summary / wiki 表記に出る。 |
| `world` | 配置 world。 | 実 world と一致必須。 |
| `origin.x/y/z` | 左上 sign の原点座標。 | ここから 3x4 の固定 sign 面を計算する。 |
| `facing` | ボード正面向き。 | `south` `north` `east` `west`。 |
| `width` / `height` | sign 配列サイズ。 | 既定は 4x3。 |
| `visible-slots` | 同時表示件数。 | 推奨は 3〜5。 |
| `view-radius` | packet 再送半径。 | 範囲外プレイヤーへは送らない。 |
| `seed-cycle` | seed 更新周期。 | `DAILY` か `WEEKLY`。 |
| `progression-profile` | stage 算出プロファイル。 | ロビー別の表示傾向を分けたい時に使う。 |
| `npc-id` | 受付 NPC の論理名。 | docs / 運用上の識別子。 |
| `npc-mythic-spawner-ids[]` | Mythic NPC 連動用 spawner 名。 | 右クリックでおすすめ候補案内へ使う。 |
| `npc-entity-uuids[]` | 固定 entity UUID 連動。 | vanilla / 手置き個体を使う時向け。 |

### `rules.[quest-id]`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `board-ids[]` | この rule を適用する board 群。 | 空なら全 board。 |
| `min-stage` / `max-stage` | 表示 stage 範囲。 | stage から遠すぎる quest を出しにくくする。 |
| `weight` | 抽選重み。 | 高いほど同条件で出やすい。 |
| `tags[]` | 表示制御タグ。 | `beginner` などを付けると補正へ使える。 |
| `requires-unlocked-area` | 追加 unlock 条件。 | quest 定義外の board 固有 gate に使う。 |
| `cooldown-visible` | CT 中でも候補に残すか。 | false なら CT 中は非表示寄りになる。 |
| `board-visible` | board 母集団に入れるか。 | false で完全除外。 |

## コード側ルール

| 項目 | 役割 | 変更時の見方 |
| --- | --- | --- |
| `QuestBoardService` | legacy 看板と packet board の窓口。 | `/yes` `/no` と右クリック導線を統合する。 |
| `PacketQuestBoardRuntime` | 個別 packet 表示と seed 抽選本体。 | 近距離再送、進捗 stage、NPC 連動を持つ。 |
| `/questboard packet list` | 定義済み packet board を一覧。 | board ID 確認用。 |
| `/questboard packet reload` | `packet-quest-boards.yml` を再読込。 | world 配置や rule 変更後に使う。 |
| `packet-quest-boards.yml` | 固定 board 定義と抽選 rule。 | ロビー導線の主設定。 |
| `frontier-quest-boards.yml` | 旧カテゴリ看板の保存先。 | legacy 互換用。 |

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
