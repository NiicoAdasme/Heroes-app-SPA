import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { AuthContext } from "../../../src/auth"
import { PublicRoute } from "../../../src/router/PublicRoute"

describe('Pruebas en el Public Route', () => {

    test('Debe de mostrar el children en caso de no estar autenticado', () => {

        const contextValue = {
            logged: false
        }

        render(
            <AuthContext.Provider value={contextValue}>
                <PublicRoute>
                    <h1>Ruta Publica</h1>
                </PublicRoute>
            </AuthContext.Provider>
        )

        // screen.debug();
        expect(screen.getByText('Ruta Publica')).toBeTruthy();
    })

    test('Debe de navegar en caso de estar autenticado', () => {

        const contextValue = {
            logged: true,
            user: {
                id: 'ABC',
                name: 'Nicolas Adasme'
            }
        };

        // Se necesita declarar como minimo 2 rutas
        // 1. Privada
        // 2. Publica
        // Ya que si solo se tiene una ruta publica en este caso, la ruta de login. Habrá un ciclo infinito
        // en el que al no estar autenticado este lo devolvera al login y este volvera a redireccionar,  creando un ciclo infinito.
        render(
            <AuthContext.Provider value={contextValue}>
                <MemoryRouter initialEntries={['/marvel']}>

                    {/* Ruta publica */}
                    <Routes>
                        <Route path='login' element={
                            <PublicRoute>
                                <h1>Ruta Publica</h1>
                            </PublicRoute>
                        } />

                        {/* Ruta privada */}
                        <Route path='marvel' element={<h1>Pagina de Marvel</h1>} />

                    </Routes>


                </MemoryRouter>

            </AuthContext.Provider>
        )

        expect( screen.getByText('Pagina de Marvel') ).toBeTruthy();

    
    })

})