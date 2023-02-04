const { faker } = require('@faker-js/faker');
const range = require('lodash/range');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const posts = [];
    const users = range(1, 100).map((iter) => {
      range(0, 10).forEach(() => {
        posts.push({
          title: faker.address.cityName(),
          body: faker.lorem.lines(2),
          // eslint-disable-next-line camelcase
          user_id: iter,
        });
      });
      return {
        id: iter,
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };
    });
    await queryInterface.bulkInsert('users', users);
    await queryInterface.bulkInsert('posts', posts);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('posts');
    await queryInterface.bulkDelete('users');
  },
};
