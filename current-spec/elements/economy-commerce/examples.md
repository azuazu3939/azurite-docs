# 経済・コマース の編集例

運用メモと shop entry イメージで掴むのが向いています。

## サンプル
```yml
shop-id: "starter_supply"
entry:
  display-name: "スタート補給箱"
  price-components:
    - currency-type: "VAULT"
      amount: 3000.0
    - currency-type: "VAULT"
      amount: 0.0
      item: "minecraft:iron_ingot"
      quantity: 12
    - currency-type: "VAULT"
      amount: 0.0
      item: "minecraft:string"
      quantity: 8
```

```text
/commerce shop bind-npc starter_supply
  視線先が村人/行商人ならその個体へ固定
  視線先が Mythic NPC なら、その NPC 自身ではなく元の Spawner 名へバインド
```

```text
/trade Alice
  Alice へ取引申請を送り、受諾時に同一サーバーへ寄せて取引 GUI を開く

/pay Alice 5000 money
  Alice へお金 5000 を送る

/bind bp3
  手持ちアイテムへ BackPack #3 をバインドする

/bind /home
  手持ちアイテムへ任意コマンドをバインドする

/unbind
  手持ちアイテムのコマンドバインドを解除する

しゃがみ右クリック
  手持ちのバインド済みアイテムをその場で解除する
```

## 押さえる点
- 実装は Kotlin 登録でも設計上はこの粒度で読むと分かりやすい。
- 価格と reward の釣り合いを先に見る。
- 複数素材を要求したい時は `price-components` を素材ごとに分ける。
- Vault 不在時の挙動も考える。
- Mythic 側で shop 窓口を増やしたい時は `mmid` を増やさず `Spawner` を分ける。
- コマンドバインド品は `sell` と `market` に出せないが、プレイヤー間 Trade では交換できる。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
