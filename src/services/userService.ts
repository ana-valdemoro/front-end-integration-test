export const getUsers = async (): Promise<any> => {
    const response = await fetch(
        'https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
    })
    return response.json()
}