# スポーン制御・ワールドボス・Mythic AI Wiki

> [!WARNING]
> spawn bundle、territory、world boss、AI policy は別設定に見えても、実際は同じ出現制御の別レイヤーです。ひとつだけ直しても期待どおりに動かないことがあります。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | spawn bundle、territory 計算、world boss state、Mythic AI policy、telemetry |
| 主設定 | `mob-spawns/*.yml`, `mythic-ai.yml` |
| 影響先 | Frontier 密度、ボス戦頻度、AI 振る舞い、観測ログ |
| 変更難度 | 高 |

## 概要

このページは「何がどこに、どんな条件で出るか」をまとめる wiki です。  
mob-spawns 配下の bundle を起点に、territory 計算、world boss 状態、Mythic AI policy が合流します。

## プレイヤー体験

1. Frontier 上で spawn 密度や分布が決まる
2. territory に応じて所有や報酬倍率の感じ方が変わる
3. 条件が揃うと world boss へつながる
4. AI policy により戦闘の振る舞いが変化する

## 構成の見取り図

| レイヤー | 主な場所 | メモ |
| --- | --- | --- |
| spawn bundle | `core/src/main/resources/mob-spawns/00-spawn-director.yml` など | 複数ファイルを束ねる入口 |
| territory 計算 | `FrontierTerritoryService` | chunk ごとの所有者や報酬倍率 |
| world boss state | world boss runtime / state 管理 | 出現条件と状態遷移 |
| AI policy | `core/src/main/resources/mythic-ai.yml` | safe mode、spawn policy、combat telemetry |
| player telemetry | `plugins/AzuriteCore/ai-player-telemetry-state.json` | プレイヤー行動の集計スナップショット |

## 2026-04-16 の player telemetry 変更

- 2026-04-16 時点で `feedback-mythicmobs` への export / import は停止し、Azuriter 側では利用しません。
- `JOIN`、`CHAT`、`GATHER_BREAK`、`MYTHIC_KILL`、`PROGRESSION_STUCK` は plugin 内で集計し、`plugins/AzuriteCore/ai-player-telemetry-state.json` へ保存します。
- encounter survey は `plugins/AzuriteCore/telemetry/encounter-surveys/<server-id>/<target-type>/<target-id>/<encounter-id>.json` へ UTF-8 JSON で保存します。
- MariaDB / Redis は runtime の補助依存として残りますが、player telemetry の主系統は plugin 内 JSON です。

## 編集フロー

1. まず「出現条件」「territory」「AI policy」のどこを変えるか決める
2. AI policy だけでなく spawn 条件側も見る
3. player telemetry を見るなら `ai-player-telemetry-state.json` と encounter survey JSON の保存先を先に確認する
4. AI policy の変更点を見る時は `mythic-ai.yml` と runtime 状態をあわせて確認する

## よく触る変更パターン

### mob 出現密度を変えたい

- `mob-spawns` 側を主入口にする
- territory や world boss 条件も巻き込んで体感を確認する

### AI 振る舞いを変えたい

- `mythic-ai.yml` を主入口にする
- ただし出現数が少ないと、AI の違いがほとんど見えないことがあります

### player telemetry を確認したい

- `plugins/AzuriteCore/ai-player-telemetry-state.json` を確認する
- encounter ごとの回答は `plugins/AzuriteCore/telemetry/encounter-surveys/<server-id>/...` に出る
- `feedback-mythicmobs` への自動同期や inbox/history の出力は行わない

## boss TP ルール

- 現地転送は「ボスの足元へ直送」ではなく、100 ブロック以上離れたリング内の安全地点へ送る運用です。
- 2026-04 時点では 128 ブロック以下のリングに限定し、中心 fallback を消してあります。
- そのため安全地形が取れない seed では TP 失敗メッセージへ落ちますが、近距離即交戦やボス直下埋まりは起きにくくなります。

## 連動する要素

- [フロンティア・遠征・釣り戦闘](../frontier-fishing/wiki.md)  
  冒険中の encounter 密度に直結します。
- [ポータブルシティ・キャンペーン・パーティー・クエスト看板](../city-campaign-party/wiki.md)  
  ボス導線や長期イベント側と噛み合います。
- [経済・コマース](../economy-commerce/wiki.md)  
  討伐報酬や希少ドロップの価値へ影響します。

## FAQ

### AI policy だけ直せば挙動は変わるか

必ずしも変わりません。そもそもの spawn 条件が厳しいと、AI 差分を体感できるほど出現しないことがあります。

### territory は見た目の区画情報だけか

いいえ。所有や報酬倍率に関わるため、戦闘密度と報酬価値の両方に効きます。

### Drive 同期は使えるか

使いません。2026-04 時点の Azuriter は Google Drive 同期と AI policy の外部 import / export を無効化しており、AI policy は server 内 runtime 管理前提です。

### player telemetry は DB を見ればよいか

いいえ。まず `plugins/AzuriteCore/ai-player-telemetry-state.json` と encounter survey JSON を確認します。MariaDB / Redis は補助の runtime 状態確認として扱います。

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
