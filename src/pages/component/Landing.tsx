'use client';

import { FC, useState, useRef, useCallback, useEffect } from "react";
import { Pause, Play, XCircle, Globe } from "react-feather";
import useInterval from "./Time"

const numRows = 30;
const numCols = 30;

// Directions: N, S, E, W, NE, NW, SE, SW
const operations = [
    [0, 1], // right
    [0, -1], // left
    [1, -1], // top left
    [-1, 1], // top right
    [1, 1], // top
    [-1, -1], // bottom
    [1, 0], // bottom right
    [-1, 0], // bottom left
];

const generateEmptyGrid = (): number[][] => {
    const rows = Array(numRows).fill(0).map(() => Array(numCols).fill(0));
    return rows;
};

const randomTiles = (): number[][] => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
        rows.push(Array.from(Array(numCols), () => (Math.random() > 0.7 ? 1 : 0)));
    }
    return rows;
};

const Landing: FC = () => {
    const [grid, setGrid] = useState(generateEmptyGrid);
    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running;

    useEffect(() => {
        setGrid(randomTiles)
        console.log(grid);
    }, []);

    const runSimulation = useCallback((grid: any) => {
        if (!runningRef.current) {
            return;
        }

        let gridCopy = JSON.parse(JSON.stringify(grid));
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                let neighbors = 0;

                operations.forEach(([x, y]) => {
                    const newI = i + x;
                    const newJ = j + y;

                    if (newI >= 0 && newI < numRows && newJ >= 0 && newJ < numCols) {
                        neighbors += grid[newI][newJ];
                    }
                });

                if (neighbors < 2 || neighbors > 3) {
                    gridCopy[i][j] = 0;
                } else if (grid[i][j] === 0 && neighbors === 3) {
                    gridCopy[i][j] = 1;
                }
            }
        }

        setGrid(gridCopy);
    }, []);

    useInterval(() => {
        runSimulation(grid);
    }, 300);

    const exists = (grid: any) => {
        return grid.some((row: any) => row.includes(1));
    }

    return (
        
        <div className="container text-center py-5">

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
                    width: "fit-content",
                    margin: "0 auto",
                }}
            >
                
                {grid.map((rows, i) =>
                    rows.map((col, k) => (
                        <div
                            key={`${i}-${k}`}
                            onClick={() => {
                                // Deep clone grid
                                let newGrid = JSON.parse(JSON.stringify(grid));
                                newGrid[i][k] = grid[i][k] ? 0 : 1;
                                setGrid(newGrid);
                            }}
                            style={{
                                width: 15,
                                height: 15,
                                backgroundColor: grid[i][k] ? "black" : 'white',
                                border: "1px solid #595959",
                            }}
                        ></div>
                    ))
                )}
            </div>

            <div className="buttons m-3 p-5">
                <button
                    type="button"
                    className={`inline-flex item-center text-white ${running ? 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 ' : 'bg-green-700 hover:bg-green-800 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 '}  focus:outline-none focus:ring-4  font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 disabled:opacity-50`}
                    onClick={() => {
                        setRunning(!running);
                        if (!running) {
                            runningRef.current = true;
                        }
                    }}
                    disabled={!exists(grid)}
                >
                    
                    <span className="mx-1">{running ? "Pause" : "Start"}</span>
                </button>


                <button
                    type="button"
                    className={`inline-flex item-center text-white bg-gray-700 hover:bg-gray-800 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800 focus:outline-none focus:ring-4 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2`}
                    onClick={() => {
                        setGrid(randomTiles);
                    }}
                >

                    <span className="mx-1">Random</span>
                </button>


            </div>
        </div >
    );
};

export default Landing