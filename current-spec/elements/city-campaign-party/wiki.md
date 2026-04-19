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

questboard は 3x5 の固定掲示板です。実体は固定 sign 面のままにして、表示テキストだけを player ごとに packet 差し替えします。  
同じ board を見ていても、各 player は自分の進捗 stage、完了数、解放状況、受注中状態、受注 CT に応じた候補を受け取ります。

## プレイヤー体験

1. city の状態が日常運用の基盤になる
2. 公開 city なら `/city visit` で非メンバーも見学に入れる
3. spawn 周辺は絶対安全地帯として案内や集合地点に使える
4. 週替わり campaign や project tier が長期目標を提示する
5. party 招待で複数人行動に入り、questboard から自分向け候補へつながる
6. board 右クリックか受付 NPC クリックで詳細確認し、/yes /no で受注を決める

## cross-server party

- party 招待、参加、離脱、キック、解散は Redis 在席共有が有効ならサーバーをまたいで扱える
- `/party` のメンバー表示は `player@serverId` になるので、今どのサーバーに散っているかを即確認できる
- leader は `/party gather` で別サーバーにいるメンバーへ集合要請を送り、対象メンバーは `/party gather accept [leader]` で leader のいるサーバーへ移動できる
- 集合要請は「強制転送」ではなく承認式なので、クエスト中や作業中のメンバーを一方的に飛ばさない

## questboard の進化

### GUIDED

- 初心者向けのおすすめ掲示板
- 次にやることをすぐ分かるようにする
- 受注可能な依頼を最優先し、`LOCKED_SOON` は受注候補が足りない時だけ末尾に 1 件だけ見せる

### ASSISTED

- 中級者向けの軽い絞り込み付き掲示板
- `近場` `戦闘寄り` `採集寄り` `短時間` `報酬寄り` などへ切り替えられる
- おすすめを残しつつ、自分で選んでいる感覚を与える
- `LOCKED` は原則出さず、`LOCKED_SOON` は閲覧軸ごとに最大 1 件までに抑える

### TACTICAL

- 上級者向けの目的別ショートアクセス掲示板
- `未完了` `周回向け` `高報酬` `評判値` `ソロ安定` `PT向け` `高難度` へ寄せられる
- 読む板より使う板として扱う

## seed と候補選定

- seed は `player UUID + boardId + cycleId + progressionStage + serverSalt` で安定化する
- `seed-cycle` が `DAILY` なら日替わり、`WEEKLY` なら週替わりの候補感になる
- stage が変わると同じ日でも候補が差し替わる
- 候補の母集団は rule、route 進入可否、quest unlock、受注 CT、閲覧軸補正で絞る
- route lock と quest unlock 不足は同列に扱わず、route lock の方を強く減点して初心者板へ出にくくする

## 序盤平原 combat 例外

- `plains_path_skirmish` と `plains_harvest_ambush` だけは、平原序盤 combat 専用 route を使って高地ライセンス前でも触れられる
- `plains_supply_subjugation` 以降と平原 gather / fishing は従来どおり `snow_surface` 本線に残し、高地ライセンス解放後の導線として維持する
- つまり「平原全体の前倒し」ではなく「序盤 combat だけの例外開放」である

## NPC の立ち位置

- NPC はカテゴリ切替機ではない
- GUIDED ではおすすめ候補の受注補助役
- ASSISTED / TACTICAL では閲覧軸の切替補助役
- Mythic spawner 名か固定 entity UUID で board に紐づける

## 編集フロー

1. city、campaign、party / board のどの層を変えるか切り分ける
2. board の実 world 配置と `packet-quest-boards.yml` の `position` / `facing` が一致しているか確認する
3. `progression-profiles` の mode 解放閾値を先に決める
4. `boards.[board-id]` の 3x5 配置と view radius を決める
5. 個別 quest の出し分けが必要なら `rules.[quest-id]` を足す

## よく触る変更パターン

### packet board の候補傾向を変えたい

- `progression-profiles` の stage / 完了数閾値を見る
- `visible-slots` は 3〜5 を超えないほうが読みやすい
- `weight` は単体調整、`min-stage/max-stage` は導線調整として分けて扱う
- `requires-unlocked-area` は board 固有の gate を足したい時だけ使う

### 閲覧軸の切替を強くしたい

- まず `ASSISTED` / `TACTICAL` の解放条件を確認する
- 戦闘や報酬の比重は個別 quest の tags と weight で補助する
- board 自体を増やすより、同じ board の見え方を変える方向を優先する

### board の表示がズレる / 反映されない

- world 名、`position`、`facing`、実 sign 面の向きを確認する
- `/questboard packet reload` で再読込する
- 近距離の player にだけ再送するので、view radius の外からは変化しない

## FAQ

### packet board と legacy 看板は同時に使えるか

使えます。legacy のカテゴリ専用看板は互換用に残り、ロビー導線は進化型 packet board を主役にできます。

### 受注できない quest は出るか

出ますが、`GUIDED` / `ASSISTED` では出しすぎないよう抑えます。`GUIDED` は受注候補が足りない時だけ `LOCKED_SOON` を 1 件見せ、`ASSISTED` も閲覧軸ごとに最大 1 件までです。stage から遠い quest や route lock は候補プールへ入りにくくしています。

### NPC は必須か

必須ではありません。board 単体でも機能しますが、受付 NPC を置くと閲覧軸補助と受注導線が自然になります。

### cross-server party が効かない時はどこを見るか

まず Redis 在席共有が有効かを見ます。これが無効だと party は同一サーバー専用に戻ります。
次に `portable-city.yml > transfer.servers.[server-id].proxy-server` が leader 側 serverId を引けるか確認します。ここが欠けると集合要請の承認時に正しい転送先を決められません。

## リンク

- [要素概要](./summary.md)
- [編集例](./examples.md)
- [Wiki執筆ガイド](../../wiki-editing-guide.md)
