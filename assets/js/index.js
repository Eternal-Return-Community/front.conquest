const rowsPerTable = 10;
const tableContainers = [];

window.onload = async () => {
  ranking();
};

const setHeader = (table) => {
  const headerRow = document.createElement('tr');
  const headers = ['Ranking', 'Name', 'Games', 'Elo', 'Region'];

  headers.forEach((headerText) => {
    const header = document.createElement('th');
    header.textContent = headerText;
    headerRow.appendChild(header);
  });

  const tableBody = document.createElement('tbody');
  table.appendChild(headerRow);
  table.appendChild(tableBody);
};

const ranking = async () => {
  try {
    const response = await fetch('http://localhost/v1/list');
    const { result } = await response.json();

    createTables(result);

    result.forEach((e, index) => {
      const tableIndex = Math.floor(index / rowsPerTable);
      const table = tableContainers[tableIndex];
      const newRow = document.createElement('tr');

      newRow.innerHTML = `
        <td>${index + 1}</td>
        <td>${e.nickname}</td>
        <td>${e.games}</td>
        <td>${e.elo}</td>
        <td>${e.region}</td>
      `;
      table.querySelector('tbody').appendChild(newRow);
    });
  } catch (e) {
    console.error(e);
  }
};

const createTables = (data) => {
  if (data.length >= 1) {
    const table1 = document.getElementById('t1');
    table1.style.display = 'inline-block';
    setHeader(table1);
    tableContainers.push(table1);
  };

  if (data.length >= 11) {
    const table2 = document.getElementById('t2');
    table2.style.display = 'inline-block';
    setHeader(table2);
    tableContainers.push(table2);
  };

  if (data.length >= 21) {
    const table3 = document.getElementById('t3');
    table3.style.display = 'inline-block';
    setHeader(table3);
    tableContainers.push(table3);
  };

  document.getElementById('text').style.display = 'block';
  document.getElementById('loading').style.display = 'none';

};
