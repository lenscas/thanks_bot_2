import { ImportMock } from 'ts-mock-imports';
import * as queries from '../../src/test/test.queries';
import { test } from '../../src/test/test';
import { mocked_pool } from '../mock_db_pool';
import { expect } from 'chai';

const mockManager = ImportMock.mockOther(queries, 'testQuery');
mockManager.set({
    run: async () => {
        return [{ test: 2 }];
    },
});

describe('Check the test function', () => {
    // the tests container
    it('checking default options', async () => {
        const mockManager = ImportMock.mockOther(queries, 'testQuery');
        mockManager.set({
            run: async () => {
                return [{ test: 2 }];
            },
        });

        const res = await test(mocked_pool);
        expect(res).to.be.an('array').and.be.lengthOf(1);
        res.forEach((v) => {
            expect(v).has.property('test').to.equal(2);
        });
        // Call restore to reset all mocked objects to original imports
        ImportMock.restore();
    });
});
