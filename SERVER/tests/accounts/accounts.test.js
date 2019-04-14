import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';
import accounts from '../../models/account';
import moment from 'moment';

const expect = chai.expect;
chai.use(chaiHttp);


describe('Accounts', () => {
    describe('POST api/v1/accounts', () => {
        it('Creates a new bank account', (done) => {

            let m = moment();
            let real_date = m.format('dddd, MMMM Do YYYY, h:mm a');

            const newAccount = {
                created_on: real_date,
                account_number: accounts.length + 1,
                owner: 1,
                type: 'current',
                status: 'active',
                balance: 500.90
            };

            chai
                .request(app)
                .post('/api/v1/accounts')
                .end((err, res) => {
                    res.body.status.should.be.eql(201);
                    expect(newAccount).is.an('object');

                    if (err) {
                        expect(res).to.have.status(400);
                        res.body.should.have.property("error").that.is.a('string');
                    };
                    done();
                });
        });
    });

    describe('PATCH /api/v1/accounts/:account_number', () => {
        it('Edits a single bank account', (done) => {

            const account = {
                owner: 2,
                type: 'savings'
            };

            const account_number = 1;
            chai
                .request(app)
                .patch(`/api/v1/accounts/${account_number}`)
                .send(account)
            expect(200, done());
        });

    });

    describe('DELETE api/v1/accounts/:account_number', () => {
        it('Deletes  a single account from the accounts array', (done) => {
            const account_number = 1;
            chai
                .request(app)
                .delete(`/api/v1/accounts/${account_number}`)
                .end((err, res) => {
                    res.body.should.have.property("status").eql(200);
                    res.body.should.have.property("data").that.is.an("array");
                    done();
                });
        });
    });

    describe('Send GET request to wrong Url', () => {
        it('Should notify the client when the path is incorrect', (done) => {

            chai
                .request(app)
                .get('/fxd/hy')
                .end((err, res) => {
                    expect(res.body.status).to.be.eql(404);
                    expect(res.body.message).to.be.eql('Wrong Url or HTTP Request!');
                    done();
                });

        });
    });

});