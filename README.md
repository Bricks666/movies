# Movies

Это сервер, сделанный по [ТЗ](https://telegra.ph/Testovoe-zadanie---Junior-FullStack-Developer-06-17)

Для сервера написана документация, она находиться по пути /docs от корня сервера

Ниже будут указаны способы использования

## Как использовать

### Глобальный доступ

Сервер размещен глобально, для этого нужно перейти по [этой ссылке](https://movies-r5jl.onrender.com), чтобы попасть в корень. И по [этой](https://movies-r5jl.onrender.com/docs), чтобы перейти к документации

### Локальный доступ с **докером**

1. Скопировать репозиторий `git clone https://github.com/Bricks666/movies.git movies`
2. Установить зависимости `npm i`
3. Создать файл `.env` и заполнить следующим образом

```env
DATABASE_URL=mongodb+svr://<username>:<password>@<host>(:<port>)/<databasename>?(<params>)
PORT=<port_to_be_launched_on>
SECRET=<any_string>
COOKIE=<any_string>
ROUND_COUNT=<any_number>
```

4. Собрать образ `docker build . -t movies`
5. Запустить контейнер `docker run --name movies --env-file /path/to/env/file -p inner_port:env_file_port movies`
6. Открыть ссылку согласно указанному порту

### Локальный доступ без **докера**

1. Скопировать репозиторий `git clone https://github.com/Bricks666/movies.git movies`
2. Установить зависимости `npm i`
3. Создать файл `.env` и заполнить следующим образом

```env
DATABASE_URL=mongodb+svr://<username>:<password>@<host>(:<port>)/<databasename>?(<params>)
PORT=<port_to_be_launched_on>
SECRET=<any_string>
COOKIE=<any_string>
ROUND_COUNT=<any_number>
```

4. Выполнить команду `npm start`
5. Открыть ссылку согласно указанному порту
