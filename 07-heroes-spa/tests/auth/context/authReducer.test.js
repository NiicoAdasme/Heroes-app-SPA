import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe('Pruebas en el reducer de autenticacion', () => {

    test('Debe de retornar el estado por defecto', () => {

        const state = authReducer({logged: false}, {});

        expect(state).toEqual({logged: false});

    });

    test('Debe de llamar el login para autenticar y establecer el usuario', () => {

        const action = {
            type: types.login,
            payload: {
                id: 'ABC',
                name: 'Nicolas Adasme'
            }
        }

        const state= authReducer({logged: false}, action);

        expect(state).toEqual({
            logged: true,
            user: action.payload
        })

    });

    test('Debe de borrar el nombre del usuario y la propiedad logged en false', () => {

        const action = {
            type: types.logout
        }

        const state= authReducer({
            logged: true,
            user: {
                id: 'ABC',
                name: 'Nicolas Adasme'
            }
        }, action)

        expect(state).toEqual({
            logged: false
        })
        


    })

})