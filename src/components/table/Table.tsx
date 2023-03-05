import { FC } from 'react';
import styles from './Table.module.css';

/**
 * Component meant to display tabular data, not for design. Number of elements in `datasource.columnHeaders` must match
 * the number of elements in `row.columnValues`.
 * @param datasource The datasource rendered in the table.
 */
export const Table: FC<{ datasource: TableDatasource }> = ({ datasource }) => {
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
                                row.columnValues.map((columnValue, columnIndex) => <td key={columnIndex}>{columnValue}</td>)
                            }
                        </tr>
                    )
            }
        </tbody>
    </table>);
};

export type TableDatasource = {
    columnHeaders: string[],
    rows: { columnValues: string [] }[]
};
