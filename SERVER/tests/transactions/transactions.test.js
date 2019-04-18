import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import accounts from '../../models/account';

const expect = chai.expect;
chai.use(chaiHttp);




describe('Transactions', () => {
    describe('POST api/v1/transactions/:account_number/debit', () => {
        it('Make a debit to a user\'s  account', async () => {

            
            const newDebit = await {
                cashier: 2,
                transaction_type: 'debit',
                amount: 1500,
            }

            console.log(newDebit);
            const account_number = 1;
            chai
                .request(app)
                .post(`/api/v1/transactions/${account_number}/debit`)
                .send(newDebit)
                .end((err, res) => {
                    console.log(res.body);
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
        it('Make a credit to a user\'s  account', async () => {

            const newCredit = {
                cashier: 2,
                transaction_type: 'credit',
                amount: 1000,
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