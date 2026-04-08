# ポータブルシティ・キャンペーン・パーティー・クエスト看板 Wiki

> [!NOTE]
> このページは、長期進行とプレイヤー集合導線をまとめる wiki です。city の常設運用、campaign の週替わり導線、party / questboard の日常導線をひとまとまりで見ます。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | portable city、campaign rotation、community project、party、questboard |
| 主設定 | `portable-city.yml`, `progression-campaigns.yml`, `community-projects.yml`, `packet-quest-boards.yml` |
| 影響先 | 長期目標、週替わり報酬、boss / frontier 参加導線、受注テンポ |
| 変更難度 | 中〜高 |

## 概要

この要素は「サーバー全体で何を目標にし、どう集まり、どう受けるか」を扱います。  
city runtime が常設の基盤を作り、campaign と community project が長期目標を提示し、party と questboard が日常的なプレイ導線を回します。

questboard は 3x4 の固定掲示板です。実体は固定 sign 面のままにして、表示テキストだけを player ごとに packet 差し替えします。  
同じ board を見ていても、各 player は自分の進捗 stage、解放状況、受注中状態、受注 CT に応じた候補を受け取ります。

## プレイヤー体験

1. city の状態が日常運用の基盤になる
2. 公開 city なら `/city visit` で非メンバーも見学に入れる
3. spawn 周辺は絶対安全地帯として案内や集合地点に使える
4. 週替わり campaign や project tier が長期目標を提示する
5. party 招待で複数人行動に入り、questboard から自分向け候補へつながる
6. board 右クリックか受付 NPC クリックで詳細確認し、/yes /no で受注を決める

## 構成の見取り図

| レイヤー | 主な場所 | メモ |
| --- | --- | --- |
| city runtime | `core/src/main/resources/portable-city.yml` | node heartbeat、rebalance、transfer、runtime、visit/fly/奈落復帰 |
| campaign rotation | `core/src/main/resources/progression-campaigns.yml` | 週替わり倍率や報酬導線 |
| community project | `core/src/main/resources/community-projects.yml` | 恒久 tier と長期目標 |
| party | `PartyService` | 最大 8 人、招待 120 秒 |
| packet questboard | `PacketQuestBoardRuntime` | 3x4 固定 board、個別 packet 表示、seed 安定抽選 |
| legacy questboard | `frontier-quest-boards.yml` | カテゴリ専用設置看板。移行用に残る |

## questboard の要点

### 何が変わったか

- 従来のカテゴリ切替前提ではなく、seed と進捗 stage で一定期間安定した候補を出す
- board 本体は固定で、表示だけを player ごとに差し替える
- 一覧板ではなく「今の自分向け候補窓口」として扱う

### seed の見方

- seed は `player UUID + boardId + cycleId + progressionStage + serverSalt` で安定化する
- `seed-cycle` が `DAILY` なら日替わり、`WEEKLY` なら週替わりの候補感になる
- stage が変わると同じ日でも候補が差し替わる

### stage の見方

- profession level
- gathering total point
- unlock 数
- いま入れる route band

これらを `progression-profiles` の threshold で丸め、0〜5 の stage として扱います。  
細かい数値そのものではなく、導線として近い帯かどうかを見る前提です。

### NPC の立ち位置

- NPC はカテゴリ切替機ではない
- board の意味説明と、おすすめ候補の受注補助役
- Mythic spawner 名か固定 entity UUID で board に紐づける

## 編集フロー

1. city、campaign、party / board のどの層を変えるか切り分ける
2. board の実 world 配置と `packet-quest-boards.yml` の `origin` / `facing` が一致しているか確認する
3. `seed-cycle`、`visible-slots`、`progression-profile` を先に決める
4. 個別 quest の出し分けが必要なら `rules.[quest-id]` を足す
5. campaign ID と project ID のズレを確認する

## よく触る変更パターン

### city の運用テンポを変えたい

- `portable-city.yml` を主入口にする
- heartbeat、rebalance、transfer の意味を分けて見る
- 公開 city にするなら `visitor-access` と `visitor-flight` を分けて考える
- 事故導線を減らしたいなら spawn safe radius と void rescue を一緒に見る

### 週替わり目標を調整したい

- `progression-campaigns.yml` と `community-projects.yml` を対で見る
- ID や報酬倍率が食い違わないようにする

### packet board の候補傾向を変えたい

- `packet-quest-boards.yml` の `progression-profiles` と `rules` を見る
- `visible-slots` は 3〜5 を超えないほうが読みやすい
- `weight` は単体調整、`min-stage/max-stage` は導線調整として分けて扱う
- `requires-unlocked-area` は board 固有の gate を足したい時だけ使う

### board の表示がズレる / 反映されない

- world 名、`origin`、`facing`、実 sign 面の向きを確認する
- `/questboard packet reload` で再読込する
- 近距離の player にだけ再送するので、view radius の外からは変化しない

## FAQ

### packet board と legacy 看板は同時に使えるか

使えます。legacy のカテゴリ専用看板は互換用に残り、ロビー導線は packet board を主役にできます。

### 受注できない quest は出るか

出ますが、基本は `LOCKED_SOON` までに寄せます。stage から遠すぎる quest は候補プールに入れにくくしています。

### NPC は必須か

必須ではありません。board 単体でも機能しますが、受付 NPC を置くとおすすめ候補への導線が自然になります。

### 候補が毎回揺れるのを止めたい

`seed-cycle` を見直し、`server-salt` をむやみに変えないようにします。進捗 stage が頻繁に跨いでいないかも確認します。

## 連動する要素

- [フロンティア・遠征・釣り戦闘](../frontier-fishing/wiki.md)  
  受注導線と冒険の行き先がつながります。
- [スポーン制御・ワールドボス・Mythic AI](../spawn-ai-worldboss/wiki.md)  
  party や長期イベントの到達先になります。
- [経済・コマース](../economy-commerce/wiki.md)  
  campaign 報酬や project 報酬が流通へ戻ります。

## リンク

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
