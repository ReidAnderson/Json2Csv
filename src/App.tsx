import React, { useState } from 'react';
import './App.css';

function getData(dictionary: any, dotStr:string) {
  let data = dictionary;
  let properties = dotStr.split(".");
  properties.forEach(element => {
    data = data[element];
  });
  return data;
}

function translateToCsv(inputJson:string, sourceList:string, columns:string): any[] {
  const input = JSON.parse(inputJson);
  const source = sourceList;
  const cols = JSON.parse(columns);

  let output:any[] = [];

  getData(input, source).forEach((element: string) => {
    let row: any[] = [];
    cols.forEach((field: string) => {
      row.push(getData(element, field));
    });
    output.push(row);
  });

  console.log(output);
  console.log(getData(input, source))

  return output;
}

function printCsv(headers: any[], data: any[]):string {
  let output = "";
  const delimiter = ",";

  let header = headers.join(delimiter) + '\n';

  output += header;

  data.forEach(element => {
    output += element.join(delimiter) + '\n';
  });

  return output;
}

function App() {
  const [inputJson, setInputJson] = useState("{}");
  const [sourceList, setSourceList] = useState("");
  const [columns, setColumns] = useState("[]");

  const [output, setOutput] = useState<any[]>([]);
  
  return (
    <div className="App">
        <label htmlFor="json">Input JSON:</label>
        <textarea id="json" onChange={(evt) => setInputJson(evt.target.value)} name="story" defaultValue="JSON document">
          
        </textarea>

        <label htmlFor="sourceList">Source List Field:</label>
        <textarea id="sourceList" onChange={(evt) => setSourceList(evt.target.value)} name="source list" defaultValue="Field path for the source list. (e.g. field1.property.someList)">
          
        </textarea>

        <label htmlFor="columns">Columns:</label>
        <textarea id="columns" onChange={(evt) => setColumns(evt.target.value)} name="column list" defaultValue="List of columns with field paths for each. (e.g. prop1.prop2)">
          
        </textarea>

        <button type="button" onClick={() => { setOutput(translateToCsv(inputJson, sourceList, columns)) }}>Submit</button>

        <label htmlFor="csvOutput">CSV Output:</label>
        <textarea id="csvOutput" name="csv output" value={printCsv(JSON.parse(columns), output)}>
          
        </textarea>
    </div>
  );
}

export default App;
