export const getUsers = async (): Promise<any> => fetch(
    'https://jsonplaceholder.typicode.com/users', {
    method: 'GET',
    }
);