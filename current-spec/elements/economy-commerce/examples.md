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
/openbook
  現在は運営・テスター用の確認導線
  一般プレイヤー向けの /commerce と menu GUI からは開けない

/openbook recommend 12 Alice
  発行番号 #12 の本を Alice へおすすめする
  Alice が初回購入すると紹介者へ 10000 入る
  一般公開中ではないため通常導線には載せない

/trade Alice
  Alice へ取引申請を送り、受諾時に同一サーバーへ寄せて取引 GUI を開く
  取引 GUI ではアイテム 16 枠と、お金 / 配送クレジットだけを提示できる

しゃがみながら相手を右クリック
  同一サーバーで見えている相手へ /trade と同じ申請をすぐ送る

/trade accept Alice
  受信 chat の [受諾] を押した時と同じ動きで申請を受ける

/pay Alice 5000 money
  Alice へお金 5000 を送る

/pay Alice 120 credit
  Alice へ配送クレジット 120 を送る

/bind bp3
  手持ちアイテムへ BackPack #3 をバインドする

/bind /home
  手持ちアイテムへ任意コマンドをバインドする

/menu edit
  自分用メニューを編集モードで開く
  左クリックしたスロットへ `/home`
  または `拠点へ帰る | /home` を入れて配置する

/unbind
  手持ちアイテムのコマンドバインドを解除する

しゃがみ右クリック
  専用ショートカットならその場で消去し、既存アイテムなら bind だけ外す
```

## 押さえる点
- 実装は Kotlin 登録でも設計上はこの粒度で読むと分かりやすい。
- 価格と reward の釣り合いを先に見る。
- 複数素材を要求したい時は `price-components` を素材ごとに分ける。
- Vault 不在時の挙動も考える。
- Mythic 側で shop 窓口を増やしたい時は `mmid` を増やさず `Spawner` を分ける。
- コマンドバインド品は `sell` と `market` に出せないが、プレイヤー間 Trade では交換できる。
- OpenBook は `WRITTEN_BOOK` を map 表示のカタログとして扱うが、現在は一般向け導線から外している。

## 関連
- [要素概要](./summary.md)
- [Wiki](./wiki.md)
