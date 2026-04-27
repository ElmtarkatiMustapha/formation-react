import { render } from "@testing-library/react";
import Loader from ".";

describe('Loader component', () => {
    it('renders loading text', () => {
        const { container } = render(<Loader />);
        expect(container.textContent).toBe('Loading...');
    });
});