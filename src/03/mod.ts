import { PathOrFileDescriptor, readFileSync } from "fs";

const priorities: {readonly [key: string]: number} = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
                                                        .split('')
                                                        .reduce((previous_value, current_value, current_index) => ({
                                                            ...previous_value, [current_value]: current_index
                                                        }), {});

export function run_test(input_file_index: number): void {
    const input_filepaths: ReadonlyArray<PathOrFileDescriptor> = [
        './src/03/input_files/input_1.txt',
    ];
    const input_file: PathOrFileDescriptor = input_filepaths[input_file_index];
    const day_03_result: number = execute(input_file);
    console.log(day_03_result);
}

function execute(input_filepath: PathOrFileDescriptor): number {
    const input_file_lines: ReadonlyArray<string> = readFileSync(input_filepath, 'utf-8').split('\r\n');
    let sum_of_priorities: number = 0; 
    for (let rucksack_index = 0; rucksack_index < input_file_lines.length; rucksack_index++) {
        const current_rucksack: string = input_file_lines[rucksack_index];
        const first_compartment: Set<string> = new Set(current_rucksack.slice(0, current_rucksack.length / 2).split(''));
        const second_compartment: string = current_rucksack.slice(current_rucksack.length / 2, current_rucksack.length);

        for (let first_compartment_index = 0; first_compartment_index < second_compartment.length; first_compartment_index++) {
            const current_item_second_compartment: string = second_compartment[first_compartment_index];
            if (first_compartment.has(current_item_second_compartment)) {
                sum_of_priorities += priorities[current_item_second_compartment] + 1;
                break;
            } 
        }
    }
    return sum_of_priorities;
}