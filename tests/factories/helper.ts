import { faker } from '@faker-js/faker'

export function createUser() {
    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password()
    }
}