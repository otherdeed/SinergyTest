import { faker } from '@faker-js/faker';
import fs from 'fs';
function generateUsers(outputFile = 'db.json') {
  console.log('Создание 1 млн пользователей...');

  const users = Array.from({ length: 1_000_000 }, (_, i) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    return {
      id: i + 1,
      firstName,
      lastName,
      age: faker.number.int({ min: 18, max: 80 }),
      email: faker.internet.email({ firstName, lastName }),
    };
  });

  fs.writeFileSync(outputFile, JSON.stringify({ users }, null, 2));
  console.log(`✅ Готово! Файл сохранён как ${outputFile}`);
}

// Запустить для создания 1млн пользователей
generateUsers();