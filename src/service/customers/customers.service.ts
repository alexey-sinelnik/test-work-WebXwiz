import {
    Customer,
    CustomerAnonymizedModel,
    CustomerModel,
} from '../../schema/customers/customers.schema'
import { faker } from '@faker-js/faker'
import { char } from '../../common/constants'

class CustomersService {
    private randomString(len: number): string {
        const charSet: string = char
        let randomString: string = ''
        for (let i = 0; i < len; i++) {
            const randomPoz: number = Math.floor(Math.random() * charSet.length)
            randomString += charSet.substring(randomPoz, randomPoz + 1)
        }
        return randomString
    }
    public async generateCustomers(): Promise<void> {
        let interval: NodeJS.Timeout
        interval = setInterval(async () => {
            const customersCount: number = faker.number.int({
                min: 1,
                max: 10,
            })
            for (let i = 0; i < customersCount; i++) {
                const customer = await CustomerModel.create({
                    firstName: faker.person.firstName(),
                    lastName: faker.person.lastName(),
                    email: faker.internet.email(),
                    address: {
                        line1: faker.location.streetAddress(),
                        line2: faker.location.street(),
                        city: faker.location.city(),
                        postcode: faker.location.zipCode(),
                        state: faker.location.state({ abbreviated: true }),
                        country: faker.location.countryCode('alpha-2'),
                    },
                })
                let [_, domain] = customer.email.split('@')

                return CustomerAnonymizedModel.create({
                    _id: customer._id,
                    firstName: this.randomString(8),
                    lastName: this.randomString(8),
                    email: `${this.randomString(8)}@${domain}`,
                    address: {
                        line1: this.randomString(8),
                        line2: this.randomString(8),
                        postcode: faker.location.zipCode(),
                        city: customer.address.city,
                        state: customer.address.state,
                        country: customer.address.country,
                    },
                    createdAt: customer.createdAt,
                })
            }
            return clearInterval(interval)
        }, 200)
    }

    public async getCustomers(): Promise<Customer[]> {
        return CustomerAnonymizedModel.find().lean()
    }
}

export default CustomersService
