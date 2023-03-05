import renderer from 'react-test-renderer';
import { Card } from './Card';

describe('Card', () => {
    it('should display component', () => {
        const component = renderer.create(
            <Card>My card</Card>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
