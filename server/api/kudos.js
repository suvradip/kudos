const router = require('express').Router();
// const signale = require('signale');
// const generator = require('../data/generator');
const storeData = require('../data/set1.json');
const { Kudos, User } = require('../util');

const MAX_KUDOS = process.env.WEEKLY_KUDOS || 3;

router.get('/', (req, res) => {
   const { userId } = req.query;

   const data = storeData.map(d => {
      let flag = false;
      for (let i = 0; i < d.kudos.contents.length; i += 1) {
         const kudo = d.kudos.contents[i];

         if (kudo.userId === userId) {
            flag = true;
            break;
         }
      }
      return {
         userId: d.userId,
         name: d.name,
         image: d.image,
         designation: d.designation,
         kudosCount: d.kudos.count,
         hasKudos: flag,
         jobDescription: d.jobDescription,
         //  balance: d.kudosBalance,
         //  given: d.kudosGiven,
      };
   });
   //  res.json(generator.combineKudos());
   res.json(data);
});

/* credit kudos */
router.post('/', (req, res) => {
   const { body } = req;
   const data = {
      receiverUserId: body.receiverUserId,
      name: body.name,
      userId: body.userId,
      review: body.message,
   };

   const { balance, given } = User.kudosBalance(data.userId);
   if (balance >= 1 && balance <= MAX_KUDOS) {
      const obj = {
         kudosBalance: balance - 1,
         kudosGiven: given + 1,
      };
      User.update(data.userId, obj);
      Kudos.insert(data);

      return res.json({
         message: 'data recorded | insertion',
         count: Kudos.kudosCount(data.receiverUserId),
         ...obj,
      });
   }

   return res.json({
      message: 'Your quota is end.',
      // count: Kudos.kudosCount(data.receiverUserId),
   });
});

/* debit kudos */
router.delete('/', (req, res) => {
   const { body } = req;
   const data = {
      receiverUserId: body.receiverUserId,
      userId: body.userId,
   };

   const { balance, given } = User.kudosBalance(data.userId);
   if (given >= 0 && given <= MAX_KUDOS) {
      const obj = {
         kudosBalance: balance + 1,
         kudosGiven: given - 1,
      };
      User.update(data.userId, obj);

      Kudos.delete(data);
      return res.json({
         message: 'data recorded | deletion',
         count: Kudos.kudosCount(data.receiverUserId),
         ...obj,
      });
   }

   return res.json({
      message: "You haven't give any kudos yet!",
      // count: Kudos.kudosCount(data.receiverUserId),
   });
});

module.exports = router;
