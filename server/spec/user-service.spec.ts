import 'jasmine'
import { UserService } from '../src/user-service'
import { User } from '../../common/user'

describe('UserService', () => {
    var userService : UserService;

    beforeAll(() => {
        process.stdout.write("user-service: ");
    });

    beforeEach(() => userService = new UserService());

    afterAll(() => {
        console.log("\n");
    });

});
