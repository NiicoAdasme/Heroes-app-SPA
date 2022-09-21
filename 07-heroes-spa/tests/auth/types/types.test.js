import { types } from "../../../src/auth/types/types"

describe('Pruebas en el types.js', () => {

    test('Debe de regresas los types', () => {
        
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout'
        });
    })
    
})