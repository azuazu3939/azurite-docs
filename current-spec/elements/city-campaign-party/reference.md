# ポータブルシティ・キャンペーン・パーティー・クエスト看板 の設定項目

都市運用と長期進行は `portable-city.yml`、`progression-campaigns.yml`、`community-projects.yml` の 3 本柱です。  
questboard はこれに加えて `packet-quest-boards.yml` で 3x5 進化型 board の見え方と抽選ルールを持ちます。

## `packet-quest-boards.yml`

### `settings`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `settings.server-salt` | seed 生成用の固定ソルト。 | 変えると全員の候補傾向が変わる。 |
| `settings.refresh-cooldown-seconds` | 同一条件での再計算間隔。 | 短いほど即応だが再計算が増える。 |

### `progression-profiles.[profile-id]`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `profession-level-thresholds[]` | 職業レベルから stage を上げる閾値。 | 高いほど初心者帯が長く残る。 |
| `gathering-point-thresholds[]` | 採集 total point から stage を上げる閾値。 | 解放済み milestone 量を stage へ反映する。 |
| `unlock-count-thresholds[]` | unlock 数から stage を上げる閾値。 | 長期解放量を候補制御へ混ぜる。 |
| `assisted-min-stage` | `ASSISTED` 解放に必要な stage。 | 中級導線への切替点。 |
| `assisted-unlock-completions` | `ASSISTED` 解放に必要な契約完了数。 | stage が低くても利用理解済みなら昇格できる。 |
| `tactical-min-stage` | `TACTICAL` 解放に必要な stage。 | 上級者向け導線の入口。 |
| `tactical-unlock-completions` | `TACTICAL` 解放に必要な契約完了数。 | 周回・管理前提の閲覧へ入る基準。 |
| `guided-visible-slots` | `GUIDED` の表示件数。 | 初心者向けは少なめに抑える。 |
| `assisted-visible-slots` | `ASSISTED` の表示件数。 | 3x5 の中段に合わせて 5 件まで。 |
| `tactical-visible-slots` | `TACTICAL` の表示件数。 | 高密度でも一目で読める量に止める。 |

### `boards.[board-id]`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `display-name` | 掲示板表示名。 | summary / wiki 表記に出る。 |
| `world` | 配置 world。 | 実 world と一致必須。 |
| `position.x/y/z` | 左上 sign の原点座標。 | ここから 3x5 の固定 sign 面を計算する。 |
| `facing` | ボード正面向き。 | `south` `north` `east` `west`。 |
| `width` / `height` | sign 配列サイズ。 | 既定は 5x3。 |
| `visible-slots` | 同時表示件数。 | 3〜5 を基本にする。 |
| `view-radius` | packet 再送半径。 | 範囲外プレイヤーへは送らない。 |
| `seed-cycle` | seed 更新周期。 | `DAILY` か `WEEKLY`。 |
| `progression-profile` | stage 算出プロファイル。 | ロビー別の表示傾向を分けたい時に使う。 |
| `npc-id` | 受付 NPC の論理名。 | docs / 運用上の識別子。 |
| `npc-mythic-spawner-ids[]` | Mythic NPC 連動用 spawner 名。 | 右クリックで閲覧軸補助やおすすめ案内に使う。 |
| `npc-entity-uuids[]` | 固定 entity UUID 連動。 | vanilla / 手置き個体を使う時向け。 |

### `rules.[quest-id]`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `board-ids[]` | この rule を適用する board 群。 | 空なら全 board。 |
| `min-stage` / `max-stage` | 表示 stage 範囲。 | stage から遠すぎる quest を出しにくくする。 |
| `weight` | 抽選重み。 | 高いほど同条件で前に出やすい。 |
| `tags[]` | 表示制御タグ。 | `beginner` `combat` `reward` などの補正へ使う。 |
| `requires-unlocked-area` | 追加 unlock 条件。 | quest 定義外の board 固有 gate に使う。 |
| `cooldown-visible` | CT 中でも候補に残すか。 | false なら CT 中は非表示寄りになる。 |
| `board-visible` | board 母集団に入れるか。 | false で完全除外。 |

## コード側ルール

| 項目 | 役割 | 変更時の見方 |
| --- | --- | --- |
| `QuestBoardService` | legacy 看板と packet board の窓口。 | `/yes` `/no` と右クリック導線を統合する。 |
| `PacketQuestBoardRuntime` | 個別 packet 表示と seed 抽選本体。 | 3x5 テンプレート、閲覧モード、閲覧軸、NPC 連動を持つ。 |
| `GUIDED` | 初心者向け。 | おすすめ中心で迷わせない。 |
| `ASSISTED` | 中級者向け。 | 軽い視点切替を与える。 |
| `TACTICAL` | 上級者向け。 | 未完了、高報酬、周回などへ短く寄せる。 |
| `/questboard packet list` | 定義済み packet board を一覧。 | board ID 確認用。 |
| `/questboard packet reload` | `packet-quest-boards.yml` を再読込。 | world 配置や rule 変更後に使う。 |
| `frontier-quest-boards.yml` | 旧カテゴリ看板の保存先。 | legacy 互換用。 |

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
