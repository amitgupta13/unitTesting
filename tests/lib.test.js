const lib = require('../lib');
const ex = require('../exercise1');
const db = require('../db');
const mail = require('../mail');

describe('absolute', ()=>{
    it('should return positive number if input positive', ()=>{
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });
    
    it('should return positive number if input negative', ()=>{
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });
    
    it('should return 0 if input 0', ()=>{
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', ()=>{
    it('should return greeting msg', ()=>{
        const result = lib.greet('Mosh');
        expect(result).toMatch(/Mosh/);
    });
});

describe('getCurrencies', ()=>{
    it('shoud return supported currencies', ()=>{
        const result = lib.getCurrencies();

        expect(result).toEqual(expect.arrayContaining(['USD', 'USD', 'EUR']));
    })
});

describe('getProduct', ()=>{
    it('should return product with given id', ()=>{
        const result = lib.getProduct(1);
        // expect(result).toEqual({id:1, price:10});
        expect(result).toMatchObject({id:1, price:10});

        expect(result).toHaveProperty('id', 1);
    });
});

describe('registerUser', ()=>{
    it('should throw if username is falsy', ()=>{
        //Null
        //undefined
        //NaN
        //''
        //0
        //false
        const args = [null, undefined, NaN, '', 0, false];
        args.forEach(a=>{
            expect(()=>{lib.registerUser(a)}).toThrow();
        });
    });

    it('should return a user object if valid username', ()=>{
        const result = lib.registerUser('Mosh');
        expect(result).toMatchObject({username: 'Mosh'});
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('fizzBuzz', ()=>{
    it('should throw if input is NaN', ()=>{
            expect(()=>{ ex.fizzBuzz('a') }).toThrow()
    });

    it('should return fizzbuzz',()=>{
        const result = ex.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return fizz',()=>{
        const result = ex.fizzBuzz(9);
        expect(result).toBe('Fizz');
    });
    it('should return buzz',()=>{
        const result = ex.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it('should return 1',()=>{
        const result = ex.fizzBuzz(1);
        expect(result).toBe(1);
    });
});

describe('applyDiscount', ()=>{
    it('should apply 10% discount if customer has more than 10 points', ()=>{
        db.getCustomerSync = function(customerId){
            console.log('Fake customer Id');
            return {id:customerId, points:20};
        }
        const order = {customerId:1, totalPrice:10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
})

describe('notifyCustomer', ()=>{
    it('should send email to customer', ()=>{
        db.getCustomerSync = jest.fn().mockReturnValue({email:'a'});
        mail.send = jest.fn();

        lib.notifyCustomer({customerId:1});

        expect(mail.send).toHaveBeenCalled();
        expect(mail.send.mock.calls[0][0]).toBe('a');
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
    })
});