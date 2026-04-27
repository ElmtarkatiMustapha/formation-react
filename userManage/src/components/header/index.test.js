import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Header from "."

describe('header', ()=>{
    it('render header',()=>{
        const {container} = render(
            <MemoryRouter>
                <Header/>
            </MemoryRouter>
        )
        
        expect(screen.getByRole('heading').textContent).toBe('Welcome!')
        expect(screen.getByRole('button').textContent).toBe('Disconnect')
    })
})