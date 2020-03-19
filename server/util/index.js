const storeData = require('../data/set1.json');

function findDataIndex(array, field) {
   const [[key, value]] = Object.entries(field);
   let currentIndex = -1;
   for (let i = 0; i < array.length; i++) {
      if (array[i][key] === value) {
         currentIndex = i;
         break;
      }
   }

   return currentIndex;
}

function filterFields(obj, fields) {
   const keys = Object.keys(obj);
   const modifiedObj = {};
   keys.forEach(key => {
      if (fields.includes(key)) {
         modifiedObj[key] = obj[key];
      }
   });

   return modifiedObj;
}

const Kudos = {
   insert: ({ receiverUserId, name, userId, review }) => {
      const index = findDataIndex(storeData, { userId: receiverUserId });
      if (index !== -1) {
         storeData[index].kudos.contents.push({
            name,
            userId,
            review,
            image: 'https://i.pravatar.cc/?rand=3',
         });
         storeData[index].kudos.count += 1;
      }
   },

   delete: ({ receiverUserId, userId }) => {
      const index = findDataIndex(storeData, { userId: receiverUserId });
      if (index !== -1) {
         const secondIndex = findDataIndex(storeData[index].kudos.contents, { userId });
         storeData[index].kudos.contents.splice(secondIndex, 1);
         storeData[index].kudos.count -= 1;
      }
   },

   kudosCount: userId => {
      const index = findDataIndex(storeData, { userId });
      if (index !== -1) {
         return storeData[index].kudos.count;
      }
      return -1;
   },
};

const User = {
   findById: (userId, fields = []) => {
      const index = findDataIndex(storeData, { userId });
      /* if nothing found */
      if (index === -1) return false;
      const User = storeData[index];
      if (fields.length === 0) return User;
      return filterFields(User, fields);
   },

   kudosBalance: userId => {
      const index = findDataIndex(storeData, { userId });
      if (index !== -1) {
         return {
            balance: storeData[index].kudosBalance,
            given: storeData[index].kudosGiven,
         };
      }
      return -1;
   },

   update: (userId, fields = {}) => {
      const index = findDataIndex(storeData, { userId });
      if (index === -1) return false;
      const User = storeData[index];
      Object.keys(fields).forEach(key => {
         User[key] = fields[key];
      });
   },
};
module.exports = { Kudos, User };
