export function sortAscNumbers(rows, column) {
  return [...rows].sort((a, b) => {
    const rowValueA = Number(a.cells[column].innerHTML);
    const rowValueB = Number(b.cells[column].innerHTML);
    return rowValueA - rowValueB;
  });
}

export function sortDescNumbers(rows, column) {
  return [...rows].sort((a, b) => {
    const rowValueA = Number(a.cells[column].innerHTML);
    const rowValueB = Number(b.cells[column].innerHTML);
    return rowValueB - rowValueA;
  });
}

export function sortAscString(rows, column) {
  return [...rows].sort((a, b) => {
    const rowValueA = a.cells[column].innerHTML;
    const rowValueB = b.cells[column].innerHTML;
    return rowValueA.localeCompare(rowValueB);
  });
}

export function sortDescString(rows, column) {
  return [...rows].sort((a, b) => {
    const rowValueA = a.cells[column].innerHTML;
    const rowValueB = b.cells[column].innerHTML;
    return rowValueB.localeCompare(rowValueA);
  });
}
