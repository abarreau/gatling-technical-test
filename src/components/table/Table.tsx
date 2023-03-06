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
                                    column.isEditable
                                        ? <EditableField className={styles.editable} key={columnIndex} value={column.value} onValueChange={(val: string) => console.log('Should update !', val)}>
                                            { column.value }
                                            <i className={styles.editIcon}></i>
                                        </EditableField>
                                        : <td key={columnIndex}>{ column.value }</td>
                                )
                            }
                        </tr>
                    )
            }
        </tbody>
    </table>);
};

export type TableDatasource = {
    columnHeaders: string[],
    rows: {
        columns: TableDatasourceColumn[]
    }[]
};

export type TableDatasourceColumn = {
    value: string;
    isEditable: boolean;
    onEdit?: (value: string) => boolean
}