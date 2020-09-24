const { expect } = require('chai');
const index = require("../index");

describe('word translate', function () {

    it('should give a non empty array with English meanings for a Sinhala word', (done) => {
        index.search("cat").then(data => {
            expect(data).to.be.a('array').to.not.have.lengthOf(0);
            done();
        });
    });

    it('should give a non empty array with Sinhala meanings for a English word', (done) => {
        index.search("පෙරළනවා").then(data => {
            expect(data).to.be.a('array').to.not.have.lengthOf(0);
            done();
        });
    });

    it('should give an empty array when word is not found', (done) => {
        index.search("fsdfsdfds").then(data => {
            expect(data).to.be.a('array').to.have.lengthOf(0);
            done();
        });
    });

    it('should reject with an error when input word is not given', (done) => {
        index.search().catch(error => {
            expect(error).to.be.an("Error");
            done();
        });
    });

    it('should reject with an error when input word is empty', (done) => {
        index.search(" ").catch(error => {
            expect(error).to.be.an("Error");
            done();
        });
    });
});
