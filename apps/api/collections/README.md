# API Collections

Collections prontas para testar o endpoint de upload via streaming no Insomnia ou Postman.

## 📥 Como importar

### Insomnia

1. Abra o Insomnia
2. Clique em **Create** → **Import**
3. Selecione o arquivo `insomnia-collection.json`
4. Pronto! O endpoint estará disponível

### Postman

1. Abra o Postman
2. Clique em **Import**
3. Selecione o arquivo `postman-collection.json`
4. Pronto! A collection "Beta Stack - Upload API" estará disponível

## 🚀 Uso

Antes de testar, certifique-se que o servidor está rodando:

```bash
# Da raiz do projeto
bun run dev:api
```

O servidor estará em `http://localhost:3000`

## 📋 Endpoint incluído

### Upload via Streaming
- **Método:** POST
- **URL:** `http://localhost:3000/upload/stream`
- **Body:** Binary File (selecione seu arquivo)
- **Headers opcionais:**
  - `X-File-Name`: nome customizado (ex: `meu-video.mp4`)
  - `Content-Type`: será detectado automaticamente pelo client

## 💡 Dicas

- **Extensão automática:** A API detecta a extensão pelo `Content-Type` enviado
- **Vídeos suportados:** MP4, MPEG, MOV, AVI, WebM
- **Imagens:** JPG, PNG, GIF
- **Outros:** PDF, ZIP
- **Tamanho:** Sem limites definidos (pode fazer upload de arquivos grandes)

Para mais detalhes, veja [UPLOAD_GUIDE.md](../UPLOAD_GUIDE.md)
