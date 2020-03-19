# A kudos showcase system

I build this app on some dummy data which is a static file `/server/data/set1.json`. Data file [location](https://github.com/suvradip/kudos/blob/master/server/data/set1.json). This file has all required data to power this app.

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000, 3000 is a default. you can change it to different port.
npm run dev

# build for production and launch server
npm run build
npm run start
```

You can also change the `WEEKLY_KUDOS` limit to any n number, default is 3. You need to create a `.env` in the project root file with thees configurations

```bash
WEEKLY_KUDOS=5
```

## Login information

Please user bellow credentials
username: Lia35
password: password

## Available API(s)

#### `/api/user/login`

```
POST: /api/user/login

Validate user credentials
```

#### `/api/user/:userId`

```
GET: /api/user/:userId

Give you user basic information
```

#### `/api/user/:userId/comments`

```
GET: /api/user/:userId/comments

Give you all the review/kudos comments
```

#### `/api/kudos`

```
GET: /api/kudos

As a response you will get all the members name with kudos count data
```

```
POST: /api/kudos

To record kudos.
```

```
DELETE: /api/kudos

To delete kudos
```
