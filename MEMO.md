### 今回やる

### 後々やりたい

- AIを利用することを想定した開発環境作成
  - DESIGN.md
  - instructions とか
  - ⇒ ある程度ドメイン知識が込み入ったものにする必要がある？
  - 参考にしたい
    - https://zenn.dev/headwaters/articles/579d5f94907dcd
    - https://zenn.dev/dely_jp/articles/a686fcca32ba41
    - https://codezine.jp/article/detail/23521 （AIを利用して作成するなかで、コンテキストのブラッシュアップを行う際、何を残して何を残さないのか）
    - https://zenn.dev/dely_jp/articles/b8b41a4202efda （PRの粒度調整）
    - https://qiita.com/ikeisuke/items/a42cf61b7d3b1a1715d3 （AI-DLC）
    - https://zenn.dev/yamaken0107/articles/2b3d2a0b059aa0
    - https://zenn.dev/gvatech_blog/articles/30f79910d111bb
    - https://qiita.com/akira_papa_AI/items/d46a6629b1aae835491d （PR時にADR生成）
    - https://qiita.com/nogataka/items/d6c83ea50b82e1c2602c
    - https://zenn.dev/kenimo49/articles/harness-engineering-interpretations-2026 （ハーネスエンジニアリング）
- husky
- フォーム入力でfirefoxの挙動が安定しなかった（下記例）。そのため、一旦e2eテストの対象から外したので調べて対象に含める
  - 先頭の1文字が抜ける
  - 文字が入力されない

### メモ

- 自分の知識不足ではあるが、orvalだと下記が重そう
  - かっちり作るのには向いている、小回りはききづらい（のでスピード感や柔軟性、大事な場面には適さないかも）
  - orvalとaxios両方のエラーハンドリング、セオリー理解する必要がある
