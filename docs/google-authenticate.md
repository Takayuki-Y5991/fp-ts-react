## 認証フロー

以下は、Google OAuth2 を使用したクライアント（React）とサーバー（Fastify）間の認証フローを示すシーケンス図です：

```mermaid
sequenceDiagram
    participant ユーザー
    participant Reactアプリ
    participant Fastifyサーバー
    participant Google OAuth2

    ユーザー->>Reactアプリ: 「Googleでログイン」ボタンをクリック
    Reactアプリ->>Google OAuth2: Google OAuth2ログインページにリダイレクト
    Google OAuth2->>ユーザー: ログインページを表示
    ユーザー->>Google OAuth2: 認証情報を入力してアクセスを許可
    Google OAuth2->>Reactアプリ: 認可コードを含むリダイレクト
    Reactアプリ->>Google OAuth2: 認可コードをアクセストークンと交換
    Google OAuth2->>Reactアプリ: アクセストークンを返す
    Reactアプリ->>Reactアプリ: アクセストークンを保存
    Reactアプリ->>Fastifyサーバー: アクセストークンを含むAPIリクエスト
    Fastifyサーバー->>Google OAuth2: アクセストークンを検証
    Google OAuth2->>Fastifyサーバー: トークンが有効であることを確認
    Fastifyサーバー->>Fastifyサーバー: ユーザー情報をセッションに保存するか、JWTトークンを生成
    Fastifyサーバー->>Reactアプリ: APIレスポンスを返す
    Reactアプリ->>ユーザー: 認証済みのユーザーインターフェースを表示
```

## その他のセクション

プロジェクトの他の情報をここに記述します。
