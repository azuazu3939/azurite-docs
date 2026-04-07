# ポータブルシティ・キャンペーン・パーティー・クエスト看板 Wiki

> [!NOTE]
> このページは、長期進行とプレイヤー集合導線をまとめる wiki です。city の常設運用、campaign の週替わり導線、party / questboard の日常導線をひとまとまりで見ます。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | portable city、campaign rotation、community project、party、questboard |
| 主設定 | `portable-city.yml`, `progression-campaigns.yml`, `community-projects.yml` |
| 影響先 | 長期目標、週替わり報酬、boss / frontier 参加導線、受注テンポ |
| 変更難度 | 中〜高 |

## 概要

この要素は「サーバー全体で何を目標にし、どう集まり、どう受けるか」を扱います。  
city runtime が常設の基盤を作り、campaign と community project が長期目標を提示し、party と questboard が日常的なプレイ導線を回します。

## プレイヤー体験

1. city の状態が日常運用の基盤になる
2. 週替わり campaign や project tier が長期目標を提示する
3. party 招待で複数人行動に入り、questboard から受注へつながる
4. boss や frontier への参加導線へ合流する

## 構成の見取り図

| レイヤー | 主な場所 | メモ |
| --- | --- | --- |
| city runtime | `core/src/main/resources/portable-city.yml` | node heartbeat、rebalance、transfer、runtime |
| campaign rotation | `core/src/main/resources/progression-campaigns.yml` | 週替わり倍率や報酬導線 |
| community project | `core/src/main/resources/community-projects.yml` | 恒久 tier と長期目標 |
| party | `PartyService` | 最大 8 人、招待 120 秒 |
| questboard | `QuestBoardService` | 45 秒確認待ち、10 分再出現 |

## 編集フロー

1. city、campaign、party / board のどの層を変えるか切り分ける
2. campaign ID と project ID のズレを確認する
3. 人数や待ち時間の変更は boss / frontier 側の導線も見る

## よく触る変更パターン

### city の運用テンポを変えたい

- `portable-city.yml` を主入口にする
- heartbeat、rebalance、transfer の意味を分けて見る

### 週替わり目標を調整したい

- `progression-campaigns.yml` と `community-projects.yml` を対で見る
- ID や報酬倍率が食い違わないようにする

### party / questboard のテンポを変えたい

- 招待時間、確認待ち、再出現時間を確認する
- ただし体験は boss / frontier 参加導線まで含めて見る

## 連動する要素

- [フロンティア・遠征・釣り戦闘](../frontier-fishing/wiki.md)  
  受注導線と冒険の行き先がつながります。
- [スポーン制御・ワールドボス・Mythic AI](../spawn-ai-worldboss/wiki.md)  
  party や長期イベントの到達先になります。
- [経済・コマース](../economy-commerce/wiki.md)  
  campaign 報酬や project 報酬が流通へ戻ります。

## FAQ

### city と campaign は別ページに分けるべきか

詳細化が進んだら分ける価値がありますが、現状は「長期進行の基盤」として同じ wiki で追うほうが導線を見失いにくいです。

### party の人数変更は軽い調整か

軽くありません。boss、frontier、board 受注の適正人数感まで変わることがあります。

### questboard の時間だけ調整してよいか

可能ですが、受注密度や参加待ちが変わるので、party 導線や campaign 目標との整合も確認したほうが安全です。

## 関連

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
