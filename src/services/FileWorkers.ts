import Papa from 'papaparse';
import ExcelJS from 'exceljs';


export async function fileToNestedArray(x: File) {
    const fileType = x.type

    if (fileType === 'text/csv') {
        // handle CSV file
        const res = await parseCSV(x);
        return res

    } else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        // handle Excel file
        const res = await parseXlsx(x)
        return res
        
    }
    throw new Error("File is not in acceptable format")
}


async function parseCSV(x: any): Promise<any> {
    console.log(x)
    return new Promise((resolve, reject) => {
        Papa.parse(x, {
            complete: (results) => {
                console.log(results.data);
                const res = results.data.map(x => x instanceof Array? x.filter(y => y !== '') : []).filter(x => x.length !== 0)
                //Removing empty elements
                resolve(res);
            },
            header: false,
        });
    });
}

async function parseXlsx(x: any) {
    console.log('Started xlsx: ' + x)

    // Load the workbook from file
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(x);

    // Get the first worksheet
    const worksheet = workbook.worksheets[0];

    // Convert worksheet data to JSON
    const data = worksheet.getSheetValues().slice(1).map(row => row instanceof Array ? row.slice(1) : row);

    console.log(data); // Your JSON data
    return data
}


export function nestedArrayToCSV(data: any[][]): string {
    return data.map(row => row.join(',')).join('\n');
}

export function exportToCSV(data: any[][]) {
  const csvData = nestedArrayToCSV(data)
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  download(blob, 'data.csv');
}

export function exportExcel(data: any[][]) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet1');
  
    // Add data to the worksheet
    for (let i = 0; i < data.length; i++) {
      worksheet.addRow(data[i]);
    }
  
    // Create a blob from the workbook
    workbook.xlsx.writeBuffer().then((buffer: any) => {
      // Create a blob URL for the download link
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      download(blob, 'data.xlsx')
    });
  }

  export function nestedArrayToLaTex(data: any[][]): string {
    const tableRows = data.map(row => row.join(' & ')).join(' \\\\ \n');
    const latexData = `\\begin{tabular}{${'c'.repeat(data[0].length)}}\n${tableRows} \n\\end{tabular}`;
    return latexData
  }

  export function exportToLaTeX(data: any[][]) {
    const latexData = nestedArrayToLaTex(data);
    const blob = new Blob([latexData], { type: 'text/plain;charset=utf-8' });
    download(blob, 'data.tex');
  }

  function download(blob: Blob, name: string) {
    const url = window.URL.createObjectURL(blob);
    // Create a download link and click it programmatically
    const link = document.createElement('a');
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
