const faker = require('faker');

const generator = {
   contents() {
      const count = Math.floor(Math.random() * 10 + 1);
      const data = [];
      for (let i = 1; i <= count; i += 1) {
         data.push({
            name: faker.name.findName(),
            review: faker.lorem.paragraph(),
         });
      }
      return data;
   },
   getKudos() {
      const limit = 15;
      const data = [];
      for (let i = 0; i < limit; i += 1) {
         //  const kudos = this.contents();
         data.push({
            userId: faker.internet.userName(),
            name: faker.name.findName(),
            email: faker.internet.email(),
            image: `https://i.pravatar.cc/?rand=${i}`,
            designation: faker.name.jobType(),
            jobDescription: faker.name.jobDescriptor(),
            // kudos: {
            //    count: kudos.length,
            //    // contents: kudos,
            // },
         });
      }

      return data;
   },

   combineKudos() {
      const kudos = this.getKudos();

      return kudos.map(item => {
         const count = Math.floor(Math.random() * 3 + 1);
         const data = [];

         for (let i = 1; i <= count; i += 1) {
            const user = kudos[Math.floor(Math.random() * (kudos.length - 1) + 1)] || {};
            data.push({
               name: user.name,
               userId: user.userId,
               image: user.image,
               review: faker.lorem.paragraph(),
            });
         }

         return {
            ...item,
            kudos: {
               count: data.length,
               contents: data,
            },
         };
      });

      // return data;
   },
};
module.exports = generator;
