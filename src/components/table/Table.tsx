import { FC } from 'react';
import styles from './Table.module.css';
import { EditableField } from './editable-field/EditableField';

/**
 * Component meant to display tabular data, not for design. Number of elements in `datasource.columnHeaders` must match
 * the number of elements in `row.columnValues`.
 * @param datasource The datasource rendered in the table.
 */
export const Table: FC<{ datasource: Readonly<TableDatasource> }> = ({ datasource }) => {
    if(datasource.columnHeaders.length === 0) {
        console.warn('There is no column headers in your datasource.');
        return null;
    }

    return (<table className={styles.table}>
        <thead>
            <tr>
                {
                    datasource.columnHeaders.map(name => <th key={name}>{name}</th>)
                }
            </tr>
        </thead>
        <tbody>
            {
                datasource.rows.length === 0
                    ? <tr>Empty dataset</tr>
                    : datasource.rows.map((row, rowIndex) =>
                        <tr key={rowIndex}>
                            {
                                row.columns.map((column, columnIndex) =>
                                    column.type === 'editable'
                                        ? <EditableField className={styles.editable} key={columnIndex} value={column.value} onValueChange={(val: string) => console.log('Should update !', val)}>
                                            { column.value }
                                            <i className={styles.editIcon}></i>
                                        </EditableField>
                                        : column.type === 'action'
                                            ? <td key={columnIndex}>{
                                                column.buttons.map((button, buttonIndex) =>
                                                    <button key={buttonIndex} onClick={() => button.onClick(button.metadata)}>{ button.label }</button>)
                                            }</td>
                                            : <td key={columnIndex}>{ column.value }</td>
                                )
                            }
                        </tr>
                    )
            }
        </tbody>
    </table>);
};

export type TableDatasource = Readonly<{
    columnHeaders: string[],
    rows: {
        columns: (TableDatasourceActionColumn | TableDatasourceSimpleColumn | TableDatasourceEditableColumn)[]
    }[]
}>;

export type TableDatasourceColumn = Readonly<{
    type: 'editable' | 'simple' | 'action'
    value: string;
}>

export type TableDatasourceEditableColumn = TableDatasourceColumn & Readonly<{
    type: 'editable',
    onEdit?: (value: string) => boolean
}>

export type TableDatasourceSimpleColumn = TableDatasourceColumn & Readonly<{
    type: 'simple'
}>

export type TableDatasourceActionColumn = Pick<TableDatasourceColumn, 'type'> & Readonly<{
    type: 'action',
    buttons: {
        metadata: number;
        label: string;
        onClick: (metadata: number) => void
    }[]
}>