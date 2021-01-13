export default () =>  ({
    SECRET: process.env.SECRET,
    REDIS: {
      password: process.env.REDIS_PASSWORD,
      port: process.env.REDIS_PORT
    },
    DB: {
      type: 'mysql',
      host: 'localhost',
      port: 3308,
      username: 'root',
      password: 'root',
      database: 'Chat',
      autoLoadEntities: true,
      synchronize: true,
      keepConnectionAlive: true,
      dropSchema: process.env.NODE_ENV === 'test' ? true : false
    } 

  })
