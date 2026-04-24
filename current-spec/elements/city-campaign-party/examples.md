# ポータブルシティ・キャンペーン・パーティー の編集例

運用設定、進行設定、導線ルールの 3 つに分けて読むのがおすすめです。

## サンプル
```text
server-node:
- accepting-new-worlds: true
- heartbeat-seconds: 15

portable-city runtime:
- portable-city.yml.runtime.spawn-safe-radius: 0
- portable-city.yml.runtime.void-rescue-y-threshold: -64
- portable-city.yml.transfer.servers.azur-resource-1.proxy-server: azur-resource-1
- portable-city.yml.build-tool.mythic-item-id: Azuriter_BuildTools
- portable-city.yml.build-tool.size-steps: [1, 3, 5, 7, 9]
- portable-city.yml.build-tool.preview-interval-ticks: 2

route commands:
- server.yml.routing.commands.hub.candidates: [hub-1, hub-2]
- server.yml.routing.commands.pve.candidates: [resource-1, resource-2]

campaign:
- community-project-id: canopy_supply_network

old packet questboard:
- packet-quest-boards.yml は撤去済み
- /questboard packet reload は撤去済み
- GUIDED / ASSISTED / TACTICAL は新規運用しない
```

## 押さえる点
- city は portable-city.yml の node / transfer と server.yml の routing.commands をセットで見る。
- city を公開観光地として使うなら、visit / memberfly / visitorfly をセットで考える。
- 初期地形は spawn 基準の 32x32 足場、足場下は空洞、world border は 512 blocks として案内する。
- `spawn-safe-radius` は現行 0 なので、spawn 周辺を広く保護する前提の説明を置かない。
- 建築ツールは city member 専用で、preview は本人にだけ見える packet 表示として扱う。
- campaign は contract と project の接続を見る。
- 旧 packet board の 3x5 固定面設定は使わない。
- 建築ツールのサイズ段は odd 中心にしておくと `SQUARE` を扱いやすい。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
