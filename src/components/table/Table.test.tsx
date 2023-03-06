import renderer from 'react-test-renderer';
import { Table, TableDatasource } from './Table';

describe('Table', () => {
    it('should display component', () => {
        const dummyDatasource: TableDatasource = {
            columnHeaders: [ 'One', 'Two', 'Three' ],
            rows: [
                {
                    columns: [
                        { value: 'Uno', isEditable: false },
                        { value: 'Dos', isEditable: false },
                        { value: 'Tres', isEditable: false }
                    ]
                },
                {
                    columns: [
                        { value: 'Un', isEditable: false },
                        { value: 'Deux', isEditable: false },
                        { value: 'Trois', isEditable: false }
                    ]
                }
            ]
        };

        const component = renderer.create(
            <Table datasource={dummyDatasource}></Table>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should display an empty message if no rows', () => {
        const dummyDatasource: TableDatasource = {
            columnHeaders: [ 'One', 'Two', 'Three' ],
            rows: []
        };

        const component = renderer.create(
            <Table datasource={dummyDatasource}></Table>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should not display anything if there is no column headers', () => {
        console.warn = jest.fn();
        const dummyDatasource: TableDatasource = {
            columnHeaders: [],
            rows: []
        };

        const component = renderer.create(
            <Table datasource={dummyDatasource}></Table>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
        expect(console.warn).toHaveBeenCalledWith('There is no column headers in your datasource.');
    });
});
