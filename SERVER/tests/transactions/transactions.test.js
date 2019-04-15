import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

const expect = chai.expect;
chai.use(chaiHttp);


describe('Transactions', () => {
    describe('POST api/v1/:transaction_number/debit', () => {
        it('Make a debit to a user\'s  account', (done) => {

            const newDebit = {
                account_number: 2,
                cashier: 2,
                transaction_type: 'debit',
                old_balance: 1000,
                amount: 1500,
                new_balance: 2500
            }

            const account_number = 1;
            chai
                .request(app)
                .post(`/api/v1/transactions/${account_number}/debit`)
                .send(newDebit)
                .end((err, res) => {

                    res.body.status.should.be.eql(201);
                    expect(newDebit).is.an('object');

                    if (err) {
                        expect(res).to.have.status(400);
                        res.body.should.have.property("error").that.is.a('string');
                    };
                    done();
                });
        });
    });

    describe('POST api/v1/transactions/account_number/credit', () => {
        it('Make a credit to a user\'s  account', (done) => {

            const newCredit = {
                account_number: 2,
                cashier: 2,
                transaction_type: 'credit',
                old_balance: 1500,
                amount: 1000,
                new_balance: 500
            }
            const account_number = 1;
            chai
                .request(app)
                .post(`/api/v1/transactions/${account_number}/credit`)
                .send(newCredit)
                .end((err, res) => {

                    res.body.status.should.be.eql(201);
                    expect(newCredit).is.an('object');

                    if (err) {
                        expect(res).to.have.status(400);
                        res.body.should.have.property("error").that.is.a('string');
                    };
                    done();
                });
        });
    });
});