import renderer from 'react-test-renderer';
import { Table, TableDatasource } from './Table';
import { act } from '@testing-library/react';

describe('Table', () => {
    it('should display component', () => {
        const dummyFn = jest.fn();

        const dummyDatasource: TableDatasource = {
            columnHeaders: [ 'One', 'Two', 'Three' ],
            rows: [
                {
                    columns: [
                        { value: 'Uno', type: 'simple' },
                        { value: 'Dos', type: 'simple' },
                        { value: 'Tres', type: 'simple' }
                    ]
                },
                {
                    columns: [
                        { value: 'Un', type: 'simple' },
                        { value: 'Deux', type: 'simple' },
                        { value: 'Trois', type: 'simple' }
                    ]
                },
                {
                    columns: [
                        { value: 'Un', type: 'editable', onEdit: dummyFn },
                        { value: 'Deux', type: 'simple' },
                        { type: 'action', buttons: [ { label: 'myAction', metadata: 1, onClick: dummyFn } ] }
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

    it('should execute callback when clicking on action button', () => {
        const dummyFn = jest.fn();
        const dummyDatasource: TableDatasource = {
            columnHeaders: [ 'action' ],
            rows: [ {
                columns: [
                    { type: 'action', buttons: [ { label: 'myAction', metadata: 1, onClick: dummyFn } ] }
                ]
            } ]
        };

        const component = renderer.create(
            <Table datasource={dummyDatasource}></Table>
        );

        act(() => {
            component.root.findByType('button').props.onClick();
        });

        expect(dummyFn).toHaveBeenCalledWith(1);
    });
});
