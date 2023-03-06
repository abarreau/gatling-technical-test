import renderer from 'react-test-renderer';
import { Breadcrumbs, BreadcrumbSegment } from './Breadcrumbs';
import { MemoryRouter } from 'react-router-dom';

describe('Breadcrumbs', () => {
    it('should display component', () => {
        const segments: BreadcrumbSegment[] = [
            { name: 'Index', url: '/' }, { name: 'Page1', url: '/page1' }
        ];
        const component = renderer.create(
            <MemoryRouter>
                <Breadcrumbs segments={segments}></Breadcrumbs>
            </MemoryRouter>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});