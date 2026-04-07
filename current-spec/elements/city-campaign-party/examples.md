# ポータブルシティ・キャンペーン・パーティー・クエスト看板 の編集例

運用設定、進行設定、導線ルールの 3 つに分けて読むのがおすすめです。

## サンプル
```text
server-node:
- accepting-new-worlds: true
- heartbeat-seconds: 15

campaign:
- community-project-id: canopy_supply_network

questboard:
- 45 秒以内に /yes で受注
- 受注後は 10 分再出現待ち
```

## 押さえる点
- city は node / transfer を先に見る。
- campaign は contract と project の接続を見る。
- party / board は時間制限を先に共有する。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
