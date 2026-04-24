# ポータブルシティ・キャンペーン・パーティー・クエスト看板 の設定項目

都市運用と長期進行は `portable-city.yml`、`server.yml`、`progression-campaigns.yml`、`community-projects.yml` の組み合わせです。  
questboard はこれに加えて `packet-quest-boards.yml` で 3x5 進化型 board の見え方と抽選ルールを持ちます。

## `server.yml > routing.commands.hub`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `candidates[]` | `/hub` で優先したい home / ASP サーバー一覧。 | 空なら heartbeat と在席数から自動判定する。 |
| `fallback-target` | 候補が見つからない時の最終転送先。 | heartbeat が全部落ちていても最低限寄せたい先がある時に使う。 |

## `server.yml > routing.commands.pve`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `candidates[]` | `/pve` で優先したい PvE / resource サーバー一覧。 | 空なら cluster 在席数から自動判定する。 |
| `fallback-target` | 候補が見つからない時の最終転送先。 | Redis 在席情報がない時でも寄せたい先を固定できる。 |

## `portable-city.yml > transfer.servers.[server-id]`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `proxy-server` | Bungee へ渡す実際の転送先名。 | `server.yml` の name と proxy 名がズレる時の吸収に使う。 |
| `host` / `port` | serverId から接続先を引くための補助情報。 | `/city home` や cluster 転送で同じ serverId を再利用できる。 |

## `portable-city.yml > build-tool`

| キー | 役割 | 変更時の見方 |
| --- | --- | --- |
| `enabled` | city 建築ツール自体を有効化する。 | false にすると `Azuriter_BuildTools` は通常 item に戻る。 |
| `mythic-item-id` | 建築ツールとして扱う Mythic item ID。 | 現行は `Azuriter_BuildTools` を前提にしている。 |
| `preview-interval-ticks` | packet preview の再計算周期。 | 短いほど追従が滑らかだが ray trace 回数は増える。 |
| `ray-trace-distance` | 狙った block を拾う最大距離。 | 遠すぎると意図しない面を拾いやすい。 |
| `size-steps[]` | Shift+左クリックで循環するサイズ一覧。 | `LINE` / `DIAGONAL` は長さ、`SQUARE` は一辺サイズとして使う。 |

## `portable-city.yml > runtime`

| キー | 現行値 | 役割 | 変更時の見方 |
| --- | --- | --- | --- |
| `fixed-time` | `1000` | city world の時刻を固定する。 | 明るさや見た目の基準を変える時に見る。 |
| `spawn-safe-radius` | `0` | spawn 中心からの建築保護半径。 | 現行は半径 0 なので spawn 保護で建築ツールを広く止めない。visitor 制約は別に残る。 |
| `void-rescue-y-threshold` | `-64` | void 救出を始める Y 座標。 | 初期足場の下は空洞なので、落下時の復帰基準として扱う。 |

## city 初期地形

| 項目 | 現行仕様 | コード上の基準 |
| --- | --- | --- |
| 足場サイズ | spawn を基準にした 32x32。X/Z は `-16..15` の範囲。 | `PortableCityStarterTerrain.PLATFORM_HALF_SIZE_BLOCKS = 16` |
| 表面 | Y=64 に grass block を敷く。spawn 中央 1 ブロックだけ bedrock marker。 | `SURFACE_Y = 64`, `topMaterial(...)` |
| 足場の厚み | Y=62,63 の 2 層を dirt で埋める。 | `FILL_START_Y = SURFACE_Y - 2` |
| 足場下 | 初期生成では air のまま。通常地形、洞窟、構造物、mob、装飾は生成しない。 | `PortableCityBootstrapGenerator` |
| biome | 全域 plains。 | `PLAINS_BIOME_PROVIDER` |

## city world border

| 項目 | 現行仕様 | コード上の基準 |
| --- | --- | --- |
| 中心 | city spawn の X/Z。 | `PortableCityRules.worldBorderSpec(spawn)` |
| サイズ | `512.0` blocks。 | `PortableCityRules.WORLD_BORDER_SIZE` |

### city 建築ツール操作

| 操作 | 役割 | 運用メモ |
| --- | --- | --- |
| 右クリック | いま preview されている配置を実際に設置する。 | 見ている block の blockData を複製し、空気 / 液体だけを埋める。 |
| 左クリック | 現在のモードとサイズを action bar に再表示する。 | 誤操作時の確認用。 |
| Shift+右クリック | `LINE` → `SQUARE` → `DIAGONAL` の順に切り替える。 | `SQUARE` は見ている面の外側へ面張りする。 |
| Shift+左クリック | サイズを `build-tool.size-steps[]` の順に循環する。 | 既定は `1,3,5,7,9`。 |

### city 建築ツールの制約

- city world のメンバーだけが使える
- `portable-city.yml > runtime.spawn-safe-radius` 内の block は preview も設置も行わない
- 現行の `spawn-safe-radius` は `0` なので、実質的な広域 spawn 保護は置かず、visitor 制約で非メンバーの編集を止める
- preview は packet block change なので本人にだけ見える
- 複雑な multi-block も blockData ごと複製するため、door や bed などは通常設置より癖が出やすい

## city 作成コスト

| コマンド | 費用 | 運用メモ |
| --- | --- | --- |
| `/city create <groupId> <cityId>` | `200,000` | 最初のグループと最初の city を作る初回費用。 |
| `/city addcity <cityId>` | 前回の `5` 倍 | 追加コストは `200,000 -> 1,000,000 -> 5,000,000 -> 25,000,000 -> 125,000,000`。1 グループ上限は 5 city。 |

## Party コマンド運用

| コマンド | 役割 | 運用メモ |
| --- | --- | --- |
| `/party invite <player>` | パーティー招待。 | Redis 在席共有が有効なら他サーバーのオンライン player にも送れる。 |
| `/party accept [leader]` / `/party deny [leader]` | 招待の承認 / 辞退。 | 招待一覧は `/party` からも確認できる。 |
| `/party gather` | リーダーが他サーバー側メンバーへ集合要請を送る。 | 自分と別 serverId にいるメンバーだけが対象。 |
| `/party gather accept [leader]` / `/party gather deny [leader]` | 集合要請の承認 / 辞退。 | `portable-city.yml > transfer.servers` で proxy 名を引けることが前提。 |
| `/party` | 現在の PT 状態を表示。 | メンバーは `player@serverId` 形式で見えるので、どのサーバーに散っているかを確認しやすい。 |

### cross-server party の前提

- Redis 在席共有が無効だと party は従来どおり同一サーバー内だけで動く
- サーバー間集合は `portable-city.yml > transfer.servers.[server-id].proxy-server` から Bungee 転送先を引く
- leader が別サーバーへ移動した後の集合先は、その時点の leader 在席サーバーを優先する

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
| `PortableCityBuildToolService` | city 内建築ツールの判定、preview、設置本体。 | `Azuriter_BuildTools` の Mythic ID と `portable-city.yml > build-tool` を参照する。 |
| `GUIDED` | 初心者向け。 | おすすめ中心で迷わせない。 |
| `ASSISTED` | 中級者向け。 | 軽い視点切替を与えつつ、`LOCKED` は極力見せない。 |
| `TACTICAL` | 上級者向け。 | 未完了、高報酬、周回などへ短く寄せる。 |
| `/questboard packet list` | 定義済み packet board を一覧。 | board ID 確認用。 |
| `/questboard packet reload` | `packet-quest-boards.yml` を再読込。 | world 配置や rule 変更後に使う。 |
| `frontier-quest-boards.yml` | 旧カテゴリ看板の保存先。 | legacy 互換用。 |

## 運用メモ

- 平原序盤 combat のみ、`plains_combat_surface` を使って高地ライセンス前でも受注できる
- `snow_surface` は平原 gather / fishing と中盤以降の combat 本線として維持する
- `GUIDED` は受注可能候補が 2 件以上ある時に locked 系を出さない前提で weight を調整する
- 建築ツールのサイズ段は odd 中心にしておくと `SQUARE` が中央基準で扱いやすい

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki](./wiki.md)
