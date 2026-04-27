import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Button from "."

describe('button test',()=>{
    it('render correctly', ()=>{
        const {container} = render(
            <MemoryRouter>
                <Button label={'View'} name={'view'} color={'btn-primary'} handleClick={()=>null}/>
            </MemoryRouter>
        )
        expect(screen.getByRole('button').textContent).toBe('View')
    })
})