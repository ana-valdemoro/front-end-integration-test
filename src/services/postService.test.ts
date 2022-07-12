/* eslint-disable jest/no-conditional-expect */
import { getPostById } from './postService';

const mockedSuccessResponse = '::mockedSuccessResponse::';
const mockedFetch = {
    json: () => Promise.resolve(mockedSuccessResponse),
    status: 200,
};

// @ts-ignore
global.fetch = jest.fn();

afterEach(() => {
    jest.clearAllMocks();
});

afterAll(() => {
    jest.resetAllMocks();
});

describe('getPostById', () => {
    test('should call getPostById and return post', async () => {
        const postId = '::postId::';
        (global.fetch as jest.Mock).mockImplementation(() => Promise.resolve(mockedFetch));
        const fetchCall = await getPostById(postId);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(fetchCall).toEqual(mockedSuccessResponse);
    });

    test.only('Should call getPostById and return 404', async () => {
        const mockedNotFound = {
            status: 404,
            statusText: "Not found"
        };
        const postId = '::postId::';
        (global.fetch as jest.Mock).mockImplementation(() => Promise.resolve(mockedNotFound));
        try {
            await getPostById(postId)
            expect(global.fetch).toHaveBeenCalledTimes(1);
        } catch (error) {
            // eslint-disable-next-line jest/no-conditional-expect
            expect(error).toBeDefined();
            // eslint-disable-next-line jest/no-conditional-expect
            expect((error as any).message).toBe(mockedNotFound.statusText);

        }

    });
});
