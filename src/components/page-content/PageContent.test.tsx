import renderer from 'react-test-renderer';
import { PageContent } from './PageContent';

describe('PageContent', () => {
    it('should display component', () => {
        const component = renderer.create(
            <PageContent>My content</PageContent>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
