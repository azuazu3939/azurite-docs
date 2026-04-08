# ポータブルシティ・キャンペーン・パーティー・クエスト看板 の編集例

運用設定、進行設定、導線ルールの 3 つに分けて読むのがおすすめです。

## サンプル
```text
server-node:
- accepting-new-worlds: true
- heartbeat-seconds: 15

portable-city runtime:
- spawn-safe-radius: 5
- void-rescue-y-threshold: -64

campaign:
- community-project-id: canopy_supply_network

packet questboard:
- boards.lobby_main_board.position: 100,65,-20
- boards.lobby_main_board.width: 5
- boards.lobby_main_board.height: 3
- boards.lobby_main_board.visible-slots: 5
- progression-profiles.default_lobby.assisted-min-stage: 1
- progression-profiles.default_lobby.tactical-min-stage: 3
- progression-profiles.default_lobby.tactical-unlock-completions: 10
- /questboard packet reload
- GUIDED: おすすめ中心
- ASSISTED: 近場 / 戦闘 / 採集 / 短時間 / 報酬
- TACTICAL: 未完了 / 周回 / 高報酬 / 評判 / 高難度
```

## 押さえる点
- city は node / transfer を先に見る。
- city を公開観光地として使うなら、visit / memberfly / visitorfly をセットで考える。
- campaign は contract と project の接続を見る。
- packet board は 3x5 固定面なので、`position` と `facing` を先に合わせる。
- mode 解放は stage と完了数が両方効くので、候補の見え方を変えたい時は `rules` だけでなく `progression-profiles` も見る。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
