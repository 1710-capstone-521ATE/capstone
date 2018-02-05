const db = require('./db/db');
const { User, Cuisine, Event, Group } = require('./db/models');

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!
  const users = await Promise.all([
    User.create({ email: 'pjoe@aol.com', password: '123', firstName: 'Pinata', lastName: 'Joe', dob: '1970-06-17', zipcode: '12345' }),

    User.create({ email: 'ppauline@aol.com', password: '123', firstName: 'Pinata', lastName: 'Pauline', dob: '1980-12-25', zipcode: '54321' }),

    User.create({ email: 'sam@sam.com', password: '123', firstName: 'Sam', lastName: 'Kim', dob: '1992-05-21', zipcode: '07152' }),

    User.create({ email: 'jason@jason.com', password: '123', firstName: 'Jason', lastName: 'Smith', dob: '1985-07-14', zipcode: '07621' }),

    User.create({ email: 'sarah@sarah.com', password: '123', firstName: 'Sarah', lastName: 'Oliea', dob: '1991-02-17', zipcode: '15345' }),

    User.create({ email: 'sandy@sandy.com', password: '123', firstName: 'Sandy', lastName: 'Chesada', dob: '1991-11-15', zipcode: '51221' }),

    User.create({ email: 'bob@bob.com', password: '123', firstName: 'Bob', lastName: 'Lopez', dob: '1992-03-21', zipcode: '01238' }),

    User.create({ email: 'mike@mike.com', password: '123', firstName: 'Mike', lastName: 'Gouda', dob: '1987-01-01', zipcode: '45612' }),

    User.create({ email: 'tiff@tiff.com', password: '123', firstName: 'Tiffany', lastName: 'Crystal', dob: '1912-09-12', zipcode: '08978' })
  ])



  const cuisines = await Promise.all([
    Cuisine.create({ displayName: 'Beer Garden', referenceName: 'beergarden' }),

    Cuisine.create({ displayName: 'Mexican', referenceName: 'mexican' }),

    Cuisine.create({ displayName: 'Pizza', referenceName: 'pizza' }),

    Cuisine.create({ displayName: 'Steakhouses', referenceName: 'steak' }),

    Cuisine.create({ displayName: 'Noodles', referenceName: 'noodles' }),

    Cuisine.create({ displayName: 'Greek', referenceName: 'greek' }),

    Cuisine.create({ displayName: 'Japanese', referenceName: 'japanese' })
  ])

  const groups = await Promise.all([
    Group.create({ name: 'group1' }),

    Group.create({ name: 'group2' }),

    Group.create({ name: 'group3' })
  ])

  const events = await Promise.all([
    Event.create({ restaurantId: 'Sams Noodles', rating: 4, hostId: 1, groupId: 1, name: "Test Event 1" }),
    Event.create({ restaurantId: 'Pams Noodles', rating: 2, hostId: 4, groupId: 2, name: "Test Event 2" }),
    Event.create({ restaurantId: 'Dans Noodles', rating: 3, hostId: 7, groupId: 3, name: "Test Event 3" })
  ])

  const groupMembers = await Promise.all([
    groups[0].addUsers([1, 2, 3]),
    groups[1].addUsers([4, 5, 6]),
    groups[2].addUsers([7, 8, 9])
  ])




  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })
/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')
