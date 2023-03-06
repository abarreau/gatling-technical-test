import renderer from 'react-test-renderer';
import { EditableField } from './EditableField';
import { act } from '@testing-library/react';

describe('Table', () => {
    it('should display component', () => {
        const onValueChange = jest.fn();
        const component = renderer.create(
            <EditableField value="test" onValueChange={onValueChange}>test</EditableField>
        );

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should display input when clicking on td', () => {
        const onValueChange = jest.fn();
        const component = renderer.create(
            <EditableField value="test" onValueChange={onValueChange}>test</EditableField>
        );

        act(() => {
            component.root.findByType('td').props.onClick();
        });

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should invoke onValueChange', () => {
        const onValueChange = jest.fn();
        const component = renderer.create(
            <EditableField value="test" onValueChange={onValueChange}>test</EditableField>
        );

        act(() => {
            component.root.findByType('td').props.onClick();
        });

        act(() => {
            component.root.findByType('input').props.onBlur();
        });

        expect(onValueChange).toHaveBeenCalled();

        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
