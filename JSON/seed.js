const { faker } = require("@faker-js/faker");
const fs = require("fs");

const generateData = () => {
  const users = [];

  for (let i = 0; i < 1000; i++) {
    users.push({
      id: i + 1,
      name: faker.name.fullName(),
      email: faker.internet.email(),
    });
  }

  return { users };
};

const data = generateData();

fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
