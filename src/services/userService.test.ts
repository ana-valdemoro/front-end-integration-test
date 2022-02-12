import { getUsers } from "./userService";

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

describe('getUsers', () => {
    test('should call getUsers and return users', async () => {
        (global.fetch as jest.Mock).mockImplementation(() => Promise.resolve(mockedFetch));
        const fetchCall = await getUsers();

        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(fetchCall).toEqual(mockedFetch);
    });
});
