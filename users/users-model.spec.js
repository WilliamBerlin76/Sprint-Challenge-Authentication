const db = require('../database/dbConfig.js');

const { add, findBy } = require('./users-model.js');

describe("users-model", function() {
    describe('add()', function(){
        beforeEach(async () => {
            await db("users").truncate();
        });
        it("should add a user", async function() {
            await add({username: "sam", password: "pass"});
            
            const users = await db('users');
            expect(users).toHaveLength(1);
        });
       it("should insert the correct user", async function(){
           await add({username: "sam", password: "pass"});
           
           const users = await db('users');

           expect(users).toHaveLength(1);
           expect(users[0].username).toBe('sam')
       }) 
    });
    describe('findBy()', function() {
        it("should find the user by username", async function(){
            

            const user = await findBy({username: "sam"}).first();
            expect(user.username).toBe('sam')
        });
        it("should return a single object", async function(){
            const user = await findBy({username: "sam"});
            expect(user).toHaveLength(1)
        })
    });
});