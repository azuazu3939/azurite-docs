# ポータブルシティ・キャンペーン・パーティー Wiki

> [!NOTE]
> 旧 questboard は旧遠征と一緒に撤去済みです。このページでは city、campaign、community project、party の導線を扱います。

## クイックデータ

| 項目 | 内容 |
| --- | --- |
| 主役 | portable city、campaign rotation、community project、party |
| 主設定 | `portable-city.yml`, `server.yml`, `progression-campaigns.yml`, `community-projects.yml` |
| 影響先 | 長期目標、週替わり報酬、party 集合導線 |
| 変更難度 | 中〜高 |

## 概要

この要素は「サーバー全体で何を目標にし、どう集まるか」を扱います。
city runtime が常設の基盤を作り、campaign と community project が長期目標を提示し、party が複数人行動を支えます。

## プレイヤー体験

1. city の状態が日常運用の基盤になる
2. 最初の city は `200,000`、追加 city は前回の `5` 倍コストで増えていく
3. 作成直後は spawn 中心の 32x32 足場から始まり、足場下は空洞になる
4. world border は spawn 中心の 512 blocks で、初期拠点の広がりを小さく保つ
5. 公開 city なら `/city visit` で非メンバーも見学に入れる
6. visitor はドア、ボタン、レバー、感圧板など観光導線用の軽い装置だけ操作できる
7. chest などの収納、設置、破壊、ドロップ、拾得は city の保護 profile と役職で制御する
8. OWNER / ADMIN は `/city manage` から保護 profile、visit/fly、時刻、天候を調整できる
9. 週替わり campaign や project tier が長期目標を提示する
10. party 招待で複数人行動に入り、campaign や各機能の入口へつながる

## cross-server party

- party 招待、参加、離脱、キック、解散は Redis 在席共有が有効ならサーバーをまたいで扱える
- `/party` のメンバー表示は `player@serverId` になるので、今どのサーバーに散っているかを即確認できる
- leader は `/party gather` で別サーバーにいるメンバーへ集合要請を送り、対象メンバーは `/party gather accept [leader]` で leader のいるサーバーへ移動できる
- 集合要請は承認式なので、作業中のメンバーを一方的に飛ばさない

## city build tool

- `Azuriter_BuildTools` を右手に持つと city 内専用の建築ツールとして動く
- 見ている block の blockData を複製し、`LINE` `SQUARE` `DIAGONAL` の 3 モードで空きマスへ並べて置ける
- preview は packet block change で本人にだけ見える
- Shift+右クリックでモード切替、Shift+左クリックでサイズ切替、左クリックで現在状態確認、右クリックで確定設置
- 現行の `spawn-safe-radius` は `0` なので、visitor 状態では preview も実設置も止まる

## city protection profile

- city の保護は個人 lock ではなく、`standard` `public` `strict` `builders` `admin_only` の profile で扱う
- profile は build、container、device、entity、item-flow ごとに最低役職を持つ
- `standard` では visitor も door / trapdoor / fence gate / button / lever / pressure plate を操作できる
- chest、barrel、shulker、furnace、hopper などの収納は visitor には開かない
- `spawn-safe-radius` 内は profile に関係なく保護される
- server admin は `azurite.city.protection.bypass` で保護を上書きできる

## city environment

- city ごとに時刻と天候を保存する
- 時刻は `natural` `morning` `noon` `evening` `night`
- 天候は `natural` `clear` `rain` `thunder`
- 固定設定は city load 時と GUI 変更時に即反映される
- 通常の管理は OWNER / ADMIN が `/city manage <cityId>` から行い、MODERATOR は補佐と閲覧寄りの役割に留める

## city 初期地形

- 初期足場は spawn を基準にした 32x32 の grass block 面
- spawn 中央 1 ブロックだけ bedrock marker になる
- 足場の下は Y=62,63 の 2 層だけ dirt で、さらに下は空洞
- 通常地形、洞窟、構造物、装飾、mob は初期生成しない
- biome は plains 固定
- world border は spawn 中心、サイズ `512.0`

## 旧 questboard

- `packet-quest-boards.yml` は撤去済み
- `/questboard packet reload` は撤去済み
- GUIDED / ASSISTED / TACTICAL の候補表示も新規運用しない
- 旧遠征契約と結びつく説明を追加しない

## FAQ

### city の追加費用はどう増えるか

最初の city 作成は `200,000` です。  
同じ group に `addcity` で増やす時は前回の `5` 倍になり、並びは `200,000 -> 1,000,000 -> 5,000,000 -> 25,000,000 -> 125,000,000` です。

### 旧 questboard は戻す前提か

戻しません。日常導線は campaign、party、各機能の個別入口で扱います。

## 関連

- [要素概要](./summary.md)
- [設定項目](./reference.md)
- [編集例](./examples.md)
