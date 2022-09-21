import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchPage } from "../../../src/heroes"

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockUseNavigate,
}));


describe('Pruebas en el SearchPage', () => {

    test('Debe de mostrar los valores por defecto', () => {

        const { container } = render(
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
        )

        expect(container).toMatchSnapshot();

    })

    test('Debe de mostrar a batman y el input con el valor del queryString', () => {

        const { container } = render(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');
        expect(input.value).toBe('batman');

        const img = screen.getByRole('img');
        expect(img.src).toContain('/assets/heroes/dc-batman.jpg')
        expect(container).toMatchSnapshot();

    })

    test('Debe de mostrar un error si no se encuentra el heroe', () => {

        render(
            <MemoryRouter initialEntries={['/search?q=batmann']}>
                <SearchPage />
            </MemoryRouter>
        )

        // const alert = screen.getByLabelText('alert-danger');
        // expect( alert ).toBeTruthy();
        // screen.debug();

    })

    test('Debe de llamar el navigate a la ventana nueva', () => {

        const inputValue = 'superman'

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage />
            </MemoryRouter>
        )

        const input = screen.getByRole('textbox');

        fireEvent.change(input, {target: {name: 'searchText', value: inputValue}})
        console.log(input.value);

        const form = screen.getByRole('form');
        fireEvent.submit(form);

        expect(mockUseNavigate).toHaveBeenCalledWith(`?q=${inputValue}`);
        
    })

})