# ポータブルシティ・キャンペーン・パーティー・クエスト看板 の編集例

運用設定、進行設定、導線ルールの 3 つに分けて読むのがおすすめです。

## サンプル
```text
server-node:
- accepting-new-worlds: true
- heartbeat-seconds: 15

portable-city defaults:
- visitor-access: true
- member-flight: true
- visitor-flight: false

portable-city runtime:
- spawn-safe-radius: 5
- void-rescue-y-threshold: -64

city command:
- /city visit market
- /city setting market visit on
- /city setting market memberfly on
- /city setting market visitorfly off

campaign:
- community-project-id: canopy_supply_network

questboard:
- /questboard fishing nnoka
- /questboard logging nnoka
- 45 秒以内に /yes で受注
- 受注後は 10 分再出現待ち
- 同カテゴリの active contract だけを抽選
```

## 押さえる点
- city は node / transfer を先に見る。
- city を公開観光地として使うなら、visit / memberfly / visitorfly をセットで考える。
- spawn 近くは絶対安全地帯なので、記念碑や案内板を置く場所として使いやすい。
- campaign は contract と project の接続を見る。
- party / board は時間制限とカテゴリ分けを先に共有する。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
