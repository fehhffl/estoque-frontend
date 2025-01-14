
# Estoque Frontend

Este é o frontend do sistema de estoque, desenvolvido em **React Native** com **Expo Go** para uma experiência multiplataforma eficiente e responsiva.

## Funcionalidades

- Listagem de produtos do estoque.
- Criação, atualização e remoção de produtos.
- Registro de entradas e saídas de estoque.
- Gerenciamento de usuários com autenticação e registro.

## Pré-requisitos

1. **Backend rodando**:
   - Certifique-se de que o backend está configurado e em execução. Consulte o [README do backend](https://github.com/fehhffl/estoque-backend/blob/main/README.md) para detalhes de instalação e execução.

2. **Node.js**:
   - Baixe e instale o [Node.js](https://nodejs.org/en/download) se ainda não tiver instalado no seu computador.

3. **Simulador ou dispositivo físico configurado**:
   - Para iOS, é recomendado o uso do simulador do Xcode.
   - Para Android, use o Android Emulator ou um dispositivo físico com USB debugging ativado.

## Instalação e Configuração

1. **Clone o repositório**:

   ```bash
   git clone git@github.com:fehhffl/estoque-frontend.git
   cd estoque-frontend
   ```

2. **Instale as dependências**:

   ```bash
   npm install
   ```

3. **Execute o projeto**:
   - Inicie o servidor Expo:

     ```bash
     npm start
     ```

4. **Configure as variáveis de ambiente**:
   - Coloque o arquivo `.env` **enviado por e-mail** do `estoque-frontend` na pasta raiz do projeto.
   - O `.env` deve conter a URL do backend, como no exemplo:

     ```env
     EXPO_BASE_URL=http://localhost:8000
     ```

   Se você vai usar o **Simulador iOS**, você pode deixar do jeito que está.

   Se você for usar o **Simulador Android**, altere o `localhost` para `10.0.2.2`:

    ```env
     EXPO_BASE_URL=http://10.0.2.2:8000
    ```

   Se você for usar **dispositivo físico**, faça a seguinte alteração:
   - Após dar npm start, procure pelo IP do expo, que estará no seu terminal algo como por exemplo:

   ```bash
      exp://192.168.x.x:8081
   ```

   Copie **apenas** o número 192.168.x.x (sem o exp:// ou o :8081) e substitua o nome `localhost` do `.env` com esse ip.

   Por exemplo, se o seu `.env` estava assim:

   ```env
     EXPO_BASE_URL=http://localhost:8000
   ```

   e seu IP é 192.168.15.158,  modifique o seu `.env` para:

   ```env
     EXPO_BASE_URL=http://192.168.15.158:8000
   ```

   lembrando que os números depois de 192.168 variam e tem que ser o que aparece no seu terminal no Expo Go.

Após configurar o `.env`, reinicie o `estoque-frontend` apertando `Ctrl+c` no terminal e dando `npm start` de novo.

## Executando no Simulador ou Dispositivo

### iOS (Recomendado)

1. Abra o simulador do Xcode.
2. No terminal do Expo, pressione `i` para abrir o projeto no simulador iOS.
3. Certifique-se de que o simulador consegue acessar a rede local para se comunicar com o backend.

### Android

1. Inicie o Android Emulator ou conecte um dispositivo físico via USB com o USB debugging ativado.
2. No terminal do Expo, pressione `a` para abrir o projeto no dispositivo Android ou emulador.
3. Certifique-se de que o endereço IP configurado no `.env` é acessível a partir do dispositivo Android.

### Dispositivo Físico (Qualquer plataforma)

1. Instale o app **Expo Go** na App Store (iOS) ou Play Store (Android).
2. No terminal do Expo, leia o QR Code gerado.
3. Certifique-se de que o dispositivo físico e o backend estão na mesma rede Wi-Fi.

---

Desenvolvido com 💻 por Felipe Forioni.
