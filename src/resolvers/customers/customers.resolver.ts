import { Mutation, Query, Resolver } from 'type-graphql'
import { Customer } from '../../schema/customers/customers.schema'
import CustomersService from '../../service/customers/customers.service'

@Resolver()
export default class CustomersResolver {
    constructor(private userService: CustomersService) {
        this.userService = new CustomersService()
    }

    @Query(() => [Customer])
    async getCustomers(): Promise<Customer[]> {
        return await this.userService.getCustomers()
    }
}
