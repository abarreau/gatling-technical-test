import renderer from 'react-test-renderer';
import { PageHeader } from './PageHeader';

describe('PageHeader', () => {
    it('should display component', () => {
        const component = renderer.create(
            <PageHeader>My header</PageHeader>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
