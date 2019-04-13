import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../server';

const should = chai.should();
const expect = chai.expect;
chai.use(chaiHttp);

describe('User Authentication', () => {
    describe('Sign Up', () => {
        it('Should sign up a new user', (done) => {
            const newUser = {
                first_name: 'moise',
                last_name: 'rwibutso',
                email: 'moise@kigali.com',
                password: '123456',
                type: 'staff',
                is_admin: true
            };
            chai
                .request(app)
                .post('/auth/signup')
                .send(newUser)
                .end((err, res) => {
                    res.body.status.should.be.eql(201);
                    expect(newUser).is.an('object');

                    if (err) {
                        expect(res).to.have.status(404);
                        res.body.should.have.property("error").that.is.a('string');
                    };
                    done();
                });
        })
    }); 

    // describe('Sign In', () => {
    //     it('Should log in a returning user ', (done) => {
    //         const newUser = {
    //             first_name: 'moise',
    //             last_name: 'rwibutso',
    //             email: 'moise@kigali.com',
    //             password: '123456',
    //             type: 'staff',
    //             is_admin: true
    //         };
    //         chai
    //             .request(app)
    //             .post('/auth/login')
    //             .send(user)
    //             .end((err, res) => {
    //                 res.body.status.should.be.eql(201);
    //                 expect(newUser).is.an('object');

    //                 if (err) {
    //                     expect(res).to.have.status(404);
    //                     res.body.should.have.property("error").that.is.a('string');
    //                 };
    //                 done();
    //             });
    //     })
    // }); 


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



})